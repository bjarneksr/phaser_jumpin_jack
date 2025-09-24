export class Game extends Phaser.Scene {

    floorHeight = 600;

    constructor() {
        super('game')
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('floor', 'assets/platform.png');
        this.load.image('grass', 'assets/grass_texture.png');
    }

    create() {
        this.sky = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'sky').setOrigin(0, 0);
        this.add.image(0, this.floorHeight, 'floor').setScale(12, 1);
        this.add.tileSprite(0, this.floorHeight - 50, this.scale.width, 200, 'grass').setOrigin(0, 0).setScale(.25);
    }

}