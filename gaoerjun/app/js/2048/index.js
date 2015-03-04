/**
 * Created by gaoerjun on 15/2/26.
 */
$(function(){
    newBlock();
    newBlock();
    var canvas = document.getElementById("canvas");
    canvas.addEventListener('touchstart', eventDown);
    canvas.addEventListener('touchend', eventUp);
    canvas.addEventListener('touchmove', eventMove);
    canvas.addEventListener('mousedown', eventDown);
    canvas.addEventListener('mouseup', eventUp);
    canvas.addEventListener('mousemove', eventMove);
})
function Game(){
    this.playing = 0;
    this.started = 0;
    this.gameover = 0;
    this.won = 0;

}
function doMove(_derction){
    var isHasChange = false;
    for(var i=1;i<=4;i++){
        if(updateLine(i,_derction)){
            isHasChange=true;
        }
    }
    if(isHasChange){
        newBlock();
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
function newBlock(){

    var num = Math.floor(Math.random()*(blankArr.length)+1);
    var pos = getBlankPosByNum(blankArr[num-1]);
    updateBlock(pos.x,pos.y,Math.random()<0.9?2:4);
    //console.log("num＝＝"+num+"  selectNum＝＝"+blankArr[num-1]+"   blankArr="+blankArr);
    blankArr.splice(num-1,1);

    if(blankArr.length==0){
        if(isFinish()){
            if(window.confirm("game over,是否重新开始？")){
                restartGame();
            }else{
                restartGame();
            }
        }
    }
}
function restartGame(){
    for(var i=1;i<=4;i++){
        for(var j=1;j<=4;j++){
            updateBlock(i,j,0);
        }
    }
    blankArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    newBlock();
    newBlock();
}
function isFinish(){
    if(blankArr.length>0){
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
function updateLine(_lineNum,_derc){
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
            if(updateBlock(_lineNum,i,num)){
                bHasUpdate =true;
            }

        }
    }else if(_derc=="right"){
        for(var i=4;i>=1;i--){
            var num = numArr[4-i];
            if(updateBlock(_lineNum,i,num)){
                bHasUpdate =true;
            }
        }

    }else if(_derc=="up" ){
        for(var i=1;i<=4;i++ ){
            var num = numArr[i-1];
            if(updateBlock(i,_lineNum,num)){
                bHasUpdate =true;
            }
        }
    }else if(_derc=="down"){
        for(var i=4;i>=1;i-- ){
            var num = numArr[4-i];
            if(updateBlock(i,_lineNum,num)){
                bHasUpdate =true;
            }
        }
    }
    return bHasUpdate;
}
var blankArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
function updateBlock(_x,_y,_num){
    var updateDom = $("#"+_x+"_"+_y);
    var beforeVale = updateDom.html();
    //console.log("beforeVale=="+beforeVale+"  num=="+_num);
    if(beforeVale==_num || (beforeVale=="" && _num==0)){
        if(_num==0){
            var num = getBlankNumByPos(_x,_y);
            blankArr.push(num);
        }
        return false;
    }
    if(_num>0){
        updateDom.attr("class","i_block item"+_num).html(_num);
    }else{
        var num = getBlankNumByPos(_x,_y);
        //console.log("numm=="+num);
        blankArr.push(num);
        updateDom.attr("class","i_block").html("");
    }
    return true;

}
function getBlankNumByPos(x,y){
    for(var i=0;i<m_posMap.length;i++){
        if(m_posMap[i].pos==x+"_"+y){
            return m_posMap[i].key;
        }
    }
}
function getBlankPosByNum(num){
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


var m_startX = 0,m_startY=0;
function eventDown(e){
    e.preventDefault();
    if(e.targetTouches){
       var touch = e.targetTouches[0];
    }
    m_startX = e.clientX || e.pageX ||touch.pageX;
    m_startY = e.clientY || e.pageY || touch.pageY;
    moveX = 0;
    moveY = 0;
}

function eventUp(e){
    e.preventDefault();
    //console.log("m_startX=="+m_startX+"  m_startY=="+m_startY+"  x=="+x+"  y=="+y);
    //console.log("moveX=="+moveX+"  moveY=="+moveY);

    if(Math.abs(moveX)>Math.abs(moveY)){
        blankArr=[];
        if(moveX>0){
            doMove("right");
        }else{
            doMove("left");
        }
    }else{
        if(Math.abs(moveY)<=10){
            return false;
        }
        blankArr=[];
        if(moveY>0){
            doMove("down");
        }else{
            doMove("up");
        }
    }
}
function eventMove(e){
    e.preventDefault();
    if(e.targetTouches){
        var touch = e.targetTouches[0];
    }
    var x = e.clientX || e.pageX|| touch.pageX,
        y = e.clientY ||e.pageY|| touch.pageY;
    //检查移动的方向
    moveX = x-m_startX;
    moveY = y-m_startY;
}
