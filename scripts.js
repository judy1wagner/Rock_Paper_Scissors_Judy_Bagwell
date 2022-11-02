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
        if (playerSelection === undefined) {
            document.querySelector("h2").innerHTML = "You Must Select Rock, Paper, or Scissors";
        } else {
            //update button
            document.querySelector("#play-hand").style.display = "none";
            document.querySelector("#button-group").appendChild(createNewElement("button", "play-again", "Play Again"));
        
            //TODO: Remove event listeners

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
                let computerIcon = document.getElementById(game[computerSelection]).children;
                for (let item of computerIcon){
                    item.style.color = "#D2FFAF";
                }
                setFinalText();
            }
            playAgain();
            }
    })
}

//updates h2 with the appropriate message
function setFinalText(){
    let playerVsComputer = `${playerSelection}_${game[computerSelection]}`;
    let results = {
        rock_scissors: {actionTextIndex: 0, winTextIndex: 0} , 
        scissors_paper: {actionTextIndex: 1, winTextIndex: 0}, 
        paper_rock: {actionTextIndex: 2, winTextIndex: 0}, 
        scissors_rock: {actionTextIndex: 0, winTextIndex: 1}, 
        paper_scissors: {actionTextIndex: 1, winTextIndex: 1}, 
        rock_paper: {actionTextIndex: 2, winTextIndex: 1}
    }
    let actionTextOptions = ["Rock crushes Scissors", "Scissors cut Paper", "Paper covers Rock"];
    let winTextOptions = ["You Win!", "You Lose!"]

    document.querySelector("h2").innerHTML = actionTextOptions[results[playerVsComputer].actionTextIndex];
    let winPhrase = createNewElement("span", "results_header", winTextOptions[results[playerVsComputer].winTextIndex]);
    winPhrase.style.color = "#FE00B7";

    //TODO: https://www.w3schools.com/jsref/prop_style_paddingleft.asp
    winPhrase.style.paddingLeft = "15px";
    document.querySelector("h2").appendChild(winPhrase);
}

//this function accepts a string representing the id of a new button and a string indicating the text to display on the button
//it returns a new button element
function createNewElement(type, idText, text){
    let newElement = document.createElement(type);
    newElement.setAttribute("id", idText);
    newElement.textContent = text;
    if(type === "button"){
        newElement.classList.add('play-buttons');
    }

    return newElement;
}

function listenForChoice(){

    let headerTwoText = "Rock, Paper, Scissors";
    const choices = document.querySelectorAll('.choice');
    
    choices.forEach((choice, i, arr) => {

        choice.addEventListener("mouseover", hoverMouse);

        choice.addEventListener("mouseleave", function unhoverMouse(){
            document.querySelector("h2").innerHTML = headerTwoText;
        })         

        choice.addEventListener("click", function clickChoice (e){    
            //this if statement turns the previous choice back to white
            //TODO: https://stackoverflow.com/questions/24639493/gather-divs-and-perform-css-on-them-htmlcollection-vs-array
            if(playerSelection !== undefined){
                let prevChoice = document.getElementById(playerSelection).children;
                for (let item of prevChoice){
                    item.style.color = "#FFFFFF";
                }
            }            
            playerSelection = arr[i].id;
            e.target.style.color = "#FE00B7";
            headerTwoText = `${playerSelection.charAt(0).toUpperCase() + playerSelection.slice(1)} . . .`;
            document.querySelector("h2").innerHTML = headerTwoText;
        })
    });
}

/*
TODO: https://dev.to/smotchkkiss/function-identity-in-javascript-or-how-to-remove-event-listeners-properly-1ll3
*/
function hoverMouse(event){
    let possibleChoice = event.target.parentElement.id;
    document.querySelector("h2").innerHTML = possibleChoice.charAt(0).toUpperCase() + possibleChoice.slice(1) + " . . . ";
}


/*
https://www.freecodecamp.org/news/refresh-the-page-in-javascript-js-reload-window-tutorial/#:~:text=You%20can%20use%20the%20location,method%20responsible%20for%20page%20reloading.
*/

function playAgain(){
    document.querySelector("#play-again").addEventListener("click", () => {
        document.location.reload();
    })
 };

 initializeGame();

