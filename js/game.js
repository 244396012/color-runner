/*游戏运行*/
//~~~~~~~~~~~~~~转换游戏界面~~~~~~~~~~~~~
function showTools(){
    showDiv("game_tools");
}
function showMain(){
    hideDiv("game_tools");
    hideDiv("ready_page");
    showDiv("game_main");
    if(player.jzz == 1){
        document.getElementsByClassName("main_runner")[0].style.backgroundImage = "url('images/pop.png')";
    }
    if(player.slow == 1){
        speed = 15;
    }
    initGame();
}
function homepage(){
    hideDiv("game_main");
    hideDiv("game_over");
    hideDiv("game_scores");
    showDiv("ready_page");
}
function reStart(){
    hideDiv("game_scores");
    hideDiv("game_over");
    showDiv("ready_page");
    showDiv("game_tools");
}
function rank(){
    showDiv('game_scores');
    addPlayer();
    sort();
}
//~~~~~~~~~~~~~~初始化游戏~~~~~~~~~~~~~~~
function initGame(){
    var bgRole = new BgRole();
    bgRole.draw();
    role_canvas.drawImage(gameStartImg,350,170);
    setTimeout(function(){
        cnt = 0;
        gameRun();
    },1500);
}
//~~~~~~~~~~~~~~游戏运行方法~~~~~~~~~~~~~
function gameRun(){
    runId = setInterval(function(){
        //清除之前绘制的图形(解决拖影问题)
        role_canvas.clearRect(0,0,1000,600);
        cnt += 2;
        role_canvas.fillText(cnt,480,40);
        role_canvas.font = "italic 30px 宋体";
        //当子弹对象产生出来时，则每10ms播放一次
        if(bullet){
            bullet.draw();
        }
        if(!figureRole){
            figureRole = new figureRoleArr[generateCode(figureRoleArr.length)];
        }
        if(cleanFigure()){
            gameOver();
            return;
        }
        if(figureRole.x < 200){
            if(player.jzz == 1){
                player.jzz = 0;
                document.getElementsByClassName("main_runner")[0].style.display = "none";
                document.getElementsByClassName("main_runner1")[0].style.display = "block";
                setTimeout(function(){
                    document.getElementsByClassName("main_runner1")[0].style.display = "none";
                },1000);
            }else{
                gameOver();
            }
            figureRole = null;
        }
        else{
            figureRole.draw();
        }
    },20);
}
//~~~~~~~~~~~~~~~游戏暂停~~~~~~~~~~~~~~
var num = 1;
function gameStop(){
    if(num == 1){
        document.getElementById("stop1").style.display = "none";
        document.getElementById("stop2").style.display = "block";
        clearInterval(runId);
        num = 0;
    }else{
        num = 1;
        document.getElementById("stop1").style.display = "block";
        document.getElementById("stop2").style.display = "none";
        runId = setInterval(function(){
            //清除之前绘制的图形(解决拖影问题)
            role_canvas.clearRect(0,0,1000,600);
            cnt += 2;
            role_canvas.fillText(cnt,480,40);
            role_canvas.font = "italic 30px 宋体";
            //当子弹对象产生出来时，则每10ms播放一次
            if(bullet){
                bullet.draw();
            }
            if(!figureRole){
                figureRole = new figureRoleArr[generateCode(figureRoleArr.length)];
            }
            if(cleanFigure()){
                gameOver();
                return;
            }
            if(figureRole.x < 200){
                if(player.jzz == 1){
                    player.jzz = 0;
                    document.getElementsByClassName("main_runner")[0].style.display = "none";
                    document.getElementsByClassName("main_runner1")[0].style.display = "block";
                    setTimeout(function(){
                        document.getElementsByClassName("main_runner1")[0].style.display = "none";
                    },1000);
                }else{
                    gameOver();
                }
                figureRole = null;
            }
            else{
                figureRole.draw();
            }
        },20);
    }
}
//~~~~~~~~~~~~~~~发射子弹~~~~~~~~~~~~~~~~~
function sendBullet(obj){
    if(!bullet){
        bullet = new BulletRole();
        bullet.color = obj.style.backgroundColor;
    }
}
//~~~~~~~~~~~~~~初始化子弹标签~~~~~~~~~~~~~~~
function initBullet(colorArr){
    var lis = "";
    for(var i = 0; i < colorArr.length; i++){
        lis += "<li style='background-color: " + colorArr[i] + "' onclick = 'sendBullet(this)'></li>";
    }
    document.getElementById("bullet").innerHTML = lis;
}
//~~~~~~~~~~~~~检测碰撞~~~~~~~~~~~~~
function checkBoom(){
    //true表示碰撞，false表示未碰撞
    if(!bullet || !figureRole){
        return false;
    }
    //两点间距离公式
    var distance = Math.sqrt(Math.pow(bullet.x - figureRole.x, 2) + Math.pow(bullet.y - figureRole.y, 2));
    if(distance <= bullet.radius){
        return true;
    }else{
        return false;
    }
}
//~~~~~~~~~~~~~判断消除方块颜色还是Game Over~~~~~~~~~~~~~~~
function cleanFigure(){
    var isOver = true;
    if(checkBoom() && !bullet.isClean){
        //判断子弹颜色是否和图形的某个颜色相等
        for(var i = 0; i < figureRole.colorArr.length; i++){
            if(compareColor(bullet.color, figureRole.colorArr[i])){
                figureRole.state[i] = 0;
                isOver = false;
                bullet.isClean = true;
                player.clearColor += 1;
            }
        }
    }else{
        isOver = false;
    }
    return isOver;
}
//~~~~~~~~~~~~~~游戏结束~~~~~~~~~~~~~~
function gameOver(){
    clearInterval(runId);
    //绘制游戏结束的图片
    role_canvas.drawImage(gameOverImg,350,170);
    figureRole = null;
    bullet = null;
    setTimeout(function(){
        role_canvas.clearRect(0,0,1000,600);
        showDiv("game_over");
        hideDiv("game_main");
    },2000);
}
//~~~~~~~~~添加用户信息~~~~~~~~~~~~~~
function addPlayer(){
    player.name = document.getElementById("writeName").value;
    player.score = cnt;
    //首先从localstorage中获取数组，如果不存在则创建一个
    var players = localStorage.players;
    if(!players){
        players = [];
    }else{
        //字符串转换为json对象
        players = JSON.parse(players);
    }
    players.push(player);
    //将数组存放到localstorage中，必须将对象转换为字符串形式
    localStorage.players = JSON.stringify(players);

    document.getElementById("total_scores").innerHTML = cnt + player.clearColor * 10;
    document.getElementById("max_scores").innerHTML = cnt + player.clearColor * 10;
    document.getElementById("scores").innerHTML = cnt;
    document.getElementById("reward").innerHTML = player.clearColor * 10;
    document.getElementById("colors").innerHTML = player.clearColor;
    document.getElementById("coin").innerHTML = player.clearColor * 5;
    document.getElementById("my_coins").innerHTML = parseInt(document.getElementById("moneyNum").innerHTML) + parseInt(document.getElementById("coin").innerHTML);
}
//~~~~~~~~~~~~排序~~~~~~~~~~~~~~~
function getObject(){
    var players = localStorage.players;
    if(!players){
        players = [];
    }else{
        players = JSON.parse(players);
    }
    return players;
}
function sort(){
    var players = getObject();
    players.sort(function(a,b){
        return b.score - a.score;
    });
    if(players.length){
        var html = "<table style='width: 100%;'>";
        for(var i = 0; i < players.length; i++){
            if(player.score == players[i].score){
                document.getElementById("rankings").innerHTML = i+1;
            }
            html += "<tr style='height: 30px;background-color: #CCF1A0;color: #000000;font-weight: bold'><td>" + (i+1) + "</td><td>" + players[i].name + "</td><td>" + players[i].score + "</td></tr>";
        }
        html += "</table>";
    }
    document.getElementsByClassName("left_ranking")[0].innerHTML = html;
}

