var canvas = document.querySelector('canvas');

function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      displayContents(contents);
    };
    reader.readAsText(file);
  }
  
  function displayContents(contents) {
    var element = document.getElementById('file-content');
    element.textContent = contents;
  }
  
  document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);



var c = canvas.getContext('2d');

var config = {
    Title:"Hollingsworth",
    Color1:"Red",
    Color2:"Black",
    Color3:"White",
    ColorBack:"White",
}

var defaltConfig = JSON.stringify(config);

// config = JSON.parse(defaltConfig);

function changeTitle()
{
    var itext = document.getElementById("User-input");
   if (itext.style["visibility"] == "visible") {
       config.Title = itext.value;
        init();
        rewind();
       
        itext.style["visibility"] = "hidden";
   }else {
       itext.style["visibility"] = "visible";  
       itext.focus();
   }
}

function color1() 
{
    var itext  = document.getElementById("colorVal1");
        
    if (itext.style.visibility=='visible'){
        config.Color1 = itext.value;
        init();
        rewind();
        itext.style.visibility = "hidden";
    }else {
        itext.style.visibility = "visible";
        itext.focus();
    }
}
function color2() 
{
    var itext  = document.getElementById("colorVal2");
        
    if (itext.style.visibility=='visible'){
        config.Color2 = itext.value;
        init();
        rewind();
        itext.style.visibility = "hidden";
    }else {
        itext.style.visibility = "visible";
        itext.focus();
    }
}
function color3() 
{
    var itext  = document.getElementById("colorVal3");
        
    if (itext.style.visibility=='visible'){
        config.Color3 = itext.value;
        init();
        rewind();
        itext.style.visibility = "hidden";
    }else {
        itext.style.visibility = "visible";
        itext.focus();
    }
}
function background()
{
    var itext  = document.getElementById("background");
        
    if (itext.style.visibility=='visible'){
        config.ColorBack = itext.value;
        init();
        rewind();
        itext.style.visibility = "hidden";
    }else {
        itext.style.visibility = "visible";
        itext.focus();
    }
}
function reset()
{     
    config = JSON.parse(defaltConfig);
        init();
        rewind();
}

function Circle (cirObj) 
{
    this.x = cirObj.x;
    this.y = cirObj.y;
    this.dx =  (Math.random() - 0.5) * 1.15;
    this.dy =  (Math.random() - 0.5) * 1.15;
    this.radius = cirObj.radius;
    this.color = "rgba(" +cirObj.red+ ", " +cirObj.blue + ", " + cirObj.green + ", " + cirObj.alpha + ")";


    this.draw = function() 
    {
        c.beginPath();  
        c.strokeStyle = 'black';
        c.fillStyle = this.color;   
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
        c.stroke();


    }
    this.update = function () 
    {
       // this.dx += 1 + (Math.random() - 0.5) * .45;
      //  this.dy +=  (Math.random() - 0.5) * .45;
        

        if (this.x + this.radius > canvas.width  || this.x - this.radius < 0) 
        {
            this.dx = -this.dx;
        }
        
        if (this.y + this.radius > canvas.height  || this.y - this.radius < 0 ) 
        {
            this.dy = -this.dy;
        }
        
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

    this.rewind= function () 
    {
       // this.dx += 1 + (Math.random() - 0.5) * .45;
      //  this.dy +=  (Math.random() - 0.5) * .45;
        

        if (this.x + this.radius > canvas.width  || this.x - this.radius < 0) 
        {
            this.dx = -this.dx;
        }
        
        if (this.y + this.radius > canvas.height  || this.y - this.radius < 0 ) 
        {
            this.dy = -this.dy;
        }
        
        this.x -= this.dx;
        this.y -= this.dy;

       
    }
}







var circleArray = [];

function init() 
{   circleArray.length=0;
    c.clearRect(0,0,80,20);

    canvas.width = window.innerWidth;// no scroll
    canvas.height = window.innerHeight;

    var gradient = c.createLinearGradient(0, 0, 80, 20);
    gradient.addColorStop("0", config.Color1);
    gradient.addColorStop("0.5", config.Color2);
    gradient.addColorStop("1.0", config.Color3);
    // var gradient = c.createRadialGradient(75, 50, 5, 90, 60, 100);
    // gradient.addColorStop(0, "red");
    // gradient.addColorStop(1, "white");
    // Fill with gradient
    c.fillStyle = gradient;
    c.font = "18px Arial";
    c.textAlign = "center";
    c.fillText(config.Title, 40,18,80);

    // Text is drawn with transparent properties, since base canvas is currently transparent, use this to filter pixels


    // Get Image Data
    var imgData = c.getImageData(0, 0, 80, 20);
   
    // array.. 4 bytes per pixel (x * y * 4 ); 
    //   Red, Blue, Green, Alpha
   
    var radius =10;
    var space = radius*2+5;
    var offX = (canvas.width - imgData.width*space)/2;
    var offY = (canvas.height - imgData.height*space)/2 
    
   
    var o;  // circle
    for (var i = 0; i < imgData.data.length; i += 4) {
        o = {
            x:((i/4)%imgData.width)*space+offX,
            y:parseInt(i/(imgData.width*4))*space+offY,
            red:imgData.data[i+0],
            blue:imgData.data[i+1],
            green:imgData.data[i+2],
            alpha:((imgData.data[i+3]/255)),
            radius:radius
        };
        
        if (o.alpha!=0) {
            circleArray.push(new Circle(o))
        }
    }




    
}


function rewind() 
{
    for (var j = 0; j < 1000; j++)
    { 
        for (var i = 0; i < circleArray.length; i++) 
        {
            circleArray[i].rewind();
        }
    }
}
function animate() 
{
   
    requestAnimationFrame(animate);
    //c.clearRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = config.ColorBack;//color changes what comes after
    c.fillRect(0, 0, canvas.width , canvas.height);
    for (var i = 0; i < circleArray.length; i++) 
    {
        circleArray[i].update();
    }

    // c.fillStyle = 'rgba (255, 0, 0, 0.5)';//< last value changes color darkness
     
    // c.fillStyle = 'rgba(0, 0, 255, 0.5)';
    // c.fillRect(400, 100, 100, 100);
    // c.fillStyle = 'rgba(0, 255, 0, 0.5)';
    // c.fillRect(300, 300, 100, 100);
    

}

init();
rewind();
animate();


