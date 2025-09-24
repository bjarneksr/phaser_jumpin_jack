export class Game extends Phaser.Scene {

    floorHeight = 600;
    floor;
    player;
    cursors;

    constructor() {
        super('game')
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('floor', 'assets/platform.png');
        this.load.image('flower_grass_layer', 'assets/Background_Layer_Flowers_horz_widened.png');
        this.load.image('mountain_layer_1', 'assets/Background_Layer_Mountains_2_widened.png');
        this.load.image('cloud_layer', 'assets/Background_Layer_Clouds_widened.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        // background layers
        this.sky = this.add.tileSprite(0, 0, 2400, 0, 'sky').setOrigin(0, 0);
        this.mountain_layer_1 = this.add.tileSprite(0, 200, 5000, 0, 'mountain_layer_1').setOrigin(0, 0).setScale(.5);
        this.cloud_layer = this.add.tileSprite(0, 50, 5000, 0, 'cloud_layer').setOrigin(0, 0).setScale(.5);

        // floor and foreground layers
        this.floor = this.physics.add.staticGroup();
        this.floor.create(0, this.floorHeight, 'floor').setOrigin(0, 0).setScale(12, 5).refreshBody();
;
        this.flower_grass_layer = this.add.tileSprite(0, this.floorHeight - 170, 10000, 0, 'flower_grass_layer').setOrigin(0, 0).setScale(.25);

        // player
        this.player = this.physics.add.sprite(100, this.floorHeight - 48, 'dude').setScale(2);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // test objects
        this.add.image(1000, 300, 'floor');
        this.add.image(2400, 600, 'floor').setScale(.2, 15);

        console.log(this.cameras.main.x, this.cameras.main.y);
        



        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.floor);
    }


    
    update() {
        this.cloud_layer.tilePositionX += .75;
        //this.mountain_layer_1.tilePositionX += .3;

        this.cursors = this.input.keyboard.createCursorKeys();
        if (this.cursors.left.isDown) {
            if (this.player.x > 35) {
                this.player.setVelocityX(-160);
                this.player.anims.play('left', true);

                this.mountain_layer_1.tilePositionX -= .3;
                this.flower_grass_layer.tilePositionX -= 16;
            } else {
                this.player.setVelocityX(0);
                this.player.anims.play('turn');
            }
        }
        else if (this.cursors.right.isDown) {
            if (this.player.x < 2365) {
                this.player.setVelocityX(160);
                this.player.anims.play('right', true);

                this.mountain_layer_1.tilePositionX += .3;
                this.flower_grass_layer.tilePositionX += 16;
            } else {
                this.player.setVelocity(0);
                this.player.anims.play('turn');
            }
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-250);
        }

        // camera follow player
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 2400, 700);
        this.physics.world.setBounds(0, 0, 2400, 700);
    }

}