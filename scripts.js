let playerSelection;

function initializeGame(){
    document.querySelector("#game-start")
        .addEventListener("click", () => {
            document.querySelector("#game-start").style.display = "none";
            document.querySelector("#button-group").appendChild(createButton("play-hand", "Play Hand"));
            listenForChoice();
            playHand();
            
        });
}

function playHand(){
    document.querySelector("#play-hand").addEventListener("click", () => {
        if (playerSelection === undefined) {

        } else {
            document.querySelector("#play-hand").style.display = "none";
            document.querySelector("#button-group").appendChild(createButton("play-again", "Play Again"));
        }
    })
}

//this function accepts a string representing the id of a new button and a string indicating the text to display on the button
//it returns a new button element
function createButton(idText, text){
    let newButton = document.createElement('button');
    newButton.setAttribute("id", idText);
    newButton.textContent = text;
    newButton.classList.add('play-buttons');

    return newButton;
}

function listenForChoice(){

    let headerTwoText = "Rock, Paper, Scissors";
    const choices = document.querySelectorAll('.choice');
    
    choices.forEach((choice, i, arr) => {

        choice.addEventListener("mouseover", () => {
            document.querySelector("h2").innerHTML = (`${arr[i].id.charAt(0).toUpperCase() + arr[i].id.slice(1)} . . .`);
        })

        choice.addEventListener("mouseleave", () => {
            document.querySelector("h2").innerHTML = headerTwoText;
        })         

        choice.addEventListener("click", (e) => {    
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

initializeGame();