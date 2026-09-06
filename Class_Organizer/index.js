window.addEventListener("load", function(e){

    e.preventDefault; 

//Load local storage for exam date input boxes & announcement
//Calculate exam dates for each course (if length < 0, switch to next closest exam date)
//Change inner HTML
//Save to local storage

//Add task buttons
const addTask1 = document.getElementById("button1");
const addTask2 = document.getElementById("button2");
const addTask3 = document.getElementById("button3");
const addTask4 = document.getElementById("button4");
const addTask5 = document.getElementById("button5");

//Grab each class to add tasks to
const class1 = document.getElementById("classTasks1");
const class2 = document.getElementById("classTasks2");
const class3 = document.getElementById("classTasks3");
const class4 = document.getElementById("classTasks4");
const class5 = document.getElementById("classTasks5");

//Check Mark Button ID's for each task (for each course) so that they can be removed when clicked
let class1CheckID = 0;
let class2CheckID = 0;
let class3CheckID = 0;
let class4CheckID = 0;
let class5CheckID = 0;

//Grab each courses exam announcment section 
const examCount1 = document.getElementById("examCounter1");
const examCount2 = document.getElementById("examCounter2");
const examCount3 = document.getElementById("examCounter3");
const examCount4 = document.getElementById("examCounter4");
const examCount5 = document.getElementById("examCounter5");

//Grab each courses right icon
const dateButton1 = document.getElementById("setDate1");
const dateButton2 = document.getElementById("setDate2");
const dateButton3 = document.getElementById("setDate3");
const dateButton4 = document.getElementById("setDate4");
const dateButton5 = document.getElementById("setDate5");


//--- Local Storage ---

    //Change checkmark size for certain amount of tasks
    function buttonSize(course){

        const courseList =  JSON.parse(localStorage.getItem(course));
        const taskAmount = courseList.length;

        if ( taskAmount > 6){
            //ehhhh add this feature later if u wannntt idkkk
        }

    }

    // Local Storage helpers
    const taskStorageKeys = {
        class1: "class1Tasks",
        class2: "class2Tasks",
        class3: "class3Tasks",
        class4: "class4Tasks",
        class5: "class5Tasks"
    };

    //Function: Grab every existing task from course 1-5 as array
    function getSavedTasks(storageKey) {
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
            //If local storage empty, return empty array
            return Array.isArray(saved) ? saved : [];
        } catch (error) {
            return [];
        }
    }

    //Function: Save every new task from course 1-5
    function saveTasks(storageKey, tasks) {
        localStorage.setItem(storageKey, JSON.stringify(tasks));
    }

    //Function: Make new unique ID for each task HTML
    function makeTaskMarkup(taskId) {
        return ' <div id = "task" data-task-id="' + taskId + '"> <div id = "inputContainer"> <input type = "text" id = "taskInput" placeholder = "♡"> <input type = "text" id = "dueDateInput" placeholder = " dd/mm "></div> <div class = "checkMark" id = "' + taskId + '"></div> </div>';
    }

    //Function: Join together all task divs to one HTML & load to page
    function renderStoredTasks(container, storageKey) {
        const tasks = getSavedTasks(storageKey);
        //Replaces HTML with joined html strings returned from each item in tasks
        container.innerHTML = tasks.map(task => task.html).join("");
    }


    function addTaskToCourse(container, button, storageKey, idTracker) {
        //Generate new task ID 
        const taskId = storageKey + "-" + Date.now() + "-" + Math.random().toString(16).slice(2, 8);
        const newTask = { id: taskId, html: makeTaskMarkup(taskId), taskName: "", dueDate: "", };

        const tasks = getSavedTasks(storageKey);
        tasks.unshift(newTask);
        saveTasks(storageKey, tasks);

        container.insertAdjacentHTML("afterbegin", newTask.html);
        idTracker++;

        button.classList.toggle("shrink");
        setTimeout(() => {
            button.classList.toggle("shrink");
        }, 500);

        return idTracker;
        
    }

    function deleteTaskFromCourse(container, storageKey, taskId) {
        const tasks = getSavedTasks(storageKey).filter(task => task.id !== taskId);
        saveTasks(storageKey, tasks);
    }


    //Update task input box content for every user update
    document.addEventListener("input", (event) => {
        const taskInput = event.target.closest("#taskInput");
        const dueDateInput = event.target.closest("#dueDateInput");

        if (!taskInput && !dueDateInput) return;

        const taskDiv = (taskInput || dueDateInput).closest("#task");
        if (!taskDiv) return;

        const taskId = taskDiv.dataset.taskId;
        const containerId = taskDiv.closest(".classTasks")?.id;
        const storageKey =
            containerId === "classTasks1" ? "class1Tasks" :
            containerId === "classTasks2" ? "class2Tasks" :
            containerId === "classTasks3" ? "class3Tasks" :
            containerId === "classTasks4" ? "class4Tasks" :
            "class5Tasks";

        const tasks = getSavedTasks(storageKey);
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) return;

        if (taskInput) {
            tasks[taskIndex].taskName = taskInput.value;
        }

        if (dueDateInput) {
            tasks[taskIndex].dueDate = dueDateInput.value;
        }

        saveTasks(storageKey, tasks);

        
});


    // Load saved tasks on page load
    renderStoredTasks(class1, taskStorageKeys.class1);
    renderStoredTasks(class2, taskStorageKeys.class2);
    renderStoredTasks(class3, taskStorageKeys.class3);
    renderStoredTasks(class4, taskStorageKeys.class4);
    renderStoredTasks(class5, taskStorageKeys.class5);

    //Load saved text on page load
    function renderStoredTasks(container, storageKey) {
        const tasks = getSavedTasks(storageKey);
        container.innerHTML = tasks.map(task => {
            return `
            <div id="task" data-task-id="${task.id}">
                <div id="inputContainer">
                <input type="text" id="taskInput" value="${task.taskName || "♡"}">
                <input type="text" id="dueDateInput" value="${task.dueDate || "dd/mm"}">
                </div>
                <div class="checkMark" id="${task.id}"></div>
            </div>
            `;
        }).join("");
    }   

// --- Exam Dates ---

//  -- Subtract 1 From Each Countdown Every New Day --
    // -- Course 1 Announcement --

    function daysApart(date){

        const localDate = new Date();
        const today = localDate.toLocaleDateString();

        const todaysDate = new Date(today);
        const examDate = new Date(date);

        const dateDiff = examDate - todaysDate;
        const daysUntilExam = Math.trunc(dateDiff/(1000 * 60 * 60 * 24));

        return daysUntilExam;

    }

    //Exam 1
    const input00 = JSON.parse(localStorage.getItem('input00'));

    //If exam 1 has not passed yet
    if (input00){

        //Calculate how many days until date from today
        const daysUntilExam = daysApart(input00);

        if (daysUntilExam === 1){
            examCount1.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!"  ;
        } else if (daysUntilExam > 0) {
            examCount1.innerHTML = "Next exam: " + daysUntilExam + " days";
            }
    }

    //Exam 2
    const input01 = JSON.parse(localStorage.getItem('input01'));

    if (input00 && input01){

        const exam1 = daysApart(input00);
        const exam2 = daysApart(input01);

        if (exam1 < 0 ){

            if(exam2 === 1){
            examCount1.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!" ;
            }

            if(exam2 > 1){
            examCount1.innerHTML = "Next exam: " + exam2 + " days";
            }

            if(exam2 < 0){
            }

        } 

    }

    //Exam 3
    const input02 = JSON.parse(localStorage.getItem('input02'));

    if (input00 && input01 && input02){

        const exam1 = daysApart(input00);
        const exam2 = daysApart(input01);
        const exam3 = daysApart(input02);

        if (exam1 < 0 && exam2 < 0 && exam3 > 0){
            examCount1.innerHTML = "Next exam: " + exam3 + " days";
        } 

        if (exam3 === 1){
            examCount1.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!" ;
        } 

        if (exam3 < 0){
            
        } 

    } 


    // -- Course 2 Announcement --

    //Exam 1
    const input10 = JSON.parse(localStorage.getItem('input10'));

    //If exam 1 has not passed yet
    if (input10){

        //Calculate how many days until date from today
        const daysUntilExam = daysApart(input10);

        if (daysUntilExam === 1){
            examCount2.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!"  ;
        } else if (daysUntilExam > 0) {
            examCount2.innerHTML = "Next exam: " + daysUntilExam + " days";
            }
    }

    //Exam 2
    const input11 = JSON.parse(localStorage.getItem('input11'));

    if (input10 && input11){

        const exam1 = daysApart(input10);
        const exam2 = daysApart(input11);

        if (exam1 < 0 ){

            if(exam2 === 1){
            examCount2.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!" ;
            }

            if(exam2 > 1){
            examCount2.innerHTML = "Next exam: " + exam2 + " days";
            }

            if(exam2 < 0){
            }

        }

    }

    //Exam 3
    const input12 = JSON.parse(localStorage.getItem('input12'));

    if (input10 && input11 && input12){

        const exam1 = daysApart(input10);
        const exam2 = daysApart(input11);
        const exam3 = daysApart(input12);

        if (exam1 < 0 && exam2 < 0 && exam3 > 0){
            examCount2.innerHTML = "Next exam: " + exam3 + " days";
        } 

        if (exam3 === 1){
            examCount2.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!" ;
        } 

        if (exam3 < 0){
            
        } 

    } 

    // -- Course 3 Announcement --

    //Exam 1
    const input20 = JSON.parse(localStorage.getItem('input20'));

    //If exam 1 has not passed yet
    if (input20){

        //Calculate how many days until date from today
        const daysUntilExam = daysApart(input20);

        if (daysUntilExam === 1){
            examCount3.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!"  ;
        } else if (daysUntilExam > 0) {
            examCount3.innerHTML = "Next exam: " + daysUntilExam + " days";
            }
    }

    //Exam 2
    const input21 = JSON.parse(localStorage.getItem('input21'));

    if (input20 && input21){

        const exam1 = daysApart(input20);
        const exam2 = daysApart(input21);

        if (exam1 < 0 ){

            if(exam2 === 1){
            examCount3.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!" ;
            }

            if(exam2 > 1){
            examCount3.innerHTML = "Next exam: " + exam2 + " days";
            }

            if(exam2 < 0){
            }

        } 

    }

    //Exam 3
    const input22 = JSON.parse(localStorage.getItem('input22'));

    if (input20 && input21 && input22){

        const exam1 = daysApart(input20);
        const exam2 = daysApart(input21);
        const exam3 = daysApart(input22);

        if (exam1 < 0 && exam2 < 0 && exam3 > 0){
            examCount3.innerHTML = "Next exam: " + exam3 + " days";
        } 

        if (exam3 === 1){
            examCount3.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!" ;
        } 

        if (exam3 < 0){
        } 

    }

    // -- Course 4 Announcement --

    //Exam 1
    const input30 = JSON.parse(localStorage.getItem('input30'));

    //If exam 1 has not passed yet
    if (input30){

        //Calculate how many days until date from today
        const daysUntilExam = daysApart(input30);

        if (daysUntilExam === 1){
            examCount4.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!"  ;
        } else if (daysUntilExam > 0) {
            examCount4.innerHTML = "Next exam: " + daysUntilExam + " days";
            }
    }

    //Exam 2
    const input31 = JSON.parse(localStorage.getItem('input31'));

    if (input30 && input31){

        const exam1 = daysApart(input30);
        const exam2 = daysApart(input31);

        if (exam1 < 0 ){

            if(exam2 === 1){
            examCount4.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!" ;
            }

            if(exam2 > 1){
            examCount4.innerHTML = "Next exam: " + exam2 + " days";
            }

            if(exam2 < 0){
            }

        } 

    }

    //Exam 3
    const input32 = JSON.parse(localStorage.getItem('input32'));

    if (input30 && input31 && input32){

        const exam1 = daysApart(input30);
        const exam2 = daysApart(input31);
        const exam3 = daysApart(input32);

        if (exam1 < 0 && exam2 < 0 && exam3 > 0){
            examCount4.innerHTML = "Next exam: " + exam3 + " days";
        } 

        if (exam3 === 1){
            examCount4.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!" ;
        } 

        if (exam3 < 0){
        } 

    } ;

    // -- Course 5 Announcement --

    //Exam 1
    const input40 = JSON.parse(localStorage.getItem('input40'));

    //If exam 1 has not passed yet
    if (input40){

        //Calculate how many days until date from today
        const daysUntilExam = daysApart(input40);

        if (daysUntilExam === 1){
            examCount5.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!"  ;
        } else if (daysUntilExam > 0) {
            examCount5.innerHTML = "Next exam: " + daysUntilExam + " days";
            }
    }

    //Exam 2
    const input41 = JSON.parse(localStorage.getItem('input41'));

    if (input40 && input41){

        const exam1 = daysApart(input40);
        const exam2 = daysApart(input41);

        if (exam1 < 0 ){

            if(exam2 === 1){
            examCount5.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!" ;
            }

            if(exam2 > 1){
            examCount5.innerHTML = "Next exam: " + exam2 + " days";
            }

            if(exam2 < 0){
            }

        } 

    }

    //Exam 3
    const input42 = JSON.parse(localStorage.getItem('input42'));

    if (input40 && input41 && input42){

        const exam1 = daysApart(input40);
        const exam2 = daysApart(input41);
        const exam3 = daysApart(input42);

        if (exam1 < 0 && exam2 < 0 && exam3 > 0){
            examCount5.innerHTML = "Next exam: " + exam3 + " days";
        } 

        if (exam3 === 1){
            examCount5.innerHTML = "Next exam: Tomorrow (｡ᵕ◞ _◟)!" ;
        } 

        if (exam3 < 0){
        } 

    } 

//  -- Save Date Input For Each Box --

    //Event listener for EXAM 1 date value 
    document.addEventListener("input", (event) => {
        const dateBox = event.target.closest("#date1");

        //If null
        if (!dateBox) return;
        
        const dateValue = dateBox.value;
        const localDate = new Date();
        const today = localDate.toLocaleDateString();

        const examDate = new Date(dateValue);
        const todaysDate = new Date(today);

        const dateDiff = Math.abs(examDate - todaysDate);
        const daysUntilExam = dateDiff/(1000 * 60 * 60 * 24);

        //Save date box input & countdown innerHTML to local storage

        //Pull course1Exams from local storage

        const greatGrandparent = dateBox.parentElement.parentElement.parentElement.id;

        //save exam 1 countdown for each respective course to local storage
        if ( greatGrandparent === "bubble1"){

            //date[course][exam]
            this.localStorage.setItem('date00', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input00', JSON.stringify(examDate));

            //To grab -> const date00 = JSON.parse(localstorage.getItem('date00'));
            const date00 = JSON.parse(localStorage.getItem('date00'));
            
        }

        if ( greatGrandparent === "bubble2"){

            //date[course][exam]
            this.localStorage.setItem('date10', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input10', JSON.stringify(examDate));

            const date10 = JSON.parse(localStorage.getItem('date10'));
            
        }
        
        if ( greatGrandparent === "bubble3"){

            //date[course][exam]
            this.localStorage.setItem('date20', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input20', JSON.stringify(examDate));

            const date20 = JSON.parse(localStorage.getItem('date20'));
        }

        if ( greatGrandparent === "bubble4"){

            //date[course][exam]
            this.localStorage.setItem('date30', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input30', JSON.stringify(examDate));

            const date30 = JSON.parse(localStorage.getItem('date30'));
        }

        if ( greatGrandparent === "bubble5"){

            //date[course][exam]
            this.localStorage.setItem('date40', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input40', JSON.stringify(examDate));

            const date40 = JSON.parse(localStorage.getItem('date40'));
        }


    }); 

    //Event listener for EXAM 2 date value 
    document.addEventListener("input", (event) => {
        const dateBox = event.target.closest("#date2");

        //If null
        if (!dateBox) return;
        
        const dateValue = dateBox.value;
        const localDate = new Date();
        const today = localDate.toLocaleDateString();

        const examDate = new Date(dateValue);
        const todaysDate = new Date(today);

        const dateDiff = Math.abs(examDate - todaysDate);
        const daysUntilExam = dateDiff/(1000 * 60 * 60 * 24);

        //Save date box input & countdown innerHTML to local storage

        const greatGrandparent = dateBox.parentElement.parentElement.parentElement.id;

        //save exam countdown for each respective course to local storage
        if ( greatGrandparent === "bubble1"){

            //date[course][exam]
            this.localStorage.setItem('date01', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input01', JSON.stringify(examDate));

            const date01 = JSON.parse(localStorage.getItem('date01'));
        }

        if ( greatGrandparent === "bubble2"){

            //date[course][exam]
            this.localStorage.setItem('date11', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input11', JSON.stringify(examDate));

            const date11 = JSON.parse(localStorage.getItem('date11'));
        }
        
        if ( greatGrandparent === "bubble3"){

            //date[course][exam]
            this.localStorage.setItem('date21', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input21', JSON.stringify(examDate));

            const date21 = JSON.parse(localStorage.getItem('date21'));
        }

        if ( greatGrandparent === "bubble4"){

            //date[course][exam]
            this.localStorage.setItem('date31', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input31', JSON.stringify(examDate));

            const date31 = JSON.parse(localStorage.getItem('date31'));
        }

        if ( greatGrandparent === "bubble5"){

            //date[course][exam]
            this.localStorage.setItem('date41', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input41', JSON.stringify(examDate));

            const date41 = JSON.parse(localStorage.getItem('date41'));
        }


    }); 

    //Event listener for EXAM 3 date value 
    document.addEventListener("input", (event) => {
        const dateBox = event.target.closest("#date3");

        //If null
        if (!dateBox) return;
        
        const dateValue = dateBox.value;
        const localDate = new Date();
        const today = localDate.toLocaleDateString();

        const examDate = new Date(dateValue);
        const todaysDate = new Date(today);

        const dateDiff = Math.abs(examDate - todaysDate);
        const daysUntilExam = dateDiff/(1000 * 60 * 60 * 24);

        //Save date box input & countdown innerHTML to local storage

        const greatGrandparent = dateBox.parentElement.parentElement.parentElement.id;

        //save exam countdown for each respective course to local storage
        if ( greatGrandparent === "bubble1"){

            //date[course][exam]
            this.localStorage.setItem('date02', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input02', JSON.stringify(examDate));

            const date02 = JSON.parse(localStorage.getItem('date02'));
        }

        if ( greatGrandparent === "bubble2"){

            //date[course][exam]
            this.localStorage.setItem('date12', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input12', JSON.stringify(examDate));

            const date12 = JSON.parse(localStorage.getItem('date12'));
        }
        
        if ( greatGrandparent === "bubble3"){

            //date[course][exam]
            this.localStorage.setItem('date22', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input22', JSON.stringify(examDate));

            const date22 = JSON.parse(localStorage.getItem('date22'));
        }

        if ( greatGrandparent === "bubble4"){

            //date[course][exam]
            this.localStorage.setItem('date32', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input32', JSON.stringify(examDate));

            const date32 = JSON.parse(localStorage.getItem('date32'));
        }

        if ( greatGrandparent === "bubble5"){

            //date[course][exam]
            this.localStorage.setItem('date42', JSON.stringify(daysUntilExam));
            this.localStorage.setItem('input42', JSON.stringify(examDate));

            const date42 = JSON.parse(localStorage.getItem('date42'));
        }


    }); 

// -------------------

// --- Course 1 ---

    addTask1.addEventListener("click", function(){
        class1CheckID = addTaskToCourse(class1, addTask1, taskStorageKeys.class1, class1CheckID);
    })

    //Pop up exam date selector when clicked
    dateButton1.addEventListener("click", function(){

        const bubble1 = document.getElementById("bubble1");

        if (bubble1.style.display !== "flex"){
            bubble1.style.display = "flex";
            bubble1.classList.toggle("slideUp");
        } else {
            bubble1.classList.toggle("slideUp");

            bubble1.classList.toggle("fade-out-short");
                setTimeout(function(){
                    bubble1.style.display = "none";
                    bubble1.classList.toggle("fade-out-short");
                }, 300);
        };

        dateButton1.classList.toggle("shrink");
        setTimeout(function(){
                dateButton1.classList.toggle("shrink");
                }, 500);

    });
    

    class1.addEventListener("click", function(e){
        if (e.target.classList.contains("checkMark")){
            const taskDiv = e.target.closest("#task");
            const taskId = taskDiv ? taskDiv.dataset.taskId : e.target.id;

            if (taskDiv) {
                taskDiv.classList.toggle("fade-out");
                e.target.classList.toggle("shrink");
                setTimeout(function(){
                    taskDiv.remove();
                    deleteTaskFromCourse(class1, taskStorageKeys.class1, taskId);
                }, 400);
            }
        }
    })

// --- Course 2 ---

    addTask2.addEventListener("click", function(){
        class2CheckID = addTaskToCourse(class2, addTask2, taskStorageKeys.class2, class2CheckID);
    })

    //Pop up exam date selector when clicked
    dateButton2.addEventListener("click", function(){

        const bubble2 = document.getElementById("bubble2");

        if (bubble2.style.display !== "flex"){
            bubble2.style.display = "flex";
            bubble2.classList.toggle("slideUp");
        } else {
            bubble2.classList.toggle("slideUp");

            bubble2.classList.toggle("fade-out-short");
                setTimeout(function(){
                    bubble2.style.display = "none";
                    bubble2.classList.toggle("fade-out-short");
                }, 300);
        };

        dateButton2.classList.toggle("shrink");
        setTimeout(function(){
                dateButton2.classList.toggle("shrink");
                }, 500);

    });

    class2.addEventListener("click", function(e){
        if (e.target.classList.contains("checkMark")){
            const taskDiv = e.target.closest("#task");
            const taskId = taskDiv ? taskDiv.dataset.taskId : e.target.id;

            if (taskDiv) {
                taskDiv.classList.toggle("fade-out");
                e.target.classList.toggle("shrink");
                setTimeout(function(){
                    taskDiv.remove();
                    deleteTaskFromCourse(class2, taskStorageKeys.class2, taskId);
                }, 300);
            }
        }
    })

// --- Course 3 ---

    addTask3.addEventListener("click", function(){
        class3CheckID = addTaskToCourse(class3, addTask3, taskStorageKeys.class3, class3CheckID);
    })

    //Pop up exam date selector when clicked
    dateButton3.addEventListener("click", function(){

        const bubble3 = document.getElementById("bubble3");

        if (bubble3.style.display !== "flex"){
            bubble3.style.display = "flex";
            bubble3.classList.toggle("slideUp");
        } else {
            bubble3.classList.toggle("slideUp");

            bubble3.classList.toggle("fade-out-short");
                setTimeout(function(){
                    bubble3.style.display = "none";
                    bubble3.classList.toggle("fade-out-short");
                }, 300);
        };

        dateButton3.classList.toggle("shrink");
        setTimeout(function(){
                dateButton3.classList.toggle("shrink");
                }, 500);

    });

    class3.addEventListener("click", function(e){
        if (e.target.classList.contains("checkMark")){
            const taskDiv = e.target.closest("#task");
            const taskId = taskDiv ? taskDiv.dataset.taskId : e.target.id;

            if (taskDiv) {
                taskDiv.classList.toggle("fade-out");
                e.target.classList.toggle("shrink");
                setTimeout(function(){
                    taskDiv.remove();
                    deleteTaskFromCourse(class3, taskStorageKeys.class3, taskId);
                }, 300);
            }
        }
    })

// --- Course 4 ---

    addTask4.addEventListener("click", function(){
        class4CheckID = addTaskToCourse(class4, addTask4, taskStorageKeys.class4, class4CheckID);
    })

    //Pop up exam date selector when clicked
    dateButton4.addEventListener("click", function(){

        const bubble4 = document.getElementById("bubble4");

        if (bubble4.style.display !== "flex"){
            bubble4.style.display = "flex";
            bubble4.classList.toggle("slideUp");
        } else {
            bubble4.classList.toggle("slideUp");

            bubble4.classList.toggle("fade-out-short");
                setTimeout(function(){
                    bubble4.style.display = "none";
                    bubble4.classList.toggle("fade-out-short");
                }, 300);
        };

        dateButton4.classList.toggle("shrink");
        setTimeout(function(){
                dateButton4.classList.toggle("shrink");
                }, 500);

    });

    class4.addEventListener("click", function(e){
        if (e.target.classList.contains("checkMark")){
            const taskDiv = e.target.closest("#task");
            const taskId = taskDiv ? taskDiv.dataset.taskId : e.target.id;

            if (taskDiv) {
                taskDiv.classList.toggle("fade-out");
                e.target.classList.toggle("shrink");
                setTimeout(function(){
                    taskDiv.remove();
                    deleteTaskFromCourse(class4, taskStorageKeys.class4, taskId);
                }, 300);
            }
        }
    })

// --- Course 5 ---

    addTask5.addEventListener("click", function(){
        class5CheckID = addTaskToCourse(class5, addTask5, taskStorageKeys.class5, class5CheckID);
    })

    //Pop up exam date selector when clicked
    dateButton5.addEventListener("click", function(){

        const bubble5 = document.getElementById("bubble5");

        if (bubble5.style.display !== "flex"){
            bubble5.style.display = "flex";
            bubble5.classList.toggle("slideUp");
        } else {
            bubble5.classList.toggle("slideUp");

            bubble5.classList.toggle("fade-out-short");
                setTimeout(function(){
                    bubble5.style.display = "none";
                    bubble5.classList.toggle("fade-out-short");
                }, 300);
        };

        dateButton5.classList.toggle("shrink");
        setTimeout(function(){
                dateButton5.classList.toggle("shrink");
                }, 500);

    });

    class5.addEventListener("click", function(e){
        if (e.target.classList.contains("checkMark")){
            const taskDiv = e.target.closest("#task");
            const taskId = taskDiv ? taskDiv.dataset.taskId : e.target.id;

            if (taskDiv) {
                taskDiv.classList.toggle("fade-out");
                e.target.classList.toggle("shrink");
                setTimeout(function(){
                    taskDiv.remove();
                    deleteTaskFromCourse(class5, taskStorageKeys.class5, taskId);
                }, 300);
            }
        }
    })

})