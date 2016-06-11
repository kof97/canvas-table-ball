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
