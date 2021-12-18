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
        this.load.image('virevoltant','image/virevoltant.png')


        //au lieu d'écrire 5 lignes quasi identiques, on charge l'herbe avec une boucle
        // ALGO : ceci est une boucle
        for(let i=1;i<=5;i++){

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


        this.filant = this.add.sprite(800,0, 'fil').setOrigin(0,0);
        //this.groundContainer.add(filant);

        this.ovni = this.add.sprite(100,50, 'ovni').setOrigin(0,0);
        this.ovni.setScale(0.01)

        this.virevoltant = this.add.sprite(100,50, 'virevoltant').setOrigin(0,0);
        /**
         * filtre type Rain au premier plan
         * @type {Phaser.GameObjects.Sprite}
         */


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
                case Phaser.Input.Keyboard.KeyCodes.N:

                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:

                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:

                    break;
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
                case Phaser.Input.Keyboard.KeyCodes.D:

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
