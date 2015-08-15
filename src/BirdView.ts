class BirdView extends egret.Sprite {
    private tX: number;
    private tY: number;
    private tw:any;
    public constructor() {
        super();
    this.tw=egret.Tween.get(this, {
            loop: false,//设置循环播放
            onChange: this.onChange,//设置更新函数
            onChangeObj: this//更新函数作用域
        })
        this.touchEnabled = true;
        this.tX = 100;
        this.tY = 100;
        this.draw();
        this.addEventListener(egret.Event.ADDED, this.onAdded, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.addEventListener(egret.Event.REMOVED, this.onRemoved, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.addEventListener(egret.Event.RENDER, this.onRender, this);
    }

    public dropTo(x: number, y: number) {
        this.tX = x;
        this.tY = y;
    }

    private draw(): void {
        this.graphics.clear();
        this.graphics.beginFill(0xff0000);
        this.graphics.drawRect(this.tX, this.tY, 100, 100);
        this.graphics.endFill();
    }

    private onClick(event: MouseEvent): void {
        console.log("onClick");
        this.tw.to({ y: this.tY }, 1000,  egret.Ease.sineIn ).call(this.onComplete, this, ["param1", { key: "key", value: 3 }]);
        this.tY += 100;
        // this.draw();
        // this.parent.removeChild(this);
    }
    private onChange(): void {
        console.log("onChange");
    }
    private onComplete(param1: string, param2: any): void {
        console.log("onComplete");
        console.log(param1);
        console.log(param2);
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

