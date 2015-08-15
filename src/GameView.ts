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

    constructor() {
        super();

        var bgA = this.bgA = Resource.createBitmapByName("stage_bgA_RETINA_png");
        var bgB = this.bgB = Resource.createBitmapByName("stage_bgB_RETINA_png");
        bgA.width = bgB.width = egret.MainContext.instance.stage.stageWidth;
        bgA.height = bgB.height = egret.MainContext.instance.stage.stageHeight;

        this.addChild(bgA);
        this.addChild(bgB);

    }

}