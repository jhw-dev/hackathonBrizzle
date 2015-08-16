class TimerBar extends egret.DisplayObjectContainer {
	public constructor() {
	  super();
	  this.createView();
		this.x = 45*egret.MainContext.instance.stage.stageWidth/640;
		this.y = 213*egret.MainContext.instance.stage.stageHeight/960;
	}

	private bitmap:egret.Bitmap;

	private createView():void {
		var texture = RES.getRes("classic_progress_bar_RETINA_json.stage_bar@2x");
		this.bitmap = new egret.Bitmap();

		this.bitmap.texture = texture;
		this.bitmap.width = 0;
		this.bitmap.height = 26*egret.MainContext.instance.stage.stageHeight/960;
		this.addChild(this.bitmap);
		// bitmap.height = 25;

	}
	//totalTime:秒钟,callback:结束回调,thisObject:回调this
	public start(totalTime:number,callback:Function,thisObject:any){
		//创建 Tween 对象
		var self = this.bitmap;
		var wrapCallback = function(args){
			egret.Tween.removeTweens(self);
			callback.apply(thisObject, args);
		}
    egret.Tween.get(this.bitmap, {
        loop: true,//设置循环播放
        onChange: this.onChange,//设置更新函数
        onChangeObj: this.bitmap//更新函数作用域
    })
        .to({width: 560*egret.MainContext.instance.stage.stageWidth/640}, totalTime*1000)//设置2000毫秒内 rotation 属性变为360
        .call(wrapCallback, thisObject, []);//设置回调函数及作用域，可用于侦听动画完成
	}

	private onChange(){

	}


}
