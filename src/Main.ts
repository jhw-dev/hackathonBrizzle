//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {
    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //test code

        // var elf = new ElfBFS();
        // var start=egret.getTimer();
        // var oriMap = [
        //     [0, 0, 4, 0, 0, 4, 4],
        //     [0, 0, 4, 0, 4, 4, 0],
        //     [0, 0, 3, 2, 2, 3, 3],
        //     [0, 0, 3, 3, 2, 5, 5],
        //     [0, 0, 0, 0, 0, 5, 0],
        //     [0, 0, 0, 0, 0, 5, 0],
        //     [0, 1, 1, 0, 0, 0, 0],
        //     [0, 0, 1, 0, 0, 0, 0],
        //     [1, 1, 1, 1, 0, 0, 0]
        // ];
        // var res = elf.findBlocks(oriMap);
        // console.log(JSON.stringify(res));
        // for (var k in res) {
        //     for (var ib in res[k]) {
        //         oriMap[res[k][ib].x][res[k][ib].y] = -5;
        //     }
        // }
        // var rrr='';
        // for (var i = 0; i < 9; i++) {
        //     var t = '';
        //     for (var j = 0; j < 7; j++) {
        //         if (oriMap[i][j] == -5) {
        //             t = t + 'X';
        //         } else {
        //             t = t + oriMap[i][j];

        //         }
        //     }
        //     rrr+=t+'\n';
        // }
        
        // console.log(rrr);
        // console.log(elf.getSevenBirds());
        // var end=egret.getTimer();
        // console.log('time='+(end-start));
        //test code
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
        RES.loadGroup("soundload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }else if (event.groupName == "soundload") {
            var _bgMusic:egret.Sound = RES.getRes("bgmusic");
            _bgMusic.play(true);
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }


    private _debug:boolean = true;
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {
        egret.Profiler.getInstance().run();
        GameView.instance.launch(this);

        //test json res


        var texture = RES.getRes("Character_RETINA_json.box00_normal_00@2x");

        var bitmap = new egret.Bitmap();

        bitmap.texture = texture;

        this.addChild(bitmap);

        var texture = RES.getRes("Character_RETINA_json.box00_burn@2x");

        var bitmap = new egret.Bitmap();
        bitmap.x = 300;
        bitmap.y = 300;
        bitmap.texture = texture;

        this.addChild(bitmap);

    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}


