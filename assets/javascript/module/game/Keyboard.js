"use strict";

define([], function() {

    var _player;
    var _keyboard, _cursor;

    return {
        my: function(player, keyboard) {
            console.log('Keyboard init');
            _player = player;
            _keyboard = keyboard;
            _cursor = _keyboard.createCursorKeys();
        },

        ckeckKeys: function() {
            var adjustVelocity = function(v, cursorNegative, cursorPositive) {
                // Note: Tween do not honor wall collisions.
                // Using Phaser 'moveTo' is not satisfactory either.
                // We use our own routine instead

                var acceleration = 10;      // acceleration in the given direction
                var drag = 5;               // drag or friction if no input applied in this dir
                var min = 10;               // avoid close-to-zero speed and possible flickering

                if (cursorNegative.isDown) {
                    v -= acceleration;
                } else if (cursorPositive.isDown) {
                    v += acceleration;
                } else {
                    if (v > min) v -= drag;
                    else if (v < -min) v += drag;
                    else v = 0;
                }

                // Extra: avoid going in the opposite direction right after braking.
                // Extra: allow a few ms at 0.

                return v;
            };

            // var a = player.body.acceleration;
            var v = _player.body.velocity;
            var c = _cursor;
            v.x = adjustVelocity(v.x, c.left, c.right);
            v.y = adjustVelocity(v.y, c.up, c.down);
        }
    };
});
