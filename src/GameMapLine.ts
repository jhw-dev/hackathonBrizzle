/**
 * Created by TerryXu on 8/15/15.
 */

class GameMapLine extends egret.Rectangle {

    //private blockWidth:number;
    private _blocks:GameMapBlock[];

    constructor(col:number, pOrigin:egret.Point, width:number, height:number) {
        super(pOrigin.x, pOrigin.y, width, height);
        this._blocks = new Array;
        var blockWidth = width / col;
        var blockCenter:egret.Point = new egret.Point();
        blockCenter.x = pOrigin.x + blockWidth / 2;
        blockCenter.y = pOrigin.y - height / 2;
        for(var i = 0;i < col; i++) {
            var pCenter:egret.Point = new egret.Point();
            pCenter.x = blockCenter.x + i * blockWidth;
            pCenter.y = blockCenter.y;
            var block = new GameMapBlock(pCenter, blockWidth, height, i, col);
            this._blocks.push(block);
        }

    }
    
    public blocks(col:number):GameMapBlock {
        var block: GameMapBlock;
        block = this.blocks[col]
        return block;
    }
}