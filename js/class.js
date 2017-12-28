/*游戏角色*/
//~~~~~~~~~~~~画布~~~~~~~~~~~
var bg_canvas = document.getElementById("bg_canvas").getContext("2d");
var role_canvas = document.getElementById("role_canvas").getContext("2d");
var bullet;
var figureRole;
var figureRoleArr = [FigureRole1,FigureRole2,FigureRole3,FigureRole4,FigureRole5,FigureRole6,FigureRole7];
var runId;
var cnt = 0;
var speed = 8;
var gameOverImg = new Image();
gameOverImg.src = "images/gameover.png";
var gameStartImg = new Image();
gameStartImg.src = "images/gamestart.png";
var player = new Player();
//~~~~~~~~~~创建玩家角色~~~~~~~~~~~
function Player(){
    this.name = "未知";//初始名字
    this.gold = 1000;//初始金币
    this.score = 0;//分数
    this.clearColor = 0;//消除颜色
    this.reward = 0;//奖励
    this.jzz = 0;//无金钟罩
    this.slow = 0;//无减速
    this.x = 50;//设定位置
    this.y = 150;
}
//~~~~~~~~~~~~~~背景角色~~~~~~~~~~~
function BgRole(){
    this.x = 0;//背景位置
    this.y = 0;
    this.width = 1000;//背景大小
    this.height = 600;
    this.color = generateColor(); //背景颜色
    this.draw = function(){
        bg_canvas.fillStyle = this.color;
        bg_canvas.fillRect(this.x, this.y, this.width, this.height);
    }
}
//~~~~~~~~~~~~~~~子弹角色~~~~~~~~~~~~~~~~
function BulletRole(){
    this.x = 170;
    this.y = 260;
    this.radius = 0;//子弹半径
    this.color = "";
    this.isClean = "";
    this.draw = function(){
        bg_canvas.beginPath();
        bg_canvas.fillStyle = this.color;
        bg_canvas.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        bg_canvas.closePath();
        bg_canvas.fill();
        this.radius += 66;
        if(this.radius > 950){
            bullet = null;
        }
    }
}
//~~~~~~~~~~~图形对象的父类~~~~~~~~~~~~~
function BaseFigureRole(){
    this.x = 1000;
    this.y = 200;
    //图形的状态
    this.state = "";
    //图形的颜色数组
    this.colorArr = "";
    //产生图形的颜色，并同时产生子弹标签的颜色
    this.initColorArr = function(num){
        //根据参数产生对应个数的数组
        var arr = generateColorArray(num);
        initBullet(arr);
        this.colorArr = [];
        for(var i = 0; i < num; i++){
            this.colorArr[i] = getColor(arr);
        }
    }
}
//~~~~~~~~~~图形对象1~~~~~~~~~~~~~
FigureRole1.prototype = new BaseFigureRole();
FigureRole1.prototype.constructor = FigureRole1;
function FigureRole1(){
    this.state = [1,1];
    this.initColorArr(2);
    this.draw = function(){
        this.draw1 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[0];
            role_canvas.arc(this.x, this.y-20, 60, 0, Math.PI*2);
            role_canvas.closePath();
            role_canvas.fill();
        };
        this.draw2 = function(){
            role_canvas.fillStyle = this.colorArr[1];
            role_canvas.fillRect(this.x-48, this.y+40, 100, 150);
        };
        if(!this.state[0] && !this.state[1]){
            figureRole = null;
        }
        if(this.state[0]){
            this.draw1();
        }
        if(this.state[1]){
            this.draw2();
        }
        this.x -= speed;
    }
}
//~~~~~~~~~~图形对象2~~~~~~~~~~~~~
FigureRole2.prototype = new BaseFigureRole();
FigureRole2.prototype.constructor = FigureRole2;
function FigureRole2(){
    this.state = [1,1];
    this.initColorArr(2);
    this.draw = function(){
        role_canvas.save();
        role_canvas.translate(this.x, this.y-50);
        this.draw1 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[0];
            role_canvas.moveTo(0,0);
            role_canvas.lineTo(20,3);
            role_canvas.quadraticCurveTo(95,-50,170,3);
            role_canvas.lineTo(190,0);
            role_canvas.lineTo(200,40);
            role_canvas.lineTo(-10,40);
            role_canvas.closePath();
            role_canvas.fill();
        };
        this.draw2 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[1];
            role_canvas.fillRect(20,40,150,200);
        };
        if(!this.state[0] && !this.state[1]){
            figureRole = null;
        }
        if(this.state[0]){
            this.draw1();
        }
        if(this.state[1]){
            this.draw2();
        }
        role_canvas.restore();
        this.x -= speed;
    }
}
//~~~~~~~~~~图形对象3~~~~~~~~~~~~~
FigureRole3.prototype = new BaseFigureRole();
FigureRole3.prototype.constructor = FigureRole3;
function FigureRole3(){
    this.state = [1,1,1];
    this.initColorArr(3);
    this.draw = function(){
        role_canvas.save();
        role_canvas.translate(this.x, this.y-90);
        this.draw1 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[0];
            role_canvas.moveTo(114,21);
            role_canvas.lineTo(36,100);
            role_canvas.lineTo(193,100);
            role_canvas.fill();
        };
        this.draw2 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[1];
            role_canvas.moveTo(75,100);
            role_canvas.lineTo(155,100);
            role_canvas.lineTo(213,160);
            role_canvas.lineTo(16,160);
            role_canvas.fill();
        };
        this.draw3 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[2];
            role_canvas.fillRect(85,160,60,100);
        };
        if(!this.state[0] && !this.state[1] && !this.state[2]){
            figureRole = null;
        }
        if(this.state[0]){
            this.draw1();
        }
        if(this.state[1]){
            this.draw2();
        }
        if(this.state[2]){
            this.draw3();
        }
        role_canvas.restore();
        this.x -= speed;
    }
}
//~~~~~~~~~~图形对象4~~~~~~~~~~~~~
FigureRole4.prototype = new BaseFigureRole();
FigureRole4.prototype.constructor = FigureRole4;
function FigureRole4(){
    this.state = [1,1,1,1];
    this.initColorArr(4);
    this.draw = function(){
        role_canvas.save();
        role_canvas.translate(this.x, this.y-100);
        this.draw1 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[0];
            role_canvas.fillRect(110,25,40,40);
            role_canvas.fill();
        };
        this.draw2 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[1];
            role_canvas.moveTo(70,65);
            role_canvas.lineTo(310,65);
            role_canvas.lineTo(368,133);
            role_canvas.lineTo(11,133);
            role_canvas.fill();
        };
        this.draw3 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[2];
            role_canvas.fillRect(70,133,240,140);
        };
        this.draw4 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[3];
            role_canvas.fillRect(230,195,40,78);
        };
        if(!this.state[0] && !this.state[1] && !this.state[2] && !this.state[3]){
            figureRole = null;
        }
        if(this.state[0]){
            this.draw1();
        }
        if(this.state[1]){
            this.draw2();
        }
        if(this.state[2]){
            this.draw3();
        }
        if(this.state[3]){
            this.draw4();
        }
        role_canvas.restore();
        this.x -= speed;
    }
}
//~~~~~~~~~~图形对象5~~~~~~~~~~~~~
FigureRole5.prototype = new BaseFigureRole();
FigureRole5.prototype.constructor = FigureRole5;
function FigureRole5(){
    this.state = [1,1];
    this.initColorArr(2);
    this.draw = function(){
        role_canvas.save();
        role_canvas.translate(this.x, this.y-50);
        this.draw1 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[0];
            role_canvas.fillRect(200,23,200,100);
        };
        this.draw2 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[1];
            role_canvas.moveTo(80,23);
            role_canvas.lineTo(22,190);
            role_canvas.lineTo(377,190);
            role_canvas.lineTo(319,123);
            role_canvas.lineTo(80,123);
            role_canvas.lineTo(80,23);
            role_canvas.fill();
        };
        if(!this.state[0] && !this.state[1]){
            figureRole = null;
        }
        if(this.state[0]){
            this.draw1();
        }
        if(this.state[1]){
            this.draw2();
        }
        role_canvas.restore();
        this.x -= speed;
    }
}
//~~~~~~~~~~图形对象6~~~~~~~~~~~~~
FigureRole6.prototype = new BaseFigureRole();
FigureRole6.prototype.constructor = FigureRole6;
function FigureRole6(){
    this.state = [1,1,1];
    this.initColorArr(3);
    this.draw = function(){
        role_canvas.save();
        role_canvas.translate(this.x, this.y-30);
        this.draw1 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[0];
            role_canvas.fillRect(10,17,300,100);
        };
        this.draw2 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[1];
            role_canvas.arc(70,142,25,0,Math.PI*2);
            role_canvas.fill();
        };
        this.draw3 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[2];
            role_canvas.arc(250,142,25,0,Math.PI*2);
            role_canvas.fill();
        };
        if(!this.state[0] && !this.state[1] && !this.state[2]){
            figureRole = null;
        }
        if(this.state[0]){
            this.draw1();
        }
        if(this.state[1]){
            this.draw2();
        }
        if(this.state[2]){
            this.draw3();
        }
        role_canvas.restore();
        this.x -= speed;
    }
}
//~~~~~~~~~~图形对象7~~~~~~~~~~~~~
FigureRole7.prototype = new BaseFigureRole();
FigureRole7.prototype.constructor = FigureRole7;
function FigureRole7(){
    this.state = [1,1,1,1];
    this.initColorArr(4);
    this.draw = function(){
        role_canvas.save();
        role_canvas.translate(this.x, this.y-120);
        this.draw1 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[0];
            role_canvas.arc(121,52,42,0,Math.PI*2);
            role_canvas.fill();
        };
        this.draw2 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[1];
            role_canvas.fillRect(60,94,120,160);
        };
        this.draw3 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[2];
            role_canvas.fillRect(19,132,22,100);
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[2];
            role_canvas.fillRect(200,132,22,100);
        };
        this.draw4 = function(){
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[3];
            role_canvas.fillRect(90,254,20,70);
            role_canvas.beginPath();
            role_canvas.fillStyle = this.colorArr[3];
            role_canvas.fillRect(132,254,20,70);
        };
        if(!this.state[0] && !this.state[1] && !this.state[2] && !this.state[3]){
            figureRole = null;
        }
        if(this.state[0]){
            this.draw1();
        }
        if(this.state[1]){
            this.draw2();
        }
        if(this.state[2]){
            this.draw3();
        }
        if(this.state[3]){
            this.draw4();
        }
        role_canvas.restore();
        this.x -= speed;
    }
}
//选择道具  计费系统
//金钟罩道具
var money = document.getElementById("moneyNum").innerHTML;
document.getElementById("jzz").onclick = function(){
    if(player.jzz == 0){
        if(document.getElementById("moneyNum").innerHTML >= 100 && document.getElementById("moneyNum").innerHTML<200){
            this.style.backgroundColor = "white";
            document.getElementsByClassName("point")[0].style.borderColor = "#AEBBB0";
            document.getElementById("moneyNum").innerHTML = money - player.slow*100;
        }else if(document.getElementById("moneyNum").innerHTML >= 200){
            this.style.backgroundColor = "rgba(10, 10, 20, 0.48)";
            document.getElementsByClassName("point")[0].style.borderColor = "rgb(210, 210, 207)";
            document.getElementById("moneyNum").innerHTML -= 200;
            player.jzz = 1;
        }
        console.log(document.getElementById("moneyNum").innerHTML);
    }else if(player.jzz == 1){
        this.style.backgroundColor = "white";
        document.getElementsByClassName("point")[0].style.borderColor = "#AEBBB0";
        document.getElementById("moneyNum").innerHTML = money - player.slow*100;
        player.jzz = 0;
    }
};
//减速道具
document.getElementById("jsyx").onclick = function(){
    if(player.slow == 0){
        if(document.getElementById("moneyNum").innerHTML<100 && document.getElementById("moneyNum").innerHTML>=0){
            this.style.backgroundColor = "white";
            document.getElementsByClassName("point")[1].style.borderColor = "#AEBBB0";
            document.getElementById("moneyNum").innerHTML = money-player.jzz*200;
        }else if(document.getElementById("moneyNum").innerHTML>=100){
            this.style.backgroundColor = "rgba(10, 10, 20, 0.48)";
            document.getElementsByClassName("point")[1].style.borderColor = "rgb(210, 210, 207)";
            document.getElementById("moneyNum").innerHTML -= 100;
            player.slow = 1;
        }
    }else if(player.slow == 1){
        this.style.backgroundColor = "white";
        document.getElementsByClassName("point")[1].style.borderColor = "#AEBBB0";
        document.getElementById("moneyNum").innerHTML =money-player.jzz*200;
        player.slow = 0;
    }
};

