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

    runStatus: null,

    reset: function() {

    },

    collisionTest: function() {
        if (ball.x + ball.dx < 0) {

            if (ball.y > a.y - 10 && ball.y < a.y + a.height + 10) {
                ball.dx = -ball.dx;
                a.score += 1;
            } else {
                // game over
                // b.score += 1;
                clearInterval(game.runStatus);
                // alert("game over");
                // document.location.reload();
            };

        } else if (ball.x + ball.dx > canvas.width - 2 * ball.radius) {

            if (ball.y > b.y - 10 && ball.y < b.y + b.height + 10) {
                ball.dx = -ball.dx;
                b.score += 1;
            } else {
                // game over

                clearInterval(game.runStatus);
                // alert("game over");
                // document.location.reload();
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

        var bgImage = new Image();
        bgImage.src = "dist/images/bg.gif";
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

        ball.drawBall();

        a.drawPlayerA();
        b.drawPlayerB();

        a.drawScore();
        b.drawScore();

        attchEvent.move();
        
        game.collisionTest();

    },

    init: function() {
        attchEvent.listener();
        game.runStatus = setInterval(game.draw, 10);
    }

}



game.init();
