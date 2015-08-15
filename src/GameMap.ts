/**
 * Created by TerryXu on 8/15/15.
 */
class GameMap {
    private _mapLines:Array<GameMapLine>;
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
//            console.log("line: " + mapLine);
        }
//        console.log(mapLines);
        this._birdMap = [
                 [0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0],
                 [0, 0, 0, 0, 0, 0, 0]
             ];
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
        console.log("get block x:" + p.x + " y:" + p.y);
        
        for(var index = 0;index < this._mapLines.length; index++) {
            if (this.lines[index].containsPoint(p)) {
                line = index;
                for(var _col = 0;_col < this._mapLines[index]._blocks.length;_col++) {
                    console.log("" + this._mapLines[index]._blocks[_col]);
                    if(this._mapLines[index]._blocks[_col].containsPoint(p)) {
                        col = _col;
                        return this._mapLines[line]._blocks[col];
                    }
                }
            }
        }
//        console.log("line:" + line);
//        console.log(this.lines[line]);
        return null;
    }
    
    public isDropStop(x: number, y: number):any {
        var block = this.getBlock(new egret.Point(x,y));
        if (block && this._birdMap[block.line][block.col]) {
            return { isDropStop: true, x: block.x, y: block.y };
        } else if(block && (this._birdMap[block.line][block.col] == 0)) {
            return { isDropStop: false }
        }
    }
    
    public bindBlock(bird: BirdView) {
        var p = new egret.Point(bird.x,bird.y);
        var block = this.getBlock(p);
        console.log(block);
        if(block) {
            block.bird = bird;
            this._birdMap[block.line][block.col] = bird.type;
        }
        console.log(this._birdMap);
        
    }
    
}