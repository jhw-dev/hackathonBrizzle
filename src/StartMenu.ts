class StartMenu extends egret.DisplayObjectContainer {

    private bg: egret.Bitmap;
    private start_btn: egret.DisplayObjectContainer;
    private quit_btn: egret.DisplayObjectContainer;
    private start_press: egret.Bitmap;
    private start_normal: egret.Bitmap;
    private quit_press: egret.Bitmap;
    private quit_normal: egret.Bitmap;
    private menu_bg: egret.Bitmap;
    public constructor() {
        super();
        //        this.x = (egret.MainContext.instance.stage.stageWidth - 640) / 2;
        //        this.y = (egret.MainContext.instance.stage.stageHeight - 960) / 2;
        var bg = this.bg = new egret.Bitmap(RES.getRes("main_bg_RETINA_png"));
        bg.height = GameData.stageHeight;
        bg.width = GameData.stageWidth;
        var start_btn = this.start_btn = new egret.DisplayObjectContainer();
        var quit_btn = this.quit_btn = new egret.DisplayObjectContainer();
        this.start_normal = new egret.Bitmap(RES.getRes("mainMenu_b_EN_RETINA_json.main_select_newgame@2x"));
        this.quit_normal = new egret.Bitmap(RES.getRes("mainMenu_b_EN_RETINA_json.main_select_cancel@2x"));
        this.start_press = new egret.Bitmap(RES.getRes("mainMenu_b_EN_RETINA_json.main_select_newgame_push@2x"));
        this.quit_press = new egret.Bitmap(RES.getRes("mainMenu_b_EN_RETINA_json.main_select_cancel_push@2x"));
        var menu_bg = this.menu_bg = new egret.Bitmap(RES.getRes("main_menu_bg_RETINA_png"));

        var dH = egret.MainContext.instance.stage.stageHeight / 960;
        var dW = egret.MainContext.instance.stage.stageWidth / 640;
        menu_bg.x = 20;
        menu_bg.y = 50;
        menu_bg.width = egret.MainContext.instance.stage.stageWidth - 40;
        menu_bg.height = 400 * (egret.MainContext.instance.stage.stageWidth - 40) / 600;
        quit_btn.x = 76 * dH;
        start_btn.x = 76 * dH;
        start_btn.y = 100 * dW;
        quit_btn.y = 220 * dW;
        start_btn.addChild(this.start_press);
        this.start_press.visible = false;
        start_btn.addChild(this.start_normal);
        quit_btn.addChild(this.quit_press);
        this.quit_press.visible = false;
        quit_btn.addChild(this.quit_normal);
        this.addChild(bg);
        this.addChild(menu_bg);
        this.addChild(start_btn);
        this.addChild(quit_btn);
        this.start_normal.height = 92 * dH;
        this.start_normal.width = 488 * dW;
        this.start_press.height = 92 * dH;
        this.start_press.width = 488 * dW;
        this.quit_normal.height = 92 * dH;
        this.quit_normal.width = 488 * dW;
        this.quit_press.height = 92 * dH;
        this.quit_press.width = 488 * dW;
        quit_btn.touchEnabled = true;
        start_btn.touchEnabled = true;
        start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnClicked, this);
        this.quit_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuitClicked, this);
        quit_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onQuitTouchBegin, this);
        quit_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onQuitTouchEnd, this);
        start_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStartTouchBegin, this);
        start_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onStartTouchEnd, this);

    }
    private onStartBtnClicked(event: MouseEvent): void {
        this.visible = false;
        GameView.instance.onGameStart();
    }
    private onQuitClicked(event: MouseEvent): void {
        console.log("onQuitClicked");

    }
    private onStartTouchBegin(event: MouseEvent): void {
        this.start_press.visible = true;
        this.start_normal.visible = false;
    }
    private onStartTouchEnd(event: MouseEvent): void {
        this.start_press.visible = false;
        this.start_normal.visible = true;

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


