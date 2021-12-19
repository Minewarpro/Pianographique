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


        //au lieu d'écrire 5 lignes quasi identiques, on charge l'herbe avec une boucle
        // ALGO : ceci est une boucle
        for(let i=1;i<=6;i++){
            this.load.image('star-'+i,'image/star/star-'+i+'.png')
        }
        for(let i=1;i<=4;i++){
            this.load.image('cow-walk-'+i,'image/cow/cow-walk-'+i+'.png')
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

        this.ovni = this.add.sprite(100,50, 'ovni').setOrigin(0,0);
        this.ovni.setScale(0.01)

        this.virevolant = this.add.image(1200,700, 'virevolant').setOrigin(0,0);
        this.virevolant.setScale(0.3)

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

        this.chickenWalk = this.add.sprite(0, 0, 'chicken-walk-1').setOrigin(0,0);
        this.anims.create({
            key: 'chicken-walk',
            frames: this.getFrames('chicken-walk-',4),
            frameRate: 8,
            repeat: -1

        });
        this.chickenWalk.play('chicken-walk')

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
                            x: -700,
                            y: 200,
                            duration: 2000,
                            ease: 'Linear',
                            repeat: 0,
                            delay: 0,
                            onComplete: function () {
                                me.filant.x = 800;
                                me.filant.y = 0;
                            }
                    });

                    break;
                case Phaser.Input.Keyboard.KeyCodes.Z:
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
                case Phaser.Input.Keyboard.KeyCodes.O:
                    me.tweens.add({
                        targets: me.chickenWalk,
                        x: 200,
                        y: 750,
                        duration : 3000,
                        ease: 'Linear',
                        repeat: 0,
                        delay: 0,
                        onComplete: function () {
                            me.cowWalk.stop('chicken-walk')
                        }
                    });
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
