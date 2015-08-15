/**
 * Created by TerryXu on 8/15/15.
 */
class GameView extends egret.DisplayObjectContainer {

    private static _instance:GameView;

    public static get instance():GameView {
        if( !this._instance ) {
            this._instance = new GameView();
        }
        return this._instance;
    }

    public launch(container:egret.DisplayObjectContainer):void {
        container.addChild(this);
    }

    private bgA:egret.Bitmap;
    private bgB:egret.Bitmap;
    private gameMap: GameMap;

    constructor() {
        super();

        var bgA = this.bgA = Resource.createBitmapByName("stage_bgA_RETINA_png");
        var bgB = this.bgB = Resource.createBitmapByName("stage_bgB_RETINA_png");
        bgA.width = bgB.width = egret.MainContext.instance.stage.stageWidth;
        bgA.height = bgB.height = egret.MainContext.instance.stage.stageHeight;

        this.addChild(bgA);
        this.addChild(bgB);

        //TODO:testcode
        var birdTest=new BirdView(30,30);
        this.addChild(birdTest);
        //TODO:testcode-end

        var mapWidth = egret.MainContext.instance.stage.stageWidth * 0.9;
        var mapHeight = mapWidth / 7 * 9;
        var pStart:egret.Point = new egret.Point();
        pStart.x = egret.MainContext.instance.stage.stageWidth * 0.1 / 2;
        pStart.y = egret.MainContext.instance.stage.stageHeight * 0.1;

        this.gameMap = new GameMap(pStart, 9, 7, mapWidth, mapHeight);

    }

}
