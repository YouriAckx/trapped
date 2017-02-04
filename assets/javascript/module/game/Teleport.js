"use strict";

define(['phaser', 'module/game/Tiles', 'module/game/Pointer'], function(Phaser, Tiles, Pointer) {

    var FADEIN_TIME = 750;
    var FADEOUT_TIME = 750;
    var TRIGGER_LAYER_NAME = 'special_trigger_1';
    var OUTPUT_LAYER_NAME = 'special_output_1';

    var _playerSprite, _game, _map;

    var triggerLayer;
    var destinationTile;

    var isTeleporting = false;

    return {
        my: function(game, map, playerSprite, collisionCallback) {
            _game = game;
            _map = map;
            _playerSprite = playerSprite;

            // Bail out if this level has no teleportation layer
            if (map.getLayerIndex(TRIGGER_LAYER_NAME) === null) return;

            // Retrieve all trigger tiles
            triggerLayer = map.createLayer(TRIGGER_LAYER_NAME);
            map.setLayer(triggerLayer);
            map.searchTilesIndexes_(Tiles.ID_SPECIAL_01, triggerLayer, function(tile) {
                tile.setCollisionCallback(collisionCallback, this);
            });

            // Make them invisible
            Tiles.makeTileIdInvisible(map, Tiles.ID_SPECIAL_01);

            // Retrieve trigger output
            var teleportDestinationLayer = map.createLayer(OUTPUT_LAYER_NAME);
            map.setLayer(teleportDestinationLayer);
            destinationTile = map.searchTileIndex(Tiles.ID_SPECIAL_02);

            // Make it invisible
            Tiles.makeTileIdInvisible(map, Tiles.ID_SPECIAL_02);
            console.log('outputTile', destinationTile);
        },

        triggerTeleportation: function() {
            console.log('triggerTeleportation');

            // Unset trigger flag
            isTeleporting = true;

            // Freeze player
            Pointer.freeze();

            // Extra: make player stand out when teleporting

            // Fade out player
            var tween = _game.add.tween(_playerSprite)
                .to({alpha: 0.0}, FADEOUT_TIME, Phaser.Easing.Linear.None, true, 0, 0, false);
            tween.onComplete.add(function () {
                console.log('faded out. going to ', destinationTile.worldX, destinationTile.worldY);
                // Move player to output tile
                _playerSprite.x = destinationTile.worldX;
                _playerSprite.y = destinationTile.worldY;

                // Re-appear
                _game.add.tween(_playerSprite)
                    .to({alpha: 1.0}, FADEIN_TIME, Phaser.Easing.Linear.None, true, 0, 0, false);

                // Unfreeze player
                Pointer.unfreeze();

                // Reset trigger flag
                isTeleporting = false;
            }, this);
            tween.start();
        },

        isTeleporting: function() {
            return isTeleporting;
        },

        triggerLayer: function() {
            return triggerLayer;
        }
    }

});
