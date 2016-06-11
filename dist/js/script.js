(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');

var ball = {
    radius: 10,
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 2,
    dy: -2,

    drawBall: function() {
        ctx.beginPath();
        var ballImage = new Image();
        ballImage.src = "dist/images/ball.png";
        ctx.drawImage(ballImage, ball.x, ball.y, 2 * ball.radius, 2 * ball.radius);
        ctx.closePath();
    },
}

module.exports = ball;

},{}],2:[function(require,module,exports){
var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');

var a = require("./playerA"),
    b = require("./playerB"),
    ball = require("./ball");

var attchEvent = {
    speed: 10,

    listener: function() {
        
        function keyDownHandler(e) {

            if (e.keyCode == 38) {
                b.topPressed = true;
            };

            if (e.keyCode == 40) {
                b.downPressed = true;
            };

            if (e.keyCode == 87) {
                a.topPressed = true;
            };

            if (e.keyCode == 83) {
                a.downPressed = true;
            };

        }

        function keyUpHandler(e) {

            if (e.keyCode == 38) {
                b.topPressed = false;
            };

            if (e.keyCode == 40) {
                b.downPressed = false;
            };

            if (e.keyCode == 87) {
                a.topPressed = false;
            };

            if (e.keyCode == 83) {
                a.downPressed = false;
            };

        }

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
    },

    move: function() {

        if (b.downPressed && b.y < canvas.height - b.height) {
            b.y += attchEvent.speed;
        } else if (b.topPressed && b.y > 0) {
            b.y -= attchEvent.speed;
        }

        if (a.downPressed && a.y < canvas.height - a.height) {
            a.y += attchEvent.speed;
        } else if (a.topPressed && a.y > 0) {
            a.y -= attchEvent.speed;
        }

    }

}

var game = {

    runStatus: 0,

    reset: function() {
        
        function getEventPosition(e){  
            var x, y;  
            if (e.layerX || e.layerX == 0) {  
                x = e.layerX;  
                y = e.layerY;  
            } else if (e.offsetX || e.offsetX == 0) { // Opera  
                x = e.offsetX;  
                y = e.offsetY;  
            }  

            return {x: x, y: y}; 

        } 

        function start(e) {
            p = getEventPosition(e); 
             
            if (p.x > 265 && p.x < 435 && p.y > 115 && p.y < 285) { 
                game.runStatus = 1;

                var rate = (function() {
                    var k = Math.random() * 10;
                    if (k <= 1) {
                        k += 1;
                    } else if (k >= 9) {
                        k -= 1;
                    };

                    return (k * 0.1);

                }());

                ball.x = canvas.width * rate;
                ball.y = canvas.height * rate; 
                ball.dx *= -1;
                ball.dy *= -1;

                canvas.removeEventListener('click', start, false); 
                document.removeEventListener("keydown", keyDownStart, false);

            } 

        }

        function keyDownStart(e) {

            if (e.keyCode == 32) {
                game.runStatus = 1;

                var rate = (function() {
                    var k = Math.random() * 10;
                    if (k <= 1) {
                        k += 1;
                    } else if (k >= 9) {
                        k -= 1;
                    };

                    return (k * 0.1);

                }());

                ball.x = canvas.width * rate;
                ball.y = canvas.height * rate;
                ball.dx *= -1;
                ball.dy *= -1;

                canvas.removeEventListener('click', start, false); 
                document.removeEventListener("keydown", keyDownStart, false);

            };

        }

        ctx.beginPath();  
        var bgImage = new Image();
        bgImage.src = "dist/images/start1.png";
        ctx.drawImage(bgImage, canvas.width / 2 - 90, canvas.height / 2 - 90, 180, 180);
         
        canvas.addEventListener('click', start, false); 
        document.addEventListener("keydown", keyDownStart, false);

        ctx.closePath();

    },

    collisionTest: function() {
        if (ball.x + ball.dx < 0) {

            if (ball.y > a.y - 10 && ball.y < a.y + a.height + 10) {
                ball.dx = -ball.dx;
            } else {

                // game over
                b.score += 1;
                game.runStatus = 0; 

            };

        } else if (ball.x + ball.dx > canvas.width - 2 * ball.radius) {

            if (ball.y > b.y - 10 && ball.y < b.y + b.height + 10) {
                ball.dx = -ball.dx;
            } else {

                // game over
                a.score += 1;
                game.runStatus = 0; 

            };

        };

        if (ball.y + ball.dy > canvas.height - 2 * ball.radius || ball.y + ball.dy < 0) {
            ball.dy = -ball.dy;
        };

        ball.x += ball.dx;
        ball.y += ball.dy;

    },

    draw: function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        var bgImage = new Image();
        bgImage.src = "dist/images/bg.gif";
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        ctx.closePath();

        ball.drawBall();

        a.drawPlayerA();
        b.drawPlayerB();

        a.drawScore();
        b.drawScore();

        if (game.runStatus == 0) {
            game.reset();
        } else {

            attchEvent.move();
            game.collisionTest();

        };
        
    },

    init: function() {
        attchEvent.listener();

        setInterval(game.draw, 10);

    }

}

game.init();

},{"./ball":1,"./playerA":3,"./playerB":4}],3:[function(require,module,exports){
var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');

var playerA = {
    width: 10,
    height: 80,
    x: 1,
    y: null,
    speed: 10,
    score: 0,

    topPressed: false,
    downPressed: false,

    drawPlayerA: function() {
        ctx.beginPath();
        ctx.rect(playerA.x, playerA.y, playerA.width, playerA.height);
        ctx.fillStyle = "#4E8DF5";
        ctx.fill();
        ctx.closePath();
    },

    drawScore: function() {
        ctx.beginPath();
        ctx.font = "25px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("Score: " + playerA.score, 30, canvas.height - 2);
        ctx.closePath();
    }

}

playerA.y = (canvas.height - playerA.height) / 2;

module.exports = playerA;

},{}],4:[function(require,module,exports){
var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');

var playerB = {
    width: 10,
    height: 80,
    x: null,
    y: null,
    speed: 10,
    score: 0,

    topPressed: false,
    downPressed: false,

    drawPlayerB: function() {
        ctx.beginPath();
        ctx.rect(playerB.x, playerB.y, playerB.width, playerB.height);
        ctx.fillStyle = "#4E8DF5";
        ctx.fill();
        ctx.closePath();
    },

    drawScore: function() {
        ctx.beginPath();
        ctx.font = "25px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("Score: " + playerB.score, canvas.width / 1.2, canvas.height - 2);
        ctx.closePath();
    }
}

playerB.x = canvas.width - playerB.width;
playerB.y = (canvas.height - playerB.height) / 2;

module.exports = playerB;

},{}]},{},[2])


//# sourceMappingURL=script.js.map
