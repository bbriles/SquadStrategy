module SimpleSquad {
    export class MainMenuState extends Phaser.State {

        preload() {
        }

        create() {
            
            var text:string = "Click to Start";
            var style = { font: "32px Arial", fill: "#ffffff", align: "center" };
            this.game.add.text(this.game.width / 2 - 100, 400, text, style);
            this.input.onTap.addOnce(this.titleClicked, this);
        }

        titleClicked() {
            this.game.state.start("CharacterCreator");
            
        }
    }

    export enum Direction {
        UP,
        DOWN,
        LEFT,
        RIGHT
    }
}