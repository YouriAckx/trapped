"use strict";

define(['phaser',
        'module/Level', 'module/game/Tiles', 'module/game/Teleport', 'module/game/Walls', 'module/game/Finish',
        'module/game/Gameplay', 'module/game/Pointer', 'module/game/Keyboard'],
    function(Phaser, Level, Tiles, Teleport, Walls, Finish, Gameplay, Pointer, Keyboard) {

    // Game, map, sprites, tiles
    var _game, map, playerSprite;

    // Layers
    var floorLayer, borderLayer;

    var enableCollisions = function() {
        var arcade = _game.physics.arcade;

        arcade.collide(playerSprite, Finish.layer());
        arcade.collide(playerSprite, borderLayer);
        arcade.collide(playerSprite, Walls.layer());

        // Collide with the teleportation invisible layer only is teleportation is not in progress
        if (!Teleport.isTeleporting()) arcade.collide(playerSprite, Teleport.triggerLayer());
    };

    /** Pass-through callback function for teleportation, to avoid instantiation issues */
    var teleportationCallback = function() {
        Teleport.triggerTeleportation();
    };

    var checkFinishCallback = function() {
        Finish.checkFinish();
    };

    return {
        my: function(game) {
            console.log('Labyrinth init');
            _game = game;

            Level.my(game);
        },

        create: function () {
            console.log('Game create at level', Level.current());

            _game.physics.startSystem(Phaser.Physics.ARCADE);

            // Fade in from black
            _game.camera.flash('#000000', 1500);

            // Game map
            map = _game.add.tilemap('map');
            map.addTilesetImage('tiles', 'tiles');

            // Floor
            floorLayer = map.createLayer('floor');

            // Borders
            borderLayer = map.createLayer('border');
            map.setCollision(Tiles.ID_BORDER_VISIBLE, true, borderLayer);

            // Turn orange border (wall marker) into transparent tiles
            map.setLayer('border');
            Tiles.makeTileIdInvisible(map, Tiles.ID_BORDER_VISIBLE);

            // Player
            var startTile = map.searchTileIndex(Tiles.ID_START, 0, false, 'start');
            playerSprite = _game.add.sprite(Tiles.WIDTH * startTile.x, Tiles.HEIGHT * startTile.y, 'floor', Tiles.ID_PLAYER);
            //this.player.anchor.set(0.5);
            //this.physics.enable(this.player, Phaser.Physics.ARCADE);
            _game.physics.arcade.enable(playerSprite);
            var playerBody = playerSprite.body;
            playerBody.collideWorldBounds = true;
            playerBody.maxVelocity.x = Gameplay.MAX_VELOCITY;
            playerBody.maxVelocity.y = Gameplay.MAX_VELOCITY;

            // Finish square detection
            Finish.my(_game, map, playerSprite, checkFinishCallback);

            // Invisible walls
            Walls.my(_game, map, playerSprite);

            // Teleportation
            Teleport.my(_game, map, playerSprite, teleportationCallback);

            // User input
            Pointer.my(playerSprite, _game.input.activePointer);
            Keyboard.my(playerSprite, _game.input.keyboard);
        },

        preload: function () {
            console.log('Game preload');
            _game.load.spritesheet('floor', 'assets/img/tiles.png', Tiles.WIDTH, Tiles.HEIGHT);
            var jsonPath = 'assets/level/level' + Level.current() + '.json';
            _game.load.tilemap('map', jsonPath, null, Phaser.Tilemap.TILED_JSON);
            _game.load.image('tiles', 'assets/img/tiles.png');
        },

        render: function() {
            //game.debug.bodyInfo(player, 16, 24);
        },

        update: function () {
            enableCollisions();
            Walls.move();

            if (Gameplay.usePointer === true) {
                Pointer.checkMouse();
            } else {
                Keyboard.ckeckKeys();
            }
        }
    }
});
