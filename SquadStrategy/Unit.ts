module SimpleSquad {
    export class Unit extends Phaser.Sprite {
        unitType: UnitType;
        healthBar: HealthBar;

        constructor(game: Phaser.Game, unitType: UnitType, isEnemy: boolean = false) {
            super(game, 0, 0, "characters", unitType.frames[0]);

            this.unitType = unitType;

            this.maxHealth = this.unitType.maxHP;
            this.health = this.unitType.maxHP;

            this.createSubSprites();
            this.createHealthBar(isEnemy);
        }

        createSubSprites() {
            for (var i: number = 1; i < this.unitType.frames.length; i++) {
                var sprite: Phaser.Sprite = this.game.add.sprite(this.x, this.y, "characters", this.unitType.frames[i]);
                this.addChild(sprite);
            }
        }


        createHealthBar(isEnemy: boolean) {
            this.healthBar = new HealthBar(this.game, isEnemy);
            this.game.add.existing(this.healthBar);
            this.addChild(this.healthBar);

            this.healthBar.y = 30;

            this.healthBar.setHealth(this.health, this.maxHealth);
        }

        update() {
            this.healthBar.setHealth(this.health, this.maxHealth);
        }
    }
}