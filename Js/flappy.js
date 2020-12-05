var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d');
var scoreshow = document.getElementById('score');

var birdimg = new Image();
var background = new Image();
var pileTop = new Image();
var pileBot = new Image();
birdimg.src = "bird.png";
background.src = "nenchinh.png";
pileTop.src = "ongtren.png";
pileBot.src = "ongduoi.png";

var score = 0;
//khoảng cách 2 ống
var distance = 140;
//khoảng cách từ trên xuống ống dưới
var disToptoBot;
//vị trí chim xuất hiện
var bird = {
    x: background.width/6,
    y: background.height/4
}
var pile = [];
//vị trí xuất hiện ống
pile[0] = {
    x: canvas.width,
    y: 0
};

function run() {
    context.drawImage(background,0,0);
    context.drawImage(birdimg,bird.x,bird.y);

    for(var i=0; i < pile.length; i++)
    {
        disToptoBot = pileTop.height + distance;
        //ống trên đầu tiên hiển thị tọa độ 0, 242
        //chiều dài 242
        context.drawImage(pileTop, pile[i].x, pile[i].y);
        //ống dưới đầu tiên hiển thị tọa độ 0, 382
        //chiều dài 500 - 382 = 118
        context.drawImage(pileBot, pile[i].x, pile[i].y+disToptoBot);
        pile[i].x -=5;
        //push them phan tu cho mảng ống
        //vòng lặp for luôn chạy
        if(pile[i].x == canvas.width/2)
        {
            pile.push({
                x: canvas.width,
                y: Math.floor(Math.random()*pileTop.height) - pileTop.height
            })
        }
        //xóa mảng khi ống chạy về 0
        if(pile[i].x == 0)
        {
            pile.splice(0,1);
        }
        if(pile[i].x == bird.x)
        {
            score++;
        }
        //điều kiện dừng cuộc chơi
        if
        (   bird.y+birdimg.height == canvas.height || //chim đụng lên mép trên
            bird.x + birdimg.width >= pile[i].x && //chim đụng ống tại thành
            bird.x <= pile[i].x +pileTop.width &&
            (bird.y <= pile[i].y +pileTop.height || //chim đụng ống tại mặt
              bird.y +birdimg.height >= pile[i].y +disToptoBot )
        )
        {   
            return;
        }   
    }

    scoreshow.innerHTML = "score: " +score;
    bird.y += 3;
    requestAnimationFrame(run);
}
document.addEventListener("keydown", function(){
    bird.y -= 60;
})
run();