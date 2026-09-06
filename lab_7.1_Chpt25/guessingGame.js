

window.addEventListener("load", function() {

    // ------------------------ Game Logic ------------------------


    let newRound = false; //Variable to track if new game is needed
    prevLoad = false;

    class GuessingGame{

        constructor(randomNum, guesses){
            this.randomNum = randomNum;
            this.guesses = guesses;
        } //Variables for game

        guess(userInput){
            newRound = false; //Resets newRound to false for if user started new game where it was set to true initially.
                              // This is so newGuess() doesn't pass through a new random number thinking we are starting new round.
            this.guesses ++;


            if (this.guesses >= 10 ){ //Checks for if guess limit is reached
                alert("Reached maximum amount of guesses (10). New number generated. Try again. ");
                newRound = true; //Start new game

            } else{

                // -- Save progress Start --

                //Turn current constructor fields to object
                const progress = { randomNum: this.randomNum, guesses: this.guesses};

                //Convert constructors to string within local storage field called "Progress"
                localStorage.setItem('Progress', JSON.stringify(progress));

                //Check local storage "Progress" field with string representation of GuessingGame constructors
                console.log("Current save: ", localStorage);
                // -- Save progress End --

                //Compare user's guess to current number
                if (userInput == this.randomNum){
                    alert("Correct. Number: " + this.randomNum)
                    alert("Game ended. New random number generated.")
                    newRound = true;
                }

                else if (userInput < this.randomNum){
                    alert("Incorrect. Guess too small.")
                }

                else{
                    alert("Incorrect. Guess too large.")
                }

                //Keep track of current random number and guesses
                console.log("num:" + this.randomNum);
                console.log("guess:" + this.guesses);


            }

        }

    } //Class ends


    // ------------------------ Local Storage Load Past State --------------------

    let newGame = new GuessingGame(Math.floor(Math.random()*1000+1), 0); //Turning class to object variable on page load

    if (localStorage.Progress) {


        prevLoad = true; //newGuess() will assign GuessingGame constructors to local storage fields

        newRandomNum = JSON.parse(localStorage.Progress).randomNum;
        newGuesses = JSON.parse(localStorage.Progress).guesses;


    } else{
        console.log("No previous local storage.");
    }

    newGuess() //Allow for user input to initiate input/progress into game function

    // --------------- New Game or Retry Current Game ---------------


    function newGuess(){

        document.getElementById("submit").addEventListener("click", function(){

            userInput = document.getElementById("guessBox").value //Grab user guess

            userInput = (userInput/1) //In case of string input, convert "num" to num

            if (Number.isInteger(userInput) && newRound === false){ //If input is int

                if (prevLoad === true){ //If past GuessingGame constructors exist already

                    newGame = new GuessingGame(newRandomNum, newGuesses); //New newGame object variable for GuessingGame with past constructor variables in local storage
                    prevLoad = false;
                    newGame.guess(userInput) //Send int through game that compares their guess to previous randomNum and continue with the amount of guesses from last time

                } else { //If there is no previous local storage or new round starts

                    newGame.guess(userInput) //Send int through game with current set constructors generated on page load
                }
            }

            else if (Number.isInteger(userInput) && newRound === true)  {
                newGame = new GuessingGame(Math.floor(Math.random()*1000+1), 0); //Start new game with new random number and reset total guess count
                newGame.guess(userInput) //Send int through game

            }

            else{ //If input isn't a number
                alert("Invalid Input. Must be an integer.")
                newGuess(); //Re ask for input
            }

        }) //End of event listener
    } //End of newGuess()


})