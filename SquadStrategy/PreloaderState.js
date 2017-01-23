var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SimpleSquad;
(function (SimpleSquad) {
    var PreloaderState = (function (_super) {
        __extends(PreloaderState, _super);
        function PreloaderState() {
            _super.apply(this, arguments);
        }
        PreloaderState.prototype.preload = function () {
            // setup preload bar
            this.game.load.spritesheet("characters", "assets/sprites/roguelikeChar_transparent.png", 16, 16, 450, 1);
        };
        PreloaderState.prototype.create = function () {
            this.startMainMenu();
        };
        PreloaderState.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return PreloaderState;
    }(Phaser.State));
    SimpleSquad.PreloaderState = PreloaderState;
})(SimpleSquad || (SimpleSquad = {}));
//# sourceMappingURL=PreloaderState.js.map