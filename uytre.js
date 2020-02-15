var config = {
    type: Phaser.WEBGL,
    width: 500,
    height: 727,
    backgroundColor: '#00000',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var asteroid;
var game = new Phaser.Game(config);
var timer = 5;
var invincible = false;
function preload ()
{
    this.load.image('power', 'assets/sta.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ship', 'assets/ship.png');
    this.load.image('asteroid', 'assets/asteroid.png');
}

function create ()
{   
    this.random_x2 = Phaser.Math.Between(0, config.width);
    this.add.image(250, 363.5, 'sky');
    this.leftKey = this.input.keyboard.addKey('LEFT');
    this.rightKey = this.input.keyboard.addKey('RIGHT');
    this.spaceKey = this.input.keyboard.addKey('SPACE');
    this.ship1 = this.add.image(config.width / 2, config.height / 2, "ship");
    this.ship1.x = config.width / 2;
    this.ship1.y = config.height - 30;
    this.ship1.width = 50;
    this.ship1.height = 50;
    //for(i=0; i<4;i++){
    // this.asteroid1 = this.add.image(i* 50, 100, 'asteroid')};
    this.power1 = this.add.image(300, -1300, 'power');
    this.power1.width = 50;
    this.power1.height = 50;
    this.asteroid1 = this.add.image(540, -20, 'asteroid');
    this.asteroid1.width = 50;
    this.asteroid1.height = 50;
    this.scoreText = this.add.text(375, 20, 'ALIVE', { fontSize: '32px', fill: '#fff' });
   
}

function update (time, delta)

{
    
    this.random_x = Phaser.Math.Between(0, config.width);
    if (this.asteroid1.y  > config.height + 40) {
        this.asteroid1.y = -20;
        this.asteroid1.x = this.random_x;
    } else if (this.asteroid1.y  < config.height + 41) {
        this.asteroid1.y += 2;
    }

     if (this.power1.y  > config.height + 40) {
        this.power1.y = -1300;
        this.power1.x = this.random_x;
    } else if (this.power1.y  < config.height + 41) {
         this.power1.y += 2;

    }
    if (invincible == false){
    if (this.ship1.x < this.asteroid1.x + this.asteroid1.width &&
        this.ship1.x + this.ship1.width > this.asteroid1.x &&
        this.ship1.y < this.asteroid1.y + this.asteroid1.height &&
        this.ship1.y + this.ship1.height > this.asteroid1.y){
            console.log("Dead");
            this.scoreText.y = config.height / 2;
            this.scoreText.x = 175;
            this.ship1.x = 1000000000000000;
            this.scoreText.setText('Game Over');
            this.ship1.destroy(true);
        }
    }
        if (this.ship1.x < this.power1.x + this.power1.width &&
            this.ship1.x + this.ship1.width > this.power1.x &&
            this.ship1.y < this.power1.y + this.power1.height &&
            this.ship1.y + this.ship1.height > this.power1.y){
                
                console.log("Immortal");
                this.scoreText.setText('Immortal');
                invincible = true;
                timer--;
                if(timer === 0){
                    this.scoreText.setText('ALIVE');
                    console.log("ALIVE");
                    invincible = false;
                }
                this.scoreText.x = 325;
            }

    if(this.leftKey.isDown && this.ship1.x < 40) {
    } else if(this.leftKey.isDown) {
      this.ship1.x -= 8;
    }
    if(this.rightKey.isDown && this.ship1.x > config.width - 40) {
    } else if(this.rightKey.isDown) {
      this.ship1.x += 8;
    }
    if(this.spaceKey.isDown && this.ship1.x > config.width - 40) {
    } else if(this.spaceKey.isDown) {
      this.asteroid1.y += 8;
    }
}