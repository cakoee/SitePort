<?php
session_start();

header('Content-Type: application/json');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (isset($_SESSION['username']) && !empty($_SESSION['username'])) {

    $user = $_SESSION['username'];
    
    //Connect to server
    include 'connect.php';

    // -- GET REQUEST: Retrieve past data --
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        
        // Check how many rows have username data
        $stmt = $dbh->prepare("SELECT * FROM userApplications WHERE username = ?");
        $stmt->execute([$user]);
        $allRows = $stmt->fetchAll();

        // If no rows, $allRows will be an empty array (No past state will be loaded into spreadsheet)
        if (empty($allRows)) {
            echo json_encode([]); 
        } else {
            // Send the data to JavaScript
            echo json_encode($allRows);
        }
    }

    // -- DELETE REQUEST: Delete row(s) by company name --
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data) {
            echo json_encode(["error" => "No data received"]);
            exit;
        }

        $companyName = $data['CompanyName'] ?? '';

        // Validate company name
        if (empty($companyName) || trim($companyName) === '') {
            echo json_encode(["error" => "Company name is required"]);
            exit;
        }

        try {
            // Delete all rows with this company name for current user
            $stmt = $dbh->prepare("DELETE FROM userApplications WHERE CompanyName = ? AND username = ?");
            $stmt->execute([$companyName, $user]);
            $rowsDeleted = $stmt->rowCount();

            echo json_encode(["success" => true, "message" => "Rows deleted", "rowsDeleted" => $rowsDeleted]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }

    // -- POST REQUEST: Save/Update row data --
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data) {
            echo json_encode(["error" => "No data received"]);
            exit;
        }

        // Check for jobID autofill request FIRST
        if (isset($data['jobID'])) {
            $jobID = $data['jobID'];

            //Pull row values from database for the job ID key
            $search = $dbh->prepare("SELECT CompanyName, JobTitle, PositionType, StartDate FROM companypostings WHERE id = ?");
            $search->execute([$jobID]);
            $rowInfo = $search->fetch(PDO::FETCH_ASSOC);

            if ($rowInfo) {
                echo json_encode(["success" => true, "data" => $rowInfo]);
            } else {
                echo json_encode(["error" => "Job not found"]);
            }
            exit;
        }

        // Check for RESET operation
        if (isset($data['action']) && $data['action'] === 'reset') {
            try {
                // Delete all rows for current user
                $stmt = $dbh->prepare("DELETE FROM userApplications WHERE username = ?");
                $stmt->execute([$user]);
                $rowsDeleted = $stmt->rowCount();

                echo json_encode(["success" => true, "message" => "Table reset", "rowsDeleted" => $rowsDeleted]);
            } catch (PDOException $e) {
                echo json_encode(["error" => "Database error: " . $e->getMessage()]);
            }
            exit;
        }

        // Check for DELETE ROW operation
        if (isset($data['action']) && $data['action'] === 'deleteRow') {
            $companyName = $data['CompanyName'] ?? '';

            // Validate company name
            if (empty($companyName) || trim($companyName) === '') {
                echo json_encode(["error" => "Company name is required"]);
                exit;
            }

            try {
                // Delete all rows with this company name for current user
                $stmt = $dbh->prepare("DELETE FROM userApplications WHERE CompanyName = ? AND username = ?");
                $stmt->execute([$companyName, $user]);
                $rowsDeleted = $stmt->rowCount();

                echo json_encode(["success" => true, "message" => "Rows deleted", "rowsDeleted" => $rowsDeleted]);
            } catch (PDOException $e) {
                echo json_encode(["error" => "Database error: " . $e->getMessage()]);
            }
            exit;
        }

        $companyName = $data['CompanyName'] ?? '';
        $position = !empty($data['Position']) ? $data['Position'] : '';
        $posStatus = !empty($data['PositionStatus']) ? $data['PositionStatus'] : '';
        $resume = !empty($data['Resume']) ? $data['Resume'] : '';
        $notes = !empty($data['Notes']) ? $data['Notes'] : '';
        $interviewStatus = !empty($data['InterviewStatus']) ? $data['InterviewStatus'] : null;
        $startDate = !empty($data['StartDate']) ? $data['StartDate'] : null;
        $employmentType = !empty($data['EmploymentType']) ? $data['EmploymentType'] : null;
        $rowId = $data['id'] ?? null;

        // Validate required fields - only CompanyName is required
        if (empty($companyName) || trim($companyName) === '') {
            echo json_encode(["error" => "Company name is required"]);
            exit;
        }

        try {
            // Check if row exists for this company
            if ($rowId) {
                // UPDATE existing row
                $stmt = $dbh->prepare("UPDATE userApplications SET 
                    CompanyName = ?,
                    Position = ?, 
                    PositionStatus = ?, 
                    Resume = ?,
                    Notes = ?,
                    InterviewStatus = ?,
                    StartDate = ?,
                    EmploymentType = ?
                    WHERE id = ? AND username = ?");
                
                $stmt->execute([
                    $companyName,
                    $position,
                    $posStatus,
                    $resume,
                    $notes,
                    $interviewStatus,
                    $startDate,
                    $employmentType,
                    $rowId,
                    $user
                ]);

                echo json_encode(["success" => true, "message" => "Row updated", "rowId" => $rowId]);
            } else {
                // INSERT new row
                $stmt = $dbh->prepare("INSERT INTO userApplications 
                    (username, CompanyName, Position, PositionStatus, Resume, Notes, InterviewStatus, StartDate, EmploymentType) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
                
                $stmt->execute([
                    $user,
                    $companyName,
                    $position,
                    $posStatus,
                    $resume,
                    $notes,
                    $interviewStatus,
                    $startDate,
                    $employmentType
                ]);

                $newRowId = $dbh->lastInsertId();
                echo json_encode(["success" => true, "message" => "Row inserted", "rowId" => $newRowId]);
            }
        } catch (PDOException $e) {
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    }

} else {
    echo json_encode(["error" => "Session is invalid or expired."]);
}

?>