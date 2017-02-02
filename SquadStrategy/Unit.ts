module SimpleSquad {
    export class Unit extends Phaser.Sprite {
        unitType: UnitType;

        constructor(game: Phaser.Game, unitType: UnitType) {
            super(game, 0, 0, "characters", unitType.frames[0]);

            this.unitType = unitType;

            this.createSubSprites();
        }

        createSubSprites() {
            for (var i: number = 1; i < this.unitType.frames.length; i++) {
                var sprite: Phaser.Sprite = this.game.add.sprite(this.x, this.y, "characters", this.unitType.frames[i]);
                this.addChild(sprite);
            }
        }
    }
}