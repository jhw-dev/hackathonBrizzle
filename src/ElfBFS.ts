class ElfBFS{
  private height:number=9;
  private width:number=7;
  private hashMap:number[][];
  private queue:any[];
  private result:any[];
  private dir:any[][];
  public constructor(){
    this.reset(); 
    this.dir=[[0,1],[1,0],[-1,0],[0,-1]];

  }

  private reset(){
    this.hashMap = new Array(); 
    this.result=new Array();
    for(var i=0;i<this.height;i++){
      this.hashMap[i]=[];
      for(var j=0;j<this.width;j++){
        this.hashMap[i].push(0);
      }
    }
  }

  public findBlocks(oriMap:number[][]) {
    this.reset();
    var l=oriMap.length;
    var h=oriMap[0].length;
    for(var i=0;i<l;i++){
      for(var j=0;j<h;j++){
        if(oriMap[i][j]!=0&&this.hashMap[i][j]==0){
          this.searchAndMark(i,j,oriMap);
        }
      }
    }

    return this.result;

  }

  private searchAndMark(startX:number,startY:number,oriMap:number[][]){
    this.queue=new Array();
    this.queue.push(new ElfBFSItem(startX,startY,oriMap[startX][startY]));
    this.hashMap[startX][startY]=1;
    this.result.push(new Array());
    var reLen=this.result.length-1;
    var now=oriMap[startX][startY];
    while(this.queue.length) {
      var tt=this.queue.shift();
      this.result[reLen].push(tt);
      for(var i=0;i<4;i++){
        var x=tt.x+this.dir[i][0];
        var y=tt.y+this.dir[i][1];
        if( x<0 || y<0 || x>=this.height||y>=this.width){
          continue;
        }
        if(this.hashMap[x][y]!=0||oriMap[x][y]!=now){
          continue;
        }
        var it = new ElfBFSItem(x,y,oriMap[x][y]);
        this.hashMap[x][y]=1;
        this.queue.push(it);
      }
    }
    if(this.result[reLen].length<3){
      this.result.length=reLen;
    }

  }

} 
