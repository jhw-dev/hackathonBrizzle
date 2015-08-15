/**
 * Created by TerryXu on 8/15/15.
 */
class GameMap {
    private mapLines:GameMapLine[];

    constructor(pStart:egret.Point, lines:number, cols:number, width:number, height:number) {
        for(i=0; i<lines; i++) {
            var mapLine = new GameMapLine(cols, pStart, width, width / cols);
            this.mapLines.push(mapLine);
        }
    }
}