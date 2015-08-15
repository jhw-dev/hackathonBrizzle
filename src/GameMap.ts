/**
 * Created by TerryXu on 8/15/15.
 */
class GameMap {
    private mapLines:GameMapLine[];

    constructor(pStart:egret.Point, lines:number, cols:number, width:number, height:number) {
        var mapLines = this.mapLines = new Array;
        for(var i=0; i<lines; i++) {
            var point: egret.Point;
            var lineHeight: number = width / cols;
            point.x = pStart.x;
            point.y = pStart.y - i * lineHeight - lineHeight;
            var mapLine = new GameMapLine(cols, point, width, lineHeight);
            mapLines.push(mapLine);
        }
    }

    public get lines() :GameMapLine[] {
        return this.mapLines;
    }
    
    // block to point
    public getBlockCenter(line:number, col:number) :egret.Point {
        var block = this.mapLines[line].blocks[col]
        return block.pCenter;
    }
    
    
}