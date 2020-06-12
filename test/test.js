var assert = require('assert');
var tennis_1 = require('../tennis_1');

describe('Tennis_1', function(){
    describe('#gameIsOver()', function(){
        it('game is over if diff is >= 2 and maxScore >= 4', function() {
            s = new tennis_1.GameScore();
            
            s.score(tennis_1.rules.playersID.player1);
            s.score(tennis_1.rules.playersID.player1);
            s.score(tennis_1.rules.playersID.player1);
            s.score(tennis_1.rules.playersID.player1);
            
            s.score(tennis_1.rules.playersID.player2);

            assert.ok(s.gameIsOver());
          });

        it('game is not over if diff is >= 2 but maxScore < 4', function() {
            s = new tennis_1.GameScore();

            s.score(tennis_1.rules.playersID.player1);
            s.score(tennis_1.rules.playersID.player1);
            s.score(tennis_1.rules.playersID.player1);
            
            s.score(tennis_1.rules.playersID.player2);          
            assert.ok(!s.gameIsOver());
          });

        it('game is not over if diff is < 2', function() {
            s = new tennis_1.GameScore();
            s.score(tennis_1.rules.playersID.player2);   
            s.score(tennis_1.rules.playersID.player2);   
            s.score(tennis_1.rules.playersID.player2); 

            s.score(tennis_1.rules.playersID.player1);
            s.score(tennis_1.rules.playersID.player1);
            s.score(tennis_1.rules.playersID.player1);
            s.score(tennis_1.rules.playersID.player1);
            
            assert.ok(!s.gameIsOver());
        });
    });

    describe('#playerHasAdvantage()', function(){
      it('player has no advantage if love:30', function() {
          s = new tennis_1.GameScore();
          
          s.score(tennis_1.rules.playersID.player1);
          s.score(tennis_1.rules.playersID.player1);

          assert.ok(!s.playerHasAdvantage(tennis_1.rules.playersID.player1));
          assert.ok(!s.playerHasAdvantage(tennis_1.rules.playersID.player2));
      });

      it('player has advantage if was 40:40 and got point', function() {
        s = new tennis_1.GameScore();
        
        s.score(tennis_1.rules.playersID.player1);
        s.score(tennis_1.rules.playersID.player2);
        
        s.score(tennis_1.rules.playersID.player1);
        s.score(tennis_1.rules.playersID.player2);

        s.score(tennis_1.rules.playersID.player1);
        s.score(tennis_1.rules.playersID.player2);

        s.score(tennis_1.rules.playersID.player1);

        assert.ok(s.playerHasAdvantage(tennis_1.rules.playersID.player1));
        assert.ok(!s.playerHasAdvantage(tennis_1.rules.playersID.player2));
      });

      it('player has no advantage if was 40:40 and got point but lost again', function() {
        s = new tennis_1.GameScore();
        
        s.score(tennis_1.rules.playersID.player1);
        s.score(tennis_1.rules.playersID.player2);
        
        s.score(tennis_1.rules.playersID.player1);
        s.score(tennis_1.rules.playersID.player2);

        s.score(tennis_1.rules.playersID.player1);
        s.score(tennis_1.rules.playersID.player2);

        s.score(tennis_1.rules.playersID.player1);
        s.score(tennis_1.rules.playersID.player2);

        assert.ok(!s.playerHasAdvantage(tennis_1.rules.playersID.player1));
        assert.ok(!s.playerHasAdvantage(tennis_1.rules.playersID.player2));
      });
    });

    describe('#getScoreDescription()', function(){
      it('player1 is winner', function() {
          s = new tennis_1.GameScore();
          
          s.score(tennis_1.rules.playersID.player1);
          s.score(tennis_1.rules.playersID.player1);
          s.score(tennis_1.rules.playersID.player1);
          s.score(tennis_1.rules.playersID.player1);

          assert.equal(s.getScoreDescription(), "Player1: 40, Player2: love. Player1 HAS WON!!!");
      });

      it('player2 is in adventage', function() {
        s = new tennis_1.GameScore();
        
        s.score(tennis_1.rules.playersID.player1);
        s.score(tennis_1.rules.playersID.player1);
        s.score(tennis_1.rules.playersID.player1);
        
        s.score(tennis_1.rules.playersID.player2);
        s.score(tennis_1.rules.playersID.player2);
        s.score(tennis_1.rules.playersID.player2);
        s.score(tennis_1.rules.playersID.player2);

        assert.equal(s.getScoreDescription(), "Player1: 40, Player2: 40. Player2 IS IN ADVENTAGE!!!");
      });
      it('game in progress', function() {
        s = new tennis_1.GameScore();
        
        s.score(tennis_1.rules.playersID.player1);

        s.score(tennis_1.rules.playersID.player2);
        s.score(tennis_1.rules.playersID.player2);

        assert.equal(s.getScoreDescription(), "Player1: 15, Player2: 30. Game in progress!");
      });
    });
})