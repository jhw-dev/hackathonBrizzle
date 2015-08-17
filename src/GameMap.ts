/**
 * Created by TerryXu on 8/15/15.
 */
class GameMap {
    private _mapLines:Array<GameMapLine>;
    private _blockMap: any;
    private _birdMap: any;
    private _perBlockWidth: number;
    private _perBlockHeight: number;
    private _width: number;
    private _height: number;
    private _totalLines: number = 9;
    private _totalColumns: number = 7;
    private _pLeftTop: egret.Point;
    
    // pLeftTop: 左上角原点
    // lines： 一共多少行
    // cols： 一共多少列
    // width： Map总长度
    // height： Map总高度
    constructor(pLeftTop:egret.Point, lines:number, cols:number, width:number, height:number) {
//        var mapLines = this._mapLines = new Array;
//        for(var i=0; i<lines; i++) {
//            var point: egret.Point = new egret.Point;
//            var lineHeight: number = width / cols;
//            
//            point.x = pLeftTop.x;
//            point.y = pLeftTop.y - i * lineHeight - lineHeight;
//            var mapLine = new GameMapLine(i, point, width, lineHeight);
//            mapLines.push(mapLine);
////            console.log("line: " + mapLine);
//        }
//        console.log(mapLines);
        this._birdMap = [
                 [0, 0, 0, 0, 0, 0, 0],  // Line 0
                 [0, 0, 0, 0, 0, 0, 0],  // Line 1
                 [0, 0, 0, 0, 0, 0, 0],  // Line 2
                 [0, 0, 0, 0, 0, 0, 0],  // Line 3
                 [0, 0, 0, 0, 0, 0, 0],  // Line 4
                 [0, 0, 0, 0, 0, 0, 0],  // Line 5
                 [0, 0, 0, 0, 0, 0, 0],  // Line 6
                 [0, 0, 0, 0, 0, 0, 0],  // Line 7
                 [0, 0, 0, 0, 0, 0, 0]   // Line 8
             ];
        this._blockMap = [
            [0, 0, 0, 0, 0, 0, 0],  // Line 0
            [0, 0, 0, 0, 0, 0, 0],  // Line 1
            [0, 0, 0, 0, 0, 0, 0],  // Line 2
            [0, 0, 0, 0, 0, 0, 0],  // Line 3
            [0, 0, 0, 0, 0, 0, 0],  // Line 4
            [0, 0, 0, 0, 0, 0, 0],  // Line 5
            [0, 0, 0, 0, 0, 0, 0],  // Line 6
            [0, 0, 0, 0, 0, 0, 0],  // Line 7
            [0, 0, 0, 0, 0, 0, 0]   // Line 8
        ];
        
        // init Map Data Struct
        this._width = width;
        this._height = height;
        this._pLeftTop = pLeftTop;
        this._perBlockWidth = this._perBlockHeight = width / this._totalColumns;
        for(var i = 0;i < this._totalLines;i++) {
            for(var j = 0;j < this._totalColumns;j++) {
                var pBlockLeftTop = new egret.Point;
                pBlockLeftTop.x = pLeftTop.x + this._perBlockWidth * j;
                pBlockLeftTop.y = pLeftTop.y + this._perBlockHeight * (this._totalLines - i - 1);
                this._blockMap[i][j] = new GameMapBlock(pBlockLeftTop, this._perBlockWidth, this._perBlockHeight, j, (this._totalColumns - i) )
            }
        } 
        console.log("init Map: width:" + this._width+"x"+this._height );
        console.log("per block width:" + this._perBlockWidth);
        console.log("left top point:" + this._pLeftTop);
//        console.log("game blocks:" + this._blockMap);
    }
    
    public moveRight(curLine:number, curColumn:number, bird:BirdView, stageX: number) {
        if(curLine<0 || curColumn<0){
            console.log("非法治");
            return;
        }
        var dtX = stageX - bird.x;
        var curBlock = this._blockMap[curLine][curColumn];
        var pLeftTop = bird.pLeftTop();
        
        // 当前touch的列有货
        if(curBlock.bird) {
            console.log("当前touch的列有货");
            bird.x = this.alignX(bird.x);
            return;
        }else{
            var testHitRect = new egret.Rectangle(pLeftTop.x + dtX,pLeftTop.y,bird.width,bird.height);
            console.log("testHitRect" + testHitRect);
            var rightBlock = this._blockMap[curLine][curColumn + 1];
            if(!rightBlock) {
                var pRightBootm = bird.pRightBottom();
                var pRightTop = bird.pRightTop();
                if(!curBlock.contains(pRightBootm.x + dtX,pRightBootm.y)
                    && !curBlock.contains(pRightTop.x + dtX,pRightTop.y)) {
                    bird.x = this.getColumns(this._totalColumns - 1).middleX;
                    return;
                }
            }else if(rightBlock && rightBlock.bird && testHitRect.intersects(rightBlock)) {
                return;
            }
            var BottomBlock = this._blockMap[curLine - 1][curColumn];
            if(BottomBlock.bird && testHitRect.intersects(BottomBlock)) {
                return;
            }
        }
        
//        console.log("走你");
        bird.x += dtX;
        return;

    }
    
    public moveLeft(curLine:number, curColumn:number, bird:BirdView, stageX:number) {
        if(curLine<0 || curColumn<0){
            console.log("非法治");
            return;
        }
        var dtX = bird.x - stageX ;
        var curBlock = this._blockMap[curLine][curColumn];
        var pLeftTop = bird.pLeftTop();
                
        // 当前touch的列有货
        if(curBlock.bird) {
            console.log("当前touch的有货");
            bird.x = this.alignX(bird.x);
            return;
        }else{
            var testHitRect = new egret.Rectangle(pLeftTop.x - dtX,pLeftTop.y,bird.width,bird.height);
            console.log("testHitRect" + testHitRect);
            var leftBlock = this._blockMap[curLine][curColumn - 1];
            if(!leftBlock) {
                var pLeftBottom = bird.pLeftBottom();
                var pLeftTop = bird.pLeftTop();
                if(!curBlock.contains(pLeftBottom.x - dtX,pLeftBottom.y)
                    && !curBlock.contains(pLeftTop.x - dtX,pLeftTop.y)) {
                        bird.x = this.getColumns(0).middleX;
                        return;
                    }
                }else if(leftBlock && leftBlock.bird && testHitRect.intersects(leftBlock)) {
                    return;
                }
                var BottomBlock = this._blockMap[curLine - 1][curColumn];
                if(BottomBlock.bird && testHitRect.intersects(BottomBlock)) {
                    return;
                }
            }
                    
            //        console.log("走你");
            bird.x -= dtX;
            return; 
    }
    
    public getMaxFreeLine(column:number) {
        var birdMap = this._birdMap;
        var free = -1;
        for(var i = 0;i < this._totalLines;i++){
            if(birdMap[i][column] == 0) {
                free = i;
                break;
            }
        }
        return free;
    }
    
    public moveUp(curLine:number, curColumn:number, bird:BirdView, stageY:number ) {
        if(curLine<0 || curColumn<0){
            console.log("非法治");
            return;
        }
        var dtY = bird.y - stageY;
        var curBlock = this._blockMap[curLine][curColumn];
        if (!curBlock.bird) {
            if(curLine == this._totalLines - 1) {
                if (stageY > this.getLines(this._totalLines-1).middleY) {
                    bird.y = this.getLines(this._totalLines - 1).middleY;
                    return
                }
                bird.y = stageY;
                return;
            }
            var topBlock = this._blockMap[curLine + 1][curColumn];
            var pLeftTop = bird.pLeftTop();
            var testHitRect = new egret.Rectangle(pLeftTop.x,pLeftTop.y-dtY,bird.width,bird.height);
            if(topBlock.bird && testHitRect.intersects(topBlock)) {
                bird.y = this.alignY(bird.y);
                return;
            }
        } else {
            bird.y = this.alignY(bird.y);
            return;
        }
        bird.y = stageY;
    }
    
    public moveDown(curLine:number, curColumn:number, bird:BirdView, stageY:number ) {
        if(curLine<0 || curColumn<0){
            console.log("非法治");
            return;
        }
        var dtY = stageY - bird.y;
        var curBlock = this._blockMap[curLine][curColumn];
        if (!curBlock.bird) {
            var BottomBlock = this._blockMap[curLine - 1][curColumn];
            var pLeftTop = bird.pLeftTop();
            var testHitRect = new egret.Rectangle(pLeftTop.x,pLeftTop.y+dtY,bird.width,bird.height);
            if(BottomBlock.bird && testHitRect.intersects(BottomBlock)) {
                bird.y = this.alignY(bird.y);
                return;
            }
        } else {
            bird.y = this.alignY(bird.y);
            return;
        }
        bird.y = stageY;
    }
    
    public moveUpDown(curLine:number, curColumn:number, bird:BirdView, stageY:number ) {
        if(curLine<0 || curColumn<0){
            console.log("非法治");
            return;
        }
        console.log("bird.y:" + bird.y);
        var dtY = bird.y - stageY ;
        console.log("dtY:" + dtY);
        var curBlock = this._blockMap[curLine][curColumn];
        var pLeftTop = bird.pLeftTop();
        var testHitRect = new egret.Rectangle(pLeftTop.x,pLeftTop.y+dtY,bird.width,bird.height);
        var BottomBlock = this._blockMap[curLine - 1][curColumn];
        var topBlock = this._blockMap[curLine + 1][curColumn];
        if(curBlock.bird) {
            bird.y = this.alignY(bird.y);
            return;
        }
        // down
        if(dtY < 0) {
            if(!BottomBlock) {
                if(!curBlock.bird)
                    bird.y = this.getLines(0).middleY;
                return;
            }
            console.log("BottomBlock" + BottomBlock);
            console.log("testHitRect" + testHitRect);
            console.log("testHitRect.intersects(BottomBlock)" + testHitRect.intersects(BottomBlock));
            if(BottomBlock.bird && testHitRect.intersects(BottomBlock)) {
                bird.y = this.alignY(bird.y);
                return;
            }
        } else {
            if(!topBlock) {
                if(!curBlock.bird)
                    bird.y = this.getLines(curLine).middleY;
                return;
            }
            console.log("testHitRect.intersects(topBlock)" + testHitRect.intersects(topBlock));
            if(topBlock.bird && testHitRect.intersects(topBlock)) {
                bird.y = this.alignY(bird.y);
                return;
            }
        }
        bird.y = stageY;
    }
    
    public goEliminate() {
        var res = GameView.instance.elf.findBlocks(this._birdMap);
        console.log("妈妈妈妈" + JSON.stringify(res));
        for (var k in res) {
            for (var ib in res[k]) {
                this._blockMap[res[k][ib].x][res[k][ib].y].bird.toDie((bird) => { console.log('die') });
                this._blockMap[res[k][ib].x][res[k][ib].y].bird = null;
                this._birdMap[res[k][ib].x][res[k][ib].y] = 0;
            }
        }
    }
    
    public dropdown(bird: BirdView, line:number, column:number) {
        // 如果下面有鸟就只要对齐Y 然后注册数据
        var bottomBlock = this._blockMap[line-1][column];
        if(bottomBlock.bird) {
            bird.x = this.alignX(bird.x);
            this.registerBird(bird,line,column);
        }
        // 没鸟就下落
        else {
            var col = this.getMaxFreeLine(column);
            var diest = this.getLines(col).middleY;
            bird.dropTo(bird.x,diest,100);
        }
        
    }
    
    public alignX(x: number) {
        var block = this.convertPointToBlockNumber(new egret.Point(x,this.getLines(0).middleY));
        return this.getColumns(block.column).middleX;
    }
    
    public alignY(y: number) {
        var block = this.convertPointToBlockNumber(new egret.Point(this.getColumns(0).middleX,y));
        return this.getLines(block.line).middleY;
    }
    
    
    
    public testHitBlock(line:number, column:number, pTest):Boolean {
        return this._blockMap[line][column].containsPoint(pTest);
    }
    
    public getBird(line:number, column:number) {
        if (this._blockMap[line][column].bird) {
            return this._blockMap[line][column].bird;
        }else{
            null;
        }
           
    }
    
    public unregisterBird(line: number, column:number) {
        var block = this._blockMap[line][column];
        if (!block.bird) {
            return;
        }else {
            block.bird = null;
            this._birdMap[line][column] = 0;
        }
    }
    
    public registerBird(bird: BirdView, line: number, column:number) {
        this._blockMap[line][column].bind(bird);
        this._birdMap[line][column] = bird.type;
    }
    
    public getColumns(col:number) {
        if(col < this._totalLines && col >= 0) { 
            return {
                width: this._perBlockWidth,
                height: this._perBlockHeight * this._totalLines,
                x: this._blockMap[0][col].x,
                y: this._blockMap[0][col].y,
                middleX: this._blockMap[0][col].pCenter.x
            }
        }
    }
    
    public getLines(line:number) {
        if(line < this._totalLines && line >= 0) {
            return {
                width: this._perBlockWidth * this._totalColumns,
                height: this._perBlockHeight,
                x: this._blockMap[line][0].x,
                y: this._blockMap[line][0].y,
                middleY: this._blockMap[line][0].pCenter.y
            }
        }
    }
    
    public convertPointToBlockNumber(p: egret.Point, autoLimit:Boolean = true) {
        var x: number = p.x;
        var y: number = p.y;
        var curLine: number;
        var curColumn: number;
        
        if(p.y < this._pLeftTop.y) {
            // out of top boundary
//            y = this._pLeftTop.y + this._perBlockHeight;
            curLine = -1;
        }else if ( p.y > this._pLeftTop.y+this._height) {
            // out of bottom boundary
//            y = this._pLeftTop.y + this._height;
            curLine = -1;
            
        }else {
            // cut offset
            y = p.y;
            y = y - this._pLeftTop.y;
            curLine = Math.floor((this._height - y) / this._perBlockHeight);
        }
        
       
        // x
        if(p.x - this._pLeftTop.x < 0) {
            // out of Left boundary
//            x = this._pLeftTop.x;
            curColumn = -1;
        }else if ( this._pLeftTop.x+this._width < p.x) {
            // out of Right boundary
//            x = this._pLeftTop.x + this._width;
            curColumn = -1;
        }else {
            // cut offset
            x = p.x - this._pLeftTop.x;
            curColumn = Math.floor(x / this._perBlockWidth);
        }       
        
        return { line: curLine,column: curColumn };
    }

//    public get lines() :GameMapLine[] {
//        return this._mapLines;
//    }
//    
    // 格子转换坐标
//    public getBlockCenterPoint(line:number, col:number) :egret.Point {
//        var block = this._mapLines[line].blocks[col]
//        return block.pCenter;
//    }
    
    // 坐标转换格子
//    public getBlock(p:egret.Point): GameMapBlock {
//        var line: number;
//        var col: number;
////        console.log("get block x:" + p.x + " y:" + p.y);
//        
//        for(var index = 0;index < this._mapLines.length; index++) {
//            if (this.lines[index].containsPoint(p)) {
//                line = index;
//                for(var _col = 0;_col < this._mapLines[index]._blocks.length;_col++) {
////                    console.log("" + this._mapLines[index]._blocks[_col]);
//                    if(this._mapLines[index]._blocks[_col].containsPoint(p)) {
//                        col = _col;
//                        return this._mapLines[line]._blocks[col];
//                    }
//                }
//            }
//        }
////        console.log("line:" + line);
////        console.log(this.lines[line]);
//        return null;
//    }
    
//    public isDropStop(x: number, y: number):any {
//        var block = this.getBlock(new egret.Point(x,y));
//        if (block && this._birdMap[block.line][block.col]) {
//            return { isDropStop: true, x: block.x, y: block.y };
//        } else if(block && (this._birdMap[block.line][block.col] == 0)) {
//            return { isDropStop: false }
//        }
//    }
//    
//    public bindBlock(bird: BirdView) {
//        var p = new egret.Point(bird.x,bird.y);
//        var block = this.getBlock(p);
////        console.log(block);
//        if(block) {
//            block.bird = bird;
//            this._birdMap[block.line][block.col] = bird.type;
//        }
////        console.log(this._birdMap);
//        
//    }
    
}