var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SimpleSquad;
(function (SimpleSquad) {
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            _super.apply(this, arguments);
        }
        GameState.prototype.create = function () {
        };
        GameState.prototype.update = function () {
            this.game.input.update();
        };
        GameState.prototype.render = function () {
        };
        return GameState;
    }(Phaser.State));
    SimpleSquad.GameState = GameState;
})(SimpleSquad || (SimpleSquad = {}));
//# sourceMappingURL=GameState.js.map