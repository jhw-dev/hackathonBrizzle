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
    public elf: ElfBFS;
    private newBirdsTimer: any;
    private startView: StartMenu;
    private scroeBoard: ScoreBoardView;
    private bgMusic: egret.Sound;
    private playMusic: egret.Sound;
    private _ENABLE_MUSIC = true;
    private miniScroe: egret.BitmapText;
    private _selectedBird: BirdView;
    public BirdArray: any[];

    constructor() {
        super();
        this.elf = new ElfBFS();
        this.newBirdsTimer = new egret.Timer(5000, 0);
        this.newBirdsTimer.addEventListener(egret.TimerEvent.TIMER, this.newBirdsFunc, this);

        var startMenu = this.startView = new StartMenu();
        this.addChild(startMenu);
        this.BirdArray = [];
        this.bgMusic = RES.getRes("bgmusic");
        this.playMusic = RES.getRes("playmusic");
        if (this._ENABLE_MUSIC) {
            this.bgMusic.play(true);
        }

    }

    public onTouchEnd(e: egret.TouchEvent) {
        console.log("onTouchEnd-> x:" + e.stageX + " y: " + e.stageY);
        var result = this.gameMap.convertPointToBlockNumber(new egret.Point(e.stageX, e.stageY))
        console.log(result);
          
        // 对齐x
        if (this._selectedBird) {
            this._selectedBird.x = this.gameMap.alignX(this._selectedBird.x);
            this.gameMap.dropdown(this._selectedBird, result.line, result.column);
        
        
            // 开始判断
            this.gameMap.goEliminate();

            this._selectedBird = null;
        }
        this.newBirdsTimer.start();
    }

    public onTouchMove(e: egret.TouchEvent) {
        console.log("onTouch move-> x:" + e.stageX + " y: " + e.stageY);
        var result = this.gameMap.convertPointToBlockNumber(new egret.Point(e.stageX, e.stageY))
        console.log(result);
        // this.newBirdsTimer.stop();
        if (this._selectedBird) {
            var bird = this._selectedBird;
            // up
            if (bird.y > e.stageY) {
                this.gameMap.moveUp(result.line, result.column, bird, e.stageY);
            } else if (bird.y < e.stageY) {
                this.gameMap.moveDown(result.line, result.column, bird, e.stageY);
            }
            // left
            if (bird.x > e.stageX) {
                this.gameMap.moveLeft(result.line, result.column, bird, e.stageX);
            }
            // right
            else if (bird.x < e.stageX) {
                this.gameMap.moveRight(result.line, result.column, bird, e.stageX);
            }
            console.log("select bird.x:" + this._selectedBird.x + " y:" + this._selectedBird.y);
        }

    }

    public onTouchBegin(e: egret.TouchEvent) {
        console.log("onTouchBegin-> x:" + e.stageX + " y: " + e.stageY);
        var result = this.gameMap.convertPointToBlockNumber(new egret.Point(e.stageX, e.stageY))
        console.log(result);
        if (this._selectedBird == null) {

            var bird = this.gameMap.getBird(result.line, result.column);
            this._selectedBird = bird;
            this.gameMap.unregisterBird(result.line, result.column);

        }
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
        var dH = egret.MainContext.instance.stage.stageHeight / 960;
        var dW = egret.MainContext.instance.stage.stageWidth / 640;
        stageFace.x = 18 * dH;
        stageFace.y = 110 * dW;
        stageFace.width = 616 * dW;
        stageFace.height = 960 * dH;
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
                this.timerBar.start(30, this.gameOver, this);
                this.gameMap.goEliminate();


            }, stageFace, []);


        this.addChild(bgA);
        this.addChild(bgB);
        this.addChild(stageFace);

        this.newBirdsTimer.start();


        var mapWidth = GameData.stageWidth * 0.83;
        var mapHeight = mapWidth / 7 * 9;

        var pLeftTop: egret.Point = new egret.Point();
        pLeftTop.x = (GameData.stageWidth - mapWidth) / 2;
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
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

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

                //                console.log("line " + i + "middleY: " + this.gameMap.getLines(i).middleY);
                var birdInit = new BirdView(column.middleX + j * column.width, this.gameMap.getLines(i).middleY, bbbs[j]);
                this.gameMap.registerBird(birdInit, i, j);

                this.addChild(birdInit);
                this.BirdArray.push(birdInit);
                //                //TODO testcode for diebired
                //                if (j % 2 == 0) {
                //                    birdInit.toDie((bird) => { console.log('die') });
                //                }
                //                //TODO testcode for diebired
                super.setChildIndex(birdInit, super.getChildIndex(this.timerBar) - 1);
            }
        }
        console.dir("bird map: " + this.gameMap);
    }

    private newBirdsFunc(event: egret.TimerEvent) {
        var column = this.gameMap.getColumns(0);
        //TODO:testcode
        var bbbs = this.elf.getSevenBirds();
        for (var i = 0; i < bbbs.length; i++) {

            var freeLine = this.gameMap.getMaxFreeLine(i);

            var distY = this.gameMap.getLines(freeLine).middleY;
            var birdTest = new BirdView(column.middleX + i * column.width, GameData.stageHeight * 0.18, bbbs[i]);

            if (freeLine != -1) {
                birdTest.dropTo(column.middleX + i * column.width, distY, 1000);
            }

            this.addChild(birdTest);
            this.BirdArray.push(birdTest);
            super.setChildIndex(birdTest, super.getChildIndex(this.timerBar) - 1);
        }
        // this.newBirdsTimer.stop();
    }

}


