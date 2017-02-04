"use strict";

define(['phaser', 'module/game/Tiles'], function(Phaser, Tiles) {

    var TRIGGER_DISTANCE = 2.5 * 32;
    var TWEEN_TIME = 300;
    var LAYER_NAME = 'wall';

    var _game, _map, _playerSprite;

    var wallLayer;

    /** Walls {sprite: aSprite, hidden: bool} */
    var walls;

    return {
        my: function(game, map, playerSprite) {
            _game = game;
            _map = map;
            _playerSprite = playerSprite;

            // Invisible walls
            wallLayer = map.createLayer(LAYER_NAME);
            _map.setCollision(Tiles.ID_WALL, true, wallLayer);

            // Make walls invisible, and store them for show/hide animation.
            walls = [];
            _map.searchTilesIndexes_(Tiles.ID_WALL, wallLayer, function(tile) {
                var wallSprite = _game.add.sprite(
                    Tiles.WIDTH * tile.x, Tiles.HEIGHT * tile.y, 'floor', Tiles.ID_FLOOR);
                walls.push({sprite: wallSprite, hidden: true});
            });
        },

        move: function() {
            var tweenWall = function(wall, alpha, isHidden) {
                wall.hidden = isHidden;
                _game.add.tween(wall.sprite)
                        .to({alpha: alpha}, TWEEN_TIME, Phaser.Easing.Linear.None, true, 0, 0, false);
            };

            for (var i = 0; i < walls.length; i++) {
                var wall = walls[i];
                var distance = _game.physics.arcade.distanceBetween(_playerSprite, wall.sprite);

                if (distance < TRIGGER_DISTANCE && wall.hidden == true) {
                    // Wall hidden and player close to wall -> reveal wall
                    tweenWall(wall, 0.0, false);
                }

                if (distance > TRIGGER_DISTANCE && wall.hidden === false) {
                    // Wall visible and robot getting away from it -> hide wall
                    tweenWall(wall, 1.0, true);
                }
            }
        },

        layer: function() {
            return wallLayer;
        }
    }
});