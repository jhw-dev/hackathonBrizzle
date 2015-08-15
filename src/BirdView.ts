class BirdView extends egret.Sprite {
    private tX: number;
    private tY: number;
    private birdBitmap: any;
    private tw: any;
    private BIRDS_OPEN=['Character_orange_open',
    'Character_pink_open',
    'Character_purple_open',
    'Character_red_open',
    'Character_white_open',
    'Character_yellow_open',
    'Character_blue_open',
    'Character_green_open'
    ];
    public constructor(x: number, y: number,birdType:number) {
        super();
        this.touchEnabled = true;
        this.x = x;
        this.y = y;
        this.tX = x;
        this.tY = y;
        this.height=81;
        this.width=81;
        this.birdBitmap = new egret.Bitmap(RES.getRes(this.BIRDS_OPEN[birdType]));
        // this.birdBitmap.x = 0;
        // this.birdBitmap.y = 0;
        this.addChild(this.birdBitmap);
        this.draw();
        console.log(this.height, this.width);
        this.addEventListener(egret.Event.ADDED, this.onAdded, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.Event.REMOVED, this.onRemoved, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(egret.Event.RENDER, this.onRender, this);
    }

    public dropTo(x: number, y: number) {
        this.tX = x;
        this.tY = y;
        this.tw = egret.Tween.get(this, {
            loop: false,//设置循环播放
            onChange: this.onChange,//设置更新函数
            onChangeObj: this//更新函数作用域
        });
        this.tw.to({ y: this.tY }, 1500, this.customEase).call(this.onComplete, this, ["param1", { key: "key", value: 3 }]);

    }
    private customEase(t: number): number {
        return t;
    }


    private draw(): void {
    }

    private onClick(event: MouseEvent): void {
        console.log("onClick");
        // this.draw();
        this.dropTo(this.tX, this.tY + 500);
        if(this.y>=474){
          this.tw.paused=false;
        }
        // this.parent.removeChild(this);
    }
    private onChange(): void {
        if (this.y >= 474) {
          this.y=474;
          this.tw.paused=true;

        }
        console.log(this.x + 'y' + this.y);
    }
    private onComplete(param1: string, param2: any): void {
        console.log("onComplete");
        console.log(param1);
        console.log(param2);
        // this.dropTo(this.tX, this.tY + 100);
    }

    private onAdded(event: Event): void {
        console.log("onAdded");
    }

    private onEnterFrame(event: Event): void {
        console.log("onEnterFrame");
        this.removeEventListener("enterFrame", this.onEnterFrame, this);
    }

    private onRemoved(event: Event): void {
        console.log("onRemoved");
    }

    private onRender(event: Event): void {
        console.log("onRender");
    }

}


