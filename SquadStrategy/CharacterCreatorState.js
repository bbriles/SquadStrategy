var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SimpleSquad;
(function (SimpleSquad) {
    var CharacterCreatorState = (function (_super) {
        __extends(CharacterCreatorState, _super);
        function CharacterCreatorState() {
            _super.apply(this, arguments);
        }
        CharacterCreatorState.prototype.create = function () {
            this.layers = [];
            // set default character
            this.layers[0] = this.game.add.sprite(400, 300, "characters", 0);
        };
        CharacterCreatorState.prototype.update = function () {
        };
        CharacterCreatorState.prototype.render = function () {
        };
        return CharacterCreatorState;
    }(Phaser.State));
    SimpleSquad.CharacterCreatorState = CharacterCreatorState;
})(SimpleSquad || (SimpleSquad = {}));
//# sourceMappingURL=CharacterCreatorState.js.map