app.controller("Preloader", 
  ["$scope",
  "currentAuth",
  "GetUser",
  function($scope, currentAuth, GetUser) {

    var user = GetUser.getUser();
    var enemy;
    var player;
    var bullet;

    // Sends the user back to their profile to get their firebase id
    if (user === undefined) {
      window.location = '#/bandpro';
      location.reload();
    }
    else {

      enemy = user.assets.enemy;
      player = user.assets.player;
      bullet = user.assets.bullet;

      PhaserGame.Preloader = function (game) {

      };

      PhaserGame.Preloader.prototype = {
        preload: function () {
          //Load the elements from the Boot.js for the splash screen
          this.load.tilemap('title', 'assets/title-screen.json', null, Phaser.Tilemap.TILED_JSON);
          this.load.image('tanks', enemy, 32, 32);

          //Load the rest of the element for our game
          //This adds the json file from tiles of the map and my images
          this.load.tilemap('map', 'assets/river-defense.json', null, Phaser.Tilemap.TILED_JSON);
          this.load.image('terrain', 'assets/terrain_atlas.png');
          this.load.image('turrets', player);

          for (var i = 1; i < 32; i++) {
            this.load.image('tank' + i, 'assets/enemy' + i + '.png');
          }

          for ( i = 1; i < 9; i++) {
            this.load.image('turret' + i, 'assets/turret' + i + '.png');
          }

          this.load.image('bullet', 'https://s3.amazonaws.com/fames/6ef257e8-a4b1-4559-85a5-1d9942e3ee27/diamond.png');
          this.load.image('bullet1', bullet);

          this.load.spritesheet('explosion', 'assets/explosion192.png', 192, 192);
          this.load.image('coin', 'assets/coin64.png');
          this.load.audio('menuBackgroundMusic', 'assets/superhappycheesyloop1of2.wav');
          this.load.audio('backgroundMusic', 'assets/superhappycheesyloop2of2.wav');
          this.load.audio('cashRegister', 'assets/cash-register.mp3');
          this.load.audio('explosion', 'assets/explosion.wav');
          this.load.audio('shot', 'assets/gun-shot.wav');

          var welcome = game.add.text(100, 100, 'coming...', {font: '30px Courier', fill: '#eeeeee'});


        },

        create: function () {

          this.state.start('MainMenu');

        }
      };

      game.state.add('Preloader', PhaserGame.Preloader);

    }
  }
]);





