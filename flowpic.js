var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var c = canvas.getContext('2d')


// for (var i = 0; i < 100; i++) {
//     var x = Math.random() * (window.innerWidth - 50)
//     var y = Math.random() * (window.innerHeight - 50)
//     function random_rgba() {
//         var o = Math.round, r = Math.random, s = 255;
//         return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')';
//     };
//     var color = random_rgba();
    
//     c.fillStyle = color;
//     c.fillRect(x,y,50,50);

// };

var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() - 0.5) * 8;
var dy = (Math.random() - 0.5) * 8;

function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight)
    
    c.fillStyle = 'red';
    c.fillRect(x,y,50,50);
    
    if (x + 50 > window.innerWidth || x < 0) {
        dx = -dx;
    } 
   
    if  (y + 50 > window.innerHeight || y < 0) {
        dy = -dy;
    }
    
    x += dx;
    y += dy;

};
animate();