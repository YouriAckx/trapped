# Trapped

**A sample HTML5 labyrinth game made with [Phaser](http://phaser.io).**

## Demo

[Play it here](http://trapped.ackx.net/) from any recent browser. Mouse click to tap to move around.

## Gameplay

You are trapped in a labyrinth. The trick: the walls only appear as you get close to them.

![Walls hidden](/assets/img/screenshots/hidden.png)

![Walls hidden](/assets/img/screenshots/visible.png)

## Current state

* Two (lame) levels
* No sound
* No custom player sprite

## Install

* Checkout the project
* Fire any HTTP server, for instance `python -m SimpleHTTPServer 8080`
* No plugin needed, this is pure HTML5 and javascript.

## Code

Wiring is done by `require.js`. The code is split is small, cohesive components or modules taking care of walls, screen splash, pointer, teleporting...

The main logic is in `Labyrinth.js`.

## License

GNU General Public License v3, except for game engine and sprites.

![GNU GPL v3](https://www.gnu.org/graphics/gplv3-88x31.png)
