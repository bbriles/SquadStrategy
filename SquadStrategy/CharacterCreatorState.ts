module SimpleSquad {
    export class CharacterCreatorState extends Phaser.State {
        layers: Phaser.Sprite[];
        miniLayers: Phaser.Sprite[];
        previewPanel: ControlPanel;
        miniPreviewPanel: ControlPanel;
        layerPanels: ControlPanel[];
        baseFrames: Array<number> = [ 0, 1, 54, 55, 108, 109, 162, 163 ];
        baseFrameIndex: number = 0;
        layerPopup: ControlPanel;
        selectables: Array<Phaser.Sprite>;
        clothesGroup: Phaser.Group;
        weaponsGroup: Phaser.Group;
        selectRect: Phaser.Sprite;
        selectedItem: Phaser.Sprite;
        selectedLayerIndex: number;
        textOuput: HTMLElement;

        create() {
            this.game.world.setBounds(0, 0, 800, 600);
            this.game.stage.backgroundColor = "#222222";

            this.layers = [];
            this.miniLayers = [];

            this.setupUI();

            // setup input/output box
            this.textOuput = document.getElementById("output");
            this.textOuput.className = " onScreen";

            this.updateText();
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
            var simpleButton: SimpleButton = new SimpleButton(this.game, 310, 205, 100, ButtonColor.GREEN, "Load JSON", this.loadJSON);
            panel.addChild(simpleButton);

            this.setupPopup();
        }

        setupPreviews() {
            // large preview
            this.previewPanel = new ControlPanel(this.game, ControlPanelColor.BLUE, 350, 100, 200, 200);
            this.game.add.existing(this.previewPanel);

            this.layers[0] = this.game.add.sprite(this.previewPanel.panelWidth / 2, this.previewPanel.panelHeight / 2, "characters", 1);
            this.layers[0].anchor.setTo(0.5, 0.5);
            this.layers[0].scale.setTo(4);
            this.previewPanel.addChild(this.layers[0]);

            this.miniPreviewPanel = new ControlPanel(this.game, ControlPanelColor.BLUE, 575, 100, 200, 200);
            this.game.add.existing(this.miniPreviewPanel);

            var tilemap: Phaser.Tilemap = this.game.add.tilemap("small_preview", 32, 32, 160, 160);
            tilemap.addTilesetImage("rogue_tiles", "tiles");
            var midX: number = 18;
            var midY: number = 18;
            var layer: Phaser.TilemapLayer = tilemap.createLayer("ground");
            layer.fixedToCamera = false; layer.scrollFactorX = 0; layer.scrollFactorY = 0; layer.position.set(midX, midY);
            this.miniPreviewPanel.addChild(layer);
            layer = tilemap.createLayer("ground_overlay");
            layer.fixedToCamera = false; layer.scrollFactorX = 0; layer.scrollFactorY = 0; layer.position.set(midX, midY);
            this.miniPreviewPanel.addChild(layer);
            layer = tilemap.createLayer("objects");
            layer.fixedToCamera = false; layer.scrollFactorX = 0; layer.scrollFactorY = 0; layer.position.set(midX, midY);
            this.miniPreviewPanel.addChild(layer);

            this.miniLayers[0] = this.game.add.sprite(this.miniPreviewPanel.panelWidth / 2, this.miniPreviewPanel.panelHeight / 2, "characters", 1);
            this.miniLayers[0].anchor.setTo(0.5, 0.5);
            this.miniPreviewPanel.addChild(this.miniLayers[0]);
        }

        setupPopup() {
            this.layerPopup = new ControlPanel(this.game, ControlPanelColor.BLUE, 10, 10, 780, 580);
            this.layerPopup.visible = false;
            this.layerPopup.inputEnabled = true;
            this.game.add.existing(this.layerPopup);

            // selection rectangle
            var bmd: Phaser.BitmapData = this.game.add.bitmapData(33, 33);

            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 33, 33);
            bmd.ctx.fillStyle = '#ff0000';
            bmd.ctx.fill();
            this.selectRect = this.game.add.sprite(0, 0, bmd);
            this.selectRect.anchor.setTo(0.5, 0.5);
            this.layerPopup.addChild(this.selectRect);
            this.selectRect.visible = false;

            // add close button
            var button: SimpleButton = new SimpleButton(this.game, 665, 533, 100, ButtonColor.RED, "Cancel", this.closeLayerPopup);
            this.layerPopup.addChild(button);

            // add select button
            button = new SimpleButton(this.game, 550, 533, 100, ButtonColor.GREEN, "Select", this.selectItem);
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
            var x: number = 42, y: number = 16;
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
                sprite.anchor.setTo(0.5, 0.5);
                this.layerPopup.addChild(sprite);
                this.selectables[i] = sprite;
                this.clothesGroup.add(sprite);
                sprite.inputEnabled = true;
                sprite.events.onInputDown.add(this.itemClicked, this);
                x += 35;
                if (x > 750) {
                    x = 42;
                    y += 35;
                }
            }
            validFrames = [];
            x = 42;
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
                sprite.anchor.setTo(0.5, 0.5);
                this.layerPopup.addChild(sprite);
                this.selectables[i] = sprite;
                this.weaponsGroup.add(sprite);
                sprite.inputEnabled = true;
                sprite.events.onInputDown.add(this.itemClicked, this);
                x += 35;
                if (x > 750) {
                    x = 42;
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

                var sprite: Phaser.Sprite = this.game.add.sprite(this.layerPanels[i].panelWidth / 2, this.layerPanels[i].panelHeight / 2, "characters", 0);
                sprite.anchor.setTo(0.5, 0.5);
                sprite.visible = false;
                this.layerPanels[i].addChild(sprite);

                // create select button

                var button: SimpleButton = new SimpleButton(this.game, startX + 75, y + 16, 128, ButtonColor.GREEN, "Set Layer",this.showLayerPopup);
                button.data = i;
                panel.addChild(button);
                // create clear button

                button = new SimpleButton(this.game, startX + 213, y + 16, 64, ButtonColor.RED, "Clear", this.clearLayer);
                button.data = i;
                panel.addChild(button);

                y += 82;
            }
        }

        clearLayer = (layerIndex: number) => {
            var sprite: Phaser.Sprite = <Phaser.Sprite>this.layerPanels[layerIndex].getChildAt(4);
            sprite.visible = false;

            this.previewPanel.removeChild(this.layers[layerIndex]);
            this.layers[layerIndex] = null;
            this.miniPreviewPanel.removeChild(this.miniLayers[layerIndex]);
            this.miniLayers[layerIndex] = null;

            this.updateText();
        }

        showLayerPopup=(layerIndex: number) => {
            this.selectedLayerIndex = layerIndex;
            this.selectedItem = null;
            this.selectRect.visible = false;
            this.layerPopup.visible = true;
            this.textOuput.className = " offScreen";
        }

        closeLayerPopup = () => {
            this.layerPopup.visible = false;
            this.textOuput.className = " onScreen";
        }

        showClothesGroup = () => {
            this.weaponsGroup.visible = false;
            this.clothesGroup.visible = true;
            this.selectRect.visible = false;
            this.selectedItem = null;
        }

        showWeaponsGroup = () => {
            this.weaponsGroup.visible = true;
            this.clothesGroup.visible = false;
            this.selectRect.visible = false;
            this.selectedItem = null;
        }

        itemClicked = (sprite: Phaser.Sprite) => {
            this.selectRect.x = sprite.x;
            this.selectRect.y = sprite.y;
            this.selectRect.visible = true;
            this.selectedItem = sprite;
        }

        selectItem = () => {
            if (this.selectedItem) {
                this.setLayerFrame(this.selectedLayerIndex, <number>this.selectedItem.frame);
                this.layerPopup.visible = false;
            }
            this.updateText();
            this.textOuput.className = " onScreen";
        }

        setLayerFrame = (index:number, frame: number) => {
            var i: number = index;
            if (!this.layers[i]) {
                this.layers[i] = this.game.add.sprite(this.previewPanel.panelWidth / 2, this.previewPanel.panelHeight / 2, "characters", frame);
                this.layers[i].anchor.setTo(0.5, 0.5);
                this.layers[i].scale.setTo(4);
                this.previewPanel.addChild(this.layers[i]);
            }
            else {
                this.layers[i].frame = frame;
            }
            if (!this.miniLayers[i]) {
                this.miniLayers[i] = this.game.add.sprite(this.miniPreviewPanel.panelWidth / 2, this.miniPreviewPanel.panelHeight / 2, "characters", frame);
                this.miniLayers[i].anchor.setTo(0.5, 0.5);
                this.miniPreviewPanel.addChild(this.miniLayers[i]);
            }
            else {
                this.miniLayers[i].frame = frame;
            }

            if (this.layerPanels[i].children.length > 4) {
                var sprite: Phaser.Sprite = <Phaser.Sprite>this.layerPanels[i].getChildAt(4);
                sprite.visible = true;
                sprite.frame = frame;
            }
        }

        nextBaseClicked() {
            this.baseFrameIndex = (this.baseFrameIndex + 1) % this.baseFrames.length;
            this.layers[0].frame = this.baseFrames[this.baseFrameIndex];
            this.miniLayers[0].frame = this.baseFrames[this.baseFrameIndex];
            this.updateText();
        }

        prevBaseClicked() {
            this.baseFrameIndex--;
            if (this.baseFrameIndex < 0)
                this.baseFrameIndex = this.baseFrames.length - 1;
            this.layers[0].frame = this.baseFrames[this.baseFrameIndex];
            this.miniLayers[0].frame = this.baseFrames[this.baseFrameIndex];
            this.updateText();
        }

        updateText() {
            var frames: Array<number> = [];
            for (var i: number = 0; i < this.layers.length; i++) {
                if (this.layers[i])
                    frames.push(<number>this.layers[i].frame);
            }
            var textArea: HTMLTextAreaElement = <HTMLTextAreaElement>this.textOuput.firstChild;
            textArea.value = JSON.stringify(frames);
        }

        loadJSON = () => {
            //try {
            var textArea: HTMLTextAreaElement = <HTMLTextAreaElement>this.textOuput.firstChild;
            var json: string = textArea.value;
            var frames: Array<number> = JSON.parse(json);
            // clear everything
            for (var i: number = 1; i < 6; i++) {
                this.clearLayer(i);
            }
            this.layers[0].frame = frames[0];
            this.miniLayers[0].frame = frames[0];
            for (var i: number = 1; i < frames.length; i++) {
                this.setLayerFrame(i, frames[i]);
            }
            this.updateText();
            //}
            //catch (e) {
            //    alert(e);
           // }

        }

        update() {
        }

        render() {
        }
    }
}