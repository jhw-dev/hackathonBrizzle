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

    constructor(pCenter:egret.Point, width:number, height:number, line:number, col:number) {
        super(pCenter.x, pCenter.y, width, height);
        this._pCenter = pCenter; 
        this._line = line;
        this._col = col;
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