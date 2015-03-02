/**
 * Created by gaoerjun on 15/2/4.
 */
var RADUIS = 6;

document.onload=function(){
    var canvas = document.getElementById("canvas");

    var context = canvas.getContext("2d");
    context.canvas.width = document.body.clientWidth;
    context.canvas.height = document.body.clientHeight;
    drawdigit(100,100,1,context);

}
function drawdigit (_left,_top,_num,ctx){
    var element = digit[num];
    for(var i =0;i<element.length;i++){
        for(var j=0;j<element[i].length;j++){
            if(element[i][j]==1){
                ctx.beginPath();
                var x = _left +(2*j+1)*(RADUIS+1);
                var y=_top+(2*i+1)*(RADUIS+1);
                ctx.arc(x,y,RADUIS,0,2*Math.PI);
                ctx.closePath();
                ctx.fillStyle="red";
                ctx.fill();
            }
        }
    }
}