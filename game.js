const framerate = 4;
const fallSpeed = 10;
const despawn = -300;

let isChugging = false;
let isFlaxxing = false;
let isGameOver = false;

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

	this.load.image('pint1', '/pix/pint1.png');
	this.load.image('pint2', '/pix/pint2.png');
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

	// no idea what this will do....
	this.background = this.physics.add.sprite(400, 300, 'wall1');
	this.background.anims.play('background');


	player = this.physics.add.image(400, 50, 'player').setImmovable(true);
	player.body.allowGravity = false;
	player.setCollideWorldBounds(true);

	
	cursors = this.input.keyboard.createCursorKeys();

	keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

	keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    Math.ceil(Math.random() * 800) + 600

	rock1 = this.physics.add.sprite(Math.ceil(Math.random() * 600) + 600, Math.ceil(Math.random() * 800), 'rock1');
    rock2 = this.physics.add.sprite(Math.ceil(Math.random() * 600) + 600, Math.ceil(Math.random() * 800), 'rock2');
    rock3 = this.physics.add.sprite(Math.ceil(Math.random() * 600) + 600, Math.ceil(Math.random() * 800), 'rock3');

    beers = this.physics.add.group({
		key: 'pint1',
		repeat: 0,
		setXY: { x: Math.ceil(Math.random() * 600) + 600, y: Math.ceil(Math.random() * 800), stepX: 100 }
	});

    beers.children.iterate(rock => {
		rock.setVelocityY(fallSpeed);
	});

	this.physics.add.overlap(player, rock1, hitObstacle, null, this);
    this.physics.add.overlap(player, rock2, hitObstacle, null, this);
    this.physics.add.overlap(player, rock3, hitObstacle, null, this);
    this.physics.add.overlap(player, beers, drinkBeer);
}

function update() {
	// Horizontal player control
	if (cursors.left.isDown) {
        isChugging = false;
		player.setVelocityX(-300);
	} else if (cursors.right.isDown) {
        isChugging = false;
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
    } else {
        p = p > 0 ? p - 0.005 : 0;
    }

    if (keyF.isDown && isDrunk) {
        isFlaxxing = true;
    } else {
        isFlaxxing = false;
    }

    isDrunk = p > 0;


    // checkRockCollide()
	doRockStuffs();
    spawnBeer();
}

function spawnBeer() {
    beers.children.iterate(beer => {
        if (beer.y < despawn) {
			beer.y = Math.ceil(Math.random() * 800) + 600;
			beer.x = Phaser.Math.Between(50, 750);
        }
    });
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

    /* Rock 1
    if (keyF.isDown && isDrunk) {
        isChugging = false;
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
        isChugging = false;
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
        isChugging = false;
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
	}); */
}

function drinkBeer(){
    isChugging = true;
}

function hitObstacle(player, stone1) {
	// Basic reaction for now — stop everything
    isGameOver = true;
	this.physics.pause();
	player.setTint(0xff0000);
	console.log("💥 You hit an obstacle!");
}
