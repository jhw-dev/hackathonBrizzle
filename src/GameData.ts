/**
 *
 * @author 
 *
 */
class GameData {
    
    private static _stageWidth: number;
    private static _stageHeight: number;
    
	public constructor() {
	}
	
	public static stageWidth(){
	    if(!this._stageWidth) {
            this._stageWidth = egret.MainContext.instance.stage.stageWidth;
	    }
        return this._stageWidth;
	}
	
	public static stageHeight() {
	    if(!this._stageHeight) {
            this._stageHeight = egret.MainContext.instance.stage.stageHeight;
	    }
        return this._stageHeight;
	}
}
