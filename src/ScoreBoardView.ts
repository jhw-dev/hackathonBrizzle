class ScoreBoardView extends egret.DisplayObjectContainer {

    private bg: egret.Bitmap;
    private quit_btn: egret.DisplayObjectContainer;
    private restart_btn: egret.DisplayObjectContainer;
    private restart_press: egret.Bitmap;
    private restart_normal: egret.Bitmap;
    private quit_press: egret.Bitmap;
    private quit_normal: egret.Bitmap;
    private tx: egret.TextField;
    public constructor() {
        super();
        var bg = this.bg = new egret.Bitmap(RES.getRes("gameover_RETINA_json.gameover_bg@2x"));
        this.x = (egret.MainContext.instance.stage.stageWidth - 532) / 2;
        this.y = (egret.MainContext.instance.stage.stageHeight - 744) / 2;
        this.addChild(bg);
        bg.height = 744;
        bg.width = 532;

        var quit_btn = this.quit_btn = new egret.DisplayObjectContainer;
        quit_btn.x = 20;
        quit_btn.y = bg.height - 95;
        var restart_btn = this.restart_btn = new egret.DisplayObjectContainer;
        restart_btn.y = bg.height - 95;
        restart_btn.x = bg.width - 20 - 224;
        this.restart_normal = new egret.Bitmap(RES.getRes("gameover_EN_RETINA_json.gameover_restart@2x"));
        this.quit_normal = new egret.Bitmap(RES.getRes("gameover_EN_RETINA_json.gameover_quit@2x"));
        this.restart_press = new egret.Bitmap(RES.getRes("gameover_EN_RETINA_json.gameover_restart_push@2x"));
        this.quit_press = new egret.Bitmap(RES.getRes("gameover_EN_RETINA_json.gameover_quit_push@2x"));
        quit_btn.addChild(this.quit_normal);
        quit_btn.addChild(this.quit_press);
        this.quit_press.visible = false;
        restart_btn.addChild(this.restart_press);
        restart_btn.addChild(this.restart_normal);
        this.restart_press.visible = false;
        this.addChild(quit_btn);
        this.addChild(restart_btn);
        quit_btn.touchEnabled = true;
        restart_btn.touchEnabled = true;
        this.quit_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuitClicked, this);
        this.restart_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestartClicked, this);
        quit_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onQuitTouchBegin, this);
        quit_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onQuitTouchEnd, this);
        restart_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onReStartTouchBegin, this);
        restart_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onReStartTouchEnd, this);
        // this.showME(1000);
        this.visible = false;
    }
    public showME(score: number) {
        var speak = "你大爷还是你大爷\n你输了就是你输了";
        this.visible = true;
        this.tx = new egret.TextField;
        this.tx.text = speak;
        this.tx.size = 32;
        this.tx.x = this.bg.width / 2 - 110;
        this.tx.y = this.bg.height / 2 - 32;
        this.tx.multiline = true;
        var bitmapText: egret.BitmapText = new egret.BitmapText();
        bitmapText.font = RES.getRes("number_fnt");
        this.addChild(bitmapText);
        bitmapText.text = score + '';
        bitmapText.x = 30;
        bitmapText.y = 55;
        this.addChild(bitmapText);

        this.addChild(this.tx);
    }


    private onQuitClicked(event: MouseEvent): void {
        console.log("onQuit");
        // this.parent.removeChild(this);
        this.visible = false;
        GameView.instance.backToMenu();
    }
    private onRestartClicked(event: MouseEvent): void {
        console.log("onRestart");
        this.visible = false;
        GameView.instance.onGameStart();

    }
    private onReStartTouchBegin(event: MouseEvent): void {
        this.restart_press.visible = true;
        this.restart_normal.visible = false;
    }
    private onReStartTouchEnd(event: MouseEvent): void {
        this.restart_press.visible = false;
        this.restart_normal.visible = true;

    }
    private onQuitTouchBegin(event: MouseEvent): void {
        this.quit_press.visible = true;
        this.quit_normal.visible = false;

    }
    private onQuitTouchEnd(event: MouseEvent): void {
        this.quit_press.visible = false;
        this.quit_normal.visible = true;
    }


}


