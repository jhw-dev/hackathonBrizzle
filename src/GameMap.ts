/**
 * Created by TerryXu on 8/15/15.
 */
class GameMap {
    private _mapLines:GameMapLine[];
    private _birdMap: any;

    constructor(pStart:egret.Point, lines:number, cols:number, width:number, height:number) {
        var mapLines = this._mapLines = new Array;
        for(var i=0; i<lines; i++) {
            var point: egret.Point = new egret.Point;
            var lineHeight: number = width / cols;
            point.x = pStart.x;
            point.y = pStart.y - i * lineHeight - lineHeight;
            var mapLine = new GameMapLine(i, point, width, lineHeight);
            mapLines.push(mapLine);
        }
        this._birdMap = new Array[9][7];
    }

    public get lines() :GameMapLine[] {
        return this._mapLines;
    }
    
    // 格子转换坐标
    public getBlockCenterPoint(line:number, col:number) :egret.Point {
        var block = this._mapLines[line].blocks[col]
        return block.pCenter;
    }
    
    // 坐标转换格子
    public getBlock(p:egret.Point): GameMapBlock {
        var line: number;
        var col: number;
        for( var index in this.lines) {
            if (this.lines[index].containsPoint(p)) {
                line = index;
                for( var _col in this.lines[index].blocks) {
                    if(this.lines[index].blocks[_col].containsPoint(p)) {
                        col = _col;
                    }
                }
            }
        }
        return this.lines[line].blocks[col];
    }
    
    public isDropStop(x: number, y: number) {
        var block = this.getBlock(new egret.Point(x,y));
        if (this._birdMap[block.line-1][block.col]) {
            return { isDropStop: false };
        } else {
            return { isDropStop: true, x: block.x, y: block.y }
        }
    }
    
    public bindBlock(bird: BirdView) {
        var p = new egret.Point(bird.x,bird.y);
        var block = this.getBlock(p);
        block.bird = bird;
        this._birdMap[block.line][block.col] = bird.type;
    }
    
}