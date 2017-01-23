var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SimpleSquad;
(function (SimpleSquad) {
    var MainMenuState = (function (_super) {
        __extends(MainMenuState, _super);
        function MainMenuState() {
            _super.apply(this, arguments);
        }
        MainMenuState.prototype.preload = function () {
        };
        MainMenuState.prototype.create = function () {
            var text = "Click to Start";
            var style = { font: "32px Arial", fill: "#ffffff", align: "center" };
            this.game.add.text(this.game.width / 2 - 100, 400, text, style);
            this.input.onTap.addOnce(this.titleClicked, this);
        };
        MainMenuState.prototype.titleClicked = function () {
            this.game.state.start("CharacterCreator");
        };
        return MainMenuState;
    }(Phaser.State));
    SimpleSquad.MainMenuState = MainMenuState;
    (function (Direction) {
        Direction[Direction["UP"] = 0] = "UP";
        Direction[Direction["DOWN"] = 1] = "DOWN";
        Direction[Direction["LEFT"] = 2] = "LEFT";
        Direction[Direction["RIGHT"] = 3] = "RIGHT";
    })(SimpleSquad.Direction || (SimpleSquad.Direction = {}));
    var Direction = SimpleSquad.Direction;
})(SimpleSquad || (SimpleSquad = {}));
//# sourceMappingURL=MainMenuState.js.map