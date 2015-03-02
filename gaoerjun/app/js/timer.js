/**
 * Created by gaoerjun on 15/2/4.
 */
var RADUIS = 6;
var E_MARGINTOP=50;
var E_MARGINLEFT=5;
var E_leftPos = 300;
var FontWidth =14*(RADUIS+1);
var DotWidth = 8*(RADUIS+1);
var E_update = [];
var E_color = ["#b001e2","#ff00f0","red","#ffd200","yellow","#f70","#00d8ff","#f60","#f60","#009cff"];
var E_context
var E_dottext;
var E_windowWidth = 0;
var E_windowHeight=0;
window.onload=function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    E_windowWidth = $(window).width();
    E_windowHeight  =$(window).height();
    RADUIS = E_windowWidth/200;
    context.canvas.width = E_windowWidth;
    context.canvas.height = E_windowHeight;
    E_MARGINTOP = E_windowHeight/5;
    FontWidth =14*(RADUIS+1);
    DotWidth = 8*(RADUIS+1);
    E_leftPos = (E_windowWidth-100*(RADUIS+1))/2;
    var canvasdot = document.getElementById("dots");
    var contexdot = canvasdot.getContext("2d");
    contexdot.canvas.width = E_windowWidth;
    contexdot.canvas.height = E_windowHeight;
    E_dottext=contexdot;
    drawTime(context);
    E_context=context;
    $(window).resize(function(){
        E_windowWidth = $(window).width();
        E_windowHeight  =$(window).height();
        RADUIS = E_windowWidth/200;
        context.canvas.width = E_windowWidth;
        context.canvas.height = E_windowHeight;
        contexdot.canvas.width = E_windowWidth;
        contexdot.canvas.height = E_windowHeight;
        E_MARGINTOP = E_windowHeight/5;
        FontWidth =14*(RADUIS+1);
        DotWidth = 8*(RADUIS+1);
        E_leftPos = (E_windowWidth-100*(RADUIS+1))/2;
    })
    setTimeout(function(){
        update(context);
    },50)
}

function drawTime(context){
    context.clearRect(0,0,E_windowWidth,E_windowHeight);
    var currTime = new Date();
    var hour = currTime.getHours();
    var minute = currTime.getMinutes();
    var seconds = currTime.getSeconds();
    var preTime =new Date();
    preTime.setTime(currTime.getTime()-1000);
    var preSeconds =  preTime.getSeconds();
    var preMunit = preTime.getMinutes();;
    var preHour = preTime.getHours();
    if(preSeconds!=seconds){
        if(Math.floor(preSeconds/10)!=Math.floor(seconds/10)){
            putUpdateNum(E_leftPos+FontWidth*4+6*E_MARGINLEFT+2*DotWidth,E_MARGINTOP, Math.floor(seconds/10));
        }
        putUpdateNum(E_leftPos+FontWidth*5+7*E_MARGINLEFT+2*DotWidth,E_MARGINTOP, Math.floor(seconds%10));
    }
    if(preMunit!=minute){
        if(Math.floor(minute/10)!=Math.floor(preMunit/10)){
            putUpdateNum(E_leftPos+FontWidth*2+3*E_MARGINLEFT+DotWidth,E_MARGINTOP, Math.floor(minute/10));
        }
        if(Math.floor(minute%10)!=Math.floor(preMunit%10)){
            putUpdateNum(E_leftPos+FontWidth*3+4*E_MARGINLEFT+DotWidth,E_MARGINTOP,Math.floor(minute%10));
        }

    }
    if(preHour!=hour){
        if(Math.floor(preHour/10)!=Math.floor(hour/10)){
            putUpdateNum(E_leftPos,E_MARGINTOP, Math.floor(hour/10));
        }
        if(Math.floor(preHour%10)!=Math.floor(hour%10)){
            putUpdateNum(E_leftPos+FontWidth+E_MARGINLEFT,E_MARGINTOP, Math.floor(hour%10));
        }

    }
    drawdigit(E_leftPos,E_MARGINTOP,Math.floor(hour/10),context);
    drawdigit(E_leftPos+FontWidth+E_MARGINLEFT,E_MARGINTOP,Math.floor(hour%10),context);
    drawdigit(E_leftPos+FontWidth*2+2*E_MARGINLEFT,E_MARGINTOP,10,context);
    drawdigit(E_leftPos+FontWidth*2+3*E_MARGINLEFT+DotWidth,E_MARGINTOP,Math.floor(minute/10),context);
    drawdigit(E_leftPos+FontWidth*3+4*E_MARGINLEFT+DotWidth,E_MARGINTOP,Math.floor(minute%10),context);
    drawdigit(E_leftPos+FontWidth*4+5*E_MARGINLEFT+DotWidth,E_MARGINTOP,10,context);
    drawdigit(E_leftPos+FontWidth*4+6*E_MARGINLEFT+2*DotWidth,E_MARGINTOP,Math.floor(seconds/10),context);
    drawdigit(E_leftPos+FontWidth*5+7*E_MARGINLEFT+2*DotWidth,E_MARGINTOP,Math.floor(seconds%10),context);
    setTimeout(function(){
        drawTime(context);
    },1000)
}

function putUpdateNum(_left,_top,_num){
    var element = digit[_num];
    for(var i =0;i<element.length;i++){
        for(var j=0;j<element[i].length;j++){
            if(element[i][j]==1){
                var x =  _left+(2*j+1)*(RADUIS+1);
                var y= _top+(2*i+1)*(RADUIS+1);
                E_update.push({
                    x: x,
                    y: y,
                    oxv:-Math.floor(Math.random()*8+1)*Math.pow(-1,Math.floor(Math.random()*2+1)),
                    oyv:-10*Math.random(),
                    a:0,
                    g:5,
                    color:E_color[Math.floor(Math.random()*10)]
                });
            }
        }
    }
}
function update(){

    var ctx=E_dottext;
    ctx.clearRect(0,0,E_windowWidth,E_windowHeight);
    for(var i=0;i<E_update.length;i++){
        var ele = E_update[i];
        ele.x=ele.x+ele.oxv+0.5*ele.a;
        ele.y=ele.y+ele.oyv+0.5*ele.g;

        ele.oxv=ele.oxv+ele.a;
        ele.oyv=ele.oyv+ele.g;
        if(ele.y+RADUIS>=E_context.canvas.height){
            ele.oyv=(-1)*ele.oyv*0.65;
        }
        if(ele.y>E_context.canvas.height-RADUIS){
            ele.y = E_context.canvas.height-RADUIS;
        }
        ctx.beginPath();
        ctx.arc(ele.x,ele.y,RADUIS,0,2*Math.PI);
        ctx.closePath();
        ctx.fillStyle=ele.color;
        ctx.fill();
    }
    var count = 0;
    var tempUpdate = []
    for(var i=0;i<E_update.length;i++){
       if(E_update[i].x>0 && E_update[i].x<E_context.canvas.width){
           tempUpdate[count++]=E_update[i];
       }
    }
    E_update =tempUpdate;
    console.log("E_update.length=="+E_update.length);
    setTimeout(function(){
        update();
    },50)
}
function drawdigit (_left,_top,_num,ctx){
    var element = digit[_num];
    for(var i =0;i<element.length;i++){
        for(var j=0;j<element[i].length;j++){
            if(element[i][j]==1){
                ctx.beginPath();
                var x = _left +(2*j+1)*(RADUIS+1);
                var y=_top+(2*i+1)*(RADUIS+1);
                ctx.arc(x,y,RADUIS,0,2*Math.PI);
                ctx.closePath();
                ctx.fillStyle="#f00";
                ctx.fill();
            }
        }
    }
}