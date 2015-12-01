var getControlDots = function (element, x, y) {
  var ctrlDots = [],
    blockWidth = element.width/x,
    blockHeight = element.height/y;
  for(var i = 0; i <= x; i++) {
    ctrlDots[i] = [];
    for(var j = 0; j <= y; j++) {
      ctrlDots[i][j] = {x: Math.floor(i*blockWidth), y: Math.floor(j*blockHeight)};
    }
  }
  console.log(ctrlDots);
  return ctrlDots;
}

var getRandomDots = function (element, x, y) {
  var blockWidth = element.width/x,
      blockHeight = element.height/y,
  	  randomDots = [
  					 [0, 0], 
  					 [0, element.height],
  					 [element.width, 0],
  					 [element.width, element.height]
  				   ];
    
  for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++) {
      var dotX = Math.floor((Math.random() + i) * blockWidth),
          dotY = Math.floor((Math.random() + j) * blockHeight);
      randomDots.push([ dotX, dotY ]);
    }
  }
  return randomDots;
}
        
var getRandomHexColor = function () {
	var fromColor = parseInt("0xC2185B", 16),
		toColor = parseInt("0xE91E63", 16),
		scale = toColor - fromColor;	
	return "#" + Math.floor((Math.random()) * scale + fromColor).toString(16);
}

var getRandomRGBColor = function () {
	var r = 233 + Math.floor((Math.random() * 10 * 2)), 
		g = 26 + Math.floor((Math.random() * 10 * 18)), 
		b = 96 + Math.floor((Math.random() * 10 * 13));
	return "rgb("+r+","+g+","+b+")";
}

var getRGB = function () {
	var colors = [
		// [233, 26, 96],
		// [235, 44, 109],
		// [237, 62, 121],
		[238, 80, 134],
		[240, 98, 146],
		[242, 116, 158],
		[243, 134, 171],
		[245, 152, 183],
		// [247, 170, 196],
		// [249, 188, 208],
		// [254, 205, 221]
	];
	var index = Math.floor(Math.random()*1*colors.length);
	return colors[index];
}

window.requestAnimFrame = (function(){  
		return  window.requestAnimationFrame       ||  
		        window.webkitRequestAnimationFrame ||  
		        window.mozRequestAnimationFrame    ||  
		        function( callback ){  
		          window.setTimeout(callback, 1000 / 60);  
		        };  
		})();


var getDots = function (randomDots, a, b, step)
{

	var dots = [];
    step = (a > b) ? step / a : step / b;
    for(var i = 0; i < randomDots.length; i ++) {
    	dots.push([randomDots[i][0] + a * Math.cos(step), randomDots[i][1] + b * Math.sin(step)]);
    }
    return dots;
};

window.load = (function(){
  var oCvs = document.getElementById('cvs');
    if(cvs.getContext){
        var randomDots = getRandomDots(oCvs, 4, 4),
      		context = oCvs.getContext('2d');
      	context.clearRect(0,0,oCvs.width,oCvs.height);  
	    context.translate(0.5, 0.5);
	    context.lineWidth = 0;
	    // context.strokeStyle = "#000";
	    var randomDots = getRandomDots(oCvs, 4, 4);
	    var step = 0;
	    var draw = function () {
	    	step++;
	    	var dots = getDots(randomDots, 40, 5, step);
	    	var triangles = Delaunay.triangulate(dots);
		    for(var i=0;i < triangles.length; i+=3) {
			    var x1 = dots[triangles[i]][0],
				    x2 = dots[triangles[i+1]][0],
				    x3 = dots[triangles[i+2]][0],
				    y1 = dots[triangles[i]][1],
				    y2 = dots[triangles[i+1]][1],
				    y3 = dots[triangles[i+2]][1];

			    context.save();
			    context.beginPath();
			    context.moveTo(x1, y1);
			    context.lineTo(x2, y2);
			    context.lineTo(x3, y3);
			    context.closePath();
			    // context.fillStyle = getRandomRGBColor();
			    // var colorR = Math.floor(233+2*Math.random()*10),
			    	// colorG = Math.floor(26+18*Math.random()*10),
			    	// colorB = Math.floor(96+10*Math.random()*10);
			    // context.fillStyle = "rgb("+colorR+","+colorG+","+colorB+")";
			    var rgb = getRGB();
			    var gra = context.createLinearGradient(x1, y1, x2, y2);
			    gra.addColorStop(0, "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")");
			    gra.addColorStop(1, "rgb("+(rgb[0]+6)+","+(rgb[1]+54)+","+(rgb[2]+39)+")");
			    context.fillStyle = gra;
			    context.fill();
			    context.restore();
			}
		    var dotsLenth = randomDots.length;
		    /*
		    for(var i = 0; i < dotsLenth; i++) {
		        context.beginPath();
		        context.arc(randomDots[i][0], randomDots[i][1], 15, 0, 2*Math.PI);
		        context.closePath();
		        context.stroke();
		      
		    }
		    */
		    requestAnimFrame(draw); 
	    }
			
	    draw();
	     
    }
})();

// window.setTimeout(draw, 1000 / 60);  
