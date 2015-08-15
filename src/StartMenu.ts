class StartMenu extends egret.DisplayObjectContainer {

    private bg: egret.Bitmap;
    private start_btn: egret.Bitmap;
    private quit_btn: egret.Bitmap;
    private menu_bg: egret.Bitmap;
    public constructor() {
        super();
        this.x = (egret.MainContext.instance.stage.stageWidth - 640) / 2;
        this.y = (egret.MainContext.instance.stage.stageHeight - 960) / 2;
        var bg = this.bg = new egret.Bitmap(RES.getRes("main_bg_RETINA_png"));
        var start_btn = this.start_btn = new egret.Bitmap(RES.getRes("mainMenu_b_EN_RETINA_json.main_select_newgame@2x"));
        var quit_btn = this.quit_btn = new egret.Bitmap(RES.getRes("mainMenu_b_EN_RETINA_json.main_select_cancel@2x"));
        var menu_bg = this.menu_bg = new egret.Bitmap(RES.getRes("main_menu_bg_RETINA_png"));
        menu_bg.x = 20;
        menu_bg.y = 50;
        quit_btn.x = 76;
        start_btn.x = 76;
        start_btn.y = 100;
        quit_btn.y = 200;
        this.addChild(bg);
        this.addChild(menu_bg);
        this.addChild(start_btn);
        this.addChild(quit_btn);
        quit_btn.touchEnabled = true;
        start_btn.touchEnabled = true;
        start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnClicked, this);
        this.quit_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuitClicked, this);

    }
    private onStartBtnClicked(event: MouseEvent): void {
      this.visible=false;
        GameView.instance.onGameStart();
    }
    private onQuitClicked(event: MouseEvent): void {
      console.log("onQuitClicked");

    }
}


