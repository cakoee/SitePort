window.addEventListener("load",function(e){
    const reload = this.document.getElementById("spin");
    const img1 = this.document.getElementById("slot1");
    const img2 = this.document.getElementById("slot2");
    const img3 = this.document.getElementById("slot3");
    const result = this.document.getElementById("result");
    const cash = this.document.getElementById("cash");
    const bet = this.document.getElementById("bet");
    reload.addEventListener("click", function(e){
        if(bet.value<1) {
            bet.value = "";
            bet.setAttribute("placeholder", "invalid");
            return;
        }
        fetch("./slotsLogic.php?bet="+bet.value)
        .then(response => response.json())
        .then(success);
        function success(response){
            console.log(response["result"]);
            if(response["result"]=="-1"){
            img1.setAttribute("src","");
            img2.setAttribute("src","");
            img3.setAttribute("src", "");
                result.innerHTML = "invalid bet.";
                return;
            }
            img1.setAttribute("src","images/"+response["num1"]+".png");
            img2.setAttribute("src","images/"+response["num2"]+".png");
            img3.setAttribute("src", "images/"+response["num3"]+".png");
            cash.innerHTML = "$" +response["money"];
            if(response["result"]=="0"){
                if(response["money"]>0){
                    result.innerHTML = "Nothing.";
                }else{
                    result.innerHTML = "LOSE. Reload to try again";
                }
            }else if(response["result"]=="1"){
                result.innerHTML = "Won $"+ response["change"];
            }else if(response["result"]=="2"){
                result.innerHTML = "Jackpot, you won $"+ response["change"];
            }
        }
    })
});