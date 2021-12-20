let gameConfig = {
    type: Phaser.AUTO,
    width: 610,
    height: 920,
    backgroundColor: '#FFFFFF',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: new Tableau1()
};
let game = new Phaser.Game(gameConfig);
