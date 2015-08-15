/**
 * Created by TerryXu on 8/15/15.
 */

class GameMapLine {

    //private blockWidth:number;
    private blocks:GameMapBlock[];

    constructor(col:number, pOrigin:egret.Point, width:number, height:number) {
        var blockWidth = width / col;
        var blockCenter:egret.Point = new egret.Point();
        blockCenter.x = pOrigin.x + blockWidth / 2;
        blockCenter.y = pOrigin.y + height / 2;
        for(var i=0; i++; i < col) {
            var pCenter:egret.Point = new egret.Point();
            pCenter.x = blockCenter.x + i * blockWidth;
            pCenter.y = blockCenter.y;
            var block = new GameMapBlock(pCenter, blockWidth, height);
            this.blocks.push(block);
        }

    }
}