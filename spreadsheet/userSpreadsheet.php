<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spreadsheet</title>
    <link rel="stylesheet" href="userSpreadsheet.css">
</head>

<?php 
    include "spreadsheet.php";
?>

<body>

    <div id = "darken" class = "darken"> </div>

    <div id = "colOptions" class = "colOptions">
        <p> What field do you want to add?</p>
        <button id = "interviewStat" type = "button"> Interview Status </button>
        <button id = "startDate" type = "button"> Start Date </button>
        <button id = "employType" type = "button"> Employment Type </button>
        <button id = "cancel" type = "button"> Cancel </button>
    </div>

    <div class = "header"> 

        <div id = "logOut" class = "nav">
            <p> Log Out</p>
        </div>

        <div id = "resetTable" class = "nav">
            <p> Reset Table</p>
        </div>

        <div id = "addRow" class = "nav">
            <p> Add Row</p>
        </div>

        <div id = "deleteRow" class = "nav">
            <p> Delete Row</p>
        </div>

        <div id = "addCol" class = "nav">
            <p> Add Column</p>
        </div>

        <div id = "deleteCol" class = "nav">
            <p> Delete Column</p>
        </div>

    </div>

    <table id = "formHeader">

            <thead>
                <tr>
                    <th id = "countRow" scope="col">  </th>

                    <th id = "title" scope="col"> Company Name </th>

                    <th id = "title" scope="col"> Position </th>

                    <th id = "title" scope="col"> Position Status </th>

                    <th id = "title" scope="col"> Resume </th>

                    <th id = "title" scope="col"> Notes </th>
                </tr>
            </thead>

     </table>
    
    
    
     <form action="userSpreadsheet.php">

        <div class = "allRows"> 

             <table class = "customRows" id = "customRows">

                <tr class = "customRow" id = "customRow">
                    <th id = "countRow" scope="row"></th>
                    <td>
                        <input name = "companyName" type = "text" placeholder = "Enter Here">
                    </td>
                    <td>
                        <input name = "position" type = "text" >
                    </td>
                    <td>
                        <select id = "posStatus">
                            <option value = "Pending">Pending</option>
                            <option value = "Accepted">Accepted</option>
                            <option value = "Denied">Denied</option>
                        </select>
                    </td>
                    <td>
                        <input type="file" id="imageUpload" accept="image/*">
                    </td>
                    <td>
                        <input id = "notes" name = "notes" type = "text" >
                    </td>
                </tr>

            </table>

            <table id = "blankRows">

                <tbody class = "blanks">

                    <tr>
                        <th id = "countRow" scope="row"></th>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td></td>
                        <td>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"></th>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td></td>
                        <td>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"></th>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td></td>
                        <td>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"></th>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td></td>
                        <td>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"></th>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td></td>
                        <td>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"></th>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td></td>
                        <td>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row"></th>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td>
                        </td>
                        <td></td>
                        <td>
                        </td>
                    </tr>
                </tbody>
                
            </table>

        </div>

    </form>

</body>
<script src = "userSpreadsheet.js"></script>
</html>