//类：是对象的抽象；对象：是类的实例。
/**********************公共方法***********************/

//~~~~~~~~~~~~~~~~隐藏和显示界面~~~~~~~~~~~~~~~~~~~~~
function showDiv(id){
    document.getElementById(id).className = "show";
}
function hideDiv(id){
    document.getElementById(id).className = "hide";
}
//~~~~~~~~~~~~~~~~~生成随机数~~~~~~~~~~~~~~~~~~~
function generateCode(num){
    return parseInt(Math.random()*num);
}
//~~~~~~~~~~~~~~~~~生成随机颜色~~~~~~~~~~~~~~~~~
function generateColor(){
    var colorStr = "";
    //var colorCnt = 0;
    for(var i = 0;i < 3;i++){
        var rand = parseInt(Math.random()*175) + 10;
        if(i){
            colorStr += ",";
        }
        //colorCnt += rand;
        colorStr += rand;
    }
    colorStr = "rgb("+colorStr+")";
    return colorStr;
    //if(colorCnt > 280){
    //    return colorStr;
    //}else{
    //    //递归调用
    //    return generateColor();
    //}
}
//~~~~~~~~~~~~~随机生成指定个数的颜色数组(颜色不能重复)~~~~~~~~~~~~~~~~~~
function generateColorArray(num){
    var arr = [];
    for(var i = 0;i < num;i++){
        var isSameColor = false;
        var tempColor = generateColor();
        for(var j = 0;j < i;j++){
            if(compareColor(tempColor,arr[j])){
                isSameColor = true;
                i--;
                break;
            }
        }
        if(!isSameColor){
            arr[i] = tempColor;
        }
    }
    return arr;
}
//~~~~~~~~~~~比较产生的颜色是否相等~~~~~~~~~~~~~~
function compareColor(color1,color2){
    return color1.replace(/\s+/g,"") == color2.replace(/\s+/g,"");
}
//~~~~~~~~~~~~~从数组中获取一个颜色~~~~~~~~~~~~~~~
function getColor(arr){
    return arr[generateCode(arr.length)];
}
