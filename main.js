/*
Snow Effect source: https://codepen.io/longzero/pen/Kwdbyj
*/

window.onload = function () {
    //canvas init
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
  
    //canvas dimensions
    var W = window.innerWidth - 20;
    var H = window.innerHeight - 20;
    canvas.width = W;
    canvas.height = H;
  
    //snowflake particles
    var mp = 25; //max particles
    var particles = [];
    for (var i = 0; i < mp; i++) {
      particles.push({
        x: Math.random() * W, //x-coordinate
        y: Math.random() * H, //y-coordinate
        r: Math.random() * 4 + 1, //radius
        d: Math.random() * mp, //density
      });
    }
  
    //Lets draw the flakes
    function draw() {
      ctx.clearRect(0, 0, W, H);
  
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      for (var i = 0; i < mp; i++) {
        var p = particles[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
    }
  
    //Function to move the snowflakes
    //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;
    function update() {
      angle += 0.01;
      for (var i = 0; i < mp; i++) {
        var p = particles[i];
        //Updating X and Y coordinates
        //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
        //Every particle has its own density which can be used to make the downward movement different for each flake
        //Lets make it more random by adding in the radius
        p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(angle) * 2;
  
        //Sending flakes back from the top when it exits
        //Lets make it a bit more organic and let flakes enter from the left and right also.
        if (p.x > W + 5 || p.x < -5 || p.y > H) {
          if (i % 3 > 0) {
            //66.67% of the flakes
            particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
          } else {
            //If the flake is exitting from the right
            if (Math.sin(angle) > 0) {
              //Enter from the left
              particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
            } else {
              //Enter from the right
              particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
            }
          }
        }
      }
    }
  
    //animation loop
    setInterval(draw, 33);
  };
  
  function yesClick() {
    alert("Tối nay mik đi xem film nhóa !!! ");
  }
  
  function noHover() {
    var x = Math.floor(Math.random() * window.innerWidth);
    var y = Math.floor(Math.random() * window.innerHeight);
    document.getElementById("btnNo").style.left = x + "px";
    document.getElementById("btnNo").style.top = y + "px";
  }




document.addEventListener('DOMContentLoaded',function(event){
    // array with texts to type in typewriter
    var dataText = [ "Nhung ak.", "Tui có chuyện này muốn nói", "Thực ra tuiiiiii", "Thích cậu.", "Cậu làm người yêu tui nha!"];
    
    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
      // chekc if text isn't finished yet
      if (i < (text.length)) {
        // add next character to h1
       document.querySelector("h1").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
  
        // wait for a while and call this function again for next character
        setTimeout(function() {
          typeWriter(text, i + 1, fnCallback)
        }, 100);
      }
      // text finished, call callback if there is a callback function
      else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 700);
      }
    }
    // start a typewriter animation for a text in the dataText array
     function StartTextAnimation(i) {
       if (typeof dataText[i] == 'undefined'){
          setTimeout(function() {
            StartTextAnimation(0);
          }, 20000);
       }
       // check if dataText[i] exists
      if (i < dataText[i].length) {
        // text exists! start typewriter animation
       typeWriter(dataText[i], 0, function(){
         // after callback (and whole text has been animated), start next text
         StartTextAnimation(i + 1);
       });
      }
    }
    // start the text animation
    StartTextAnimation(0);
  });