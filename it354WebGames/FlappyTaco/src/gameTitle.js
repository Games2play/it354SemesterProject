var gameTitle = function(game){}
 
gameTitle.prototype = {
  	create: function(){
		this.background = this.game.add.sprite(0, 0, "background");
		var playButton = this.game.add.button(200,245,"play",this.playTheGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("main");
	}
}