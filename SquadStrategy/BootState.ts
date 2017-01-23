module SimpleSquad {
    export class BootState extends Phaser.State {
        preload() {
            this.game.time.advancedTiming = true;
        }

        create() {
            this.game.stage.smoothed = false;
            
            //  we don't need multitouch
            this.input.maxPointers = 1;

            //  disable automatically pausing if the browser tab the game is in loses focus
            this.stage.disableVisibilityChange = true;

            this.game.state.start('Preloader', true, false);
        }
    }
}