/**
 * Created by TerryXu on 8/15/15.
 */
class GameView extends egret.DisplayObjectContainer {

    private static _instance: GameView;

    public static get instance(): GameView {
        if (!this._instance) {
            this._instance = new GameView();
        }
        return this._instance;
    }

    public launch(container: egret.DisplayObjectContainer): void {
        container.addChild(this);
    }

    private bgA: egret.Bitmap;
    private bgB: egret.Bitmap;
    private gameMap: GameMap;
    private elf: ElfBFS;
    private newBirdsTimer: any;
    private startView: StartMenu;
    private scroeBoard: ScoreBoardView;
    private bgMusic: egret.Sound;
    private playMusic: egret.Sound;

    constructor() {
        super();
        this.elf = new ElfBFS();
        this.newBirdsTimer = new egret.Timer(2000, 0);
        this.newBirdsTimer.addEventListener(egret.TimerEvent.TIMER, this.newBridsFunc, this);
//        var startMenu = this.startView = new StartMenu();
//        this.addChild(startMenu);
//        this.bgMusic=RES.getRes("bgmusic");
//        this.playMusic=RES.getRes("playmusic");
//        this.bgMusic.play(true);
        this.onGameStart();
    }

    public setMusic(bg: egret.Sound, play: egret.Sound) {
        this.bgMusic = bg;
        this.playMusic = play;
    }

    public backToMenu() {
        this.removeChild(this.bgA);
        this.removeChild(this.bgB);
        this.newBirdsTimer.stop();
        //TODO:需要清除所有的鸟
        this.removeChild(this.scroeBoard);
        this.startView.visible = true;
        this.playMusic.stop();
        this.bgMusic.play(true);
    }

    public onGameStart() {
        var bgA = this.bgA = Resource.createBitmapByName("stage_bgA_RETINA_png");
        var bgB = this.bgB = Resource.createBitmapByName("stage_bgB_RETINA_png");
        bgA.width = bgB.width = egret.MainContext.instance.stage.stageWidth;
        bgA.height = bgB.height = egret.MainContext.instance.stage.stageHeight;

        this.addChild(bgA);
        this.addChild(bgB);
        this.newBirdsTimer.start();

        var mapWidth = GameData.stageWidth * 0.9;
        var mapHeight = mapWidth / 7 * 9;
 
        var pStart:egret.Point = new egret.Point();
        pStart.x = GameData.stageWidth * 0.1 / 2;
        pStart.y = GameData.stageHeight * 0.9;


        this.gameMap = new GameMap(pStart, 9, 7, mapWidth, mapHeight);
        

//        var overboard = this.scroeBoard = new ScoreBoardView();
//        this.addChild(overboard);
//        this.scroeBoard.showME(1222323);
//        this.playMusic.play(true);
//        this.bgMusic.stop();

    }

    get map() {
        return this.gameMap;
    }
    
    private newBridsFunc(event: egret.TimerEvent) {
        //TODO:testcode
        var bbbs = this.elf.getSevenBirds();
        for (var i = 0; i < bbbs.length; i++) {
            var birdTest = new BirdView(80 + i * 80, 80, bbbs[i]);
            birdTest.dropTo(40 + i * 80, this.map.lines[0].y+this.map.lines[0].height / 2, 1000);
            this.addChild(birdTest);
        }
        this.newBirdsTimer.stop();
    }

}


