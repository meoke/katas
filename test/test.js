var assert = require('assert');
var tennis_1 = require('../tennis_1');

describe('Tennis_1', function(){
    describe('#setIsOver()', function(){
        it('set is over if diff is >= 2 and maxScore >= 4', function() {
            s = new tennis_1.GameScore();
            s.scores = [4,2];
            assert.ok(s.gameIsOver());
          });

        it('set is not over if diff is >= 2 but maxScore < 4', function() {
            s = new tennis_1.GameScore();
            s.scores = [2,0];
            assert.ok(!s.gameIsOver());
          });

        it('set is not over if diff is < 2', function() {
            s = new tennis_1.GameScore();
            s.scores = [0,0];
            assert.ok(!s.gameIsOver());
        });
    });

    describe('#scoreNames', function(){
        it('score 0 is love', function(){
            gs = new tennis_1.GameScore();
            assert.equal("love", gs.getScoreName(0));
        });
        it('score 1 is 15', function(){
            gs = new tennis_1.GameScore();
            assert.equal("15", gs.getScoreName(1));
        });
        it('score 0 is 30', function(){
            gs = new tennis_1.GameScore();
            assert.equal("30", gs.getScoreName(2));
        });
        it('score 0 is 40', function(){
            gs = new tennis_1.GameScore();
            assert.equal("40", gs.getScoreName(3));
        });
        it('score 10 is 10', function(){
            gs = new tennis_1.GameScore();
            assert.equal("10", gs.getScoreName(10));
        });
    });
})