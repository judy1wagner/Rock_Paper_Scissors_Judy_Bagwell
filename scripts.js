let playerSelection;
let computerSelection;
let game = ["rock", "paper", "scissors"];

function initializeGame(){
    document.querySelector("#game-start")
        .addEventListener("click", () => {
            document.querySelector("#game-start").style.display = "none";
            document.querySelector("#button-group").appendChild(createNewElement("button", "play-hand", "Play Hand"));
            listenForChoice();
            playHand();
        });
}

function playHand(){
    document.querySelector("#play-hand").addEventListener("click", () => {
        //if no choice has been made, prompt the user to make a choice
        if (playerSelection === undefined) {
            document.querySelector("h2").innerHTML = "You Must Select Rock, Paper, or Scissors";
        } else {
        //if a choice has been made, play the hand
            //update button to play-again
            document.querySelector("#play-hand").style.display = "none";
            document.querySelector("#button-group").appendChild(createNewElement("button", "play-again", "Play Again"));
            
            //remove eventHandlers
            const choices = document.querySelectorAll('.choice');
            choices.forEach((choice) => {
                choice.removeEventListener("mouseover", hoverMouse);
                choice.removeEventListener("mouseleave", unhoverMouse);
                choice.removeEventListener("click", clickChoice);
            });

            //get computer selection
            computerSelection = Math.floor(Math.random() * 3);
            
            //if it's a tie, set the color of the icon to mixed
            //and show draw message
            if(computerSelection === game.indexOf(playerSelection.toString())){
                document.querySelector("h2").innerHTML = "Draw!";
                let computerIcon = document.getElementById(game[computerSelection]).children;
                for (let item of computerIcon){
                    item.classList.add("draw");
                }
            } else {
            //if it's not a draw, do this
                //find the icon representing the computer's selection
                let computerIcon = document.getElementById(game[computerSelection]).children;
                //update the icon's color to yellow
                for (let item of computerIcon){
                    item.style.color = "#D2FFAF";
                }
                //update the text to show the winner
                setFinalText();
            }

            //choose to play again
            playAgain();
        }
    })
}

//updates h2 with the appropriate message
function setFinalText(){
    //get the key for what results to show
    let playerVsComputer = `${playerSelection}_${game[computerSelection]}`;
    
    //object holds the appropriate index of which text to display from
    //the arrays holding the text choices
    let results = {
        rock_scissors: {actionTextIndex: 0, winTextIndex: 0} , 
        scissors_paper: {actionTextIndex: 1, winTextIndex: 0}, 
        paper_rock: {actionTextIndex: 2, winTextIndex: 0}, 
        scissors_rock: {actionTextIndex: 0, winTextIndex: 1}, 
        paper_scissors: {actionTextIndex: 1, winTextIndex: 1}, 
        rock_paper: {actionTextIndex: 2, winTextIndex: 1}
    }
    //here are the arrays holding the text choices
    let actionTextOptions = ["Rock crushes Scissors", "Scissors cut Paper", "Paper covers Rock"];
    let winTextOptions = ["You Win!", "You Lose!"]

    //update h2 to show the action text
    document.querySelector("h2").innerHTML = actionTextOptions[results[playerVsComputer].actionTextIndex];
    
    //create a span element to hold the phrase "You Win!" or "You Lose!"
    let winPhrase = createNewElement("span", "results_header", winTextOptions[results[playerVsComputer].winTextIndex]);
    //update the style of the span element
    winPhrase.style.color = "#FE00B7";
    //TODO: https://www.w3schools.com/jsref/prop_style_paddingleft.asp
    winPhrase.style.paddingLeft = "15px";
    
    //add the span element to h2
    document.querySelector("h2").appendChild(winPhrase);
}

//this function accepts a string representing the type of element to add
//a string representing the id of the new element
// and a string indicating the text to add to the element
//it returns a new element with an id and text
//if the element is a button, it adds a class of 'play-button' to the element
/*
TODO: http://www.java2s.com/example/javascript/dom-html-element/create-span-element-change-its-color-and-append-to-document.html
*/
function createNewElement(type, idText, text){
    let newElement = document.createElement(type);
    newElement.setAttribute("id", idText);
    newElement.textContent = text;

    if(type === "button"){
        newElement.classList.add('play-buttons');
    }
    return newElement;
}

//this function creates event listeners to the choices
function listenForChoice(){
    const choices = document.querySelectorAll('.choice');

    choices.forEach((choice, i, arr) => {
        choice.addEventListener("mouseover", hoverMouse);
        choice.addEventListener("mouseleave", unhoverMouse);         
        choice.addEventListener("click", clickChoice);
    });
}

/*
TODO: https://dev.to/smotchkkiss/function-identity-in-javascript-or-how-to-remove-event-listeners-properly-1ll3
*/

//the following functions handle what happens when the choices are heard

//update h2 when mouse hovers over choice
function hoverMouse(event){
    let possibleChoice = event.target.parentElement.id;
    document.querySelector("h2").innerHTML = possibleChoice.charAt(0).toUpperCase() + possibleChoice.slice(1) + " . . . ";
}

//update h2 when mouse moves from the choice
function unhoverMouse(){
    let headerTwoText
    //if the player has already made a selection, display the selection in h2
    if(playerSelection !== undefined){
        headerTwoText = `${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)} . . .`;
    } else {
    //otherwise, return the h2 to the beginning text
        headerTwoText = "Rock, Paper, Scissors";
    }
        document.querySelector("h2").innerHTML = headerTwoText;
}

//set the playerSelection as the choice that was clicked 
//and update the h2
function clickChoice (event){
        //update color of previous selection to white
        if(playerSelection !== undefined){
            let prevChoice = document.getElementById(playerSelection).children;
            for (let item of prevChoice){
                item.style.color = "#FFFFFF";
            }
        }            
        //update playerSelection
        playerSelection = event.target.parentElement.id;;
        //turn playerSelection to pink
        event.target.style.color = "#FE00B7";
    
        //update h2 text
        let headerTwoText = `${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)} . . .`;
        document.querySelector("h2").innerHTML = headerTwoText;
}            

/*
https://www.freecodecamp.org/news/refresh-the-page-in-javascript-js-reload-window-tutorial/#:~:text=You%20can%20use%20the%20location,method%20responsible%20for%20page%20reloading.
*/

//this function just reloads the page if the player wants to play again
function playAgain(){
    document.querySelector("#play-again").addEventListener("click", () => {
        document.location.reload();
    })
 };

 //this function starts the game
 initializeGame();

