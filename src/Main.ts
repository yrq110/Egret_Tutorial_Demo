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
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
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
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private infoText:egret.TextField;
    private drawText() {
        this.infoText = new egret.TextField();
        this.infoText.x = 200;
        this.infoText.y = 400;
        this.infoText.text = "碰撞结果";
        this.addChild(this.infoText);
    }

//    interface ITextElement {
//        text:string;
//        style:ITextStyle;
//    }
    
    private layTxBg(tx: egret.TextField): void {
        var shp: egret.Shape = new egret.Shape;
        shp.graphics.beginFill(0xffffff);
        shp.graphics.drawRect(tx.x,tx.y,tx.width,tx.height);
        shp.graphics.endFill();
        this.addChild(shp);
    }
    
    private timerFunc() {
        console.log("计时");
    }
    
    private timerComFunc() {
        console.log("计时结束");
    }
    
    private createGameScene():void {
        
        //背景色-BackgroundColor
        var shape:egret.Shape = new egret.Shape();
        shape.graphics.beginFill(0x336699);
        shape.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        shape.graphics.endFill();
        this.addChild(shape);
        
        //系统信息-SystemInformations
        console.log(egret.getTimer());
        console.log("isMobile?:"+egret.Capabilities.isMobile);
        console.log("os:" + egret.Capabilities.os);
        console.log("language:" + egret.Capabilities.language);
        console.log("runtimeType:" + egret.Capabilities.runtimeType);
        
        //44.1kHz,96kbps
//        var sound: egret.Sound = RES.getRes("test_sound_mp3");
//        sound.play();
        
        //计时器-Timer
//        var timer: egret.Timer = new egret.Timer(500,5);
//        timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
//        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
//        timer.start();
        
        //滤镜-Filter
        var icon:egret.Bitmap = new egret.Bitmap();
        icon.texture = RES.getRes("bg_jpg");
        icon.height = 80;
        icon.width = 80;
        //色彩矩阵-ColorMatrix
        var colorMatrix = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,100,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        //色彩滤镜-ColorFilter
        var colorFilter = new egret.ColorMatrixFilter(colorMatrix);
        icon.filters = [colorFilter];
        this.addChild(icon);
        
        var icon2: egret.Bitmap = new egret.Bitmap();
        icon2.texture = RES.getRes("bg_jpg");
        icon2.height = 80;
        icon2.width = 80;
        icon2.y = 80;
        //模糊滤镜-BlurFilter
        var blurFilter = new egret.BlurFilter(1,1);
        icon2.filters = [blurFilter];
        this.addChild(icon2);
        
        
        //文本输入框-InputTextField
        var txInput: egret.TextField = new egret.TextField;
        txInput.text ="I'm a InputTextField";
        txInput.size = 20;
        txInput.type = egret.TextFieldType.INPUT;
        txInput.width = this.stage.stageWidth/2;
        txInput.height = 43;
        txInput.y = 160;
        txInput.textColor = 0x000000;
        this.layTxBg(txInput);
        this.addChild(txInput);
        
        //获得焦点-GetFocus
        var btnTx:egret.TextField = new egret.TextField();
        btnTx.text ="GetInputFocus";
        btnTx.width = txInput.width;
        btnTx.textAlign = egret.HorizontalAlign.CENTER;
        btnTx.height = 40;
        btnTx.y = 203;
        this.addChild(btnTx);
        
        var button: egret.Shape = new egret.Shape();
        button.alpha = 0;
        button.graphics.beginFill(0x00cc00);
        button.graphics.drawRect(0,203,btnTx.width,40);
        button.graphics.endFill();
        this.addChild(button);
        button.touchEnabled = true;
        button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e) => {
            txInput.setFocus();
        },this);
        
        //多样式文本与触摸事件-MultiStyleLabelAndTapGesture
        var multiStyleLabel:egret.TextField = new egret.TextField();
        multiStyleLabel.y = 243;
        multiStyleLabel.text = "This is a multiStyleLabel";
        multiStyleLabel.textColor = 0xff0000;
        multiStyleLabel.width = this.stage.stageWidth/1.5;
        multiStyleLabel.textFlow = new Array<egret.ITextElement>(
            { text: "Hi,",style: { "size": 12 } }
            ,{ text: "Egret ",style: { "textColor": 0x336699,"size": 60,"strokeColor": 0x6699cc,"stroke": 2 } }
            ,{ text: "can say\n",style: { "fontFamily": "楷体" } }
            ,{ text: "co",style: { "textColor": 0xff0000 } }
            ,{ text: "lor",style: { "textColor": 0x00ff00 } }
            ,{ text: "ful",style: { "textColor": 0xf000f0 } }
            ,{ text: " and ",style: { "textColor": 0x00ffff } }
            ,{ text: "diff",style: { "size": 20 } }
            ,{ text: "erent",style: { "size": 12 } }
            ,{ text: " si",style: { "size": 16 } }
            ,{ text: "ze",style: { "size": 24 } }
            ,{ text: " and ",style: { "italic": true,"textColor": 0x00ff00 } }
            ,{ text: "style ",style: { "size": 16,"textColor": 0xf000f0 } }
            ,{ text: "words",style: { "italic": true,"textColor": 0xf06f00 } }

        );
        this.addChild(multiStyleLabel);
        
        
        //按钮-Button
        var buttonLabel: egret.TextField = new egret.TextField();
        buttonLabel.y = 243 + multiStyleLabel.height;
        buttonLabel.text = "This is a buttonLabel";
        buttonLabel.textColor = 0xffff00;
        buttonLabel.fontFamily = "KaiTi";
        buttonLabel.textAlign = egret.HorizontalAlign.CENTER;
        buttonLabel.width = this.stage.stageWidth/2;
        buttonLabel.textFlow = new Array<egret.ITextElement>(
            { text: "I have a url\n",style: { "href": "https://www.baidu.com" } }
            ,{ text: "i have no a url",style: { } }
        );
        buttonLabel.touchEnabled = true;
        buttonLabel.addEventListener(egret.TextEvent.LINK,function(evt: egret.TextEvent) {
            console.log(evt.text);
        },this);
        this.addChild(buttonLabel);
        
        //文本框-TextField
//        var tx:egret.TextField = new egret.TextField();
//        tx.text = "hello world";
//        tx.size = 32;
//        tx.x = 20;
//        tx.y = 20;
//        tx.width = this.stage.stageWidth - 40;
//        this.addChild(tx);
        
        //圆弧进度条-ArcProgress
        var arc: egret.Shape = new egret.Shape();
        arc.y = buttonLabel.y + buttonLabel.height;
        this.addChild(arc);
        var angle: number = 0;
        //startTick刷新率固定60fps，无法修改，可以使用Timer设置刷新率
        egret.startTick(function(timeStamp: number): boolean {
            angle += 1;
            changeArcGraphics(angle);
            angle = angle % 360;
            console.log(angle)
            return true;
        },this);
        
        function changeArcGraphics(angle) {
            arc.graphics.clear();
            arc.graphics.lineStyle(2,0x0000ff,1);
            arc.graphics.drawArc(50,50,50,0,angle * Math.PI / 180,false);
            arc.graphics.endFill();
        }
        
        //扇形进度条-SectorProgress
        var sector: egret.Shape = new egret.Shape();
        sector.y = arc.y;
        sector.x = arc.x + 120;
        this.addChild(sector);
        var angle2: number = 0;
        egret.startTick(function(timeStamp: number): boolean {
            angle2 += 1;
            changeSectorGraphics(angle2);
            angle2 = angle2 % 360;
            return true;
        },this);
        
        function changeSectorGraphics(angle) {
            sector.graphics.clear();
            sector.graphics.beginFill(0xff0000);
            sector.graphics.moveTo(50,50);
            sector.graphics.lineTo(100,50);
            sector.graphics.drawArc(50,50,50,0,angle * Math.PI / 180,false);
            sector.graphics.lineTo(50,50);
            sector.graphics.endFill();
        }
        
        //可移动,自定义视图-CustomView,Gesture,Movement
        var offsetX: number;
        var offsetY: number;
        var draggedObject: egret.Shape;
        var spr = new MyGrid();
        spr.x = 100;
        spr.y = arc.y + 100;
        spr.rotation = 45;
        spr.touchEnabled = true;
        
        spr.addEventListener(egret.TouchEvent.TOUCH_BEGIN,startMove,this);
        function startMove(e:egret.TouchEvent):void{
            offsetX = e.stageX - spr.x;
            offsetY = e.stageY - spr.y;
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
        }
        
        spr.addEventListener(egret.TouchEvent.TOUCH_END,stopMove,this);
        function stopMove(e: egret.TouchEvent) {
            console.log(1);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,onMove,this);
        }
        
        function onMove(e: egret.TouchEvent): void {
//            spr.rotation += 1;
            spr.x = e.stageX - offsetX;
            spr.y = e.stageY - offsetY;
//            var isHit: Boolean = spr.hitTestPoint(100,100,true);
//            this.infoText.text = "碰撞结果" + isHit;
        }
//        this.drawText();
        this.addChild(spr);
        
        //创建遮罩-CreateMask
//        shape.mask = ci;
        
        //位图-Bitmap
//        var bit:egret.Bitmap = new egret.Bitmap();
//        bit.texture = RES.getRes("bg");
//        this.addChild(bit);
        
        //滚动条-Scroller
        var scroller = new eui.Scroller();
        scroller.x = this.stage.stageWidth/2;
        var list = new eui.List();
        list.itemRendererSkinName = `
        <e:Skin states="up,down,disabled" minHeight="50" minWidth="100" xmlns:e="http://ns.egret.com/eui"> <e:Image width="100%" height="100%" scale9Grid="1,3,8,8" alpha.disabled="0.5"
                     source="resource/button_up.png"
                     source.down="resource/button_down.png"/> <e:Label text="{data}" top="8" bottom="8" left="8" right="8"
                     textColor="0xFFFFFF" verticalAlign="middle" textAlign="center"/> </e:Skin>`
        var ac = new eui.ArrayCollection([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);
        list.dataProvider = ac;
        scroller.viewport = list;
        scroller.height = 200;
        this.addChild(scroller);
        scroller.addEventListener(egret.TouchEvent.TOUCH_BEGIN,() => { console.log("111 Scroller Begin") },this);
        list.addEventListener(egret.TouchEvent.TOUCH_BEGIN,() => { console.log("111 List Begin") },this);
        scroller.addEventListener(egret.TouchEvent.TOUCH_END,() => { console.log("222 Scroller END") },this);
        list.addEventListener(egret.TouchEvent.TOUCH_END,() => { console.log("222 List END") },this);
        scroller.addEventListener(egret.TouchEvent.TOUCH_TAP,() => { console.log("33 Scroller Tap") },this);
        list.addEventListener(egret.TouchEvent.TOUCH_TAP,() => { console.log("33 List Tap") },this);
        scroller.addEventListener(egret.TouchEvent.TOUCH_CANCEL,() => { console.log("44 Scroller cancel") },this);
        list.addEventListener(egret.TouchEvent.TOUCH_CANCEL,() => { console.log("44 List cancel") },this);
        
        
        //水平滚动
        var bigText:egret.TextField = new egret.TextField();
        bigText.x = this.stage.stageWidth/2;
        bigText.y = spr.y
        bigText.text = "平移和滚动显示对象,平移和滚动显示对象";
        bigText.scrollRect = new egret.Rectangle(0,0,200,50);
        bigText.cacheAsBitmap =true;
        this.addChild(bigText);
        
        //创建一个按钮,点击后控制文本内容向左移动
        var btnLeft:egret.TextField = new egret.TextField();
        btnLeft.x = this.stage.stageWidth / 2 + 120;
        btnLeft.y = bigText.y + bigText.height + 20;
        btnLeft.text = "向左";
        btnLeft.touchEnabled = true;
        btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP,onScroll,this);
        this.addChild(btnLeft)
        //创建一个按钮,点击后控制文本内容向右移动
        var btnRight: egret.TextField = new egret.TextField();
        btnRight.x = this.stage.stageWidth / 2 ;
        btnRight.y = bigText.y + bigText.height + 20;
        btnRight.text = "向右";
        btnRight.touchEnabled = true;
        btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP,onScroll,this);
        this.addChild(btnRight)
//        var btnLeft: egret.Shape = new egret.Shape();
//        btnLeft.graphics.beginFill(0xcccc01);
//        btnLeft.graphics.drawRect(0,0,50,50);
//        btnLeft.graphics.endFill();
//        btnLeft.x = this.stage.stageWidth / 2 + 60;
//        btnLeft.y = bigText.y +bigText.height;
//        this.addChild(btnLeft);
//        btnLeft.touchEnabled = true;
//        btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP,onScroll,this);

//        var btnRight: egret.Shape = new egret.Shape();
//        btnRight.graphics.beginFill(0x01cccc);
//        btnRight.graphics.drawRect(0,0,50,50);
//        btnRight.graphics.endFill();
//        btnRight.x = this.stage.stageWidth / 2;
//        btnRight.y = bigText.y + bigText.height;
//        this.addChild(btnRight);
//        btnRight.touchEnabled = true;
//        btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP,onScroll,this);
        //点击按钮后,控制文本向左右移动的方法
        function onScroll(e: egret.TouchEvent): void {
            var rect: egret.Rectangle = bigText.scrollRect;
            switch(e.currentTarget) {
                case btnLeft:
                    rect.x += 20;
                    break;
                case btnRight:
                    rect.x -= 20;
                    break;
            }
            bigText.scrollRect = rect;
        }
        
        
//        console.log("Hello World");
//        
//        var sky:egret.Bitmap = this.createBitmapByName("bg_jpg");
//        this.addChild(sky);
//        var stageW:number = this.stage.stageWidth;
//        var stageH:number = this.stage.stageHeight;
//        sky.width = stageW;
//        sky.height = stageH;
//
//        var topMask = new egret.Shape();
//        topMask.graphics.beginFill(0x000000, 0.5);
//        topMask.graphics.drawRect(0, 0, stageW, 172);
//        topMask.graphics.endFill();
//        topMask.y = 33;
//        this.addChild(topMask);
//
//        var icon:egret.Bitmap = this.createBitmapByName("egret_icon_png");
//        this.addChild(icon);
//        icon.x = 26;
//        icon.y = 33;
//
//        var line = new egret.Shape();
//        line.graphics.lineStyle(2,0xffffff);
//        line.graphics.moveTo(0,0);
//        line.graphics.lineTo(0,117);
//        line.graphics.endFill();
//        line.x = 172;
//        line.y = 61;
//        this.addChild(line);
//
//
//        var colorLabel = new egret.TextField();
//        colorLabel.textColor = 0xffffff;
//        colorLabel.width = stageW - 172;
//        colorLabel.textAlign = "center";
//        colorLabel.text = "Hello Egret";
//        colorLabel.size = 24;
//        colorLabel.x = 172;
//        colorLabel.y = 80;
//        this.addChild(colorLabel);
//
//        var textfield = new egret.TextField();
//        this.addChild(textfield);
//        textfield.alpha = 0;
//        textfield.width = stageW - 172;
//        textfield.textAlign = egret.HorizontalAlign.CENTER;
//        textfield.size = 24;
//        textfield.textColor = 0xffffff;
//        textfield.x = 172;
//        textfield.y = 135;
//        this.textfield = textfield;
//
//        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
//        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
//        RES.getResAsync("description_json", this.startAnimation, this)
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


