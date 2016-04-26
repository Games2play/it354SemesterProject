var gameOver = function(game){}
 
gameOver.prototype = {
	/*
	preload: function() {
		this.game.load.image("gameover", "assets/gameover.png");
	},
	*/
	init: function (score) {
		//this.scoreText = this.game.add.text(100, 180, "You Scored = " + score.toString(), { font: "30px Arial", fill: "#ffffff" });  
		alert("You scored: "+score)
		//var thisScore = score;
	},
  	create: function(score){
  		var gameOverTitle = this.game.add.sprite(200,160,"gameover");
		gameOverTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(200,320,"play",this.startClick,this);
		playButton.anchor.setTo(0.5,0.5);
		
		
		this.scoreText = this.game.add.text(100, 180, score, { font: "30px Arial", fill: "#ffffff" });  
		//this.scoreText = this.game.add.bitmapText(200, 180, 'flappyfont', '', 18);
		//this.add(this.scoreText);
		
		//this.scoreText.text += score;
		//this.scoreText.setText("You're Score = " + score.toString());

	}
	
	/*
	playTheGame: function(){
		this.game.state.start("main");
	}
	*/
};
gameOver.prototype.startClick = function() {
  this.game.state.start('main');
};