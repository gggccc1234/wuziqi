var chess = document.getElementById('chess');
var context = chess.getContext('2d');
var nowturn = true;
var chessboard = [];
var wins = [];
var mywin = [];
var computerwin = [];
var count = 0;
var over;
var value=[
    [0,90,350,1000,5000000],
    [0,105,400,1100,50000000],
];
// var value=[
//     [0,0,0,0,0],
//     [0,0,0,0,0],
// ];
context.strokeStyle = "#000";
for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}
for (var i = 0; i < 15; i++) {
    for (j = 0; j < 11; j++) {
        for (k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}
for (var j = 0; j < 15; j++) {
    for (var i = 0; i < 11; i++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j][count] = true;
        }
        count++;
    }
}
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}
for (var i = 14; i > 3; i--) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i - k][j + k][count] = true;
        }
        count++;
    }
}


var logo = new Image();
logo.src = "07.jpg";
logo.onload = function () {
    newgame();
    context.drawImage(logo, 0, 0, 450, 450);
    drawchessboard();
}


function newgame() {
    for (var i = 0; i < 15; i++) {
        chessboard[i] = [];
        for (var j = 0; j < 15; j++) {
            chessboard[i][j] = 0;
        }
    }
    for (var i = 0; i < count;i++){
        mywin[i] = 0;
        computerwin[i] = 0;
    }
    nowturn = true;
    over = false;
}


function drawchessboard() {
    for (var i = 0; i < 15; i++) {
        context.beginPath()
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.closePath();
        context.stroke();
    }
}


function drawchess(i,j,chesscolor) {
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i * 30+2, 15 + j * 30-2, 13, 15 + i * 30+2, 15 + j * 30-2, 0);
    if (chesscolor) {
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636766");
    }
    else {
        gradient.addColorStop(0, "#b1b1b1");
        gradient.addColorStop(1, "#f9f9f9");
    }
    context.fillStyle = gradient;
    context.fill();
}


chess.onclick = function (e) {
    if (over) { return; }
    if (!nowturn) { return; }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if (chessboard[i][j] == 0) {
        drawchess(i, j, nowturn);

        chessboard[i][j] = 1;


        for (var k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                mywin[k]++;
                computerwin[k] = 6;
                if (mywin[k] == 5) {
                    window.alert("you win");
                    over = true;
                }
            }
        }
        if (!over) {
            nowturn = !nowturn;
            computerai();
        }
    }
}


function computerai() {
    var max = 0;
    var u = 0, v = 0;
    var myscore = [];
    var computerscore = [];
    for (var i = 0; i < 15; i++) {
        myscore[i] = [];
        computerscore[i] = [];
        for (var j = 0; j < 15; j++) {
            myscore[i][j] = 0;
            computerscore[i][j] = 0;
        }
    }
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if (chessboard[i][j] == 0) {
                for (var k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (mywin[k] == 1) {
                            myscore[i][j] += value[0][1]+Math.round(Math.random()*10);
                        }
                        else if (mywin[k] == 2) {
                            myscore[i][j] += value[0][2] + Math.round(Math.random() * 10);
                        }
                        else if (mywin[k] == 3) {
                            myscore[i][j] += value[0][3] + Math.round(Math.random() * 10);
                        }
                        else if (mywin[k] == 4) {
                            myscore[i][j] += value[0][4];
                        }
                        if (computerwin[k] == 1) {
                            computerscore[i][j] += value[1][1]+Math.round(Math.random()*10);
                        }
                        else if (computerwin[k] == 2) {
                            computerscore[i][j] += value[1][2] + Math.round(Math.random() * 10);
                        }
                        else if (computerwin[k] == 3) {
                            computerscore[i][j] += value[1][3] + Math.round(Math.random() * 10);
                        }
                        else if (computerwin[k] == 4) {
                            computerscore[i][j] += value[1][4];
                            max = computerscore[i][j];
                            u = i;
                            v = j;
                            break;
                        }
                    }
                }
            }
            if (computerscore[i][j] < 50000000) {
                if (myscore[i][j] + computerscore[i][j] > max) {
                    max = myscore[i][j] + computerscore[i][j];
                    u = i;
                    v = j;
                }
            }
            else { break; }
        }
        if (computerscore[i][j] >= 50000000) { break; }
    }
    drawchess(u, v, false);
    chessboard[u][v] = 2;
    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            computerwin[k]++;
            mywin[k] = 6;
            if (computerwin[k] == 5) {
                window.alert("you lose");
                over = true;
            }
        }
    }
    if (!over) {
        nowturn = !nowturn;
    }
}