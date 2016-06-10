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
        ctx.font = "20px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("Score: " + playerA.score, 40, canvas.height - 2);
    }

}

playerA.y = (canvas.height - playerA.height) / 2;

module.exports = playerA;
