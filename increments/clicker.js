/*
* Names: Brayden Scott, Dee Liberman
* Date: February 4, 2026
*/
score = 0;
clicks = 0;
clickValue = 1;
/*
*Updates the value per click based on purchased upgrades
*Also checks to see if any achievement conditions are met
*/
function updateValue(){
    clickValue = 1 + 0.2*upgrades[0] + 2.5*upgrades[2] + 25*upgrades[4];
    document.getElementById("clickField").textContent = `+${Number(clickValue).toFixed(1)} per click!`;

    //Lollipops and rainbows, you have achieved greatness! goons everywhere tremble at the sight of your accomplishments. 
    if(upgrades[0]>=1 && !gotten3){ //if you have 1 or more of upgrade 1, and the achievement hasnt been gotten, gives you the achievement
        ach3.classList.remove("achievement-popup");
        ach3.classList.add("achievement-popup");
            ach3.style.display = "flex";
            badge3.classList.remove("hide");
            gotten3 = true; //these handle making the achievement visible.
            setTimeout(()=>{//handles the animation, making it slide up then fade.
                ach3.classList.add("achievement-fade")
                setTimeout(()=>{
                    ach3.style.display = "none";
                }, 2000);
            }, 3000);
    }
    if(upgrades[4]>=1 && !gotten8){//As all achievements use same logic, commenting again is redundant.
        ach8.classList.remove("achievement-popup");
        ach8.classList.add("achievement-popup");
            ach8.style.display = "flex";
            badge8.classList.remove("hide");
            gotten8 = true;
            setTimeout(()=>{
                ach8.classList.add("achievement-fade")
                setTimeout(()=>{
                    ach8.style.display = "none";
                }, 2000);
            }, 3000);
    }

    //Sniff the flowers 
    if(upgrades[2]>=3 && !gotten6){
        ach6.classList.remove("achievement-popup");
        ach6.classList.add("achievement-popup");
            ach6.style.display = "flex";
            badge6.classList.remove("hide");
            gotten6 = true;
            setTimeout(()=>{
                ach6.classList.add("achievement-fade")
                setTimeout(()=>{
                    ach6.style.display = "none";
                }, 2000);
            }, 3000);
    }

    if(upgrades[3]>=3 && !gotten7){
        ach7.classList.remove("achievement-popup");
        ach7.classList.add("achievement-popup");
            ach7.style.display = "flex";
            badge7.classList.remove("hide");
            gotten7 = true;
            setTimeout(()=>{
                ach7.classList.add("achievement-fade")
                setTimeout(()=>{
                    ach7.style.display = "none";
                }, 2000);
            }, 3000);
    }



    //You are a gem among stones, a shining example of dedication and perseverance. Your hard work and determination have paid off, and you are now reaping the rewards of your efforts. May your journey continue to be filled with success and achievement, and may you inspire others to reach for the stars as well. Congratulations on this incredible accomplishment!
    if(upgrades[1]>=5 && !gotten4){
        ach4.classList.remove("achievement-popup");
        ach4.classList.add("achievement-popup");
            ach4.style.display = "flex";
            badge4.classList.remove("hide");
            gotten4 = true;
            setTimeout(()=>{
                ach4.classList.add("achievement-fade")
                setTimeout(()=>{
                    ach4.style.display = "none";
                }, 2000);
            }, 3000);
    }

}
/*
* Updates score for the "gain x score per second" upgrades.
* Functionally the same as just doing setinterval, but is less prone to errors during quick call times
*/
function clockLoop(){
    setTimeout(()=>{
        updateScore(upgrades[1]/10.0);
        clockLoop();
    }, 100);
}

document.addEventListener("DOMContentLoaded", (event) => {
    upgrades = [0,0,0,0,0]; //an array containing the amounts of each upgrade owned
    gotten1 = false;//variables stating if achievement x has been obtained
    gotten2 = false;
    gotten3 = false;
    gotten4 = false;
    gotten5 = false;
    gotten6 = false;
    gotten7 = false;
    gotten8 = false;
    gotten9 = false
    gotten10 = false;
    gotten11= false;
    clockLoopID = 0;//for saving interval ID for the automatic click function

    badge1 = document.getElementById("badge1");//Stores all achievement badges as variables
    badge2 = document.getElementById("badge2");
    badge3 = document.getElementById("badge3");
    badge4 = document.getElementById("badge4");
    badge5 = document.getElementById("badge5");
    badge6 = document.getElementById("badge6");
    badge7 = document.getElementById("badge7");
    badge8 = document.getElementById("badge8");
    badge9 = document.getElementById("badge9");
    badge10 = document.getElementById("badge10");
    badge11 = document.getElementById("badge11");
    upgBtn1 = document.getElementById("upgrade1"); //Saves upgrade buttons as variables
    upgBtn2 = document.getElementById("upgrade2");
    upgBtn3 = document.getElementById("upgrade3");
    upgBtn4 = document.getElementById("upgrade4");
    upgBtn5 = document.getElementById("upgrade5");
    button = document.getElementById("button"); //Saves the points button
    upg1Cost = 15;//Base costs for all upgrades
    upg2Cost = 75;
    upg3Cost = 500;
    upg4Cost = 1200;
    upg5Cost = 6000;
    scoreField = document.getElementById("scoreField");//Saves the field used to hold current score
    ach1 = document.getElementById("achievement1");//Saves achievement popups as variables
    ach2 = document.getElementById("achievement2");
    ach3 = document.getElementById("achievement3");
    ach4 = document.getElementById("achievement4");
    ach5 = document.getElementById("achievement5");
    ach6 = document.getElementById("achievement6");
    ach7 = document.getElementById("achievement7");
    ach8 = document.getElementById("achievement8");
    ach9 = document.getElementById("achievement9");
    ach10 = document.getElementById("achievement10");
    ach11= document.getElementById("achievement11");
    popup = document.getElementById("popup");//The popup area meant for handling achievement animations.
    help = document.getElementById("help"); //Help button
    helpBox = document.getElementById("helpBoxID"); //Help box that appears when the help button is clicked
    exitBox = document.getElementById("exitBox"); //Exit button for the help box
    darken = document.getElementById("darken"); //Exit button for the help box

helpBox.style.visibility = "hidden";  //Make sure help box is hidden on page load
darken.style.visibility = "hidden";  //Make sure help box is hidden on page load

help.addEventListener("click", function(){ //When user clicks help button
   // helpBox.classList.remove("hide"); //Make the help box visible
    helpBox.style.visibility = "visible";  
    darken.style.visibility = "visible";  
    }
);

exitBox.addEventListener("click", function(){ //When user clicks help button
    //helpBox.classList.add("hide"); //Make the help box visible
    helpBox.style.visibility = "hidden"; 
    darken.style.visibility = "hidden";  
    }
);

//Button 1 hover and click animation
upgBtn1.addEventListener('mouseenter', () => {
  upgBtn1.style.transition = 'transform 0.9s ease';
  upgBtn1.style.transform = 'scale(0.97)';
});

upgBtn1.addEventListener('click', () => {
  upgBtn1.style.transition = 'transform 0.09s ease ';
  upgBtn1.style.transform = 'scale(0.95)';
  setTimeout(()=>{
    upgBtn1.style.transition = 'transform 0.09s ease ';
    upgBtn1.style.transform = 'scale(0.97)';
    }, 90);
});

upgBtn1.addEventListener('mouseleave', () => {
  upgBtn1.style.transform = 'scale(1)';
});
//Button 1 hover and click animation

//Button 2 hover and click animation
upgBtn2.addEventListener('mouseenter', () => {
  upgBtn2.style.transition = 'transform 0.9s ease';
  upgBtn2.style.transform = 'scale(0.97)';
});

upgBtn2.addEventListener('click', () => {
  upgBtn2.style.transition = 'transform 0.09s ease ';
  upgBtn2.style.transform = 'scale(0.95)';
  setTimeout(()=>{
    upgBtn2.style.transition = 'transform 0.09s ease ';
    upgBtn2.style.transform = 'scale(0.97)';
    }, 90);
});

upgBtn2.addEventListener('mouseleave', () => {
  upgBtn2.style.transform = 'scale(1)';
});
//Button 2 hover and click animation

//Button 3 hover and click animation
upgBtn3.addEventListener('mouseenter', () => {
  upgBtn3.style.transition = 'transform 0.9s ease';
  upgBtn3.style.transform = 'scale(0.97)';
});

upgBtn3.addEventListener('click', () => {
  upgBtn3.style.transition = 'transform 0.09s ease ';
  upgBtn3.style.transform = 'scale(0.95)';
  setTimeout(()=>{
    upgBtn3.style.transition = 'transform 0.09s ease ';
    upgBtn3.style.transform = 'scale(0.97)';
    }, 90);
});

upgBtn3.addEventListener('mouseleave', () => {
  upgBtn3.style.transform = 'scale(1)';
});
//Button 3 hover and click animation

//Button 4 hover and click animation
upgBtn4.addEventListener('mouseenter', () => {
  upgBtn4.style.transition = 'transform 0.9s ease';
  upgBtn4.style.transform = 'scale(0.97)';
});

upgBtn4.addEventListener('click', () => {
  upgBtn4.style.transition = 'transform 0.09s ease ';
  upgBtn4.style.transform = 'scale(0.95)';
  setTimeout(()=>{
    upgBtn4.style.transition = 'transform 0.09s ease ';
    upgBtn4.style.transform = 'scale(0.97)';
    }, 90);
});

upgBtn4.addEventListener('mouseleave', () => {
  upgBtn4.style.transform = 'scale(1)';
});
//Button 4 hover and click animation

//Button 5 hover and click animation
upgBtn5.addEventListener('mouseenter', () => {
  upgBtn5.style.transition = 'transform 0.9s ease';
  upgBtn5.style.transform = 'scale(0.97)';
});

upgBtn5.addEventListener('click', () => {
  upgBtn5.style.transition = 'transform 0.09s ease ';
  upgBtn5.style.transform = 'scale(0.95)';
  setTimeout(()=>{
    upgBtn5.style.transition = 'transform 0.09s ease ';
    upgBtn5.style.transform = 'scale(0.97)';
    }, 90);
});

upgBtn5.addEventListener('mouseleave', () => {
  upgBtn5.style.transform = 'scale(1)';
});
//Button 5 hover and click animation




    function clockLoop(){
    setTimeout(()=>{
        updateScore(upgrades[1]/10);
        clockLoop();
    }, 100);
}
    clockLoop();
    /*
    *Updates the score, and handles achievement checks/
    * @param {Value} the number to modify score by
    */
    function updateScore(value = 0){

        popup.classList.remove("achievement-popup");
        score += value;
        scoreField.textContent = ""+ (Math.floor(score));


        //Billions must smile upon you, for you have achieved the impossible. You have reached 20000 points, a feat that many can only dream of. Your dedication and perseverance have paid off, and you are now among the elite few who have reached this milestone. May your journey continue to be filled with success and achievement, and may you inspire others to reach for the stars as well. Congratulations on this incredible accomplishment!
        if (score >= 20000 && badge1.classList.contains("hide")&&!gotten1){
            ach1.classList.add("achievement-popup");
            ach1.style.display = "flex";
            badge1.classList.remove("hide");
            gotten1 = true;
            setTimeout(()=>{
                ach1.classList.add("achievement-fade")
                setTimeout(()=>{
                    ach1.style.display = "none";
                }, 2000);
            }, 3000);
        }


        //Lighten up the world with your brilliance! You have reached 500 points, a milestone that is a testament to your hard work and dedication. Your efforts have paid off, and you are now among the elite few who have achieved this incredible feat. May your journey continue to be filled with success and achievement, and may you inspire others to reach for the stars as well. Congratulations on this amazing accomplishment!
        if (score >= 50 && badge2.classList.contains("hide")&&!gotten2){
            gotten2=true;
            ach2.classList.add("achievement-popup");
            ach2.style.display = "flex";
            badge2.classList.remove("hide");
            setTimeout(()=>{
                ach2.classList.add("achievement-fade")
                setTimeout(()=>{
                    ach2.style.display = "none";
                }, 2000);
            }, 3000);
        }
        if(clicks >= 500 && !gotten9){
                ach9.style.display = "flex";
                ach9.classList.remove("achievement-popup");
                ach9.classList.add("achievement-popup");
                badge9.classList.remove("hide");
                gotten9 = true;
                setTimeout(()=>{
                    ach9.classList.remove("achievement-fadein");
                    ach9.classList.add("achievement-fade")
                    setTimeout(()=>{
                        ach9.style.display = "none";
                    }, 2000);
                }, 3000);
        }

        //
        if(clicks >= 100 && !gotten5){
                ach5.style.display = "flex";
                ach5.classList.remove("achievement-popup");
                ach5.classList.add("achievement-popup");
                badge5.classList.remove("hide");
                gotten5 = true;
                setTimeout(()=>{
                    ach5.classList.add("achievement-fade")
                    setTimeout(()=>{
                        ach5.style.display = "none";
                    }, 2000);
                }, 3000);
          }

    }
    
    updateScore(0);//Calling updateScore(0) makes sure all displayed info is up to date, without modifying score
    button.addEventListener("click", function(event){
        clicks++;//Adds to clicks, necessary for some achievements
        updateScore(clickValue);//Modifies score based on how much a click is currently worth
        button.style.animation = "durr-bounce 2s";//Makes the click button move to give click feedback
        animationEnd = setTimeout(function(){
            button.style.animation = "";
        },  150);
    })
    upgBtn1.addEventListener("click", function(event){//When the upgrade button is clicked,
        if (score >= upg1Cost){//if the user can afford the upgrade
            updateScore(upg1Cost*-1);//Removes the upgrades price from player balance
            upg1Cost = Math.round(upg1Cost * 1.3);//Exponentially increases the cost of the upgrade
            upgrades[0] ++;
            upgBtn1.children[1].children[0].textContent = `Cost : ${upg1Cost}`;//Updates displayed info to match the purchased upgrade
            upgBtn1.children[1].children[1].textContent = `Owned : ${upgrades[0]}`;
            updateValue();//Updates onscreen values
        }
    })
    upgBtn2.addEventListener("click", function(event){//Same logic as other buttons
        if (score >= upg2Cost){
            updateScore(upg2Cost*-1);
            upg2Cost = Math.round(upg2Cost * 1.2);
            upgrades[1] ++;
            upgBtn2.children[1].children[0].textContent = `Cost : ${upg2Cost}`;
            upgBtn2.children[1].children[1].textContent = `Owned : ${upgrades[1]}`;
            document.getElementById("passiveField").textContent = `+${(1*upgrades[1])} per second!`;
            updateValue();
        }
    })

    upgBtn3.addEventListener("click", function(event){//Same logic as other buttons
        if (score >= upg3Cost){
            updateScore(upg3Cost*-1);
            upg3Cost = Math.round(upg3Cost * 1.175);
            upgrades[2] ++;
            upgBtn3.children[1].children[0].textContent = `Cost : ${upg3Cost}`;
            upgBtn3.children[1].children[1].textContent = `Owned : ${upgrades[2]}`;
            updateValue();
        }
    })
    upgBtn4.addEventListener("click", function(event){//Mostly same logic/
        if (score >= upg4Cost){
            updateScore(upg4Cost*-1);
            upg4Cost = Math.round(upg4Cost * 1.15);
            upgrades[3] ++;
            upgBtn4.children[1].children[0].textContent = `Cost : ${upg4Cost}`;
            upgBtn4.children[1].children[1].textContent = `Owned : ${upgrades[3]}`;
            document.getElementById("automaticField").textContent = `${upgrades[3]} clicks per second!`;
            //checks if a previous autoclicking loop is active, if so, stops it, 
            if(clockLoopID != 0){
                clearInterval(clockLoopID);
            }
            clockLoopID = setInterval(function(){//Then creates a new autoclicking loop, with the delay based on the amount of this upgrade purchased
                updateScore(clickValue);
                button.style.animation = "durr-bounce 2s";
                animationEnd = setTimeout(function(){
                    button.style.animation = "";
            },  150);
            },1000/upgrades[3]);
        }
    })
    upgBtn5.addEventListener("click", function(event){//Same logic as other buttons
        if (score >= upg5Cost){
            updateScore(upg5Cost*-1);
            upg5Cost = Math.round(upg5Cost * 1.1);
            upgrades[4] ++;
            upgBtn5.children[1].children[0].textContent = `Cost : ${upg5Cost}`;
            upgBtn5.children[1].children[1].textContent = `Owned : ${upgrades[4]}`;
            updateValue();
        }
    })


})




