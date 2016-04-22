var gameOver = function(game){}
 
gameOver.prototype = {
	preload: function() {
		this.game.load.image("background", "assets/gameover.png");
	},
	init: function(score){
		alert("You scored: "+score)
	},
  	create: function(){
  		var gameOverTitle = this.game.add.sprite(200,160,"gameover");
		gameOverTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(200,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("main");
	}
}