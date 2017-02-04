"use strict";

define(['phaser', 'module/game/Tiles', 'module/Level'], function(Phaser, Tiles, Level) {

    var FADE_OUT_TIME = 750;
    var WAIT_TIME = 750;

    var _game, _map, _playerSprite;

    var finishLayer, finishTile;

    /** Finish as a Point. finish.worldX and worldY will be converted to x,y once */
    var finishPoint;

    return {
        my: function(game, map, playerSprite, collisionCallback) {
            _game = game;
            _map = map;
            _playerSprite = playerSprite;

            finishLayer = map.createLayer('finish');
            map.setLayer('finish');
            finishTile = map.searchTileIndex(Tiles.ID_FINISH);
            finishTile.setCollisionCallback(collisionCallback, this);

            // Convert to a Point so that distance can be swiftly calculated.
            finishPoint = new Phaser.Point(finishTile.worldX, finishTile.worldY);
        },

        checkFinish: function() {
            // Player doesn't have to be exactly on finish square
            var tolerance = 20;

            // Turn player into a Point
            var p = new Phaser.Point(_playerSprite.x, _playerSprite.y);

            // Has he reached the finish point?
            if (p.distance(finishPoint) < tolerance) {
                console.log('finish');
                // Remove the finish tile collision callback
                finishTile.setCollisionCallback(null);

                // Fade out player
                var tween = _game.add.tween(_playerSprite)
                    .to({alpha: 0.0}, FADE_OUT_TIME, Phaser.Easing.Linear.None, true, 0, 0, false);
                tween.onComplete.add(function () {
                    console.log('faded out');
                    // Extra wait before leaving this screen
                    _game.time.events.add(WAIT_TIME, Level.gotoNext, this);
                }, this);
                tween.start();
            }

            // TODO wait for the player to stop before considering done
            // TODO no more wall animations when done
            // TODO no more moving around when finished
        },

        layer: function() {
            return finishLayer;
        }
    }
});