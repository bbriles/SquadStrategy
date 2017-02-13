module SimpleSquad {
    export class UnitType {
        name: string;
        frames: Array<number>;
        maxHP: number;
        physicalAttack: number;
        physicalDefense: number;
        magicAttack: number;
        magicDefense: number;
        speed: number;
        range: number;
        weaponType: WeaponType;

        constructor(name: string, frames: Array<number>, weaponType: WeaponType) {
            this.name = name;
            this.frames = frames;
            this.weaponType = weaponType;

            this.maxHP = 15;
        }
    }   

    export enum WeaponType {
        SWORD,
        SPEAR,
        AXE,
        BOW,
        MAGIC
    }
}