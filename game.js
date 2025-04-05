const framerate = 4;
const fallSpeed = -250;

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
	this.load.image('player', '/pix/dwa1.png');
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

    this.load.image('beer', '/pix/coin1.pix');
}

function create() {
	
	this.anims.create({
		key: 'background',
		frames: [{key: 'wall1'}, {key: 'wall2'}, {key: 'wall3'}, {key: 'wall4'}],
		framerate: framerate,
		repeat: -1
	});

	// no idea what this will do....
	this.background = this.physics.add.sprite(400, 300, 'wall1');
	this.background.anims.play('background');


	player = this.physics.add.image(400, 50, 'player').setImmovable(true);
	player.body.allowGravity = false;
	player.setCollideWorldBounds(true);

	
	cursors = this.input.keyboard.createCursorKeys();

	keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

	// Listen for C being tapped once
	keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    Math.ceil(Math.random() * 800) + 600

	rock1 = this.physics.add.group({
		key: 'rock1',
		repeat: 0,
		setXY: { x: Math.ceil(Math.random() * 600) + 600, y: Math.ceil(Math.random() * 800), stepX: 100 }
	});

    rock2 = this.physics.add.group({
		key: 'rock2',
		repeat: 0,
		setXY: { x: Math.ceil(Math.random() * 600) + 600, y: Math.ceil(Math.random() * 800), stepX: 100 }
	});

    rock3 = this.physics.add.group({
		key: 'rock3',
		repeat: 0,
		setXY: { x: Math.ceil(Math.random() * 600) + 600, y: Math.ceil(Math.random() * 800), stepX: 100 }
	});

	rock1.children.iterate(rock => {
		rock.setVelocityY(fallSpeed);
	});

    rock2.children.iterate(rock => {
		rock.setVelocityY(fallSpeed);
	});

    rock3.children.iterate(rock => {
		rock.setVelocityY(fallSpeed);
	});

    //friends =

	this.physics.add.overlap(player, rock1, hitObstacle, null, this);
    this.physics.add.overlap(player, rock2, hitObstacle, null, this);
    this.physics.add.overlap(player, rock3, hitObstacle, null, this);
}

function update() {
	// Horizontal player control
	if (cursors.left.isDown) {
		player.setVelocityX(-300);
	} else if (cursors.right.isDown) {
		player.setVelocityX(300);
	} else {
		player.setVelocityX(0);
	}

	spawnRocks();

	if (Phaser.Input.Keyboard.JustDown(keyC)) {
		console.log("Chugging away");
        p = p < 4 ? p + 0.08 : 4;
	}

    isDrunk = p > 0;
    console.log("Current promille: ", p);
}

function spawnRocks(){
    const despawn = -300;

    // Rock 1
    if (keyF.isDown && isDrunk) {
		rock1.children.iterate(rock => {
            p = p > 0 ? p - 0.005 : 0;
			rock.setVelocityY(0);
		});
	} else {
		rock1.children.iterate(rock => {
			rock.setVelocityY(fallSpeed);
		});
	}

	rock1.children.iterate(stone => {
		if (stone.y < despawn) {
			stone.y = Math.ceil(Math.random() * 800) + 600;
			stone.x = Phaser.Math.Between(50, 750);
		}
	});

    // Rock 2
    if (keyF.isDown && isDrunk) {
		rock2.children.iterate(rock => {
            p = p > 0 ? p - 0.005 : 0;
			rock.setVelocityY(0);
		});
	} else {
		rock2.children.iterate(rock => {
			rock.setVelocityY(fallSpeed);
		});
	}

	rock2.children.iterate(stone => {
		if (stone.y < despawn) {
			stone.y = Math.ceil(Math.random() * 800) + 600;
			stone.x = Phaser.Math.Between(50, 750);
		}
	});

    // Rock 3
    if (keyF.isDown && isDrunk) {
		rock3.children.iterate(rock => {
            p = p > 0 ? p - 0.005 : 0;
			rock.setVelocityY(0);
		});
	} else {
		rock3.children.iterate(rock => {
			rock.setVelocityY(fallSpeed);
		});
	}

	rock3.children.iterate(stone => {
		if (stone.y < despawn) {
			stone.y = Math.ceil(Math.random() * 800) + 600;
			stone.x = Phaser.Math.Between(50, 750);
		}
	});
}

function hitObstacle(player, stone1) {
	// Basic reaction for now — stop everything
	this.physics.pause();
	player.setTint(0xff0000);
	console.log("💥 You hit an obstacle!");
}
