class BirdView extends egret.Sprite {
    private tX: number;
    private tY: number;
    private birdBitmap: any;
    private birdBitmap_close: any;
    private tw: any;
    private _type: number;
    private dropedSound: egret.Sound;
    private lgD: number;
    private removeSound: egret.Sound;

    private BIRDS_OPEN = [null,
        'Character_orange_open',
        'Character_pink_open',
        'Character_purple_open',
        'Character_red_open',
        'Character_white_open',
        'Character_yellow_open',
        'Character_blue_open',
        'Character_green_open'
    ];
    private BIRDS_CLOSE = [null,
        'Character_orange_close',
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

        var dH = egret.MainContext.instance.stage.stageHeight / 960;
        var dW = egret.MainContext.instance.stage.stageWidth / 640;
        this.touchEnabled = true;
        this.x = x;
        this.y = y;
        this.tX = x;
        this.tY = y;
        this.height = 76;
        this.width = 76;
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this._type = birdType;

        this.birdBitmap = new egret.Bitmap(RES.getRes(this.BIRDS_OPEN[birdType]));
        this.birdBitmap_close = new egret.Bitmap(RES.getRes(this.BIRDS_CLOSE[birdType]));
        this.birdBitmap.x = this.width / 2;
        this.birdBitmap.y = this.height / 2;
        this.birdBitmap.anchorX = this.anchorX;
        this.birdBitmap.anchorY = this.anchorY;

        this.birdBitmap_close.width = this.birdBitmap.width = this.width;
        this.birdBitmap_close.height = this.birdBitmap.height = this.height;
        var lgD = this.lgD = dW > dH ? dW : dH;
        this.scaleX = lgD;
        this.scaleY = lgD;
        this.birdBitmap.scaleX = lgD;
        this.birdBitmap.scaleY = lgD;
        this.birdBitmap_close.scaleX = lgD;
        this.birdBitmap_close.scaleY = lgD;

        this.addChild(this.birdBitmap);
        this.addChild(this.birdBitmap_close);
        this.birdBitmap_close.visible = false;
        this.draw();
        this.addEventListener(egret.Event.ADDED, this.onAdded, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.Event.REMOVED, this.onRemoved, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(egret.Event.RENDER, this.onRender, this);

        this.dropedSound = RES.getRes("Bird_droped");
        this.removeSound = RES.getRes("Bird_remove");

    }


    public pLeftBottom() {
        var halfWidth = this.width / 2;
        var halfHeight = this.height / 2;
        return new egret.Point(this.x - halfWidth, this.y + halfHeight);
    }

    public pRightBottom() {
        var halfWidth = this.width / 2;
        var halfHeight = this.height / 2;
        return new egret.Point(this.x + halfWidth, this.y + halfHeight);
    }

    public pLeftTop() {
        var halfWidth = this.width / 2;
        var halfHeight = this.height / 2;
        return new egret.Point(this.x - halfWidth, this.y - halfHeight);
    }

    public pRightTop() {
        var halfWidth = this.width / 2;
        var halfHeight = this.height / 2;
        return new egret.Point(this.x + halfWidth, this.y - halfHeight);
    }


    get type() {
        return this._type;
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

        this.tw.wait(timeout).to({ y: this.tY }, 1000, this.customEase).call(function() {
            this.dropedSound.play();
            var block = GameView.instance.map.convertPointToBlockNumber(new egret.Point(x, y));
            GameView.instance.map.registerBird(this, block.line, block.column);
            GameView.instance.map.goEliminate();
        })
            .to({ scaleX: 1.4, scaleY: 0.8 }, 50, egret.Ease.backIn)
            .to({ scaleX: this.lgD, scaleY: this.lgD }, 400, egret.Ease.backOut);


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
        //        console.log(this.x + 'y' + this.y);
        //        var result = GameView.instance.map.isDropStop(this.x, this.y);
        //        if(result && result.isDropStop == true) {
        //            this.y = result.y;
        //            this.tw.paused = true;
        //        }
    }
    private onComplete(param1: string, param2: any): void {
        console.log("onComplete");
        //        console.log(param1);
        //        console.log(param2);
        //        GameView.instance.map.bindBlock(this);
        // this.dropTo(this.tX, this.tY + 100);
    }

    private onAdded(event: Event): void {
        //        console.log("onAdded");
        //timer
        //        var timer: egret.Timer = new egret.Timer(1000, 0);
        //        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);

        //        timer.start();

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

    public toDie(_callback: any) {
        var tw = egret.Tween.get(this, {
            loop: false
        }).to({ rotation: 15 }, 70).to({ rotation: 0 }, 70).to({ rotation: -15 }, 70).to({ rotation: 0 }, 70).to({ rotation: 15 }, 70).to({ rotation: 0 }, 70).to({ rotation: -15 }, 70).to({ rotation: 0 }, 50).to({ rotation: 15 }, 50).to({ rotation: 0 }, 50).to({ rotation: -15 }, 50).to({ rotation: 0 }, 50).to({ rotation: 15 }, 30).to({ rotation: 0 }, 30).to({ rotation: -15 }, 30).to({ rotation: 0 }, 30).call(() => {
            if (this.parent) {
                this.parent.removeChild(this);
                this.removeSound.play();
                // GameView.instance.BirdArray.remove(this);
                _callback(this);
            }
        }, this, []);
        // this.parent.removeChild(this);
        
    }

}


