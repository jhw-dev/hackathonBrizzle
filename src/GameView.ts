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
    private timerBar: TimerBar;
    private stageFace: egret.Bitmap;
    private gameMap: GameMap;
    private elf: ElfBFS;
    private newBirdsTimer: any;
    private startView: StartMenu;
    private scroeBoard: ScoreBoardView;
    private bgMusic: egret.Sound;
    private playMusic: egret.Sound;
    private _ENABLE_MUSIC = false;
    private miniScroe: egret.BitmapText;

    constructor() {
        super();
        this.elf = new ElfBFS();
        this.newBirdsTimer = new egret.Timer(7000, 0);
        this.newBirdsTimer.addEventListener(egret.TimerEvent.TIMER, this.newBirdsFunc, this);

        var startMenu = this.startView = new StartMenu();
        this.addChild(startMenu);

        this.bgMusic = RES.getRes("bgmusic");
        this.playMusic = RES.getRes("playmusic");
        if (this._ENABLE_MUSIC) {
            this.bgMusic.play(true);
        }

    }

    public onTouchEnd(e: egret.TouchEvent) {
        console.log("onTouchEnd-> x:"+ e.stageX +" y: "+ e.stageY);
        var result = this.gameMap.convertPointToBlockNumber(new egret.Point(e.stageX, e.stageY))
        console.log(result)
    }

    public onTouchMove(e: egret.TouchEvent) {
        console.log("onTouch move-> x:"+ e.stageX +" y: "+ e.stageY);
        var result = this.gameMap.convertPointToBlockNumber(new egret.Point(e.stageX, e.stageY))
        console.log(result)


    }

    public onTouchBegin(e: egret.TouchEvent) {
        console.log("onTouchBegin-> x:"+ e.stageX +" y: "+ e.stageY);
        var result = this.gameMap.convertPointToBlockNumber(new egret.Point(e.stageX, e.stageY))
        console.log(result)
    }

    public setMusic(bg: egret.Sound, play: egret.Sound) {
        this.bgMusic = bg;
        this.playMusic = play;
    }

    public backToMenu() {
        this.removeChild(this.bgA);
        this.removeChild(this.bgB);
        this.newBirdsTimer.stop();
        this.removeChild(this.scroeBoard);
        if (!this.contains(this.startView)) {
            this.addChild(this.startView);
        }
        this.startView.visible = true;
        if (this._ENABLE_MUSIC) {
            this.playMusic.stop();
            this.bgMusic.play(true);
        }
    }

    private gameOver() {
        if (this.contains(this.scroeBoard)) {
            this.removeChild(this.scroeBoard);
        }
        this.newBirdsTimer.stop();
        this.addChild(this.scroeBoard);
        this.scroeBoard.showME(1222323);
    }

    public onGameStart() {
        this.removeChildren();
        var bgA = this.bgA = Resource.createBitmapByName("stage_bgA_RETINA_png");
        var bgB = this.bgB = Resource.createBitmapByName("stage_bgB_RETINA_png");
        bgA.width = bgB.width = egret.MainContext.instance.stage.stageWidth;
        bgA.height = bgB.height = egret.MainContext.instance.stage.stageHeight;
        var stageFace = this.stageFace = new egret.Bitmap(RES.getRes("stage_face_RETINA_png"));
        stageFace.x = 20;
        stageFace.y = 110;
        stageFace.width = 616;
        stageFace.height = 960;
        var tw = egret.Tween.get(stageFace, {
            loop: false
        });
        tw.wait(1000)
            .to({ y: egret.MainContext.instance.stage.stageHeight + 10 }, 1500, egret.Ease.sineIn)
            .call(() => {
                this.removeChild(this.stageFace);
                this.initBirds();
                this.timerBar = new TimerBar();
                this.addChild(this.timerBar);
                this.timerBar.start(20, this.gameOver, this)
            }, stageFace, []);


        this.addChild(bgA);
        this.addChild(bgB);
        this.addChild(stageFace);

        this.newBirdsTimer.start();

        var mapWidth = GameData.stageWidth * 0.9;
        var mapHeight = mapWidth / 7 * 9;

        var pLeftTop:egret.Point = new egret.Point();
        pLeftTop.x = GameData.stageWidth * 0.2 / 2;
        pLeftTop.y = GameData.stageHeight * 0.94 - mapHeight;
        this.gameMap = new GameMap(pLeftTop, 9, 7, mapWidth, mapHeight);

        var overboard = this.scroeBoard = new ScoreBoardView();

        // // var rect:egret.Rectangle = new egret.Rectangle(5,5,5,15);
        // // bitmap.scale9Grid =rect;


        if (this._ENABLE_MUSIC) {
            this.playMusic.play(true);
            this.bgMusic.stop();
        }

        // Touch Evnet
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);

        this.miniScroe = new egret.BitmapText();
        this.miniScroe.text = '123';
        this.miniScroe.font = RES.getRes("number_fnt");
        this.addChild(this.miniScroe);
        this.miniScroe.x = egret.MainContext.instance.stage.stageWidth - 140 * egret.MainContext.instance.stage.stageWidth / 640;
        this.miniScroe.y = 35 * egret.MainContext.instance.stage.stageHeight / 960;
        this.miniScroe.scaleY = 0.3;
        this.miniScroe.scaleX = 0.3;


    }

    get map() {
        return this.gameMap;
    }

    private initBirds() {
        var column = this.gameMap.getColumns(0);
        for (var i = 0; i < 3; i++) {
            var bbbs = this.elf.getSevenBirds();
            for (var j = 0; j < bbbs.length; j++) {
                console.log("line " + i + "middleY: " + this.gameMap.getLines(i).middleY);
                var birdInit = new BirdView(column.width + j * column.width, this.gameMap.getLines(i).middleY, bbbs[j]);
                this.addChild(birdInit);
                super.setChildIndex(birdInit, super.getChildIndex(this.timerBar) - 1);
            }
        }

    }

    private newBirdsFunc(event: egret.TimerEvent) {
        //TODO:testcode
        var bbbs = this.elf.getSevenBirds();
        for (var i = 0; i < bbbs.length; i++) {

            var birdTest = new BirdView(80 + i * 80, 80, bbbs[i]);
            birdTest.dropTo(40 + i * 80, 600, 1000);

            this.addChild(birdTest);
            super.setChildIndex(birdTest, super.getChildIndex(this.timerBar) - 1);
        }
        // this.newBirdsTimer.stop();
    }

}


