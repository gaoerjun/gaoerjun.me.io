/**
 * Created by gaoerjun on 15/2/26.
 */
$(function(){
    new Game2048();
})
Function.prototype.pointTo=function(o){
    var _this=this;//this就是a函数本身
    return function(){ //newFunc就等于这个
        return _this.apply(o,arguments);
    }
}
function Game2048(){
    this.playing = 0;
    this.started = 0;
    this.Game2048over = 0;
    this.won = 0;
    this.m_startX = 0;
    this.m_startY = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.blankArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    /**
     * 初始化函数
     */
    this.init=function(){
        this.initEvent();
        this.startGame();
    }
    /**
     * 初始化事件
     */
    this.initEvent=function(){
        var canvas = document.getElementById("canvas");
        canvas.addEventListener('touchstart', this.eventDown.pointTo(this));
        canvas.addEventListener('touchend', this.eventUp.pointTo(this));
        canvas.addEventListener('touchmove',this.eventMove.pointTo(this));
        canvas.addEventListener('mousedown',this.eventDown.pointTo(this) );
        canvas.addEventListener('mouseup',this.eventUp.pointTo(this));
        canvas.addEventListener('mousemove',this.eventMove.pointTo(this));
        var restartBtn = document.getElementById("restart");
        restartBtn.addEventListener('click',this.restartGame.pointTo(this));
    }

    this.eventDown=function(e){
        e.preventDefault();
        if(e.targetTouches){
            var touch = e.targetTouches[0];
        }
        this.m_startX = e.clientX || e.pageX ||touch.pageX;
        this.m_startY = e.clientY || e.pageY || touch.pageY;
        this.moveX = 0;
        this.moveY = 0;
    }

    this.eventUp=function(e){
        e.preventDefault();
        //console.log("m_startX=="+m_startX+"  m_startY=="+m_startY+"  x=="+x+"  y=="+y);
        //console.log("moveX=="+moveX+"  moveY=="+moveY);
        //检查移动的方向
        if(Math.abs(this.moveX)>Math.abs(this.moveY)){
            this.blankArr=[];
            if(this.moveX>0){
                this.doMove("right");
            }else{
                this.doMove("left");
            }
        }else{
            if(Math.abs(this.moveY)<=10){
                return false;
            }
            this.blankArr=[];
            if(this.moveY>0){
                this.doMove("down");
            }else{
                this.doMove("up");
            }
        }
    }
    this.eventMove=function(e){
        var self = this ;
        e.preventDefault();
        if(e.targetTouches){
            var touch = e.targetTouches[0];
        }
        var x = e.clientX || e.pageX|| touch.pageX,
            y = e.clientY ||e.pageY|| touch.pageY;

        self.moveX = x-self.m_startX;
        self.moveY = y-self.m_startY;
    }
    this.init();
}
/**
 * 游戏开始
 */

Game2048.prototype.startGame=function(){
    this.newBlock();
    this.newBlock();
}
/**
 * 滑动的入口
 */
Game2048.prototype.doMove=function(_derction){
    var isHasChange = false;
    for(var i=1;i<=4;i++){
        if(this.updateLine(i,_derction)){
            isHasChange=true;
        }
    }
    if(isHasChange){
        this.newBlock();
        var currcount = $(".count").html();
        currcount = parseInt(currcount,10)+3;
        $(".count").html(currcount);
    }else{
        $(".err_tip").html("请换个方向移动~");
        setTimeout(function(){
            $(".err_tip").html("");
        },1000)

    }
}
/**
 * 产生新的方块，2的几率90% 4的几率10%
 */
Game2048.prototype.newBlock=function(){
    var num = Math.floor(Math.random()*(this.blankArr.length)+1);
    var pos = this.getBlankPosByNum(this.blankArr[num-1]);
    this.updateBlock(pos.x,pos.y,Math.random()<0.9?2:4);
    //console.log("num＝＝"+num+"  selectNum＝＝"+blankArr[num-1]+"   blankArr="+blankArr);
    this.blankArr.splice(num-1,1);

    if(this.blankArr.length==0){
        if(this.isFinish()){
            if(window.confirm("Game2048 over,是否重新开始？")){
                this.restartGame();
            }else{
                this.restartGame();
            }
        }
    }
}

/**
 * 重新开始游戏
 */
Game2048.prototype.restartGame=function(){
    for(var i=1;i<=4;i++){
        for(var j=1;j<=4;j++){
            this.updateBlock(i,j,0);
        }
    }
    this.blankArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    this.newBlock();
    this.newBlock();
}
/**
 * 减产游戏是否结束
 * @returns {boolean}
 */
Game2048.prototype.isFinish=function(){
    if(this.blankArr.length>0){
        return false;
    }
    var isFinish = true;
    for(var i=1;i<=4;i++){
        for(var j=1;j<=4;j++){
           var num = $("#"+i+"_"+j).html();
           if(i<4){
               var num1= $("#"+(i+1)+"_"+j).html();
               if(num1==num){
                   isFinish =false;
                   break;
               }
           }
            if(j<4){
                var num2= $("#"+i+"_"+(j+1)).html();
                if(num2==num){
                    isFinish =false;
                    break;
                }
            }
        }
    }
    return isFinish;
}
/**
 * 移动一行或者一列，返回是否移动的标记（boolean）
 * @param _lineNum
 * @param _derc
 * @returns {boolean}
 */

Game2048.prototype.updateLine =function(_lineNum,_derc){
    var bHasUpdate = false;
    var numArr=[];
    var istart = 4;
    if(_derc=="left" || _derc=="up" ){
        istart = 1;
    }
    while(true){
        if((_derc=="left" || _derc=="up") && istart>4 ){
            break;
        }
        if((_derc=="right" || _derc=="down") && istart<0 ){
            break;
        }
        var dom = $("#"+_lineNum+"_"+istart);
        if(_derc=="up" || _derc=="down" ){
            dom = $("#"+istart+"_"+_lineNum);
        }
        var num = dom.html();
        if(num>0){
            numArr.push(num);
        }
        if(_derc=="up" || _derc=="left" ){
            istart++;
        }else{
            istart--;
        }
    }
    //console.log("numArr1=="+numArr);
    //更新数字
    //从头到尾两两合并，
    for(var i=0;i<numArr.length;i++){
        if(i<=numArr.length-2){
            if( numArr[i]==numArr[i+1]){

                numArr[i]=parseInt(numArr[i],10)-0+parseInt(numArr[i+1],10);
                var currcount = $(".count").html();
                currcount = parseInt(currcount,10)+numArr[i];
                $(".count").html(currcount);
                for(var j=i+1;j<numArr.length;j++){
                    if(j+1<=numArr.length-1){
                        numArr[j]=numArr[j+1];
                    }
                }
                numArr.splice(numArr.length-1,1);
            }
        }
    }
    //小于4位的后边用0补齐
    for(var i=numArr.length || 0;i<4;i++){
        numArr[i]=0;
    }
    //根据不同的方向和数组一次更新每行或每列
    if(_derc=="left" ){
        for(var i=1;i<=4;i++ ){
            var num = numArr[i-1];
            if(this.updateBlock(_lineNum,i,num)){
                bHasUpdate =true;
            }

        }
    }else if(_derc=="right"){
        for(var i=4;i>=1;i--){
            var num = numArr[4-i];
            if(this.updateBlock(_lineNum,i,num)){
                bHasUpdate =true;
            }
        }

    }else if(_derc=="up" ){
        for(var i=1;i<=4;i++ ){
            var num = numArr[i-1];
            if(this.updateBlock(i,_lineNum,num)){
                bHasUpdate =true;
            }
        }
    }else if(_derc=="down"){
        for(var i=4;i>=1;i-- ){
            var num = numArr[4-i];
            if(this.updateBlock(i,_lineNum,num)){
                bHasUpdate =true;
            }
        }
    }
    return bHasUpdate;
}
/**
 * 更新一个具体的块，返回是否做了更新
 * @param _x
 * @param _y
 * @param _num
 * @returns {boolean}
 */
Game2048.prototype.updateBlock=function(_x,_y,_num){
    var updateDom = $("#"+_x+"_"+_y);
    var beforeVale = updateDom.html();
    //console.log("beforeVale=="+beforeVale+"  num=="+_num);
    if(beforeVale==_num || (beforeVale=="" && _num==0)){
        if(_num==0){
            var num = this.getBlankNumByPos(_x,_y);
            this.blankArr.push(num);
        }
        return false;
    }
    if(_num>0){
        updateDom.attr("class","i_block item"+_num).html(_num);
    }else{
        var num = this.getBlankNumByPos(_x,_y);
        //console.log("numm=="+num);
        this.blankArr.push(num);
        updateDom.attr("class","i_block").html("");
    }
    return true;

}

/**
 * 根据坐标查找该块的编号
 * @param x
 * @param y
 * @returns {*}
 */
Game2048.prototype.getBlankNumByPos=function(x,y){
    for(var i=0;i<m_posMap.length;i++){
        if(m_posMap[i].pos==x+"_"+y){
            return m_posMap[i].key;
        }
    }
}
/**
 * 根据编号查找坐标
 * @param num
 * @returns {{x: *, y: *}}
 */
Game2048.prototype.getBlankPosByNum=function(num){
    for(var i=0;i<m_posMap.length;i++){
        if(m_posMap[i].key==num){
            var pos = m_posMap[i].pos.split("_");
            return {
                x:pos[0],
                y:pos[1]
            }
        }
    }
}



