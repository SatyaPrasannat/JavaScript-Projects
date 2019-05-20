var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");//creates 2d drawing object
var radius = canvas.height / 2;//cal height of the clock
ctx.translate(radius, radius); //remaps the position to center
radius = radius * 0.90;
// this function is for direct clock display drawClock();
//this function allow the clock to start
setInterval(drawClock, 1000);

function drawClock() {
    drawFace(ctx, radius); 
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    //creating the grad
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    //Represents inner,middle and outer edge of the arc
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    //defining grad as strokestyle
    ctx.storkeStyle = grad;
    //reducing the line width to 10% of the radius
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    //drawing actual clock center.
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill(); 
}

function drawNumbers(ctx, radius) {
    var ang, num;
    //font size
    ctx.font = radius * 0.15 + "px arial";
    //text aligned to middle
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    //calculating the print position to 85%.
    for (num = 1; num < 13; num++)
    {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        //remaping the position of x and y axis.
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}
function drawHand(ctx, pos, length, width) {
    //place where the drawing begins
    ctx.beginPath();
    //width of the hand
    ctx.lineWidth = width;
    //used to set the style of the end cap of the hand. 
    ctx.lineCap = "round";
    //position of the hand in x and y axis
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    //adds a new point and creates a line to the point.
    ctx.lineTo(0, -length);
    //used to draw the path on the canvas
    ctx.stroke();
    ctx.rotate(-pos);
} 

function drawTime(ctx, radius) {
    //displays current date, hour, minutes and seconds
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //for hour angle count
    hour =hour%12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6*60)) + (second * Math.PI / (360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //for minutes angle count
    minute = (minute * Math.PI / 30)+(second * Math.PI / (30*60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    //for seconds angle count
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}
             
           




