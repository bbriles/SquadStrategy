module SimpleSquad {
    export class HealthBar extends Phaser.Graphics {
        currentHealth: number = 0;
        barColor: number;

        constructor(game: Phaser.Game, isEnemy: boolean) {
            super(game);

            if (isEnemy)
                this.barColor = 0xFF0000;
            else
                this.barColor = 0x00FF00;
        }

        setHealth(health: number, maxHealth: number) {
            if (health != this.currentHealth) {
                this.currentHealth = health;

                var percent: number = maxHealth / health;
                var xMax: number = Math.ceil(32 * percent);

                this.beginFill(0x000000);
                this.drawRect(0, 0, 32, 1);
                this.endFill();

                this.beginFill(this.barColor);
                this.drawRect(0, 0, xMax, 2);
                this.endFill();
            }
        }
    }
}