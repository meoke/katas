/** 
Tennis
About this Kata

This Kata is about implementing a simple tennis game. I came up with it while thinking about Wii tennis, where they have simplified tennis, so each set is one game.

The scoring system is rather simple:

1. Each player can have either of these points in one game 0 15 30 40
2. If you have 40 and you win the ball you win the game, however there are special rules.
3. If both have 40 the players are deuce. 
a. If the game is in deuce, the winner of a ball will have advantage and game ball. 
b. If the player with advantage wins the ball he wins the game c. If the player without advantage wins they are back at deuce.

===== Alternate description of the rules per Wikipedia ( http://en.wikipedia.org/wiki/Tennis#Scoring ):

1. A game is won by the first player to have won at least four points in total and at least two points more than the opponent.
2. The running score of each game is described in a manner peculiar to tennis: scores from zero to three points are described as “love”, “fifteen”, “thirty”, and “forty” respectively.
3. If at least three points have been scored by each player, and the scores are equal, the score is “deuce”.
4. If at least three points have been scored by each side and a player has one more point than his opponent, the score of the game is “advantage” for the player in the lead.
*/

// 1.   string dot wyniku + description
// 2.OK testy game is over
// 3.OK testy player has advantage

const rules = {
    playersID: {
        unknown: 0,
        player1: 1,
        player2: 2,
    },
    scoreValues: {  
        love: 0,
        fifteen: 1,
        thirty: 2,
        forty: 3,
    },
    scoreNames: {  
        0: "love",
        1: "15",
        2: "30",
        3: "40",
    },
    getNextScoreValue: (scoreName) => {
        switch(scoreName){
            case rules.scoreValues.love:
                return rules.scoreValues.fifteen;
            case rules.scoreValues.fifteen:
                return rules.scoreValues.thirty;
            default:
                return rules.scoreValues.forty;
        }
    }
}

class GameScore{
    constructor() {
        this.scorePlayer1 = rules.scoreValues.love;
        this.scorePlayer2 = rules.scoreValues.love;
        this.advantage = rules.playersID.unknown;
        this.winner = rules.playersID.unknown;
    }

    getScoreDescription(){
        const gameState = (() => {
            if (this.winner !== rules.playersID.unknown){
                return ` ${this.getPlayerID(this.winner)} HAS WON!!!`
            }
            else if (this.advantage !== rules.playersID.unknown){
                return ` ${this.getPlayerID(this.winner)} IS IN ADVENTAGE!!!`
            }
            else{
                return ` Game in progress!`;
            }
        })();
        return `Player1: ${rules.scoreNames[this.scorePlayer1]}, Player2: ${rules.scoreNames[this.scorePlayer2]}.${gameState}`;
    }

    gameIsOver = () => this.winner !== rules.playersID.unknown;

    isDeuce = () => this.scorePlayer1 === this.scorePlayer2 && this.scorePlayer1 === rules.scoreValues.forty;

    playerHasAdvantage = playerID =>{
        const player = this.getScore(playerID);
        const oppositePlayer = this.getOppositeScore(playerID);
        return this.advantage == playerID || (player === rules.scoreValues.forty && player - oppositePlayer >= 2);
    };

    getScore = playerID => playerID == rules.playersID.player1 ? this.scorePlayer1 : this.scorePlayer2;
    
    getOppositeScore = playerID => playerID == rules.playersID.player1 ? this.scorePlayer2 : this.scorePlayer1;

    getPlayerID = playerID => playerID === rules.playersID.player1 ? "Player1" : "Player2";

    score = (pointWinnerID) => {
        let pointWinnerScore = this.getScore(pointWinnerID);
        if (this.playerHasAdvantage(pointWinnerID)){
            this.winner = pointWinnerID;
        }
        else if(this.isDeuce()){
            this.advantage === rules.playersID.unknown ?
                               this.advantage = pointWinnerID :
                               this.advantage = rules.playersID.unknown;
        }
        else{
            const nextScoreValue = rules.getNextScoreValue(pointWinnerScore);
            pointWinnerID == rules.playersID.player1 ? 
                             this.scorePlayer1 = nextScoreValue : 
                             this.scorePlayer2 = nextScoreValue;
        }
    }
}

class TennisGame{
    run(){
        let score = new GameScore();
        while(!score.gameIsOver()){
            const pointWinnerID = this.getPointWinner();
            score.score(pointWinnerID);
        }
        return score;
    }

    getPointWinner(){
        let rand = Math.random();
        return rand < 0.5 ? rules.playersID.player1 : rules.playersID.player2;
    }
}

// let tennisGame = new TennisGame();
// let gameScore = tennisGame.run();
// scoreDescription = gameScore.getScoreDescription();
// console.log(scoreDescription);

module.exports = {TennisGame: TennisGame, rules, GameScore};