/**
 * Created by TerryXu on 8/15/15.
 */
class GameMapBlock extends egret.Rectangle {

    private _pCenter:egret.Point;
    private _width:number;
    private _height:number;
    private _bird: BirdView;
    private _line: number;
    private _col: number;

    constructor(pLeftTop:egret.Point, width:number, height:number, curLineNumber:number, curColNumber:number) {
        super(pLeftTop.x, pLeftTop.y, width, height);
        var pCenter = this._pCenter = new egret.Point;
        pCenter.x = pLeftTop.x + width / 2;
        pCenter.y = pLeftTop.y + height / 2;
        this._line = curLineNumber;
        this._col = curColNumber;
    }
    
    get pCenter(): egret.Point {
        return this._pCenter;
    }
    
    get bird(): BirdView {
        return this._bird;
    }
    
    set bird(b: BirdView) {
        this._bird = b;
    }
    
    get line():number {
        return this._line;
    }
    
    set line(l:number) {
        this._line = l;
    }
    
    get col():number {
        return this._col;
    }
    
    set col(c:number ) {
        this._col = c;
    }

}