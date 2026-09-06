window.addEventListener("load",function(){
    form = document.getElementById("form");
    min = document.getElementById("min")
    max = document.getElementById("max")
    statusF = document.getElementById("status");
    form.addEventListener('submit', function(e){
    if(min.value == "" || max.value == ""){
        e.preventDefault();
        statusF.innerHTML = "Blank Field(s)";
    } else if(Number(minField.value) > Number(maxField.value)){
        e.preventDefault();
        statusF.innerHTML = "Invalid Range";
    }
});

});