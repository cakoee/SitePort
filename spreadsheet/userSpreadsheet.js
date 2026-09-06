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

addCol.addEventListener("click", function(){

    //Ask which column they want to add (Interview status, Start date, Employment type)

    darken.style.display = "flex";
    box.style.display = "flex";
})

cancel.addEventListener("click", function(){
        darken.style.display = "none";
        box.style.display = "none";
    })

    interviewStat.addEventListener("click", function(){
        darken.style.display = "none";
        box.style.display = "none";
        interviewStat.disabled = true;

        //Add interview status column
        //Add column header
        const cols = document.querySelectorAll('#title');
        const lastCol = cols[cols.length - 1];

        lastCol.insertAdjacentHTML('afterend', ' <th id = "title" scope="col"> Interview Status </th>' );

        //Add row column
        const custRows = document.querySelectorAll('table.customRows tr');

        for (i = 0; i < custRows.length; ++i){
            
            custRows[i].innerHTML = custRows[i].innerHTML + '<td> <select> <option value = "Pending"> Pending </option> <option value = "Passed"> Passed </option>  <option value = "Failed"> Failed </option> </select> </td>';
        }

        //Add blank row column
        const blankRows = document.querySelectorAll('tbody.blanks tr');

        for (i = 0; i < blankRows.length; ++i){
            
            blankRows[i].innerHTML = blankRows[i].innerHTML + '<td></td>';
        }

        //Number of extra columns user added upon initial columns
        ++colAmt;
        colInRow += '<td><select><option value="Pending">Pending</option><option value="Passed">Passed</option><option value="Failed">Failed</option></select></td>';        
    })

    startDate.addEventListener("click", function(){
        darken.style.display = "none";
        box.style.display = "none";
        startDate.disabled = true;

        //Add interview status column
        //Add column header
        const cols = document.querySelectorAll('#title');
        const lastCol = cols[cols.length - 1];

        lastCol.insertAdjacentHTML('afterend', ' <th id = "title" scope="col"> Start Date </th>' );

        //Add row column
        const custRows = document.querySelectorAll('table.customRows tr');

        for (i = 0; i < custRows.length; ++i){
            
            custRows[i].innerHTML = custRows[i].innerHTML + '<td> <input type = "date"> </td>';
        }

        //Add blank row column
        const blankRows = document.querySelectorAll('tbody.blanks tr');

        for (i = 0; i < blankRows.length; ++i){
            
            blankRows[i].innerHTML = blankRows[i].innerHTML + '<td></td>';
        }

        //Number of extra columns user added upon initial columns
        ++colAmt;
        colInRow += '<td><input type="date"></td>';
        
    })

    employType.addEventListener("click", function(){
        darken.style.display = "none";
        box.style.display = "none";
        employType.disabled = true;

        //Add interview status column
        //Add column header
        const cols = document.querySelectorAll('#title');
        const lastCol = cols[cols.length - 1];

        lastCol.insertAdjacentHTML('afterend', ' <th id = "title" scope="col"> Employment Type </th>' );

        //Add row column
        const custRows = document.querySelectorAll('table.customRows tr');

        for (i = 0; i < custRows.length; ++i){
            
            custRows[i].innerHTML = custRows[i].innerHTML + '<td><select> <option value = "fullTime"> Full Time </option> <option value = "partTime"> Part Time </option>  <option value = "onCall"> On Call </option> <option value = "temp"> Temporary </option> <option value = "other"> Other </option></select> </td>';
        }

        //Add blank row column
        const blankRows = document.querySelectorAll('tbody.blanks tr');

        for (i = 0; i < blankRows.length; ++i){
            
            blankRows[i].innerHTML = blankRows[i].innerHTML + '<td></td>';
        }

        //Number of extra columns user added upon initial columns
        ++colAmt;
        colInRow += '<td><select><option value="fullTime">Full Time</option><option value="partTime">Part Time</option><option value="onCall">On Call</option><option value="temp">Temporary</option><option value="other">Other</option></select></td>';
        
    })

const addRow = document.getElementById("addRow");

addRow.addEventListener("click", function(){

    if (colAmt > 0){

            //Add new row with extra column(s)
    const lastRow = document.querySelector('.customRow');

        lastRow.insertAdjacentHTML('afterend', '<tr class = "customRow" id = "customRow">                     <th id = "countRow" scope="row"></th>                     <td>                         <input name = "companyName" type = "text" placeholder = "Enter Here">                     </td>                     <td>                         <input name = "position" type = "text" >                     </td>                     <td>                         <select id = "posStatus">                             <option value = "Pending">Pending</option>                             <option value = "Accepted">Accepted</option>                             <option value = "Denied">Denied</option>                         </select>                     </td>                     <td>                         <input type="file" id="imageUpload" accept="image/*">                     </td>                     <td>                         <input id = "notes" name = "notes" type = "text" >                     </td>' + colInRow + '</tr>');

    } else{
            //Add new row
    const lastRow = document.querySelector('.customRow');

        lastRow.insertAdjacentHTML('afterend', '<tr class = "customRow" id = "customRow">                     <th id = "countRow" scope="row"></th>                     <td>                         <input name = "companyName" type = "text" placeholder = "Enter Here">                     </td>                     <td>                         <input name = "position" type = "text" >                     </td>                     <td>                         <select id = "posStatus">                             <option value = "Pending">Pending</option>                             <option value = "Accepted">Accepted</option>                             <option value = "Denied">Denied</option>                         </select>                     </td>                     <td>                         <input type="file" id="imageUpload" accept="image/*">                     </td>                     <td>                         <input id = "notes" name = "notes" type = "text" >                     </td> </tr>');
    }




})

})