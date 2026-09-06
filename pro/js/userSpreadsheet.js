/*
 * Name: Dee Liberman
 * Date: April 5
 * Description: Script to allow the user to insert columns and rows into the spreadsheet when they select the option.
 *             Fills in any past state the current user has, and autofills information in rows from a company they select.
 */

window.addEventListener("load", function(e){
    e.preventDefault;

let colAmt = 0;
let colInRow = '';

const logOut = document.getElementById("logOut");

logOut.addEventListener("click", function(){
    const newUrl = "index.html";
    window.history.pushState({ path: newUrl }, '', newUrl);
    location.reload();
})

const addCol = document.getElementById("addCol");
const interviewStat = document.getElementById("interviewStat");
const startDate = document.getElementById("startDate");
const employType = document.getElementById("employType");
const cancel = document.getElementById("cancel");
const darken = document.getElementById("darken");
const box = document.getElementById("colOptions");

const delCol = document.getElementById("deleteCol");
const REinterviewStat = document.getElementById("REinterviewStat");
const REstartDate = document.getElementById("REstartDate");
const REemployType = document.getElementById("REemployType");
const REcancel = document.getElementById("REcancel");
const REbox = document.getElementById("removeCol");

const delRow = document.getElementById("deleteRow");
const rowDelete = document.getElementById("rowDelete");
const rowCancel = document.getElementById("rowCancel");
const RERowbox = document.getElementById("removeRow");

const addRow = document.getElementById("addRow");
const resetTable = document.getElementById("resetTable");
const rowInput = document.getElementById("chooseCompany");
const resetBox = document.getElementById("resetBox");
const confirmReset = document.getElementById("confirmReset");
const cancelReset = document.getElementById("cancelReset");



// Disable delete column options initially since no columns are added yet
REinterviewStat.disabled = true;
REstartDate.disabled = true;
REemployType.disabled = true;

// Track which columns exist
let hasInterviewStatus = false;
let hasStartDate = false;
let hasEmploymentType = false;

// Debounce timer for auto-save
let saveTimeout;

// Convert file to base64
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Auto-save function
function autoSaveRow(row) {
    clearTimeout(saveTimeout);
    
    saveTimeout = setTimeout(async function() {
        const resumeInput = row.querySelector('input[type="file"]');
        const resumeData = resumeInput?.files?.[0] ? await convertFileToBase64(resumeInput.files[0]) : null;

        const rowData = {
            id: row.dataset.rowId || null,
            CompanyName: row.querySelector('input[name="CompanyName"]')?.value || '',
            Position: row.querySelector('input[name="position"]')?.value || '',
            PositionStatus: row.querySelector('#posStatus')?.value || '',
            Resume: resumeData || null,
            Notes: row.querySelector('#notes')?.value || '',
            InterviewStatus: row.querySelector('select[data-interview-status]')?.value || null,
            StartDate: row.querySelector('input[type="date"]')?.value || null,
            EmploymentType: row.querySelector('select[data-employment-type]')?.value || null
        };

        // Only save if company name is not empty
        if (rowData.CompanyName.trim() !== '') {
            fetch('spreadsheet.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rowData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success && data.rowId && !row.dataset.rowId) {
                    row.dataset.rowId = data.rowId;
                    console.log("Row saved with ID:", data.rowId);
                } else if (data.error) {
                    console.error("Server error:", data.error);
                }
            })
            .catch(error => console.error("Save error:", error));
        }
    }, 1000); // Wait 1 second after last change before saving
}

// Attach listeners to row inputs
function attachRowListeners(row) {
    const inputs = row.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            autoSaveRow(row);
        });
        input.addEventListener('blur', function() {
            autoSaveRow(row);
        });
    });
}

// Use event delegation on the table for automatic listener attachment
document.addEventListener('change', function(e) {
    const customRowsTable = document.getElementById('customRows');
    if (customRowsTable && customRowsTable.contains(e.target)) {
        const row = e.target.closest('tr.customRow');
        if (row) {
            autoSaveRow(row);
        }
    }
});

document.addEventListener('blur', function(e) {
    const customRowsTable = document.getElementById('customRows');
    if (customRowsTable && customRowsTable.contains(e.target)) {
        const row = e.target.closest('tr.customRow');
        if (row) {
            autoSaveRow(row);
        }
    }
}, true); // Use capture phase for blur since it doesn't bubble

//Take previous spreadsheet data if it exists
fetch('spreadsheet.php')
    .then(response => {
        //If there is no response, throw error
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        //If data did not parse correctly
        if (data.error) {
            console.error("Server error:", data.error);
            return;
        }
        //Check if there is past spreadsheet data
        if (data.length == 0) {
            console.log("No past state.");
            // Attach listeners to the initial row that's always in the HTML
            const initialRow = document.querySelector('.customRow');
            if (initialRow) {
                attachRowListeners(initialRow);
            }

            //If there is a previous state for current users spreadsheet
        } else {
            console.log("Past state.");

            // -- Add Past Columns --

            // Check which extra columns exist - check if property exists AND has actual data
            if (data.length > 0) {
                if ('InterviewStatus' in data[0] && data[0].InterviewStatus) hasInterviewStatus = true;
                if ('StartDate' in data[0] && data[0].StartDate) hasStartDate = true;
                if ('EmploymentType' in data[0] && data[0].EmploymentType) hasEmploymentType = true;
            }

            if (hasInterviewStatus) {
                const cols = document.querySelectorAll('th[id="title"]');
                const lastCol = cols[cols.length - 1];
                lastCol.insertAdjacentHTML('afterend', '<th id="title" scope="col">Interview Status</th>');
                interviewStat.disabled = true;
                REinterviewStat.disabled = false;  // Enable delete option since column was loaded
                colInRow += '<td><select data-interview-status="true"><option value="Pending">Pending</option><option value="Passed">Passed</option><option value="Failed">Failed</option></select></td>';
                const blankRows = document.querySelectorAll('tbody.blanks tr');
                blankRows.forEach(row => { row.innerHTML += '<td></td>'; });
                ++colAmt;
            }
            if (hasStartDate) {
                const cols = document.querySelectorAll('th[id="title"]');
                const lastCol = cols[cols.length - 1];
                lastCol.insertAdjacentHTML('afterend', '<th id="title" scope="col">Start Date</th>');
                startDate.disabled = true;
                REstartDate.disabled = false;  // Enable delete option since column was loaded
                colInRow += '<td><input type="date"></td>';
                const blankRows = document.querySelectorAll('tbody.blanks tr');
                blankRows.forEach(row => { row.innerHTML += '<td></td>'; });
                ++colAmt;
            }
            if (hasEmploymentType) {
                const cols = document.querySelectorAll('th[id="title"]');
                const lastCol = cols[cols.length - 1];
                lastCol.insertAdjacentHTML('afterend', '<th id="title" scope="col">Employment Type</th>');
                employType.disabled = true;
                REemployType.disabled = false;  // Enable delete option since column was loaded
                colInRow += '<td><select data-employment-type="true"><option value="fullTime">Full Time</option><option value="partTime">Part Time</option><option value="onCall">On Call</option><option value="temp">Temporary</option><option value="other">Other</option></select></td>';
                const blankRows = document.querySelectorAll('tbody.blanks tr');
                blankRows.forEach(row => { row.innerHTML += '<td></td>'; });
                ++colAmt;
            }

            // -- Add Past Rows --
            const custRowsTable = document.querySelector('table.customRows tbody') || document.querySelector('table.customRows');
            
            // Remove all existing rows first (including the initial empty one)
            const existingRows = custRowsTable.querySelectorAll('tr.customRow');
            existingRows.forEach(row => row.remove());
            
            data.forEach((rowData, index) => {
                let colInRowContent = '';
                
                if (hasInterviewStatus) {
                    colInRowContent += `<td><select data-interview-status="true"><option value="Pending" ${rowData.InterviewStatus === 'Pending' ? 'selected' : ''}>Pending</option><option value="Passed" ${rowData.InterviewStatus === 'Passed' ? 'selected' : ''}>Passed</option><option value="Failed" ${rowData.InterviewStatus === 'Failed' ? 'selected' : ''}>Failed</option></select></td>`;
                }
                if (hasStartDate) {
                    colInRowContent += `<td><input type="date" value="${rowData.StartDate || ''}"></td>`;
                }
                if (hasEmploymentType) {
                    colInRowContent += `<td><select data-employment-type="true"><option value="fullTime" ${rowData.EmploymentType === 'fullTime' ? 'selected' : ''}>Full Time</option><option value="partTime" ${rowData.EmploymentType === 'partTime' ? 'selected' : ''}>Part Time</option><option value="onCall" ${rowData.EmploymentType === 'onCall' ? 'selected' : ''}>On Call</option><option value="temp" ${rowData.EmploymentType === 'temp' ? 'selected' : ''}>Temporary</option><option value="other" ${rowData.EmploymentType === 'other' ? 'selected' : ''}>Other</option></select></td>`;
                }

                const rowHTML = `<tr class="customRow" data-row-id="${rowData.id}">
                    <th id="countRow" scope="row"></th>
                    <td><input name="CompanyName" type="text" value="${rowData.CompanyName || ''}"></td>
                    <td><input name="position" type="text" value="${rowData.Position || ''}"></td>
                    <td><select id="posStatus"><option value="Pending" ${rowData.PositionStatus === 'Pending' ? 'selected' : ''}>Pending</option><option value="Accepted" ${rowData.PositionStatus === 'Accepted' ? 'selected' : ''}>Accepted</option><option value="Denied" ${rowData.PositionStatus === 'Denied' ? 'selected' : ''}>Denied</option></select></td>
                    <td><input type="file" id="imageUpload" accept="image/*"></td>
                    <td><input id="notes" name="notes" type="text" value="${rowData.Notes || ''}"></td>
                    ${colInRowContent}
                </tr>`;

                custRowsTable.insertAdjacentHTML('beforeend', rowHTML);
                const newRow = custRowsTable.querySelector('tr:last-child');
                attachRowListeners(newRow);
            });
        }

        // -- AFTER data is loaded, handle jobID autofill --
        const urlParams = new URLSearchParams(window.location.search);
        const jobID = urlParams.get('jobID');

        if (jobID) {
            // Fetch job data to autofill row
            fetch('spreadsheet.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jobID: jobID })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    if (data.success && data.data) {
                        const jobData = data.data;
                        console.log("Job autofill data: ", jobData);

                        // Get the last row (or first empty row) to autofill
                        const custRows = document.querySelectorAll('#customRows tr.customRow');
                        const lastRow = custRows[custRows.length - 1];

                        if (lastRow) {
                            // Autofill Company Name
                            const companyInput = lastRow.querySelector('input[name="CompanyName"]');
                            if (companyInput && jobData.CompanyName) {
                                companyInput.value = jobData.CompanyName;
                            }

                            // Autofill Position (JobTitle)
                            const positionInput = lastRow.querySelector('input[name="position"]');
                            if (positionInput && jobData.JobTitle) {
                                positionInput.value = jobData.JobTitle;
                            }

                            // Autofill Position Status (PositionType)
                            const posStatusSelect = lastRow.querySelector('#posStatus');
                            if (posStatusSelect && jobData.PositionType) {
                                posStatusSelect.value = jobData.PositionType === 'Full Time' ? 'Pending' : 'Pending';
                            }

                            // Autofill Start Date only if column exists
                            if (hasStartDate && jobData.StartDate) {
                                const dateInput = lastRow.querySelector('input[type="date"]');
                                if (dateInput) {
                                    dateInput.value = jobData.StartDate;
                                }
                            }

                            // Trigger auto-save for the autofilled row
                            autoSaveRow(lastRow);

                            // Remove jobID from URL to stop re-autofilling on refresh
                            const newUrl = window.location.pathname;
                            window.history.replaceState({ path: newUrl }, '', newUrl);
                        }
                    } else {
                        console.error("Error autofilling job data:", data.error);
                    }
                } catch (parseError) {
                    console.error("JSON Parse error:", parseError);
                    console.error("Response text:", text);
                }
            })
            .catch(error => console.error('Autofill error:', error));
        }
    })
    .catch(error => {
        console.error("Fetch error: ", error);
    })

addCol.addEventListener("click", function(){
    //Ask which column they want to add (Interview status, Start date, Employment type)
    darken.style.display = "flex";
    box.style.display = "flex";
})

delCol.addEventListener("click", function(){
    //Ask which column they want to add (Interview status, Start date, Employment type)
    darken.style.display = "flex";
    REbox.style.display = "flex";
})

delRow.addEventListener("click", function(){
    //Ask which column they want to add (Interview status, Start date, Employment type)
    darken.style.display = "flex";
    RERowbox.style.display = "flex";
})

REcancel.addEventListener("click", function(){
        darken.style.display = "none";
        REbox.style.display = "none";
    })

cancel.addEventListener("click", function(){
        darken.style.display = "none";
        box.style.display = "none";
    })

rowCancel.addEventListener("click", function(){
        darken.style.display = "none";
        RERowbox.style.display = "none";
    })

    interviewStat.addEventListener("click", function(){
        darken.style.display = "none";
        box.style.display = "none";
        interviewStat.disabled = true;
        REinterviewStat.disabled = false;  // Enable delete option
        hasInterviewStatus = true;

        //Add interview status column header
        const cols = document.querySelectorAll('th[id="title"]');
        const lastCol = cols[cols.length - 1];
        lastCol.insertAdjacentHTML('afterend', '<th id="title" scope="col">Interview Status</th>');

        //Add to custom rows
        const custRows = document.querySelectorAll('#customRows tr');
        for (let i = 0; i < custRows.length; ++i){
            custRows[i].innerHTML = custRows[i].innerHTML + '<td><select data-interview-status="true"><option value="Pending">Pending</option><option value="Passed">Passed</option><option value="Failed">Failed</option></select></td>';
        }

        //Track for new rows
        ++colAmt;
        colInRow += '<td><select data-interview-status="true"><option value="Pending">Pending</option><option value="Passed">Passed</option><option value="Failed">Failed</option></select></td>';
        
        // Reattach listeners to all rows
        document.querySelectorAll('#customRows tr').forEach(row => attachRowListeners(row));
    })

    startDate.addEventListener("click", function(){
        darken.style.display = "none";
        box.style.display = "none";
        startDate.disabled = true;
        REstartDate.disabled = false;  // Enable delete option
        hasStartDate = true;

        //Add start date column header
        const cols = document.querySelectorAll('th[id="title"]');
        const lastCol = cols[cols.length - 1];
        lastCol.insertAdjacentHTML('afterend', '<th id="title" scope="col">Start Date</th>');

        //Add to custom rows
        const custRows = document.querySelectorAll('#customRows tr');
        for (let i = 0; i < custRows.length; ++i){
            custRows[i].innerHTML = custRows[i].innerHTML + '<td><input type="date"></td>';
        }
        //Track for new rows
        ++colAmt;
        colInRow += '<td><input type="date"></td>';
        
        // Reattach listeners to all rows
        document.querySelectorAll('#customRows tr').forEach(row => attachRowListeners(row));
    })

    employType.addEventListener("click", function(){
        darken.style.display = "none";
        box.style.display = "none";
        employType.disabled = true;
        REemployType.disabled = false;  // Enable delete option
        hasEmploymentType = true;

        //Add employment type column header
        const cols = document.querySelectorAll('th[id="title"]');
        const lastCol = cols[cols.length - 1];
        lastCol.insertAdjacentHTML('afterend', '<th id="title" scope="col">Employment Type</th>');

        //Add to custom rows
        const custRows = document.querySelectorAll('#customRows tr');
        for (let i = 0; i < custRows.length; ++i){
            custRows[i].innerHTML = custRows[i].innerHTML + '<td><select data-employment-type="true"><option value="fullTime">Full Time</option><option value="partTime">Part Time</option><option value="onCall">On Call</option><option value="temp">Temporary</option><option value="other">Other</option></select></td>';
        }

        //Track for new rows
        ++colAmt;
        colInRow += '<td><select data-employment-type="true"><option value="fullTime">Full Time</option><option value="partTime">Part Time</option><option value="onCall">On Call</option><option value="temp">Temporary</option><option value="other">Other</option></select></td>';
        
        // Reattach listeners to all rows
        document.querySelectorAll('#customRows tr').forEach(row => attachRowListeners(row));
    })

addRow.addEventListener("click", function(){
    // Build the complete column HTML based on current column state
    let extraCols = '';
    if (hasInterviewStatus) {
        extraCols += '<td><select data-interview-status="true"><option value="Pending">Pending</option><option value="Passed">Passed</option><option value="Failed">Failed</option></select></td>';
    } 
    if (hasStartDate) {
        extraCols += '<td><input type="date"></td>';
    }
    if (hasEmploymentType) {
        extraCols += '<td><select data-employment-type="true"><option value="fullTime">Full Time</option><option value="partTime">Part Time</option><option value="onCall">On Call</option><option value="temp">Temporary</option><option value="other">Other</option></select></td>';
    }

    //Add new row with extra column(s)
    const lastRow = document.querySelector('.customRow');

    lastRow.insertAdjacentHTML('afterend', '<tr class="customRow"><th id="countRow" scope="row"></th><td><input name="CompanyName" type="text" placeholder="Manual Entry"></td><td><input name="position" type="text"></td><td><select id="posStatus"><option value="Pending">Pending</option><option value="Accepted">Accepted</option><option value="Denied">Denied</option></select></td><td><input type="file" id="imageUpload" accept="image/*"></td><td><input id="notes" name="notes" type="text"></td>' + extraCols + '</tr>');

    // Attach listeners to the new row - get all customRows and pick the last one
    const allRows = document.querySelectorAll('.customRow');
    const newRow = allRows[allRows.length - 1];
    if (newRow) {
        attachRowListeners(newRow);
    }
})

// Delete column handlers
REinterviewStat.addEventListener("click", function(){
    darken.style.display = "none";
    REbox.style.display = "none";
    REinterviewStat.disabled = true;
    interviewStat.disabled = false;  // Re-enable add option
    hasInterviewStatus = false;

    // Remove interview status header
    const headers = document.querySelectorAll('#formHeader th[id="title"]');
    if (headers.length > 5) {
        headers[headers.length - 1].remove();
    }

    // Remove from custom rows
    const custRows = document.querySelectorAll('#customRows tr');
    custRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 5) {
            cells[cells.length - 1].remove();
        }
    });

    // Update tracking
    --colAmt;
    colInRow = colInRow.replace(/<td><select data-interview-status="true">.*?<\/select><\/td>/s, '');
});

REstartDate.addEventListener("click", function(){
    darken.style.display = "none";
    REbox.style.display = "none";
    REstartDate.disabled = true;
    startDate.disabled = false;  // Re-enable add option
    hasStartDate = false;

    // Remove start date header
    const headers = document.querySelectorAll('#formHeader th[id="title"]');
    if (headers.length > 5) {
        headers[headers.length - 1].remove();
    }

    // Remove from custom rows
    const custRows = document.querySelectorAll('#customRows tr');
    custRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 5) {
            cells[cells.length - 1].remove();
        }
    });

    // Update tracking
    --colAmt;
    colInRow = colInRow.replace(/<td><input type="date"><\/td>/s, '');
});

REemployType.addEventListener("click", function(){
    darken.style.display = "none";
    REbox.style.display = "none";
    REemployType.disabled = true;
    employType.disabled = false;  // Re-enable add option
    hasEmploymentType = false;

    // Remove employment type header
    const headers = document.querySelectorAll('#formHeader th[id="title"]');
    if (headers.length > 5) {
        headers[headers.length - 1].remove();
    }

    // Remove from custom rows
    const custRows = document.querySelectorAll('#customRows tr');
    custRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 5) {
            cells[cells.length - 1].remove();
        }
    });

    // Update tracking
    --colAmt;
    colInRow = colInRow.replace(/<td><select data-employment-type="true">.*?<\/select><\/td>/s, '');
});

// Delete row handler
rowDelete.addEventListener("click", async function(){
    const companyName = rowInput.value.trim();
    
    if (!companyName) {
        alert("Please enter a company name");
        return;
    }

    try {
        const response = await fetch('spreadsheet.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'deleteRow', CompanyName: companyName })
        });

        const data = await response.json();

        if (data.success) {
            // Remove rows with matching company name from DOM
            const custRows = document.querySelectorAll('#customRows tr');
            custRows.forEach(row => {
                const companyCell = row.querySelector('input[name="CompanyName"]');
                if (companyCell && companyCell.value === companyName) {
                    row.remove();
                }
            });

            // Check if there are no rows left - if so, add back the template row
            const remainingRows = document.querySelectorAll('#customRows tr.customRow');
            if (remainingRows.length === 0) {
                // Build template with current optional columns
                let extraCols = '';
                if (hasInterviewStatus) {
                    extraCols += '<td><select data-interview-status="true"><option value="Pending">Pending</option><option value="Passed">Passed</option><option value="Failed">Failed</option></select></td>';
                }
                if (hasStartDate) {
                    extraCols += '<td><input type="date"></td>';
                }
                if (hasEmploymentType) {
                    extraCols += '<td><select data-employment-type="true"><option value="fullTime">Full Time</option><option value="partTime">Part Time</option><option value="onCall">On Call</option><option value="temp">Temporary</option><option value="other">Other</option></select></td>';
                }

                const custRowsTable = document.querySelector('#customRows');
                const templateRow = `<tr class="customRow"><th id="countRow" scope="row"></th><td><input name="CompanyName" type="text" placeholder="Manual Entry"></td><td><input name="position" type="text"></td><td><select id="posStatus"><option value="Pending">Pending</option><option value="Accepted">Accepted</option><option value="Denied">Denied</option></select></td><td><input type="file" id="imageUpload" accept="image/*"></td><td><input id="notes" name="notes" type="text"></td>${extraCols}</tr>`;
                
                custRowsTable.insertAdjacentHTML('beforeend', templateRow);
                const newRow = custRowsTable.querySelector('tr:last-child');
                if (newRow) {
                    attachRowListeners(newRow);
                }
            }

            // Close the modal and clear input
            darken.style.display = "none";
            RERowbox.style.display = "none";
            rowInput.value = "";
        } else {
            alert("Error: " + (data.error || "Could not delete rows"));
        }
    } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting rows");
    }
});

// Reset table handler
resetTable.addEventListener("click", async function(){
    darken.style.display = "flex";
    resetBox.style.display = "flex";

    cancelReset.addEventListener("click", function(){
        darken.style.display = "none";
        resetBox.style.display = "none";
    })

    confirmReset.addEventListener("click", async function(){
        darken.style.display = "none";
        resetBox.style.display = "none";

        try {
        const response = await fetch('spreadsheet.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'reset' })
        });

        const data = await response.json();

        if (data.success) {
            // Remove all custom rows except the first one
            const custRows = document.querySelectorAll('#customRows tr.customRow');
            for (let i = 1; i < custRows.length; ++i) {
                custRows[i].remove();
            }

            // Clear the first row's inputs
            const firstRow = document.querySelector('#customRows tr.customRow');
            if (firstRow) {
                const inputs = firstRow.querySelectorAll('input[name="CompanyName"], input[name="position"], input[name="notes"], input[type="file"]');
                inputs.forEach(input => {
                    if (input.type === 'file') {
                        input.value = '';
                    } else {
                        input.value = '';
                    }
                });

                const selects = firstRow.querySelectorAll('select');
                selects.forEach(select => {
                    select.selectedIndex = 0;
                });
            }

            // Reset all column states and remove optional columns
            if (hasInterviewStatus) {
                hasInterviewStatus = false;
                interviewStat.disabled = false;
                REinterviewStat.disabled = true;
                const headers = document.querySelectorAll('#formHeader th[id="title"]');
                if (headers.length > 6) headers[headers.length - 1].remove();
                const custRows2 = document.querySelectorAll('#customRows tr');
                custRows2.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length > 5) cells[cells.length - 1].remove();
                });
                const blankRows = document.querySelectorAll('tbody.blanks tr');
                blankRows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length > 0) cells[cells.length - 1].remove();
                });
            }

            if (hasStartDate) {
                hasStartDate = false;
                startDate.disabled = false;
                REstartDate.disabled = true;
                const headers = document.querySelectorAll('#formHeader th[id="title"]');
                if (headers.length > 6) headers[headers.length - 1].remove();
                const custRows2 = document.querySelectorAll('#customRows tr');
                custRows2.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length > 5) cells[cells.length - 1].remove();
                });
                const blankRows = document.querySelectorAll('tbody.blanks tr');
                blankRows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length > 0) cells[cells.length - 1].remove();
                });
            }

            if (hasEmploymentType) {
                hasEmploymentType = false;
                employType.disabled = false;
                REemployType.disabled = true;
                const headers = document.querySelectorAll('#formHeader th[id="title"]');
                if (headers.length > 6) headers[headers.length - 1].remove();
                const custRows2 = document.querySelectorAll('#customRows tr');
                custRows2.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length > 5) cells[cells.length - 1].remove();
                });
                const blankRows = document.querySelectorAll('tbody.blanks tr');
                blankRows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length > 0) cells[cells.length - 1].remove();
                });
            }

            // Reset column tracking
            colAmt = 0;
            colInRow = '';

            
        } else {
            console.log("Error: " + (data.error || "Could not reset table"));
        }
    } catch (error) {
        console.error("Reset error:", error);
        console.log("Error resetting table");
    }


    })

});

const searchCompany = document.getElementById("search");

//When they click this option, it directs them to page to search for job position
searchCompany.addEventListener("click", function(){
    const newUrl = "searchPage.php";
    window.history.pushState({ path: newUrl }, '', newUrl);
    location.reload();
})

})
