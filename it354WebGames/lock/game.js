// the game itself
var game;
// a selection of colors to be randomly picked and set as background color
var bgColors = [0x62bd18, 0xff5300, 0xd21034, 0xff475c, 0x8f16b2, 0x588c7e, 0x8c4646];
// lock rotatiokn speed
var rotationSpeed = 3;

window.onload = function() {
     // creation of the game
	game = new Phaser.Game(640, 960, Phaser.AUTO, "");
     // creation of the main (and only) game state
     game.state.add("PlayGame", playGame);
     // starting "PlayGame" game state
     game.state.start("PlayGame");
}

var playGame = function(game){};
playGame.prototype = {
     preload: function(){
          // preloading the images we are going to use
          // the ball
          game.load.image("ball", "ball.png");
          // the rotating bar
          game.load.image("bar", "bar.png");
          // the ring
          game.load.image("ring", "ring.png"); 
     },  
     create: function(){   
          // center the game horizontally 
          game.scale.pageAlignHorizontally = true;
          // center the game vertically
		game.scale.pageAlignVertically = true;
          // setting the scale mode to cover the largest part of the screen possible while showing the entire game
          game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          // picking a random item in bgColors array
          var tintColor = game.rnd.pick(bgColors);
          // setting the document background color to tint color
          document.body.style.background = "#"+tintColor.toString(16);
          // setting the game background color to tint color
          game.stage.backgroundColor = tintColor;
          // placing the ring in the center of the canvas
          var ring = game.add.sprite(game.width / 2, game.height / 2, "ring");
          // setting ring anchor point to its middle
          ring.anchor.set(0.5);
          // setting it to half/transparent
          ring.alpha = 0.5;
          // placing the ball, no matter where as we will change its position later
          this.ball = game.add.sprite(0, 0, "ball");
          // setting ball anchor point to its middle
          this.ball.anchor.set(0.5);
          // this function will place the ball in a random spot around the ring
          this.placeBall();         
          // placing the bar in the middle of the canvas
          this.bar = game.add.sprite(game.width / 2, game.height / 2, "bar");
          // setting bar anchor point
          this.bar.anchor.set(0.5, 1);
          // setting bar rotation direction
          this.bar.rotationDirection = 0;
          // waiting for a game input then call startMoving function
          game.input.onDown.add(this.startMoving, this);
     },
     placeBall: function(){
          // choosing a random angle between -180 and 180 then turning it into radians
          this.ball.ballAngle = Phaser.Math.degToRad(game.rnd.angle());  
          // placing the ball accordingly thanks to trigonometry
          this.ball.x = game.width / 2 + 175 * Math.cos(this.ball.ballAngle);
          this.ball.y = game.height / 2 + 175 * Math.sin(this.ball.ballAngle);  
     },
     startMoving: function(){
          // removing the old input listener
          game.input.onDown.remove(this.startMoving, this);
          // adding a new input listener calling changeDirection function  
          game.input.onDown.add(this.changeDirection, this);
          // setting rotation direction
          this.bar.rotationDirection = 1;     
     },
     changeDirection: function(){
          // inverting rotation direction
          this.bar.rotationDirection *= -1;
          // placing the ball elsewhere
          this.placeBall();
     },
     update: function(){
          // moving the bar according to its rotation speed
          this.bar.angle += rotationSpeed * this.bar.rotationDirection; 
     }
}