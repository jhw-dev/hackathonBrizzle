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
    
    public getBird(line:number, column:number) {
        if (this._blockMap[line][column].bird) {
            return this._blockMap[line][column].bird;
        }else{
            null;
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
        
        if(p.y < this._pLeftTop.y) {
            // out of top boundary
            y = this._pLeftTop.y + this._perBlockHeight;
        }else if ( p.y > this._pLeftTop.y+this._height) {
            // out of bottom boundary
            y = this._pLeftTop.y + this._height;
        }else {
            // cut offset
            y = p.y;
        }
        y = y - this._pLeftTop.y;
        var curLine = Math.floor((this._height - y) / this._perBlockHeight);
        
        // x
        if(p.x - this._pLeftTop.x < 0) {
            // out of Left boundary
            x = this._pLeftTop.x;
        }else if ( this._pLeftTop.x+this._width < p.x) {
            // out of Right boundary
            x = this._pLeftTop.x + this._width;
        }else {
            // cut offset
            x = p.x - this._pLeftTop.x;
        }       
        var curColumn = Math.floor(x / this._perBlockWidth);
        
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