/***************************************************************************************
*    Title: Project 2, DOM, Eventlisteners and Client Side Programming
*    Author: Prof. Liz Nelson, Whatcom Community College
*    Date: October 23. 2022
*    Code version: JavaScript
*    Availability: SD230 29146 Panapto Recordings https://whatcom.hosted.panopto.com/Panopto/Pages/Viewer.aspx?id=d03a7453-4102-4297-8fb8-af3a00e68f35
***************************************************************************************/


// function removeChoicesListeners(){
//     const choices = document.querySelectorAll('.choice');
//     choices.forEach(choice => {
//         choice.replaceWith(choice.cloneNode(true));
//     });
// }

let playerSelection;
let computerSelection;
let game = ["rock", "paper", "scissors"];

function initializeGame(){
    document.querySelector("#game-start")
        .addEventListener("click", () => {
            document.querySelector("#game-start").style.display = "none";
            document.querySelector("#button-group").appendChild(createNewElement("button", "play-hand", "Play Hand"));
            //Adding as a separate function so user can easily playAgain
            gamePlay();
        });
}

/*
This function accepts a string representing the type of element to add
a string representing the id of the new element
and a string indicating the text to add to the element
it returns a new element with an id and text
if the element is a button, it adds a class of 'play-button' to the element
*/

/***************************************************************************************
*    Title: Create <span> element, change its color and append to document - Javascript DOM HTML Element
*    Author: www.java2s.com
*    Date: 2016
*    Code version: javaScript
*    Availability: http://www.java2s.com/example/javascript/dom-html-element/create-span-element-change-its-color-and-append-to-document.html
***************************************************************************************/
function createNewElement(type, idText, text){
    let newElement = document.createElement(type);
    newElement.setAttribute("id", idText);
    newElement.textContent = text;

    if(type === "button"){
        newElement.classList.add('play-buttons');
    }
    return newElement;
}

//This function handles the gamePlay (turns on the ability to click choices and plays hand)
function gamePlay() {
    listenForChoice();
    playHand();
}

//This function creates event listeners for the choices
function listenForChoice(){
    const choices = document.querySelectorAll('.choice');

    choices.forEach((choice, i, arr) => {
        choice.addEventListener("mouseover", hoverMouse);
        choice.addEventListener("mouseleave", unhoverMouse);         
        choice.addEventListener("click", clickChoice);
    });
}

/***************************************************************************************
*    Title: Function identity in JavaScript, or how to remove event listeners properly
*    Author: Emanuel Tannert
*    Date: Jun 9, 2018
*    Code version: JavaScript
*    Availability: https://dev.to/smotchkkiss/function-identity-in-javascript-or-how-to-remove-event-listeners-properly-1ll3
***************************************************************************************/

//The following functions handle what happens when the choices are heard

//On Hover, Update h2 with the possible choice
function hoverMouse(event){
    let possibleChoice = event.target.parentElement.id;
    document.querySelector("h2").innerHTML = possibleChoice.charAt(0).toUpperCase() + possibleChoice.slice(1) + " . . . ";
}

//On Unhover, update h2 when mouse moves away from the possible choice
function unhoverMouse(){
    let headerTwoText
    //If the player has already made a selection, display the selection in h2
    if(playerSelection !== undefined){
        headerTwoText = `${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)} . . .`;
    } else {
    //Otherwise, return the h2 to the beginning text
        headerTwoText = "Rock, Paper, Scissors";
    }
    document.querySelector("h2").innerHTML = headerTwoText;
}

//On Click, set the playerSelection as the choice that was clicked and update the h2
function clickChoice (event){
        //Update color of previous selection to white
        if(playerSelection !== undefined){
            let prevChoice = document.getElementById(playerSelection).children;
            for (let item of prevChoice){
                item.style.color = "#FFFFFF";
            }
        }            
        //Update playerSelection
        playerSelection = event.target.parentElement.id;;
        //turn playerSelection to pink
        event.target.style.color = "#FE00B7";
    
        //Update h2 text
        let headerTwoText = `${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)} . . .`;
        document.querySelector("h2").innerHTML = headerTwoText;
}   


//This function plays the hand by doing the following:
//Remove the choice click listeners, generate the computer's choice, figure out the winner, and update the display
function playHand(){
    document.querySelector("#play-hand").addEventListener("click", () => {
        //If no choice has been made, prompt the user to make a choice
        if (playerSelection === undefined) {
            document.querySelector("h2").innerHTML = "You Must Select Rock, Paper, or Scissors";
        } else {
            //If a choice has been made:
            
            //Update button to play-again
            document.querySelector("#play-hand").style.display = "none";
            document.querySelector("#button-group").appendChild(createNewElement("button", "play-again", "Play Again"));
            
            
            //Remove eventHandlers:
                //choices is a list of the rock, paper, and scissors <div> elements
            const choices = document.querySelectorAll('.choice');
                //For each of these choices, remove the event listener
            choices.forEach((choice) => {
                choice.removeEventListener("mouseover", hoverMouse);
                choice.removeEventListener("mouseleave", unhoverMouse);
                choice.removeEventListener("click", clickChoice);
            });

            //Get computer selection
            computerSelection = Math.floor(Math.random() * 3);
            
            //If it's a tie, set the color of the icon to mixed and show draw message
            if(computerSelection === game.indexOf(playerSelection.toString())){         
                document.querySelector("h2").innerHTML = "Draw!";
                let computerIcon = document.getElementById(game[computerSelection]).children;
                for (let item of computerIcon){
                    item.classList.add("draw");
                }
            } else {
                //If it's not a draw, find the icon representing the computer's selection
                let computerIcon = document.getElementById(game[computerSelection]).children;
                //Update the icon's color to yellow
                for (let item of computerIcon){
                    item.style.color = "#D2FFAF";
                }
                //Update the h2 text to show the winner
                setFinalText();
            }

            //Choose to play again
            playAgain();
        }
    })
}

//This function updates h2 with the appropriate message
function setFinalText(){
    //Get the key for what results to show
    let playerVsComputer = `${playerSelection}_${game[computerSelection]}`;
    
    //This object holds the appropriate index of which text to display from the arrays holding the text choices below
    let results = {
        rock_scissors: {actionTextIndex: 0, winTextIndex: 0} , 
        scissors_paper: {actionTextIndex: 1, winTextIndex: 0}, 
        paper_rock: {actionTextIndex: 2, winTextIndex: 0}, 
        scissors_rock: {actionTextIndex: 0, winTextIndex: 1}, 
        paper_scissors: {actionTextIndex: 1, winTextIndex: 1}, 
        rock_paper: {actionTextIndex: 2, winTextIndex: 1}
    }
    //Arrays holding text choices
    let actionTextOptions = ["Rock crushes Scissors", "Scissors cut Paper", "Paper covers Rock"];
    let winTextOptions = ["You Win!", "You Lose!"]

    //Update h2 to display action text
    document.querySelector("h2").innerHTML = actionTextOptions[results[playerVsComputer].actionTextIndex];
    
    //Create a span element to hold the phrase "You Win!" or "You Lose!"
    let winPhrase = createNewElement("span", "results_header", winTextOptions[results[playerVsComputer].winTextIndex]);
    //Update the style of the span element to be pink and add padding
    winPhrase.style.color = "#FE00B7";
   
    /***************************************************************************************
    *    Title: W3Schools, Style paddingLeft Property
    *    Author: Refsnes Data
    *    Date: 1999-2022
    *    Code version: JavaScript
    *    Availability: https://www.w3schools.com/jsref/prop_style_paddingleft.asp
    ***************************************************************************************/
    winPhrase.style.paddingLeft = "15px";
    
    //Add the span element to h2
    document.querySelector("h2").appendChild(winPhrase);
}

//This function resets handles the user clicking the button to play again
function playAgain(){
    document.querySelector("#play-again").addEventListener("click", () => {
        
        //Remove the eventListener from the Play Hand button
        document.querySelector("#play-hand").replaceWith(document.querySelector("#play-hand").cloneNode(true));
        
        //Update the h2
        document.querySelector("h2").innerHTML = "Rock, Paper, Scissors";

        //Remove the play-again button from the document, because it's added again in the playHand function
        document.querySelector("#play-again").remove();
        
        //Display the Play Hand button again
        document.querySelector("#play-hand").style.display = '';

        //Turn each icon white again
        let choices = document.querySelectorAll(".choice");
        for(let choice of choices){
            for (let item of choice.children){
                item.style.color = "#FFFFFF";
                item.classList.remove("draw");
            }
        }
        
        //Reset the player and computer selections to undefined
        playerSelection = undefined;
        computerSelection = undefined;

        //Restart the game at gamePlay
        gamePlay();

    })
 };

 //this function starts the game
 initializeGame();

