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
