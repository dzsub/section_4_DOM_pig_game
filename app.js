
/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var query = document.querySelector.bind(document);
var queryAll = document.querySelectorAll.bind(document);
var fromId = document.getElementById.bind(document);
var fromClass = document.getElementsByClassName.bind(document);
var fromTag = document.getElementsByTagName.bind(document);
var scores, roundScore, activePlayer, gamePlaying, prevDiceScore, prevDice2Score, winningScore;

Init();

query(".btn-set").onclick = function Set()
{
    var input = query("#winInput").value;
    if (input && input >= 1)
    {
        winningScore = input;
    }
    else
    {
        winningScore = 100;
    }
}

query(".btn-roll").addEventListener("click", function() 
{
    if(gamePlaying)
    {
        // random number between 1 and 6
        var dice = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);

        // Display the result
        var diceDOM = query(".dice");
        var dice2DOM = query(".dice-2");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";
        dice2DOM.style.display = "block";
        dice2DOM.src = "dice-" + dice2 + ".png";
        
        // Update the round score IF the rolled number was NOT a 1 or two sixes in a row
        if ((prevDiceScore === 6 || prevDice2Score === 6) && (dice === 6 || dice2 === 6))
        {
            scores[activePlayer] = 0;
            query("#score-" + activePlayer).textContent = scores[activePlayer];
            NextPlayer();
        }
        else if (dice !== 1 && dice2 !== 1)
        {
            // Add score
            roundScore += dice + dice2;
            fromId("current-" + activePlayer).textContent = roundScore;
        } 
        else
        {    
            NextPlayer();
        }
        prevDiceScore = dice;
        prevDice2Score = dice2;
    }
});

query(".btn-hold").addEventListener("click", function() 
{
    if (gamePlaying)
    {
        // Add current score to global score
        scores[activePlayer] += roundScore;
        // Update the UI
        query("#score-" + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        if (scores[activePlayer] >= winningScore )
        {
            query(".player-" + activePlayer + "-panel").classList.add("winner");
            query(".player-" + activePlayer + "-panel").classList.remove("active");
            query("#name-" + activePlayer).textContent = "WINNER";
            query(".dice").style.display = "none";
            gamePlaying = false;
        }
        else
        {
            // Next player
            NextPlayer();
        }
    }
});

function NextPlayer()
{
    // Next player
    roundScore = 0;
    prevDiceScore = 0;
    prevDice2Score = 0;
    fromId("current-" + activePlayer).textContent = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // Active highlight
    query(".player-0-panel").classList.toggle("active");
    query(".player-1-panel").classList.toggle("active");

}

query(".btn-new").addEventListener("click", Init);

function Init()
{
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    prevDiceScore = 0;
    prevDice2Score = 0;
    winningScore = 100; // basic winning score
    gamePlaying = true;

    query(".dice").style.display = "none";
    query(".dice-2").style.display = "none";
    fromId("score-0").textContent = "0";
    fromId("score-1").textContent = "0";
    fromId("current-0").textContent = "0";
    fromId("current-1").textContent = "0";
    fromId("name-0").textContent = "PLAYER 1";
    fromId("name-1").textContent = "PLAYER 2";
    query(".player-0-panel").classList.remove("winner");
    query(".player-1-panel").classList.remove("winner");
    query(".player-0-panel").classList.remove("active");
    query(".player-1-panel").classList.remove("active");
    query(".player-0-panel").classList.add("active");
    query(".btn-roll").style.display = "block";
    query(".btn-hold").style.display = "block";
}

































