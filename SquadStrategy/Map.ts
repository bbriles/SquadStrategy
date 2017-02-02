module SimpleSquad {

    export class Map {
        tileSize: number = 32; // this should be a const
        game: Phaser.Game;
        tilemap: Phaser.Tilemap;
        squadStartPoints: Array<Phaser.Point>;
        enemyStartPoints: Array<Phaser.Point>;


        constructor(game: Phaser.Game, key: string) {
            this.game = game;
            this.createTileMap(key);
            this.createStartPoints();
        }

        createTileMap(key: string) {
            this.tilemap = this.game.add.tilemap(key, 32, 32, 800, 576);
            this.tilemap.addTilesetImage("rogue_tiles", "tiles");
            this.tilemap.createLayer("ground");
            this.tilemap.createLayer("ground_overlay");
            this.tilemap.createLayer("objects");
        }

        createStartPoints() {
            this.squadStartPoints = [new Phaser.Point(22,5), new Phaser.Point (23, 4), new Phaser.Point(20, 3), new Phaser.Point(19, 5), new Phaser.Point(21,6)];

            this.enemyStartPoints = [new Phaser.Point(6, 10), new Phaser.Point(9, 8), new Phaser.Point(7, 8), new Phaser.Point(4, 8), new Phaser.Point(5, 6), new Phaser.Point(7, 7)];
        }

        placeSquad(units: Array<Unit>) {
            for (var i: number = 0; i < units.length; i++) {
                units[i].x = this.squadStartPoints[i].x * this.tileSize;
                units[i].y = this.squadStartPoints[i].y * this.tileSize;
            }
        }

        placeEnemies(units: Array<Unit>) {
            for (var i: number = 0; i < units.length; i++) {
                units[i].x = this.enemyStartPoints[i].x * this.tileSize;
                units[i].y = this.enemyStartPoints[i].y * this.tileSize;
            }
        }
    }

}