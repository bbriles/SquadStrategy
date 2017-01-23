var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SimpleSquad;
(function (SimpleSquad) {
    var BootState = (function (_super) {
        __extends(BootState, _super);
        function BootState() {
            _super.apply(this, arguments);
        }
        BootState.prototype.preload = function () {
            this.game.time.advancedTiming = true;
        };
        BootState.prototype.create = function () {
            //  we don't need multitouch
            this.input.maxPointers = 1;
            //  disable automatically pausing if the browser tab the game is in loses focus
            this.stage.disableVisibilityChange = true;
            this.game.state.start('Preloader', true, false);
        };
        return BootState;
    }(Phaser.State));
    SimpleSquad.BootState = BootState;
})(SimpleSquad || (SimpleSquad = {}));
//# sourceMappingURL=BootState.js.map