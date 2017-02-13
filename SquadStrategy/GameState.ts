module SimpleSquad {
    export class GameState extends Phaser.State {
        map: Map;
        unitTypes: { [key: string]: UnitType; };
        squad: Array<Unit>;
        enemies: Array<Unit>;

        create() {
            this.game.world.setBounds(0, 0, 800, 600);

            // this should be done externally or from a different file or in the preload state
            // pretty much any other way then what I did here
            this.loadTypes(); 

            this.map = new Map(this.game, "map1");

            this.createTestSquad();
            this.createTestEnemies();
        }

        loadTypes() {
            // this is a bad way to to do this. this should be in a seperate file
            this.unitTypes = {};
            this.unitTypes["Axeman"] = new UnitType("Axeman", [109, 348, 273, 439, 209, 4], WeaponType.AXE);
            this.unitTypes["Black Knight 1"] = new UnitType("Black Knight 1", [0, 514, 500, 3, 467, 159], WeaponType.AXE);
            this.unitTypes["Blacksmith"] = new UnitType("Blacksmith", [0, 57, 131, 283, 318], WeaponType.AXE);
            this.unitTypes["Princess"] = new UnitType("Princess", [1, 122, 166, 80, 301, 107], WeaponType.BOW);
            this.unitTypes["Ranger"] = new UnitType("Ranger", [1, 57, 461, 119, 106], WeaponType.BOW);
            this.unitTypes["Red Archer"] = new UnitType("Red Archer", [108, 3, 237, 115, 214], WeaponType.BOW);
            this.unitTypes["Red Mage"] = new UnitType("Red Mage", [109, 460, 439, 273, 45], WeaponType.MAGIC);
            this.unitTypes["Knight"] = new UnitType("Knight", [54, 111, 228, 28, 157, 359], WeaponType.SPEAR);
            this.unitTypes["Black Knight 2"] = new UnitType("Black Knight 2", [54, 514, 500, 3, 359, 265], WeaponType.SPEAR);
            this.unitTypes["Orc Assassin"] = new UnitType("Orc Assassin", [162, 3, 240, 393, 422], WeaponType.SWORD);
            this.unitTypes["Brigand"] = new UnitType("Brigand", [1, 239, 335, 58, 367], WeaponType.SWORD);
            this.unitTypes["Pirate"] = new UnitType("Pirate", [0, 65, 404, 57, 530], WeaponType.SWORD);
            this.unitTypes["Valkyrie"] = new UnitType("Valkyrie", [1, 327, 121, 291, 352, 157], WeaponType.SPEAR);
            this.unitTypes["Paladin"] = new UnitType("Paladin", [108, 165, 496, 84, 370, 362], WeaponType.SWORD);
            this.unitTypes["Farmer"] = new UnitType("Farmer", [162, 115, 460, 274, 320], WeaponType.AXE);
            this.unitTypes["Sorceror"] = new UnitType("Sorceror", [1, 118, 80, 150, 328], WeaponType.MAGIC);
            this.unitTypes["Bounty Hunter"] = new UnitType("Bounty Hunter", [0, 443, 489, 516], WeaponType.MAGIC);
            this.unitTypes["Hero"] = new UnitType("Hero", [1, 515, 442, 435, 34, 369], WeaponType.SWORD);
        }

        createTestSquad() {
            this.squad = [this.game.add.existing(new Unit(this.game, this.unitTypes["Valkyrie"])),
                this.game.add.existing(new Unit(this.game, this.unitTypes["Paladin"])),
                this.game.add.existing(new Unit(this.game, this.unitTypes["Ranger"])),
                this.game.add.existing(new Unit(this.game, this.unitTypes["Farmer"])),
                this.game.add.existing(new Unit(this.game, this.unitTypes["Sorceror"]))];
            this.map.placeSquad(this.squad);
        }

        createTestEnemies() {
            this.enemies = [this.game.add.existing(new Unit(this.game, this.unitTypes["Black Knight 1"], true)),
                this.game.add.existing(new Unit(this.game, this.unitTypes["Bounty Hunter"], true)),
                this.game.add.existing(new Unit(this.game, this.unitTypes["Red Archer"], true)),
                this.game.add.existing(new Unit(this.game, this.unitTypes["Black Knight 2"], true)),
                this.game.add.existing(new Unit(this.game, this.unitTypes["Brigand"], true)),
                this.game.add.existing(new Unit(this.game, this.unitTypes["Brigand"], true))];
            this.map.placeEnemies(this.enemies);
        }

        update() {
            this.game.input.update();
        }

        render() {

        }
    }
}