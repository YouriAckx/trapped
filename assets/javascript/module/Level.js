"use strict";

define(function() {
    var level = 1;

    var _game;

    var splashes = {
        1: 'Orientation',
        2: 'Disorientation'
    };

    return {
        my: function(game) {
            _game = game;
        },

        current: function() {
            return level;
        },

        reset: function() {
            level = 1;
        },

        buildLevelString: function() {
            return 'Level ' + level;
        },

        getTitle: function() {
            return splashes[level];
        },

        gotoNext: function() {
            console.log('moving to next level');
            level = level + 1;
            var hasNext = splashes[level] != undefined;
            var activity = hasNext ? 'LevelSplash' : 'Final';
            _game.state.start(activity);

        }
    }
});