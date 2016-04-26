var preload = function(game){
	
}

preload.prototype = {
	preload: function(){ 
		this.game.load.image("play","assets/start.png");
		
		//load all game stuff
		this.game.load.image("background", "assets/background.png");
        this.game.load.spritesheet('taco', 'assets/flying_taco_big.png', 50, 50);  
        this.game.load.image('log', 'assets/log.png'); 
		this.load.spritesheet('pipe', 'assets/pipes.png', 54,320,2);  
        // Load the jump sound
        this.game.load.audio('jump', 'assets/jump.wav');
		
		this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
		this.asset.anchor.setTo(0.5, 0.5);
		
		this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
		this.load.setPreloadSprite(this.asset);
		
		this.game.load.image("gameover", "assets/gameover.png");
		
		this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');
	},
  	create: function(){
		//this.background = game.add.tileSprite(0, 0, 1000, 600, "background");
		//this.background = this.game.add.sprite(0, 0, "background");
	},
	update: function() {
      if(!!this.ready) {
        this.game.state.start('GameTitle');
      }
    },
	onLoadComplete: function() {
      this.ready = true;
    }
}