requirejs.config({
    //baseUrl: "js/",
    paths: {
        phaser: 'lib/phaser-2.6.2'
    },
    shim: {
        'phaser': {
            exports: 'Phaser'
        }
    }
});

require(['phaser', 'module/Start', 'module/Labyrinth', 'module/LevelSplash', 'module/Level', 'module/Final'],
    function(Phaser, Start, Labyrinth, LevelSplash, Level, Final) {

    /**
     * Enhance Phaser.Tilemap with a search tiles function.
     * @param {number} index - Tile index to search for
     * @param {Phaser.TilemapLayer} layer - Layer to scan. Must be 'set' prior to calling this method
     * @param {function} [callback] - optional callback function to call on each matching tile
     * @returns {Array} Matching tile indexes
     */
    Phaser.Tilemap.prototype.searchTilesIndexes_ = function(index, layer, callback) {
        // This seems too cumbersome to be correct
        // but no joy finding anything more sensitive
        var tiles = [];
        var skip = 0;
        do {
            var tile = this.searchTileIndex(index, skip, false, layer);
            if (tile !== null) {
                if (callback) {
                    callback(tile);
                }
                tiles.push(tile);
                skip++;
            }
        } while (tile !== null);

        return tiles;
    };

    // Create a new game
    var game = new Phaser.Game(32*32, 19*32, Phaser.AUTO);

    // Init components (powered by require.js)
    console.log('main');
    Start.my(game);
    Labyrinth.my(game);
    LevelSplash.my(game);
    Final.my(game);

    // Add game states
    game.state.add('Start', Start);
    game.state.add('LevelSplash', LevelSplash);
    game.state.add('Labyrinth', Labyrinth);
    game.state.add('Final', Final);

    // Start the main activity (depending on debug mode)
    var debug = false;
    game.state.start(!debug ? 'Start' : 'Labyrinth');
});