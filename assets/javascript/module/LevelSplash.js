"use strict";

define(['phaser', 'module/Level', 'module/ScreenTransition'], function(Phaser, Level, ScreenTransition) {
    var _game;

    return {
        my: function(game) {
            console.log('LevelSplash init');
            _game = game;
        },

        preload: function () {
            console.log('LevelSplash preload');
            _game.load.bitmapFont('gem', 'assets/fonts/gem.png', 'assets/fonts/gem.xml');
        },

        create: function () {
            var startLevel = function() {
                ScreenTransition.fadeOut(_game, 'Labyrinth');
            };

            console.log('LevelSplash create');

            // Fade in from black
            _game.camera.flash(0x000000, 1000);

            // Display text
            var text1 = _game.add.bitmapText(0, 0, 'gem', Level.buildLevelString(), 60);
            text1.updateTransform();
            text1.position.x = _game.width / 2 - text1.textWidth / 2;
            text1.position.y = _game.height / 2 - text1.textHeight;

            var text2 = _game.add.bitmapText(0, 0, 'gem', Level.getTitle(), 60);
            text2.updateTransform();
            text2.position.x = _game.width / 2 - text2.textWidth / 2;
            text2.position.y = _game.height / 2 + text2.textHeight;

            // centered text does not work with bitmap text:
            //
            // var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
            // var text = game.add.text(0, 0, "phaser 2.4 text bounds", style);
            // text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
            // text.setTextBounds(0, 0, 800, 600);

            // basic text would be:
            //game.add.text(80, 80, 'Splash', { font: '50px Arial', fill: '#dadada' });

            _game.input.onDown.addOnce(startLevel, this);
            _game.time.events.add(Phaser.Timer.SECOND * 3.5, startLevel, this);
        }
    }
});
