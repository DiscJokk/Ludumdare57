/*

Stuffs to do tomorrow when sober:

Musaka

Sound fxs

Stuffs to do tomporrow when drunk:

Velocity

Nidhog

Make powerbar funny beer stuffs

Pitch up beer chug sound thingy

Full screen mode

Go to the promise land

*/

const isDebug = false;

const framerate = 20;
const fallSpeed = 10;
const despawn = -300;
const mainVolume = 0.4;

let isChugging = false;
let isFlaxxing = false;
let isGameOver = false;
let isSplashing = true;
let isBalling = false;
let splashPhase = 0;
let flaxFlag = false;
let depth = 0;
let hasRestartListener = false;
let isReset = false;
let isGunkPlaying = false;
let isFlaxxPlaying = false;
let isTitlesplashPlaying = false;
let isIngamemusicPlaying = false;
let isGitgudorlistentothisPlaying = false;

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
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
	render: {
		pixelArt: true
	},
	scene: {
		preload,
		create,
		update
	}
};

const game = new Phaser.Game(config);

let player, cursors, stone1, stone2, stone3;
const pMax = 10;
const pCostFlax = 0.02;
const pBoostDrink = 0.01;
let p = pMax;
let isDrunk = true;

function preload() {
	// music and fx stuff
	this.load.audio('putt','./efeks/Musty Putt.mp3');
	this.load.audio('gungk','./efeks/gungk.mp3');
	this.load.audio('dwarfpate','./efeks/Dwarfpate.mp3');
	this.load.audio('flaxx','./efeks/Flaxxx.mp3');

	this.load.audio('titlesplash','./vibes/Violet Clouds Candy.wav');
	this.load.audio('ingamemusic','./vibes/Dwarven Flight Simulator.mp3');
	this.load.audio('gitgudorlistentothis','./vibes/Between A Rock and a Steel Helmet.wav');

	// rock stuff
	this.load.image('rock1', './pix/rock_60.png');
	this.load.image('rock2', './pix/rock_120.png');
	this.load.image('rock3', './pix/rock_240.png');
	// bg stuff
	this.load.image('wall1', './pix/wall1.png');
	this.load.image('wall2', './pix/wall2.png');
	this.load.image('wall3', './pix/wall3.png');
	this.load.image('wall4', './pix/wall4.png');

	// character sprite
	this.load.image('dwa1', './pix/dwa1.png');
	this.load.image('dwa2', './pix/dwa2.png');

	this.load.image('pint1', './pix/pint1.png');
	this.load.image('pint2', './pix/pint2.png');

	this.load.image('gameover', './pix/gameover.png');

	this.load.image('splash0', './pix/splash0.png');
	this.load.image('splash1', './pix/splash1.png');
	this.load.image('splash2', './pix/splash2.png');
	this.load.image('splash3', './pix/splash3.png');
	this.load.image('splash4', './pix/splash4.png');
	this.load.image('splash5', './pix/splash5.png');
	this.load.image('splash6', './pix/splash6.png');
	this.load.image('splash7', './pix/splash7.png');
	this.load.image('splash8', './pix/splash8.png');
	this.load.image('splash9', './pix/splash9.png');
	this.load.image('splash10', './pix/splash10.png');
	this.load.image('splash11', './pix/splash11.png');
	this.load.image('splash12', './pix/splash12.png');

	this.load.image('ball1', './pix/ball1.png');
	this.load.image('ball2', './pix/ball2.png');
	this.load.image('ball3', './pix/ball3.png');
	this.load.image('ball4', './pix/ball4.png');
	this.load.image('ball5', './pix/ball5.png')
	
	this.load.image('drink1', './pix/drink1.png');
	this.load.image('drink2', './pix/drink2.png');
	
	this.load.image('flax1', './pix/flax1.png');
	this.load.image('flax2', './pix/flax2.png');

	this.load.image('woosh1', './pix/woosh1.png');
	this.load.image('woosh2', './pix/woosh2.png');
	this.load.image('woosh3', './pix/woosh3.png');

	this.load.image('fullscreenButton', './pix/fullscreen.png');


	this.load.image('pint_empty', './pix/pint_empty1.png');

	// hitboxes n stuff
	this.load.image('dwa_hitbox', './pix/dwa_hitbox.png');
	this.load.image('rock3_hitbox', './pix/rock_240_hitbox.png');
	this.load.image('rock2_hitbox', './pix/rock_120_hitbox.png');
	this.load.image('rock1_hitbox', './pix/rock_60_hitbox.png');

	this.load.image('pBarBack', './pix/pBarBack.png');
	this.load.image('pBar', './pix/pBar.png');
}

function create() {
	
	this.anims.create({
		key: 'background',
		frames: [{key: 'wall1'}, {key: 'wall2'}, {key: 'wall3'}, {key: 'wall4'}],
		frameRate: framerate,
		repeat: -1
	});

	this.anims.create({
		key: 'pint',
		frames: [{key: 'pint1'},{key: 'pint2'}],
		frameRate: framerate/2,
		repeat: -1
	});

	this.anims.create({
		key: 'flax',
		frames: [{key: 'flax1'}, {key: 'flax2'}],
		frameRate: framerate,
		repeat: -1
	});

	this.anims.create({
		key: 'dwa',
		frames: [{key: 'dwa1'},{key: 'dwa2'}],
		frameRate: framerate,
		repeat: -1
	});

	this.anims.create({
		key: 'drink',
		frames: [{key: 'drink1'}, {key: 'drink2'}],
		frameRate: framerate,
		repeat: -1
	});

	this.anims.create({
		key: 'woosh',
		frames: [
			{key: 'woosh1'},
			{key: 'woosh2'},
			{key: 'woosh3'},
		],
		frameRate: framerate,
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
		frameRate: framerate,
		repeat: 0
	});

	this.anims.create({
		key: 'ball',
		frames: [
			{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},
			{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},
			{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},
			{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},{key: 'ball1'},
			{key: 'ball2'},
			{key: 'ball3'},
			{key: 'ball4'},
			{key: 'ball5'},
		],
		frameRate: framerate,
		repeat: 0
	});

	// no idea what this will do....
	this.background = this.physics.add.sprite(400, 300, 'wall1');
	this.background.anims.play('background');

	// Create a smaller invisable hitbox for the dwarf
	woosh = this.physics.add.sprite(400, 150, 'woosh1');
	woosh.anims.play('woosh');
	player = this.physics.add.sprite(400, 150, 'ball4').setImmovable(true);
	player.body.allowGravity = false;



	// TODO check this out
	player.setCollideWorldBounds(true);
	playerHitbox = this.physics.add.sprite(400, 150, 'dwa_hitbox');
	
	cursors = this.input.keyboard.createCursorKeys();

	keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

	keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
	
	beer = this.physics.add.sprite(Math.ceil(Math.random() * 600) + 1600, Math.ceil(Math.random() * 1800), 'pint1');
	beer.anims.play('pint');

	rock1 = this.physics.add.sprite(Math.ceil(Math.random() * 22000) + 600, Math.ceil(Math.random() * 800), 'rock1');
	rock2 = this.physics.add.sprite(Math.ceil(Math.random() * 22000) + 600, Math.ceil(Math.random() * 800), 'rock2');
	rock3 = this.physics.add.sprite(Math.ceil(Math.random() * 22000) + 600, Math.ceil(Math.random() * 800), 'rock3');


	

	rock1Hitbox = this.physics.add.sprite(0, 0, 'rock1_hitbox');
	rock2Hitbox = this.physics.add.sprite(0, 0, 'rock2_hitbox');
	rock3Hitbox = this.physics.add.sprite(0, 0, 'rock3_hitbox');

	let scale = 0.9;
	rock1Hitbox.setScale(scale);
	rock2Hitbox.setScale(scale);
	rock3Hitbox.setScale(scale);
	playerHitbox.setScale(scale);
	rock1Hitbox.body.setSize(rock1Hitbox.width * scale, rock1Hitbox.height * scale);  // width, height in pixels
	rock2Hitbox.body.setSize(rock2Hitbox.width * scale, rock2Hitbox.height * scale);
	rock3Hitbox.body.setSize(rock3Hitbox.width * scale, rock3Hitbox.height * scale);
	playerHitbox.body.setSize(playerHitbox.width * scale, playerHitbox.height * scale);

	rock1Hitbox.setVisible(isDebug);
	rock2Hitbox.setVisible(isDebug);
	rock3Hitbox.setVisible(isDebug);
	playerHitbox.setVisible(isDebug);



	emptyBeer = this.physics.add.sprite(-300, -300, 'pint_empty');



	dephChounter = this.add.text(10, 45, 'Hello World', { 
		fontSize: '20px',
		fontFamily: 'Arial',
		color: '#ffffff',
		align: 'center', 
	});

	this.pBarBack = this.physics.add.sprite(10, 10, 'pBarBack');
	this.pBarBack.setOrigin(0, 0);

	this.pBar = this.physics.add.sprite(15, 15, 'pBar');
	this.pBar.setOrigin(0, 0);

	

	pChounter = this.add.text(17, 17, 'Hello World', { 
		fontSize: '15px',
		fontFamily: 'Arial',
		color: '#000',
		align: 'center', 
	});



	// Do not tuch!
	this.splash = this.physics.add.sprite(400, 400, 'splash1');
	this.gameover = this.physics.add.sprite(400, 300, 'gameover');
	this.gameover.visible = false;
	this.finalScore = this.add.text(400, 300, 'Final Score:\n99s', 
		{ 
			fontSize: '50px',
			fontFamily: 'Arial',
			color: '#ffffff',
			align: 'center', 
		});
	// Set the origin to the center horizontally
	this.finalScore.setOrigin(0.5, 0.5);
	this.finalScore.visible = false;

	
    // Add the fullscreen button to the upper right corner
    fullscreenButton = this.add.sprite(config.width - 10, 10, 'fullscreenButton').setInteractive();
    fullscreenButton.setOrigin(1, 0); // Set origin to upper right corner

    // Add pointer down event to the button
    fullscreenButton.on('pointerdown', function () {
        if (this.scale.isFullscreen) {
            this.scale.stopFullscreen();
        } else {
            this.scale.startFullscreen();
        }
    }, this);

	this.splash0 = this.physics.add.sprite(400, 300, 'splash0');

	// Switch the collition detection to use the invisable hitboxes instead of these
	this.physics.add.overlap(playerHitbox, rock1Hitbox, hitObstacle, null, this);
	this.physics.add.overlap(playerHitbox, rock2Hitbox, hitObstacle, null, this);
	this.physics.add.overlap(playerHitbox, rock3Hitbox, hitObstacle, null, this);
	this.physics.add.overlap(playerHitbox, beer, drinkBeer);

	// sound stuff goes here
	this.putt = this.sound.add('putt');
	this.gungk = this.sound.add('gungk');
	this.dwarfpate = this.sound.add('dwarfpate');
	this.flaxxx = this.sound.add('flaxx');

	this.titlesplash = this.sound.add('titlesplash');
	this.ingamemusic = this.sound.add('ingamemusic');
	this.gitgudorlistentothis = this.sound.add('gitgudorlistentothis');
}

function update() {

	// console.log("splashPhase: ", splashPhase);
	woosh.x = player.x;
	woosh.y = player.y - 50;

	playerHitbox.x = player.x;
	playerHitbox.y = player.y;

	rock1Hitbox.x = rock1.x;
	rock1Hitbox.y = rock1.y;

	rock2Hitbox.x = rock2.x;
	rock2Hitbox.y = rock2.y;

	rock3Hitbox.x = rock3.x;
	rock3Hitbox.y = rock3.y;

	if (splashPhase > 3 && !isGameOver && !isFlaxxing) {
		depth ++;
	}
	dephChounter.setText('Depth: ' + depth);
	pChounter.setText('P: ' + p.toFixed(2)  + '/' + pMax);
	this.pBar.setScale(p / pMax, 1);

	// bar tint doBeerStuffs
	if (p / pMax < 0.3) {
		this.pBar.setTint(0xff0000);
	} else if (p / pMax < 0.6) {
		this.pBar.setTint(0xFFFF00);
	} else {
		this.pBar.setTint(0x00FF00);
	}

	if (splashPhase == 0) {
		if (!isTitlesplashPlaying) {
			this.titlesplash.play({
				volume: mainVolume,
				loop: true
			});
			isTitlesplashPlaying = true;
		}
		this.input.keyboard.on('keydown', (event) => {
			if (splashPhase == 0) {
				if (isTitlesplashPlaying) {
					this.titlesplash.stop();
				}
				this.splash0.visible = false;
				this.splash.anims.play('splash');
				this.putt.play({volume: mainVolume});
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
		isTitlesplashPlaying = false;
		player.anims.play('ball');
		splashPhase = 2;
	}

	if (splashPhase == 2) {
		player.on('animationcomplete', function (animation, frame) {
			splashPhase = 3;
		});	
	}

	if (splashPhase == 3) {
		if (!isIngamemusicPlaying) {
			this.ingamemusic.play({
				loop: true,
				volume: mainVolume
			});
			isIngamemusicPlaying = true;
		}
		player.anims.play('dwa');
		splashPhase = 4;
	}


	if (splashPhase == 4) {
		
		if (cursors.left.isDown) {
			restoreChugging();
			this.gungk.stop();
			isGunkPlaying = false;
			player.setFlipX(true);
			player.setVelocityX(-300);
			woosh.rotation = 0.15
		} else if (cursors.right.isDown) {
			restoreChugging();
			woosh.rotation = -0.15
			this.gungk.stop();
			isGunkPlaying = false;
			player.setFlipX(false);
			player.setVelocityX(300);
		} else {
			player.setVelocityX(0);
			woosh.rotation = 0.0
		}

		if (isChugging && !isGameOver) {
			p = p < pMax ? p + pBoostDrink : pMax;
			this.gungk.detune += 2;
			if (!isGunkPlaying) {
				this.gungk.play({ 
					loop: true,
					volume: mainVolume
				});
				isGunkPlaying = true;
			}
		} else if (!isGameOver) {
			this.gungk.detune = 0;
		}

		if (!isFlaxxing && !isGameOver) {
			rock1.y -= fallSpeed;
			rock2.y -= fallSpeed;
			rock3.y -= fallSpeed;
			beer.y -= fallSpeed;
			emptyBeer.y -= fallSpeed;
			
			if (player.anims.currentAnim?.key === 'flax') {
				flaxFlag = false;
				this.background.anims.play('background');
				player.anims.play('dwa');
			}
		}

		if (!isFlaxxing){
			if (isFlaxxPlaying) {
				this.flaxxx.stop();
				isFlaxxPlaying = false;
			}
		}

		if (isFlaxxing && !isDebug && !isGameOver) {
			p = p > 0 ? p - pCostFlax : 0;
			if (!isFlaxxPlaying) {
				this.flaxxx.play({ 
					loop: true,
					volume: mainVolume
				});
				isFlaxxPlaying = true;
			 }
		}

		if (keyF.isDown && isDrunk) {
			if (player.anims.currentAnim?.key !== 'flax') {
				player.anims.play('flax');
			}
			if (!flaxFlag) {
				this.background.anims.pause();
				flaxFlag = true;
			}
			isFlaxxing = true;
			woosh.visible = false;
		} else {
			isFlaxxing = false;
			woosh.visible = true;
		}

		isDrunk = p > 0;

		doRockStuffs();
		doBeerStuffs();
		
	}

	if (isGameOver) {
		this.flaxxx.stop();
		if (keyR.isDown) {
			resetGame.call(this);
		};
	}
}

function resetGame() {
	splashPhase = 0;
	isChugging = false;
	isFlaxxing = false;
	isGameOver = false;
	isSplashing = true;
	isBalling = false;
	flaxFlag = false;
	isGitgudorlistentothisPlaying = false;
	depth = 0;
	p = pMax;
	isDrunk = true;

	this.gitgudorlistentothis.stop();

	dephChounter.setText('Depth: 0');
	pChounter.setText('P: ' + p.toFixed(2) + '/' + pMax);
	this.pBar.setScale(1, 1);
	this.pBar.setTint(0x00FF00);

	player.setPosition(400, 150);
	player.clearTint();
	player.anims.play('ball');
	player.setVelocityX(0);
	player.setFlipX(false);
	playerHitbox.setPosition(400, 150);

	this.splash.setPosition(400, 400);
	this.splash.visible = true;
	this.splash0.visible = true;

	this.gameover.visible = false;
	this.finalScore.visible = false;

	rock1.setPosition(Phaser.Math.Between(600, 22600), Phaser.Math.Between(0, 800));
	rock2.setPosition(Phaser.Math.Between(600, 22600), Phaser.Math.Between(0, 800));
	rock3.setPosition(Phaser.Math.Between(600, 22600), Phaser.Math.Between(0, 800));
	beer.setPosition(Phaser.Math.Between(600, 1200), Phaser.Math.Between(0, 800));
	emptyBeer.setPosition(-300, -300);

	this.physics.resume();
	this.background.anims.play('background');
	player.clearTint();
	this.scene.restart();
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


	if (!keyF.isDown){
		player.anims.play('drink');
		isChugging = true;
		// if collide, remove drink!.
		beer.x += 900
	}
}
let collitionCounter = 0;
function hitObstacle(player, stone1) {
	if (isDebug) {
		console.log("COLITION DETECTED!!!", collitionCounter++)
	} else {
		// Basic reaction for now — stop everything
		this.gungk.stop();
		this.ingamemusic.stop();
		isIngamemusicPlaying = false;
		this.dwarfpate.play({volume: mainVolume});
		isGameOver = true;
		this.gameover.visible = true;
		this.finalScore.setText("Final Score:\n" + depth);
		this.finalScore.visible = true;
		this.physics.pause();
		player.setTint(0xff0000);
		console.log("💥 You hit an obstacle!");
		this.time.delayedCall(500, () => {
			this.gitgudorlistentothis.play({loop: true, volume: mainVolume});
			isGitgudorlistentothisPlaying = true;
		  }, [], this);
	}
}
