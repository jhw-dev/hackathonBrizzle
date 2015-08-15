class BirdView extends egret.Sprite {
    private tX: number;
    private tY: number;
    private birdBitmap: any;
    private birdBitmap_close: any;
    private tw: any;
    private BIRDS_OPEN = ['Character_orange_open',
        'Character_pink_open',
        'Character_purple_open',
        'Character_red_open',
        'Character_white_open',
        'Character_yellow_open',
        'Character_blue_open',
        'Character_green_open'
    ];
    private BIRDS_CLOSE = ['Character_orange_close',
        'Character_pink_close',
        'Character_purple_close',
        'Character_red_close',
        'Character_white_close',
        'Character_yellow_close',
        'Character_blue_close',
        'Character_green_close'
    ];
    public constructor(x: number, y: number, birdType: number) {
        super();
        this.touchEnabled = true;
        this.x = x;
        this.y = y;
        this.tX = x;
        this.tY = y;
        this.height = 81;
        this.width = 81;
        this.birdBitmap = new egret.Bitmap(RES.getRes(this.BIRDS_OPEN[birdType]));
        this.birdBitmap_close = new egret.Bitmap(RES.getRes(this.BIRDS_CLOSE[birdType]));
        // this.birdBitmap.x = 0;
        // this.birdBitmap.y = 0;
        
        this.addChild(this.birdBitmap);
        this.addChild(this.birdBitmap_close);
        this.birdBitmap_close.visible = false;
        this.draw();
        console.log(this.height, this.width);
        this.addEventListener(egret.Event.ADDED, this.onAdded, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.Event.REMOVED, this.onRemoved, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(egret.Event.RENDER, this.onRender, this);

    }

    public dropTo(x: number, y: number, timeout: number) {
        this.tX = x;
        this.tY = y;
        this.tw = egret.Tween.get(this, {
            loop: false,//设置循环播放
            onChange: this.onChange,//设置更新函数
            onChangeObj: this//更新函数作用域
        });
        if (!timeout) {
            timeout = 0;
        }
        this.tw.wait(timeout).to({ y: this.tY }, 1500, this.customEase).call(this.onComplete, this, ["param1", { key: "key", value: 3 }]);

    }
    private customEase(t: number): number {
        return t;
    }


    private draw(): void {
    }

    private onClick(event: MouseEvent): void {
        console.log("onClick");
        // this.draw();
        // if (this.y >= 474) {
        //     this.tw.paused = false;
        // }
        // this.parent.removeChild(this);
    }
    private onChange(): void {
        // if (this.y >= 474) {
        //     this.y = 474;
        //     this.tw.paused = true;

        // }
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
        //timer
        var timer: egret.Timer = new egret.Timer(1000, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);

        timer.start();

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
    private timerFunc(event: egret.TimerEvent) {
        // console.log("timerFunc count" + (<egret.Timer>event.target).currentCount);
        if (this.birdBitmap.visible) {
            this.birdBitmap.visible = false;
            this.birdBitmap_close.visible = true;
        } else {
            this.birdBitmap.visible = true;
            this.birdBitmap_close.visible = false;
        }
    }


}


