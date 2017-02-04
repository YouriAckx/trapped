"use strict";

/**
 * Start the Game - Intro screen
 */
define(['phaser', 'module/Level', 'module/ScreenTransition'], function(Phaser, Level, ScreenTransition) {
    var _game;

    return {
        my: function(game) {
            _game = game;
        },

        preload: function () {
            _game.load.bitmapFont('gem',
                'assets/fonts/gem.png',
                'assets/fonts/gem.xml');
        },

        create: function () {
            var startGame = function() {
                ScreenTransition.fadeOut(_game, 'LevelSplash');
            };

            // Go (or back) to level 1
            Level.reset();

            // Fade in from black
            _game.camera.flash(0x000000, 1000);

            // Display text
            var text = _game.add.bitmapText(0, 0, 'gem', 'TRAPPED', 100);
            text.updateTransform();
            text.position.x = _game.width / 2 - text.textWidth / 2;
            text.position.y = _game.height / 2 - text.textHeight / 2;

            _game.input.onDown.addOnce(startGame, this);
            _game.time.events.add(Phaser.Timer.SECOND * 6, startGame, this);
        }
    }
});
