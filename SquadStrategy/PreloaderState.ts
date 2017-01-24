module SimpleSquad {
    export class PreloaderState extends Phaser.State {
    
        preload() {
            // setup preload bar

            this.game.load.spritesheet("characters", "assets/sprites/roguelikeChar_big.png", 32, 32, 648, 0, 2);
            this.game.load.spritesheet("ui", "assets/sprites/UIpackSheet_big.png", 32, 32, 1000, 0, 4);
            this.game.load.spritesheet("tiles", "assets/sprites/roguelikeSheet_big.png", 32, 32, 2000, 0, 2);

            this.game.load.tilemap("small_preview", "assets/maps/small_preview.json", null, Phaser.Tilemap.TILED_JSON);
        }

        create() {
            this.startMainMenu();
        }

        startMainMenu() {
            this.game.state.start('CharacterCreator', true, false);
        }
    }
}