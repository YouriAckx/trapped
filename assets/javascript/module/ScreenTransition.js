"use strict";

define(['phaser'], function(Phaser) {

    return {
        fadeOut: function(game, goToState) {
            console.log('Transitioning to screen', goToState);
            var background = game.add.graphics(0, 0);
            background.beginFill(0, 1);
            background.drawRect(0, 0, game.width, game.height);
            background.alpha = 0.0;
            background.endFill();

            var tween = game.add.tween(background)
                .to({alpha: 1}, 1000, Phaser.Easing.Linear.None);
            tween.onComplete.add(function () {
                game.state.start(goToState);
            }, this);
            tween.start();

        }
    }
});
