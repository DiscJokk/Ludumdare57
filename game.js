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

let player, cursors, enemies;

function preload() {
    this.load.image('player', '/Pix/dwa1.png');
    this.load.image('enemy', '/Pix/dwa2.png');
}

function create() {
    player = this.physics.add.image(400, 50, 'player').setImmovable(true);
    player.body.allowGravity = false;
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

    // Listen for C being tapped once
    keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    enemies = this.physics.add.group({
        key: 'enemy',
        repeat: 5,
        setXY: { x: 100, y: 600, stepX: 100 }
    });

    enemies.children.iterate(enemy => {
        enemy.setVelocityY(-100);
    });

    this.physics.add.overlap(player, enemies, hitObstacle, null, this);
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

    if (keyF.isDown) {
        enemies.children.iterate(enemy => {
            enemy.setVelocityY(0); // Enemies rise upward
        });
    } else {
        enemies.children.iterate(enemy => {
            enemy.setVelocityY(-100); // Enemies rise upward
        });
    }

    if (Phaser.Input.Keyboard.JustDown(keyC)) {
        console.log("Chugging away");
    }

    // Reset enemies that go off-screen
    enemies.children.iterate(enemy => {
        if (enemy.y < 0) {
            enemy.y = 600;
            enemy.x = Phaser.Math.Between(50, 750);
        }
    });
}

function hitObstacle(player, enemy) {
    // Basic reaction for now — stop everything
    this.physics.pause();
    player.setTint(0xff0000);
    console.log("💥 You hit an obstacle!");
}