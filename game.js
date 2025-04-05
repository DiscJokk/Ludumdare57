const framerate = 4;
const fallSpeed = 10;
const despawn = -300;

let isChugging = false;
let isFlaxxing = false;
let isGameOver = false;
let isSplashing = true;
let isBalling = false;
let splashPhase = 0;
let flaxFlag = false;

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#222',
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	scene: {
		preload,
		create,
		update
	}
};

const game = new Phaser.Game(config);

let player, cursors, stone1, stone2, stone3;
let p = 4;
let isDrunk = true;

function preload() {

	this.load.image('rock1', '/pix/rock_60.png');
	this.load.image('rock2', '/pix/rock_120.png');
	this.load.image('rock3', '/pix/rock_240.png');
	// bg stuff
	this.load.image('wall1', '/pix/wall1.png');
	this.load.image('wall2', '/pix/wall2.png');
	this.load.image('wall3', '/pix/wall3.png');
	this.load.image('wall4', '/pix/wall4.png');

	// character sprite
	this.load.image('dwa1', '/pix/dwa1.png');
	this.load.image('dwa2', '/pix/dwa2.png');

	this.load.image('pint1', '/pix/pint1.png');
	this.load.image('pint2', '/pix/pint2.png');

	this.load.image('splash1', '/pix/splash1.png');
	this.load.image('splash2', '/pix/splash2.png');
	this.load.image('splash3', '/pix/splash3.png');
	this.load.image('splash4', '/pix/splash4.png');
	this.load.image('splash5', '/pix/splash5.png');
	this.load.image('splash6', '/pix/splash6.png');
	this.load.image('splash7', '/pix/splash7.png');
	this.load.image('splash8', '/pix/splash8.png');
	this.load.image('splash9', '/pix/splash9.png');
	this.load.image('splash10', '/pix/splash10.png');
	this.load.image('splash11', '/pix/splash11.png');
	this.load.image('splash12', '/pix/splash12.png');

	this.load.image('ball1', '/pix/ball1.png');
	this.load.image('ball2', '/pix/ball2.png');
	this.load.image('ball3', '/pix/ball3.png');
	this.load.image('ball4', '/pix/ball4.png');
	this.load.image('ball5', '/pix/ball5.png')
	
	this.load.image('drink1', '/pix/drink1.png');
	this.load.image('drink2', '/pix/drink2.png');
	
	this.load.image('flax1', '/pix/flax1.png');
	this.load.image('flax2', '/pix/flax2.png');

	this.load.image('pint_empty', '/pix/pint_empty1.png');
}

function create() {
	
	this.anims.create({
		key: 'background',
		frames: [{key: 'wall1'}, {key: 'wall2'}, {key: 'wall3'}, {key: 'wall4'}],
		framerate: framerate,
		repeat: -1
	});

	this.anims.create({
		key: 'pint',
		frames: [{key: 'pint1'},{key: 'pint2'}],
		framerate: framerate,
		repeat: -1
	});

	this.anims.create({
		key: 'flax',
		frames: [{key: 'flax1'}, {key: 'flax2'}],
		framerate: framerate,
		repeat: -1
	});

	this.anims.create({
		key: 'dwa',
		frames: [{key: 'dwa1'},{key: 'dwa2'}],
		framerate: framerate,
		repeat: -1
	});

	this.anims.create({
		key: 'drink',
		frames: [{key: 'drink1'}, {key: 'drink2'}],
		framerate: framerate,
		repeat: -1
	});


	this.anims.create({
		key: 'splash',
		frames: [
			{key: 'splash1'},
			{key: 'splash2'},
			{key: 'splash3'},
			{key: 'splash4'},
			{key: 'splash5'},
			{key: 'splash6'},
			{key: 'splash7'},
			{key: 'splash8'},
			{key: 'splash9'},
			{key: 'splash10'},
			{key: 'splash11'},
			{key: 'splash12'},
		],
		framerate: framerate,
		repeat: 0
	});

	this.anims.create({
		key: 'ball',
		frames: [
			{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},
            {key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{
            key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},
			{key: 'ball2'},
			{key: 'ball3'},
			{key: 'ball4'},
			{key: 'ball5'},
		],
		framerate: framerate,
		repeat: 0
	});

	// no idea what this will do....
	this.background = this.physics.add.sprite(400, 300, 'wall1');
	this.background.anims.play('background');

	player = this.physics.add.sprite(400, 150, 'ball4').setImmovable(true);
	player.body.allowGravity = false;
	player.setCollideWorldBounds(true);
	
	cursors = this.input.keyboard.createCursorKeys();

	keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

	keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

	rock1 = this.physics.add.sprite(Math.ceil(Math.random() * 22000) + 600, Math.ceil(Math.random() * 800), 'rock1');
	rock2 = this.physics.add.sprite(Math.ceil(Math.random() * 22000) + 600, Math.ceil(Math.random() * 800), 'rock2');
	rock3 = this.physics.add.sprite(Math.ceil(Math.random() * 22000) + 600, Math.ceil(Math.random() * 800), 'rock3');

	beer = this.physics.add.sprite(Math.ceil(Math.random() * 600) + 600, Math.ceil(Math.random() * 800), 'pint1');

    emptyBeer = this.physics.add.sprite(300, 300, 'pint_empty');

	// Do not tuch!
	this.splash = this.physics.add.sprite(400, 400, 'splash1');

	this.physics.add.overlap(player, rock1, hitObstacle, null, this);
	this.physics.add.overlap(player, rock2, hitObstacle, null, this);
	this.physics.add.overlap(player, rock3, hitObstacle, null, this);
	this.physics.add.overlap(player, beer, drinkBeer);
}

function update() {
	console.log("splashPhase: ", splashPhase);
	
	if (splashPhase == 0) {
		this.input.keyboard.on('keydown', (event) => {
			if (splashPhase == 0) {
				this.splash.anims.play('splash');
			}
		});
		
		this.splash.on('animationcomplete', function (animation, frame) {
			splashPhase = 1;
		});
	}


	if (splashPhase > 0) {
		this.splash.y -= fallSpeed;
	}

	if (splashPhase == 1) {
		player.anims.play('ball');
		splashPhase = 2;
	}

	if (splashPhase == 2) {
		player.on('animationcomplete', function (animation, frame) {
			splashPhase = 3;
		});
		
	}


	if (splashPhase == 3) {
		player.anims.play('dwa');
		splashPhase = 4;
	}


	if (splashPhase == 4) {
		
        if (cursors.left.isDown) {
            restoreChugging();
            player.setVelocityX(-300);
        } else if (cursors.right.isDown) {
            restoreChugging();
            player.setVelocityX(300);
        } else {
            player.setVelocityX(0);
        }

        if (isChugging) {
            p = p < 4 ? p + 0.005 : 4;
        }

        if (!isFlaxxing && !isGameOver) {
            rock1.y -= fallSpeed;
            rock2.y -= fallSpeed;
            rock3.y -= fallSpeed;
            beer.y -= fallSpeed;
            emptyBeer.y -= fallSpeed;
            
            if (player.anims.currentAnim?.key === 'flax') {
                flaxFlag = false;
                player.anims.play('dwa');
            }
        }

        if (isFlaxxing) {
            p = p > 0 ? p - 0.015 : 0;
        }

        if (keyF.isDown && isDrunk) {
            if (!flaxFlag) {
                player.anims.play('flax');
                flaxFlag = true;
            }
            isFlaxxing = true;
        } else {
            isFlaxxing = false;
        }

        isDrunk = p > 0;

        doRockStuffs();
        doBeerStuffs();
		
	}
}

function restoreChugging(){
    if (player.anims.currentAnim?.key === 'drink') {
        player.anims.play('dwa');
        emptyBeer.x = player.x
        emptyBeer.y = player.y;
    }
    isChugging = false;
}

function doBeerStuffs() {

	if (beer.y < despawn) {
		beer.y = Math.ceil(Math.random() * 800) + 600;
		beer.x = Phaser.Math.Between(50, 750);
	}
}

function doRockStuffs(){

	// Rock 1
	if (rock1.y < despawn) {
		rock1.y = Math.ceil(Math.random() * 800) + 600;
		rock1.x = Phaser.Math.Between(50, 750);
	}

	// Rock2
	if (rock2.y < despawn) {
			rock2.y = Math.ceil(Math.random() * 800) + 600;
		rock2.x = Phaser.Math.Between(50, 750);
	}

	// Rock3
	if (rock3.y < despawn) {
		rock3.y = Math.ceil(Math.random() * 800) + 600;
		rock3.x = Phaser.Math.Between(50, 750);
	}
}

function drinkBeer(){
    player.anims.play('drink');
	isChugging = true;
}

function hitObstacle(player, stone1) {
	// Basic reaction for now — stop everything
	isGameOver = true;
	this.physics.pause();
	player.setTint(0xff0000);
	console.log("💥 You hit an obstacle!");
}
