"use strict";

define(['phaser', 'module/game/Tiles', 'module/game/Gameplay'], function(Phaser, Tiles, Gameplay) {

    var _pointer;
    var _player;
    var clickPosition = null;
    var freeze = false;

    var velocity = function() {
        return _player.body.velocity;
    };

    return {
        my: function(player, pointer) {
            console.log('Pointer init');
            _player = player;
            _pointer = pointer;
        },

        checkMouse: function() {

            /** Adjust a component of velocity
             * @param {number} v - Current velocity
             * @param {int} d - Distance in pixels
             * @param {number} ratio - Applicable ratio [0.0-1.0] for acceleration and top speed
             * @returns {number} Adjusted velocity
             */
            var adjustVelocity = function(v, d, ratio) {
                var acceleration = 10.0;    // acceleration in the given direction
                var min = 2;                // min distance: avoid close-to-zero speed and possible wobbling

                // ratio should not exceed 1
                if (ratio > 1.0) ratio = 1.0;

                // adjust acceleration to ratio
                var a = acceleration * ratio;

                // compute new speed
                if (d > min) v += a;
                else if (d < -min) v -= a;
                else v = 0;

                // max speed is adjusted based on ratio too.
                // it cannot be exceeded
                var maxSpeed = Gameplay.MAX_VELOCITY * ratio;
                if (v > maxSpeed) v = maxSpeed;
                else if (v < -maxSpeed) v = -maxSpeed;

                // TODO Slow down when close to target
                // TODO Stop on wall collision

                return v;
            };

            // If frozen, nothing to do
            if (freeze) return;

            var maxTravel = 200;

            // Capture click position
            if (_pointer.isDown) {
                // Click happens on the upper-left corner of the player tile.
                // We adjust the destination position based on tile size
                clickPosition = { x: _pointer.x - Tiles.WIDTH / 2, y: _pointer.y - Tiles.HEIGHT / 2 };

                // Deny long journeys
                var playerPoint = new Phaser.Point(_player.x, _player.y);
                var destinationPoint = new Phaser.Point(clickPosition.x, clickPosition.y);
                if (playerPoint.distance(destinationPoint) > maxTravel) {
                    clickPosition = null;
                }
            }

            // If no destination, we're done
            if (clickPosition === null) return;

            // We still have to go somewhere. Compute x et y deltas
            var dx = clickPosition.x - _player.x;
            var dy = clickPosition.y - _player.y;

            // Adjust the x and y velocity.
            // The x and y speed will not be the same most of the time as the player
            // moves linearly towards the destination.
            var v = velocity();
            v.x = adjustVelocity(v.x, dx, Math.abs(dx/dy));
            v.y = adjustVelocity(v.y, dy, Math.abs(dy/dx));

            // Arrived?
            if (v.x === 0 && v.y === 0) clickPosition = null;
        },

        stop: function() {
            clickPosition = null;
            var v = velocity();
            v.x = 0;
            v.y = 0;
        },

        freeze: function() {
            freeze = true;
            this.stop();
        },

        unfreeze: function() {
            freeze = false;
        }
    };
});
