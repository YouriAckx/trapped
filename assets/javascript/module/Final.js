"use strict";

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
                Level.reset();
                ScreenTransition.fadeOut(_game, 'Start');
            };

            // Fade in from black
            _game.camera.flash(0x000000, 1000);

            // Display text
            var text1 = _game.add.bitmapText(0, 0, 'gem', 'You were trapped.', 60);
            text1.updateTransform();
            text1.position.x = _game.width / 2 - text1.textWidth / 2;
            text1.position.y = _game.height / 2 - text1.textHeight;

            var text2 = _game.add.bitmapText(0, 0, 'gem', 'But now you have escaped.', 60);
            text2.updateTransform();
            text2.position.x = _game.width / 2 - text2.textWidth / 2;
            text2.position.y = _game.height / 2 + text2.textHeight;

            _game.input.onDown.addOnce(startGame, this);
            _game.time.events.add(Phaser.Timer.SECOND * 5, startGame, this);
        }
    }
});
