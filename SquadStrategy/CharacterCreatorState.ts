module SimpleSquad {
    export class CharacterCreatorState extends Phaser.State {
        layers: Phaser.Sprite[];
        miniLayers: Phaser.Sprite[];
        layerPanels: ControlPanel[];
        baseFrames: Array<number> = [ 0, 1, 54, 55, 108, 109, 162, 163 ];
        baseFrameIndex: number = 0;
        layerPopup: ControlPanel;
        selectables: Array<Phaser.Sprite>;
        clothesGroup: Phaser.Group;
        weaponsGroup: Phaser.Group;

        create() {
            this.game.world.setBounds(0, 0, 800, 600);
            this.game.stage.backgroundColor = "#222222";
            
            this.layers = [];
            this.miniLayers = [];

            this.setupUI();
        }


        setupUI() {
            // header
            var panel: ControlPanel = new ControlPanel(this.game, ControlPanelColor.YELLOW, 10, 10, 780, 75);
            this.add.existing(panel);
            var style = { font: "bold 48px Tahoma", fill: "#000000", boundsAlignH: "center", boundsAlignV: "middle" };
            var text: Phaser.Text = this.game.add.text(0, 0, "Character Creator", style);
            text.setTextBounds(0, 10, this.game.width, 75);

            this.setupPreviews();

            panel = new ControlPanel(this.game, ControlPanelColor.BLUE, 25, 100, 300, 475);
            this.game.add.existing(panel);
            style = { font: "32px Tahoma", fill: "#000000", boundsAlignH: "center", boundsAlignV: "middle" };
            text = this.game.add.text(0, 0, "Body", style);
            text.setTextBounds(0, 10, panel.panelWidth, 32);
            panel.addChild(text);
            var button: Phaser.Button = this.game.add.button(panel.panelWidth - 25, 10, "ui", this.nextBaseClicked, this, 745, 745);
            button.anchor.setTo(1, 0);
            panel.addChild(button);
            button = this.game.add.button(25, 10, "ui", this.prevBaseClicked, this, 744, 744);
            panel.addChild(button);

            this.setupLayerPickers(10, 60, panel);

            var panel: ControlPanel = new ControlPanel(this.game, ControlPanelColor.BLUE, 350, 325, 425, 250);
            this.game.add.existing(panel);

            this.setupPopup();
        }

        setupPreviews() {
            // large preview
            var panel: ControlPanel = new ControlPanel(this.game, ControlPanelColor.BLUE, 350, 100, 200, 200);
            this.game.add.existing(panel);

            this.layers[0] = this.game.add.sprite(panel.panelWidth /2, panel.panelHeight / 2, "characters", 1);
            this.layers[0].anchor.setTo(0.5, 0.5);
            this.layers[0].scale.setTo(4);
            panel.addChild(this.layers[0]);

            panel = new ControlPanel(this.game, ControlPanelColor.BLUE, 575, 100, 200, 200);
            this.game.add.existing(panel);

            this.miniLayers[0] = this.game.add.sprite(panel.panelWidth / 2, panel.panelHeight / 2, "characters", 1);
            this.miniLayers[0].anchor.setTo(0.5, 0.5);
            panel.addChild(this.miniLayers[0]);
        }

        setupPopup() {
            this.layerPopup = new ControlPanel(this.game, ControlPanelColor.BLUE, 10, 10, 780, 580);
            this.layerPopup.visible = false;
            this.layerPopup.inputEnabled = true;
            this.game.add.existing(this.layerPopup);

            // add close button
            var button: SimpleButton = new SimpleButton(this.game, 665, 533, 100, ButtonColor.RED, "Cancel", this.closeLayerPopup);
            this.layerPopup.addChild(button);

            // add select button
            button = new SimpleButton(this.game, 550, 533, 100, ButtonColor.GREEN, "Select", this.closeLayerPopup);
            this.layerPopup.addChild(button);

            // add page buttons
            button = new SimpleButton(this.game, 10, 533, 64, ButtonColor.YELLOW, "Page 1", this.showClothesGroup);
            this.layerPopup.addChild(button);
            button = new SimpleButton(this.game, 84, 533, 64, ButtonColor.YELLOW, "Page 2", this.showWeaponsGroup);
            this.layerPopup.addChild(button);

            // add groups
            this.clothesGroup = new Phaser.Group(this.game);
            this.layerPopup.addChild(this.clothesGroup);
            this.weaponsGroup = new Phaser.Group(this.game);
            this.layerPopup.addChild(this.weaponsGroup);
            this.weaponsGroup.visible = false;

            // add items
            var x: number = 10, y: number = 16;
            this.selectables = [];
            var validFrames: Array<number> = [];
            var index: number;

            index  = 6;
            for (var i: number = 0; i < 10; i++) {
                for (var j: number = 6; j < 18; j++) {
                    validFrames.push(index);
                    index++;
                }
                index += 54 - 12;
            }  
            index = 3;
            for (var i: number = 0; i < 10; i++) {
                for (var j: number = 3; j < 5; j++) {
                    validFrames.push(index);
                    index++;
                }
                index += 52;
            }
            index = 19;
            for (var i: number = 0; i < 12; i++) {
                for (var j: number = 19; j < 23; j++) {
                    validFrames.push(index);
                    index++;
                }
                index += 50;
            }
            index = 23;
            for (var i: number = 0; i < 8; i++) {
                for (var j: number = 23; j < 27; j++) {
                    validFrames.push(index);
                    index++;
                }
                index += 50;
            }
            index = 28;
            for (var i: number = 0; i < 9; i++) {
                for (var j: number = 28; j < 32; j++) {
                    validFrames.push(index);
                    index++;
                }
                index += 50;
            }

            for (var i: number = 0; i < validFrames.length; i++) {
                var sprite: Phaser.Sprite = new Phaser.Sprite(this.game, x, y, "characters", validFrames[i]);
                sprite.anchor.setTo(0, 0.5);
                this.layerPopup.addChild(sprite);
                this.selectables[i] = sprite;
                this.clothesGroup.add(sprite);
                x += 35;
                if (x > 750) {
                    x = 10;
                    y += 35;
                }
            }
            validFrames = [];
            x = 10;
            y = 16;

            index = 33;
            for (var i: number = 0; i < 9; i++) {
                for (var j: number = 33; j < 41; j++) {
                    validFrames.push(index);
                    index++;
                }
                index += 46;
            }
            index = 42;
            for (var i: number = 0; i < 10; i++) {
                for (var j: number = 42; j < 52; j++) {
                    validFrames.push(index);
                    index++;
                }
                index += 44;
            }
            index = 52;
            for (var i: number = 0; i < 5; i++) {
                for (var j: number = 52; j < 54; j++) {
                    validFrames.push(index);
                    index++;
                }
                index += 52;
            }

            for (var i: number = 0; i < validFrames.length; i++) {
                var sprite: Phaser.Sprite = new Phaser.Sprite(this.game, x, y, "characters", validFrames[i]);
                sprite.anchor.setTo(0, 0.5);
                this.layerPopup.addChild(sprite);
                this.selectables[i] = sprite;
                this.weaponsGroup.add(sprite);
                x += 35;
                if (x > 750) {
                    x = 10;
                    y += 35;
                }
            }
        }

        setupLayerPickers(startX: number, startY: number, panel: ControlPanel) {
            var y: number = startY;

            this.layerPanels = [];

            // start at 1 because layer[0] is the body which doesn't use a picker
            for (var i: number = 1; i < 6; i++) {
                // create panel
                this.layerPanels[i] = new ControlPanel(this.game, ControlPanelColor.GRAY, startX, y, 64, 64);
                panel.addChild(this.layerPanels[i]);
                // create select button

                var button: SimpleButton = new SimpleButton(this.game, startX + 75, y + 16, 128, ButtonColor.GREEN, "Set Layer",this.showLayerPopup);
                button.data = i;
                panel.addChild(button);
                // create clear button

                y += 82;
            }
        }

        showLayerPopup=(layerIndex: number) => {
            this.game.debug.text("layer index = " + layerIndex, 25, 25);

            this.layerPopup.visible = true;
        }

        closeLayerPopup = () => {
            this.layerPopup.visible = false;
        }

        showClothesGroup = () => {
            this.weaponsGroup.visible = false;
            this.clothesGroup.visible = true;
        }

        showWeaponsGroup = () => {
            this.weaponsGroup.visible = true;
            this.clothesGroup.visible = false;
        }

        nextBaseClicked() {
            this.baseFrameIndex = (this.baseFrameIndex + 1) % this.baseFrames.length;
            this.layers[0].frame = this.baseFrames[this.baseFrameIndex];
        }

        prevBaseClicked() {
            this.baseFrameIndex--;
            if (this.baseFrameIndex < 0)
                this.baseFrameIndex = this.baseFrames.length - 1;
            this.layers[0].frame = this.baseFrames[this.baseFrameIndex];
        }

        update() {
        }

        render() {
        }
    }
}