"use strict";

define(function() {
    return {
        WIDTH: 32,
        HEIGHT: 32,
        ID_PLAYER: 46,
        ID_BORDER_VISIBLE: 85,
        ID_BORDER_INVISIBLE: 84,
        ID_FINISH: 71,
        ID_WALL: 6,
        ID_FLOOR: 0,
        ID_START: 43,
        ID_SPECIAL_01: 43,
        ID_SPECIAL_02: 43,

        makeTileIdInvisible: function(map, tileId) {
            map.replace(tileId, this.ID_BORDER_INVISIBLE);
        }
    };
});
