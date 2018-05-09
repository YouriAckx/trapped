# Trapped

**A sample HTML5 labyrinth game made with [Phaser](http://phaser.io).**

## Demo

[Play it here](https://play.sugoi.be/trapped/) from any recent browser.
Mouse click or tap to move around.

## Gameplay

You are trapped in a labyrinth. The trick: the walls only appear as you get close to them!

![Walls hidden](/assets/img/screenshots/hidden.png)

![Walls visible](/assets/img/screenshots/visible.png)

## Current state

* Two (lame) levels
* No sound
* No custom player sprite

## Install

* Checkout the project
* Fire any HTTP server, for instance `python -m SimpleHTTPServer 8080`
* No plugin needed, this is pure HTML5 and javascript using Phaser.

## Code

Wiring is done by `require.js`. The code is split is small, cohesive components or modules taking care of walls, screen splash, pointer, teleporting...

The main logic is in `Labyrinth.js`.

## License

GNU General Public License v3, except for the game engine and the sprites.

![GNU GPL v3](https://www.gnu.org/graphics/gplv3-88x31.png)
