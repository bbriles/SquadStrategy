module SimpleSquad {
    export class SquadGame {
        game: Phaser.Game;

        constructor() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', null);

            this.game.state.add("Boot", BootState, false);
            this.game.state.add("Preloader", PreloaderState, false);
            this.game.state.add("MainMenu", MainMenuState, false);
            this.game.state.add("Game", GameState, false);
            this.game.state.add("CharacterCreator", CharacterCreatorState, false);

            this.game.state.start("Boot");
        }
    }
}