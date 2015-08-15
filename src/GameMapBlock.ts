/**
 * Created by TerryXu on 8/15/15.
 */
class GameMapBlock extends egret.Rectangle {

    private _pCenter:egret.Point;
    private _width:number;
    private _height:number;

    constructor(pCenter:egret.Point, width:number, height:number) {
        super(pCenter.x, pCenter.y, width, height);
        this._pCenter = pCenter; 
    }
    
    get pCenter(): egret.Point {
        return this._pCenter;
    }

}