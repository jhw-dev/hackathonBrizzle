/**
 * Created by TerryXu on 8/15/15.
 */

class GameMapLine extends egret.Rectangle {

    //private blockWidth:number;
    public _blocks:GameMapBlock[];

    constructor(col:number, pOrigin:egret.Point, width:number, height:number) {
        super(pOrigin.x, pOrigin.y, width, height);
        this._blocks = new Array;
        var blockWidth = width / 7; // 每行有7列, 不高兴改了，写死了。这个是每个格子的宽度
        console.log("new blockWidth:" + blockWidth);
        var blockCenter:egret.Point = new egret.Point();
        blockCenter.x = pOrigin.x + blockWidth / 2;
        blockCenter.y = pOrigin.y - height / 2;
        console.log("new blockCenter:" + blockCenter.x + " y:"+ blockCenter.y);
        for(var i = 0;i < 7; i++) { // 每行有7列, 不高兴改了，写死了
            var pCenter:egret.Point = new egret.Point();
            pCenter.x = blockCenter.x + i * blockWidth;
            pCenter.y = blockCenter.y;
            console.log("new block:" + pCenter.x + " y:"+ pCenter.y);
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