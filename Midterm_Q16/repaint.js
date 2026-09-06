window.addEventListener("load", function(event){

    const node = document.getElementById("foo"); //Grab div

    node.addEventListener("click", function(){ //When user clicks div

        const nc = document.getElementById("nc"); //Grab input button
        const nc_color = nc.value; //set color to set color from user input of type "color" to global variable to use elsewhere

        node.style.backgroundColor = nc_color; //Change background color

        setTimeout( function ncColor() {

            nc.style.color = nc_color; //change color to user input

        }
        , 2000); //Happens 2 seconds after div changed color

    });






})