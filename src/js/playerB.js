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
