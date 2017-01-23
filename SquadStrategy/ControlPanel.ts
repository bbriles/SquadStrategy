module SimpleSquad {
    export class ControlPanel extends Phaser.Sprite {
        panelWidth: number;
        panelHeight: number;

        constructor(game: Phaser.Game, color: ControlPanelColor, x:number, y: number, width: number, height:number) {
            super(game, x, y);
            this.panelWidth = width;
            this.panelHeight = height;

            this.setupBackground(color);
        }

        setupBackground(color: ControlPanelColor) {
            if (this.panelWidth > 64 || this.panelHeight > 64)
                this.addChild(new Phaser.TileSprite(this.game, 32, 32, this.panelWidth - 64, this.panelHeight - 32, "ui", color[4]));

            if (this.panelWidth > 64) {
                this.addChild(new Phaser.TileSprite(this.game, 32, 0, this.panelWidth - 64, 32, "ui", color[1]));
                this.addChild(new Phaser.TileSprite(this.game,32, this.panelHeight - 32, this.panelWidth - 64, 32, "ui", color[7]));
            }
            if (this.panelHeight > 64) {
                this.addChild(new Phaser.TileSprite(this.game,0, 32, 32, this.panelHeight - 64, "ui", color[3]));
                this.addChild(new Phaser.TileSprite(this.game,this.panelWidth - 32, 32, 32, this.panelHeight - 64, "ui", color[5]));
            }

            this.addChild(new Phaser.Sprite(this.game, 0, 0, "ui", color[0]));
            var sprite: Phaser.Sprite = <Phaser.Sprite>this.addChild(new Phaser.Sprite(this.game, this.panelWidth, 0, "ui", color[2]));
            sprite.anchor.setTo(1, 0);
            sprite = <Phaser.Sprite>this.addChild(new Phaser.Sprite(this.game,0, this.panelHeight, "ui", color[6]));
            sprite.anchor.setTo(0, 1);
            sprite = <Phaser.Sprite>this.addChild(new Phaser.Sprite(this.game,this.panelWidth, this.panelHeight, "ui", color[8]));
            sprite.anchor.setTo(1, 1);
            
        }
    }

    export class ControlPanelColor extends Array<number> {
        static GRAY: Array<number> = [60, 61, 62, 90, 91, 92, 120, 121, 122];
        static YELLOW: Array<number> = [66, 67, 68, 96, 97, 98, 126, 127, 128];
        static GREEN: Array<number> = [72, 73, 74, 102, 103, 104, 132, 133, 134];
        static RED: Array<number> = [78, 79, 80, 108, 109, 110, 138, 139, 140];
        static BLUE: Array<number> = [84, 85, 86, 114, 115, 116, 144, 145, 146];
        static YELLOW_OUTLINE: Array<number> = [246, 247, 248, 276, 277, 278, 306, 307, 308];
        static GREEN_OUTLINE: Array<number> = [72, 73, 74, 102, 103, 104, 132, 133, 134];
        static RED_OUTLINE: Array<number> = [78, 79, 80, 108, 109, 110, 138, 139, 140];
        static BLUE_OUTLINE: Array<number> = [84, 85, 86, 114, 115, 116, 144, 145, 146];
        static OLD_GRAY: Array<number> = [540, 541, 542, 570, 571, 572, 600, 601, 602];
    }
}