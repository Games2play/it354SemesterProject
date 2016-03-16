var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

var mainState = {

    preload: function() { 
        //game.stage.backgroundColor = '#71c5cf';
		game.load.image("background", "assets/background.png");
		
        game.load.spritesheet('taco', 'assets/flying_taco_big.png', 50, 50);  
        game.load.image('log', 'assets/log.png'); 

        // Load the jump sound
        game.load.audio('jump', 'assets/jump.wav');     
    },

    create: function() { 
        background = game.add.tileSprite(0, 0, 1000, 600, "background");
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		// Groups the log obstacle together
        this.logs = game.add.group();
        this.logs.enableBody = true;
        this.logs.createMultiple(20, 'log');  
        this.timer = this.game.time.events.loop(1500, this.addRowOflogs, this);           
		
		// Places the taco into the game
        this.taco = this.game.add.sprite(100, 245, 'taco');
        game.physics.arcade.enable(this.taco);
        this.taco.body.gravity.y = 1000; 
		this.taco.animations.add('flying', [0,1],10,true);
		this.taco.play('flying');

        // New anchor position
        this.taco.anchor.setTo(-0.2, 0.5); 
 
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 

        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });  

        // Add the jump sound
        this.jumpSound = this.game.add.audio('jump');
    },

    update: function() {
        if (this.taco.inWorld == false)
            this.restartGame(); 

        game.physics.arcade.overlap(this.taco, this.logs, this.hitlog, null, this); 

        // Slowly rotate the taco downward, up to a certain point.
        if (this.taco.angle < 20)
            this.taco.angle += 1;     
    },

    jump: function() {
        // If the taco is dead, he can't jump
        if (this.taco.alive == false)
            return; 

        this.taco.body.velocity.y = -350;

        // Jump animation
        game.add.tween(this.taco).to({angle: -20}, 100).start();

        // Play sound
        this.jumpSound.play();
    },

    hitlog: function() {
        // If the taco has already hit a log, we have nothing to do
        if (this.taco.alive == false)
            return;
            
        // Set the alive property of the taco to false
        this.taco.alive = false;

        // Prevent new logs from appearing
        this.game.time.events.remove(this.timer);
    
        // Go through all the logs, and stop their movement
        this.logs.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    restartGame: function() {
        game.state.start('main');
    },

    addOnelog: function(x, y) {
        var log = this.logs.getFirstDead();

        log.reset(x, y);
        log.body.velocity.x = -200;  
        log.checkWorldBounds = true;
        log.outOfBoundsKill = true;
    },

    addRowOflogs: function() {
        var hole = Math.floor(Math.random()*5)+1;
        
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1) 
                this.addOnelog(400, i*60+10);   
    
        this.score += 1;
        this.labelScore.text = this.score;  
    },
};

game.state.add('main', mainState);  
game.state.start('main'); 