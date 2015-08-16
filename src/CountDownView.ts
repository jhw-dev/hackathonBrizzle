class CountDownView extends egret.Sprite {
	public constructor() {
	  super();
	  this.createView();
		// this.x = 45;
		// this.y = 213;
	}

	private bitmap:egret.Bitmap;

	private createView():void {
		var texture = RES.getRes("classic_progress_bar_RETINA_json.stage_bar@2x");
		this.bitmap = new egret.Bitmap();

		this.bitmap.texture = texture;
		this.bitmap.width = 550;
		this.bitmap.height = 25;
		this.addChild(this.bitmap);
		// bitmap.height = 25;

	}

	public setProgress(percent):void {
	    //显示进度
	    // this.bitmap =
	    // this.textField.text = "Loading..." + current + "/" + total;
	}

}
