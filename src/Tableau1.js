/**
 * ALGO: ceci est une classe...
 * Vous verrez ça plus tard en détail avec Rémi, pour l'instant on n'a pas trop besoin de savoir à quoi ça sert.
 */
class Tableau1 extends Phaser.Scene{
    /**
     * Précharge les assets
     */
    preload(){
        //bg 2 (tout au fond et très flou)
        this.load.image('Fond','image/Valley Small Road Fresh Simple Background.png')

        //bg 1 (gris légèrement flou)


        //ground (premier plan noir)

        this.load.image('fil','image/filante.png')
        this.load.image('ovni','image/ovni.png')
        this.load.image('virevolant','image/virevolant.png')
        this.load.image('meteorite','image/meteorite_gif.gif')
        this.load.image('plane','image/planes/plane_1/plane_1_blue.png')
        this.load.image('torpedo','image/planes/torpedo/torpedo_black.png')
        this.load.image('idleAlien','image/alien/idle.png')
        this.load.audio('bombe','image/sound/bombe.mp3')
        this.load.audio('thunder','image/sound/thunder.mp3')
        this.load.audio('fireworkS','image/sound/firework.mp3')
        this.load.audio('bell','image/sound/bell.mp3')
        this.load.audio('ufo','image/sound/ufo.mp3')
        this.load.audio('night','image/sound/night.mp3')
        this.load.audio('planeS','image/sound/plane.mp3')
        this.load.audio('alienS','image/sound/alien.mp3')
        this.load.audio('meteoriteS','image/sound/meteoriteS.mp3')

        //au lieu d'écrire 5 lignes quasi identiques, on charge l'herbe avec une boucle
        // ALGO : ceci est une boucle
        for(let i=1;i<=6;i++){
            this.load.image('star-'+i,'image/star/star-'+i+'.png')
        }
        for(let i=1;i<=4;i++){
            this.load.image('cow-walk-'+i,'image/cow/cow-walk-'+i+'.png')
        }

        for(let i=1;i<=13;i++){
            this.load.image('firework'+i,'image/firework/blueFirework/firework'+i+'.png')
        }

        for(let i=1;i<=13;i++){
            this.load.image('Yfirework'+i,'image/firework/yellowFirework/firework'+i+'.png')
        }

        for(let i=1;i<=13;i++){
            this.load.image('Pfirework'+i,'image/firework/purpleFirework/firework'+i+'.png')
        }

        for(let i=1;i<=13;i++){
            this.load.image('Gfirework'+i,'image/firework/greenFirework/firework'+i+'.png')
        }

        for(let i=1;i<=5;i++){
            this.load.image('eclair'+i,'image/éclair/eclair'+i+'.png')
        }

        for(let i=1;i<=6;i++){
            this.load.image('alien-walk-'+i,'image/alien/walk/walk'+i+'.png')
        }

        for(let i=1;i<=4;i++){
            this.load.image('llama-walk-'+i,'image/llama/llama-walk-'+i+'.png')
        }

        for(let i=1;i<=7;i++){
            this.load.image('jump'+i,'image/alien/jump/jump'+i+'.png')
        }

        for(let i=1;i<=4;i++){
            this.load.image('pig-walk-'+i,'image/pig/pig-walk-'+i+'.png')
        }

        for(let i=1;i<=3;i++){
            this.load.image('frame'+i,'image/rain/frame'+i+'.png')
        }

        for(let i=1;i<=5;i++){
            this.load.image('frame-'+i,'image/snow/frame-'+i+'.png')
        }

        for(let i=1;i<=4;i++){
            this.load.image('sheep-walk-'+i,'image/sheep/sheep-walk-'+i+'.png')
        }

        for(let i=1;i<=4;i++){
            this.load.image('chicken-walk-'+i,'image/chiken/chicken-walk-'+i+'.png')
        }


        for(let i=1;i<=9;i++){
            this.load.image('explosion_0'+i,'image/explosion_effect/keyframes/explosion_0'+i+'.png')
        }
        for(let i=1;i<=3;i++){
            this.load.image('meteorite-'+i,'image/meteorite/meteorite-'+i+'.png')
        }
    }
    getFrames(prefix,length){
        let frames=[];
        for (let i=1;i<=length;i++){
            frames.push({key: prefix+i});
        }
        return frames;
    }
    /**
     * Crée la scène
     * TODO élèves : reproduire à l'identique assets/level/00-preview-example/sample1.jpg
     * TODO élèves : plus tard, continuez le décor vers la droite en vous servant des assets mis à votre disposition
     */
    create(){

        /**
         * Fond très clair avec une trame
         * @type {Phaser.GameObjects.Sprite}
         */


        //--------------background 2 (tout au fond et flou)--------------------

        /**
         * contient tous les éléments du background 2 (gris clair très flou)
         * @type {Phaser.GameObjects.Container}
         * @see https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Container.html
         */
        this.bg2Container=this.add.container(0,0);
        /**
         * Terrain dans bg2
         * @type {Phaser.GameObjects.Image}
         */
        let Fond=this.add.image(-0,0, 'Fond').setOrigin(0,0);
        this.bg2Container.add(Fond);


        //--------------background 1 (gris) --------------------

        /**
         * contient tous les éléments du background 1 (gris)
         * @type {Phaser.GameObjects.Container}
         */
        this.bg1Container=this.add.container(0,0);


        //-------------ground (premier plan noir)---------------------------

        /**
         * contient tous les éléments du premier plan (noir)
         * @type {Phaser.GameObjects.Container}
         */
        this.groundContainer=this.add.container(0,0);

        this.plane = this.add.sprite(-200,100, 'plane').setOrigin(0,0);
        this.plane.setScale(0.1)


        this.torpedo = this.add.sprite(100,150, 'torpedo').setOrigin(0,0);
        this.torpedo.setScale(0.1)
        this.torpedo.visible = false;

        this.filant = this.add.sprite(800,0, 'fil').setOrigin(0,0);
        //this.groundContainer.add(filant);



        this.virevolant = this.add.image(1200,700, 'virevolant').setOrigin(0,0);
        this.virevolant.setScale(0.3)

        this.idleAlien = this.add.image(400,680, 'idleAlien').setOrigin(0,0);
        this.idleAlien.setScale(0.2)
        this.idleAlien.visible=false;


        /**
         * filtre type Rain au premier plan
         * @type {Phaser.GameObjects.Sprite}
         */

        this.star = this.add.sprite(0, 0, 'star-1').setOrigin(0,0);
        this.anims.create({
            key: 'star',
            frames: this.getFrames('star-',6),
            frameRate: 8,
            repeat: -1

        });
        this.bombe = this.sound.add('bombe');
        this.thunder = this.sound.add('thunder');
        this.fireworkS = this.sound.add('fireworkS');
        this.bell = this.sound.add('bell');
        this.ufo = this.sound.add('ufo');
        this.night = this.sound.add('night');
        this.planeS = this.sound.add('planeS');
        this.alienS = this.sound.add('alienS');
        this.meteoriteS = this.sound.add('meteoriteS');

        this.night.play()
        this.night.setLoop(true);

        this.ovni = this.add.sprite(100,50, 'ovni').setOrigin(0,0);
        this.ovni.setScale(0.01)


        this.star.play('star');
        this.star.setScale(0.5);
        this.star.visible = false;


        this.explosion = this.add.sprite(0, 150, 'explosion_01').setOrigin(0,0);
        this.anims.create({
            key: 'explosion',
            frames: this.getFrames('explosion_0',9),
            frameRate: 8,
            repeat: 0

        });
        this.explosion.visible=false
        this.explosion.setScale(0.3);

        this.meteorite = this.add.sprite(-100, -300, 'meteorite-1').setOrigin(0,0);
        this.anims.create({
            key: 'meteorite',
            frames: this.getFrames('meteorite-',3),
            frameRate: 8,
            repeat: -1

        });
        this.meteorite.play('meteorite')
        this.meteorite.setScale(0.3);

        this.cowWalk = this.add.sprite(700, 750, 'cow-walk-1').setOrigin(0,0);
        this.anims.create({
            key: 'cow-walk',
            frames: this.getFrames('cow-walk-',4),
            frameRate: 8,
            repeat: -1

        });
        this.cowWalk.play('cow-walk')

        this.chickenWalk = this.add.sprite(700, 780, 'chicken-walk-1').setOrigin(0,0);
        this.anims.create({
            key: 'chicken-walk',
            frames: this.getFrames('chicken-walk-',4),
            frameRate: 8,
            repeat: -1

        });
        this.chickenWalk.play('chicken-walk')

        this.llamaWalk = this.add.sprite(700, 780, 'llama-walk-1').setOrigin(0,0);
        this.anims.create({
            key: 'llama-walk',
            frames: this.getFrames('llama-walk-',4),
            frameRate: 8,
            repeat: -1

        });
        this.llamaWalk.play('llama-walk')

        this.pigWalk = this.add.sprite(700, 850, 'pig-walk-1').setOrigin(0,0);
        this.anims.create({
            key: 'pig-walk',
            frames: this.getFrames('pig-walk-',4),
            frameRate: 8,
            repeat: -1

        });
        this.pigWalk.play('pig-walk')

        this.sheepWalk = this.add.sprite(700, 870, 'sheep-walk-1').setOrigin(0,0);
        this.anims.create({
            key: 'sheep-walk',
            frames: this.getFrames('sheep-walk-',4),
            frameRate: 8,
            repeat: -1

        });
        this.sheepWalk.play('sheep-walk')

        this.alienWalk = this.add.sprite(700, 680, 'alien-walk-1').setOrigin(0,0);
        this.anims.create({
            key: 'alien-walk',
            frames: this.getFrames('alien-walk-',6),
            frameRate: 8,
            repeat: -1

        });
        this.alienWalk.play('alien-walk')
        this.alienWalk.setScale(0.2)

        this.alienFire = this.add.sprite(400, 680, 'jump1').setOrigin(0,0);
        this.anims.create({
            key: 'fire',
            frames: this.getFrames('jump',7),
            frameRate: 8,
            repeat: 0

        });
        this.alienFire.play('fire')
        this.alienFire.setScale(0.2)
        this.alienFire.visible=false;

        this.firework = this.add.sprite(400, 280, 'firework1').setOrigin(0,0);
        this.anims.create({
            key: 'firework',
            frames: this.getFrames('firework',13),
            frameRate: 8,
            repeat: 0

        });
        this.firework.play('firework')
        this.firework.setScale(1)
        this.firework.visible=false;

        this.Yfirework = this.add.sprite(200, 210, 'Yfirework1').setOrigin(0,0);
        this.anims.create({
            key: 'Yfirework',
            frames: this.getFrames('Yfirework',13),
            frameRate: 8,
            repeat: 0

        });
        this.Yfirework.play('Yfirework')
        this.Yfirework.setScale(1)
        this.Yfirework.visible=false;

        this.Pfirework = this.add.sprite(100, 510, 'Pfirework1').setOrigin(0,0);
        this.anims.create({
            key: 'Pfirework',
            frames: this.getFrames('Pfirework',13),
            frameRate: 8,
            repeat: 0

        });
        this.Pfirework.play('Pfirework')
        this.Pfirework.setScale(1)
        this.Pfirework.visible=false;

        this.Gfirework = this.add.sprite(300, 310, 'Gfirework1').setOrigin(0,0);
        this.anims.create({
            key: 'Gfirework',
            frames: this.getFrames('Gfirework',13),
            frameRate: 8,
            repeat: 0

        });
        this.Gfirework.play('Gfirework')
        this.Gfirework.setScale(1)
        this.Gfirework.visible=false;



        this.rain = this.add.sprite(0, 0, 'frame1').setOrigin(0,0);
        this.anims.create({
            key: 'rain',
            frames: this.getFrames('frame',3),
            frameRate: 16,
            repeat: -1

        });
        this.rain.setScale(1.8)
        this.rain.play('rain')
        this.rain.visible=false;

        this.snow = this.add.sprite(0, 0, 'frame-1').setOrigin(0,0);
        this.anims.create({
            key: 'snow',
            frames: this.getFrames('frame-',5),
            frameRate: 16,
            repeat: -1

        });
        this.snow.setScale(1.8)
        this.snow.play('snow')
        this.snow.visible=false;

        this.eclair = this.add.sprite(0, 0, 'eclair1').setOrigin(0,0);
        this.anims.create({
            key: 'eclair',
            frames: this.getFrames('eclair',5),
            frameRate: 16,
            repeat: 0

        });
        this.eclair.setScale(1.2)
        this.eclair.play('eclair')
        this.eclair.visible=false;


        //TODO élève faire une animation du même genre que filter mais pour bgAnimationA

        //gestion du parallaxe
        /**
         * Vitesse de déplacement du décor
         * @type {number}
         */
        this.speed=0;
        //initialise ce qui se passe avec le clavier
        this.initKeyboard();
        // Définit l'espace de déplacement de la caméra
        this.cameras.main.setBounds(0, 0, 1080, 540);
        //définit à quelles vitesse se déplacent nos différents plans
        this.bg2Container.scrollFactorX=0;
        this.bg1Container.scrollFactorX=0;
        this.groundContainer.scrollFactorX=0;
    }
    /**
     * Définit ce qui se passe quand on appuie ou relache une touche du clavier
     * ALGO : ceci est une fonction ou méthode
     */
    initKeyboard(){
        let me=this;
        this.input.keyboard.on('keydown', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.speed=1;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.speed=-1;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.A:

                        me.tweens.add({
                            targets: me.filant,
                            x: -200,
                            y: 200,
                            duration: 1000,
                            ease: 'Linear',
                            repeat: 0,
                            delay: 0,
                            onComplete: function () {
                                me.filant.x = 800;
                                me.filant.y = 0;
                                me.sound.play('bell')
                            }
                    });

                    break;
                case Phaser.Input.Keyboard.KeyCodes.Z:
                    me.sound.play('ufo')
                    if (me.ovni.x == 100) {
                            me.tweens.add({
                                targets: me.ovni,
                                x: 0,
                                y: 0,
                                scale: 0.5,
                                duration: 200,
                                ease: 'Linear',
                                repeat: 0,
                                delay: 0,
                                callbackScope: me.ovni
                            });
                    }
                    if (me.ovni.x == 0) {
                        me.tweens.add({
                            targets: me.ovni,
                            x: 100,
                            y: 50,
                            scale: -0.5,
                            duration: 200,
                            ease: 'Linear',
                            repeat: 0,
                            delay: 0,
                            callbackScope: me.ovni
                        });
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.E:
                    me.tweens.add({
                        targets: me.virevolant,
                        x: { value: -600, duration: 5000, ease: 'Power2' },
                        y: { value: 400, duration: 2500, ease: 'Bounce.easeIn' },
                        ease: 'Linear',
                        repeat: 0,
                        delay: 0,
                        onComplete: function () {
                            me.virevolant.x = 800;
                            me.virevolant.y = 700;
                        }
                    });
                    break;
                case Phaser.Input.Keyboard.KeyCodes.R:
                    me.star.visible = true
                    break;
                case Phaser.Input.Keyboard.KeyCodes.T:
                    me.sound.play('planeS')
                    me.tweens.add({
                        targets: me.plane,
                        x: 1000,
                        y: 100,
                        duration : 4000,
                        ease: 'Linear',
                        repeat: 0,
                        delay: 0,
                        onComplete: function () {
                            me.plane.x = -200;
                        }
                    });
                    break;
                case Phaser.Input.Keyboard.KeyCodes.U:
                    me.tweens.add({
                        targets: me.meteorite,
                        x: 900,
                        y: 500,
                        duration : 2000,
                        ease: 'Linear',
                        repeat: 0,
                        delay: 0,
                        onComplete: function () {
                            me.meteorite.x = -100;
                            me.meteorite.y = -300;
                        }
                    });

                    break;
                case Phaser.Input.Keyboard.KeyCodes.I:
                    me.tweens.add({
                        targets: me.cowWalk,
                        x: 200,
                        y: 750,
                        duration : 3000,
                        ease: 'Linear',
                        repeat: 0,
                        delay: 0,
                        onComplete: function () {
                            me.cowWalk.stop('cow-walk')
                        }
                    });
                    break;

                    case Phaser.Input.Keyboard.KeyCodes.Y:
                    if (me.alienWalk.x==700) {
                        me.alienWalk.flipX=true;
                        me.tweens.add({
                            targets: me.alienWalk,
                            x: 400,
                            y: 680,
                            duration: 4000,
                            ease: 'Linear',
                            repeat: 0,
                            delay: 0,
                            onComplete: function () {
                                me.alienWalk.stop('alien-walk')
                                me.alienWalk.visible = false;
                                me.idleAlien.visible = true;
                                me.sound.play('alienS')
                            }
                        });
                    }
                    if (me.alienWalk.x==400){
                        me.alienWalk.visible=true;
                        me.idleAlien.visible=false;
                        me.alienWalk.flipX=false;
                        me.alienWalk.play('alien-walk')
                        me.tweens.add({
                            targets: me.alienWalk,
                            x: 700,
                            y: 680,
                            duration: 4000,
                            ease: 'Linear',
                            repeat: 0,
                            delay: 0,
                            onComplete: function () {
                                me.alienWalk.flipX=true;
                                me.idleAlien.visible=false;
                            }
                        });
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.O:
                    me.tweens.add({
                        targets: me.chickenWalk,
                        x: 200,
                        y: 780,
                        duration : 3000,
                        ease: 'Linear',
                        repeat: 0,
                        delay: 0,
                        onComplete: function () {
                            me.chickenWalk.stop('chicken-walk')
                        }
                    });
                    break;
                    case Phaser.Input.Keyboard.KeyCodes.P:
                    me.tweens.add({
                        targets: me.llamaWalk,
                        x: 200,
                        y: 780,
                        duration : 3000,
                        ease: 'Linear',
                        repeat: 0,
                        delay: 0,
                        onComplete: function () {
                            me.llamaWalk.stop('llama-walk')
                        }
                    });
                    break;
                    case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.tweens.add({
                        targets: me.pigWalk,
                        x: 200,
                        y: 850,
                        duration : 3000,
                        ease: 'Linear',
                        repeat: 0,
                        delay: 0,
                        onComplete: function () {
                            me.pigWalk.stop('pig-walk')
                        }
                    });
                    break;
                    case Phaser.Input.Keyboard.KeyCodes.S:
                    me.tweens.add({
                        targets: me.sheepWalk,
                        x: 200,
                        y: 870,
                        duration : 3000,
                        ease: 'Linear',
                        repeat: 0,
                        delay: 0,
                        onComplete: function () {
                            me.sheepWalk.stop('sheep-walk')
                        }
                    });
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.rain.visible=true;
                    me.snow.visible=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.F:
                    me.snow.visible=true;
                    me.rain.visible=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.G:
                    me.snow.visible=false;
                    me.rain.visible=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.H:
                    me.eclair.visible=true;
                    me.eclair.play('eclair')
                    me.sound.play('thunder')
                    break;
                case Phaser.Input.Keyboard.KeyCodes.J:
                    me.firework.visible=true;
                    me.firework.play('firework')
                    me.sound.play('fireworkS')
                    break;
                case Phaser.Input.Keyboard.KeyCodes.K:
                    me.Yfirework.visible=true;
                    me.Yfirework.play('Yfirework')
                    me.sound.play('fireworkS')
                    break;
                case Phaser.Input.Keyboard.KeyCodes.L:
                    me.Pfirework.visible=true;
                    me.Pfirework.play('Pfirework')
                    me.sound.play('fireworkS')
                    break;

                    case Phaser.Input.Keyboard.KeyCodes.M:
                    me.Gfirework.visible=true;
                    me.Gfirework.play('Gfirework')
                        me.sound.play('fireworkS')
                    break;


                    case Phaser.Input.Keyboard.KeyCodes.ENTER:
                    if (me.plane.x>0 && me.plane.x<900) {
                        me.torpedo.visible=true;
                        me.torpedo.x=me.plane.x;
                        me.explosion.x=me.plane.x+150;
                        me.explosion.y=me.plane.y+550;
                        me.tweens.add({
                            targets: me.torpedo,
                            x: me.plane.x+200,
                            y: me.plane.y+600,
                            duration : 2000,
                            ease: 'Linear',
                            repeat: 0,
                            delay: 0,
                            onComplete: function () {
                                me.torpedo.visible=false;
                                me.torpedo.y=150;
                                me.explosion.visible=true;
                                me.explosion.play('explosion');
                                me.sound.play('bombe')
                            }
                        });
                    }
                    if (me.cowWalk.x==200 && me.ovni.x==0){
                        me.tweens.add({
                            targets: me.cowWalk,
                            x: 220,
                            y: 250,
                            scale: 0.1,
                            duration: 500,
                            ease: 'Linear',
                            repeat: 0,
                            delay: 0,
                            callbackScope: me.cowWalk,
                            onComplete: function () {
                                me.cowWalk.x=700
                                me.cowWalk.y=750
                                me.cowWalk.setScale(1)
                                me.cowWalk.play('cow-walk')
                            }
                        });
                    }
                    if (me.chickenWalk.x==200 && me.ovni.x==0){
                        me.tweens.add({
                            targets: me.chickenWalk,
                            x: 220,
                            y: 250,
                            scale: 0.1,
                            duration: 500,
                            ease: 'Linear',
                            repeat: 0,
                            delay: 0,
                            callbackScope: me.chickenWalk,
                            onComplete: function () {
                                me.chickenWalk.x=700
                                me.chickenWalk.y=750
                                me.chickenWalk.setScale(1)
                                me.chickenWalk.play('chicken-walk')
                            }
                        });
                    }
                    if (me.llamaWalk.x==200 && me.ovni.x==0){
                        me.tweens.add({
                            targets: me.llamaWalk,
                            x: 220,
                            y: 250,
                            scale: 0.1,
                            duration: 500,
                            ease: 'Linear',
                            repeat: 0,
                            delay: 0,
                            callbackScope: me.llamaWalk,
                            onComplete: function () {
                                me.llamaWalk.x=700
                                me.llamaWalk.y=750
                                me.llamaWalk.setScale(1)
                                me.llamaWalk.play('llama-walk')
                            }
                        });
                    }
                    if (me.pigWalk.x==200 && me.ovni.x==0){
                        me.tweens.add({
                            targets: me.pigWalk,
                            x: 220,
                            y: 250,
                            scale: 0.1,
                            duration: 500,
                            ease: 'Linear',
                            repeat: 0,
                            delay: 0,
                            callbackScope: me.pigWalk,
                            onComplete: function () {
                                me.pigWalk.x=700
                                me.pigWalk.y=850
                                me.pigWalk.setScale(1)
                                me.pigWalk.play('pig-walk')
                            }
                        });
                    }
                    if (me.sheepWalk.x==200 && me.ovni.x==0){
                        me.tweens.add({
                            targets: me.sheepWalk,
                            x: 220,
                            y: 250,
                            scale: 0.1,
                            duration: 500,
                            ease: 'Linear',
                            repeat: 0,
                            delay: 0,
                            callbackScope: me.sheepWalk,
                            onComplete: function () {
                                me.sheepWalk.x=700
                                me.sheepWalk.y=870
                                me.sheepWalk.setScale(1)
                                me.sheepWalk.play('sheep-walk')
                            }
                        });
                    }
                        if (me.alienWalk.x==400){
                            me.idleAlien.visible=false;
                            me.alienFire.visible=true;
                            me.alienFire.play('fire');

                            me.tweens.add({
                                targets: me.alienFire,
                                x: 400,
                                y: 650,
                                duration: 1000,
                                ease: 'Linear',
                                yoyo: true,
                                repeat: 0,
                                delay: 0,
                                onComplete: function () {
                                    me.idleAlien.visible=true;
                                    me.alienFire.visible=false;
                                }
                            });
                        }

            }

        });
        this.input.keyboard.on('keyup', function(kevent)
        {
            switch (kevent.keyCode)
            {
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.speed=0;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.R:
                    me.star.visible = false
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:

                    break;
            }
        });
    }


    /**
     * Cette fonction s'exécute en boucle (à peu près 60 fois par secondes)
     */
    update(){
        //déplacement de la caméra
        this.cameras.main.scrollX+=this.speed; // on aurait pu écrire : this.cameras.main.scrollX= this.cameras.main.scrollX + this.speed;

        //petit effet de vibrance sur le filtre film au tout premier plan
        //this.filterFilm.setAlpha(Phaser.Math.Between(95,100)/100)

        //if(Phaser.Math.Between(0,500)===50){





        }
    //}


}
