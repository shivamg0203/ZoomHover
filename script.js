// choose the elements
const imageBox = document.querySelector(".viewWrap");
const original = document.querySelector(".myimage");
const magnifier = document.querySelector(".maglass");
let fileinps = document.querySelector('.fileinput')
let imgbutton = document.querySelector(".sbt-1")
  
  imgbutton.addEventListener('click',function(e){
  e.preventDefault();
  console.log("submit button");
});


//Change Image files using eventListener 'change'
  fileinps.addEventListener('change', function () {
    console.log("file changed")
      let reader = new FileReader();
      reader.onload = function (e) {
          original.setAttribute('src', e.target.result);
          let yu = original.getAttribute('src')
          magnifier.style.backgroundImage = "url('" + yu + "')";
      };
      // read the image file as a data URL.
      reader.readAsDataURL(this.files[0]);
  });
// Change Lens size and magnification value using form submission
const changeMag = ()=>{
    event.preventDefault()
    let zoomin = document.querySelector('#lensize')
    let magtimes = document.querySelector('#magtimes')
    zoomin = zoomin.value
    magtimes = magtimes.value
    console.log(zoomin,magtimes)
    // Using distinct values of zoomin lens size changes
    switch(zoomin) {
      case "small":
          magnifier.style.width = '100px';
          magnifier.style.height = '100px';
          break;
      case "medium":
          magnifier.style.width = '150px';
          magnifier.style.height = '150px';
          break;
      case "large":
          magnifier.style.width = '250px';
          magnifier.style.height = '250px';
          break;
      default:
          alert("Wrong Lens Size");
      }
    // Magnify function is called with new value of magnification
    if (magtimes>=1 && magtimes <=5){
      magnify(new Number(magtimes))
    }
    else{
      alert("Invalid Magnification")
    }
}
function magnify(zoom) {
    var w, h, bw;
    let img = document.querySelector(".myimage");
    magnifier.style.backgroundImage = "url('" + img.src + "')";
    
    magnifier.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

    bw = 3;
    w = magnifier.offsetWidth / 2;
    h = magnifier.offsetHeight / 2;
    magnifier.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    /*and also for touch screens:*/
    magnifier.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      //prevent any other actions that may occur when moving over the image
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      //prevent the magnifier glass from being positioned outside the image:
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      //set the position of the magnifier
      magnifier.style.left = (x - w) + "px";
      magnifier.style.top = (y - h) + "px";
      //display what the magnifier glass "sees"
      magnifier.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.e;  // e = e || window.event;
      //get the x and y positions of the image
      a = img.getBoundingClientRect();
      //calculate cursor's x and y coordinates, relative to the image
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      //consider any page scrolling:
      x = x - window.scrollX;
      y = y - window.scrollY;
      return {x : x, y : y};
    }
  }
  magnify(2)

     
