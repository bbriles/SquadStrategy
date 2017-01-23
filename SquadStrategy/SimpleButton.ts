module SimpleSquad {
    export class SimpleButton extends Phaser.Sprite {
        color: ButtonColor;
        leftSprite: Phaser.Sprite;
        middleSprite: Phaser.TileSprite;
        rightSprite: Phaser.Sprite;
        label: Phaser.Text;
        callback: Function;
        data: number | string;

        constructor(game: Phaser.Game, x: number, y: number, width: number, color: ButtonColor, label: string, callback: Function) {
            super(game, x, y);

            this.color = color;
            this.callback = callback;
            this.createSprites(color, width);
            this.inputEnabled = true;
            this.input.useHandCursor = true;

            var style = { font: "20px Tahoma", fill: "#000000", boundsAlignH: "center", boundsAlignV: "middle" };
            this.label = this.game.add.text(0, 0, label, style);
            this.label.setTextBounds(0, 0, width, 32);
            this.addChild(this.label);

            this.events.onInputDown.add(this.onDown, this);
            this.events.onInputUp.add(this.onUp, this);
        }

        createSprites(color: ButtonColor, width) {
            this.leftSprite = this.game.add.sprite(0, 0, "ui", color[0]);
            this.addChild(this.leftSprite);
            this.rightSprite = this.game.add.sprite(width, 0, "ui", color[2]);
            this.rightSprite.anchor.setTo(1, 0);
            this.addChild(this.rightSprite);

            if (width > 64) {
                this.middleSprite = this.game.add.tileSprite(32, 0, width - 64, 32, "ui", color[1]);
                this.addChild(this.middleSprite);
            }
            
        }

        onDown() {
            this.leftSprite.frame = this.color[3];
            this.rightSprite.frame = this.color[5];
            if (this.middleSprite)
                this.middleSprite.frame = this.color[4];
            this.label.y += 5;
            if (this.callback) {
                if (this.data)
                    this.callback(this.data);
                else
                    this.callback();
            }
            
        }

        onUp() {
            this.leftSprite.frame = this.color[0];
            this.rightSprite.frame = this.color[2];
            if (this.middleSprite)
                this.middleSprite.frame = this.color[1];
            this.label.y = 0;
        }
    }

    export class ButtonColor extends Array<number> {
        static GRAY: Array<number> = [0, 1, 2, 3, 4, 5];
        static YELLOW: Array<number> = [6, 7, 8, 9, 10, 11];
        static GREEN: Array<number> = [12, 13, 14, 15, 16, 17];
        static RED: Array<number> = [18, 19, 20, 21, 22, 23];
        static BLUE: Array<number> = [24, 25, 26, 27, 28, 29];
    }
}