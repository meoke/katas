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

const playersID = {
    player1: 0,
    player2: 1,
}

class GameScore{
    constructor() {
        this.scores = [0, 0];
    }

    getScoreName(points){
        const scoreNames = {  0: 'love',
                        1: '15',
                        2: '30',
                        3: '40'
                    }
        if (points in scoreNames)
                    return scoreNames[points];
        return String(points);
    }

    getScoreDescription(){
        const descriptionIntro = (() => {
            const winnerID = this.scores.indexOf(Math.max(...this.scores));
            const looserID = this.scores.indexOf(Math.min(...this.scores));
            const scoreDiff = this.scores[winnerID] - this.scores[looserID];
            let descriptionIntro = '';
            if (scoreDiff === 1){
                return `Adventage for Player${winnerID+1}.\t`
            }
            else if(scoreDiff >= 2 && this.scores[winnerID] >=4 ){
                return `The winner is Player${winnerID+1}.\t`
            }
            return "";
        })();
    
        const score1 = this.getScoreName(this.scores[playersID.player1]);
        const score2 = this.getScoreName(this.scores[playersID.player2]);
        return `${descriptionIntro}Player1: ${score1}, Player2: ${score2}.`
    }

    gameIsOver = () => {
        const maxScore = Math.max(...this.scores);
        return maxScore >= 4 && (maxScore - Math.min(...this.scores)) >= 2;
    };

    score = (pointWinner) => this.scores[pointWinner] += 1;
}

class TennisGame{
    run(){
        let score = new GameScore();
        let pointWinner;
        while(!score.gameIsOver()){
            console.log(score.getScoreDescription());
            pointWinner = this.getPointWinner();
            score.score(pointWinner);
        }
        return score;
    }

    getPointWinner(){
        let rand = Math.random();
        return rand < 0.5 ? playersID.player1 : playersID.player2;
    }
}

let tennisGame = new TennisGame();
let gameScore = tennisGame.run();
scoreDescription = gameScore.getScoreDescription();
console.log(scoreDescription);


module.exports = {TennisGame: TennisGame, playersID, GameScore};