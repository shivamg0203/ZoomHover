// choose the elements
const imageBox = document.querySelector(".viewWrap");
const original = document.querySelector(".myimage");
const magnifier = document.querySelector(".maglass");
let fileinps = document.querySelector('.fileinput')
  
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
    /*set background properties for the magnifier glass:*/
    var w, h, bw;
    let img = document.querySelector(".myimage");
    ////glass = document.querySelector(".maglass");
    /*create magnifier glass:*/
    magnifier.style.backgroundImage = "url('" + img.src + "')";
    //glass.style.backgroundImage = img.style.backgroundImage.url
    //glass.style.backgroundRepeat = "no-repeat";
    magnifier.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";

    bw = 3;
    w = magnifier.offsetWidth / 2;
    h = magnifier.offsetHeight / 2;
    /*execute a function when someone moves the magnifier glass over the image:*/
    magnifier.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    /*and also for touch screens:*/
    magnifier.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /*prevent the magnifier glass from being positioned outside the image:*/
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      /*set the position of the magnifier glass:*/
      magnifier.style.left = (x - w) + "px";
      magnifier.style.top = (y - h) + "px";
      /*display what the magnifier glass "sees":*/
      magnifier.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }
  magnify(2)


  //let times = prompt("Enter a value from 1 to 5")
  //magnify(times)

//const imageBox = document.querySelector(".viewWrap");
//const original = document.querySelector(".myimage");
//let magnifier = document.querySelector(".maglass");
//glass.setAttribute("class", "img-magnifier-glass");
/*insert magnifier glass:*/
//img.parentElement.insertBefore(glass, img);

/*const zoomer = (e => { 
const imageBox = document.querySelector(".viewWrap");
const original = document.querySelector(".myimage");
let magnifier = document.querySelector(".maglass");
magnifier.style.backgroundSize=original.width*3 + "px " +(original.height*3)+"px "
bw = 3
w = magnifier.offsetWidth / 2;
h = magnifier.offsetHeight / 2;

function handleMouseMoves(e) {
    var x,y


    let pos = getCursorPos(e)
    x = pos.x
    y = pos.y
    console.log(x,y)

    if (x > original.width - (w / zoom)) {x = original.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > original.height - (h / zoom)) {y = original.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /*display what the magnifier glass "sees":*/
   /* glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
}
  /*const style = magnifier.style;
  const x = e.pageX - this.offsetLeft;
  const y = e.pageY - this.offsetTop;
  const imgWidth = imageBox.offsetWidth;
  const imgHeight = imageBox.offsetHeight;
  let xperc = (x / imgWidth) * 100;
  let yperc = (y / imgHeight) * 100;

  //lets user scroll past right edge of image
  if (x >= 0.01 * imgWidth) {
    xperc *= 1.15;
  }

  //lets user scroll past bottom edge of image
  if (y >= 0.01 * imgHeight) {
    yperc *= 1.15;
  }

  style.backgroundPositionX = `${xperc - 9}%`;
  style.backgroundPositionY = `${yperc - 9}%`;
  style.left = `${x - 180}px`;
  style.top = `${y - 180}px`;*/
/* }
function getCursorPos(e) {
    var a,
    x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:
    a = original.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
}

imageBox.addEventListener("mousemove", handleMouseMoves);
})();

/*const inphoverd = () =>{
console.log('ghdjs')
let ip = document.querySelector('#myFile')
ip.classList.toggle('inh')
}*/
/*let inpelm = document.querySelector('#myFile')
inpelm.addEventListener('hover', inpHoRun());
const inpHoRun = () =>{
console.log('hoverd')
}
});*/

//let glass = document.querySelector(".maglass"); 
//let curElement = document.querySelector('.image');
//console.log(curElement);
// get loaded data and render thumbnail.
//magnifier.setAttribute("style", `background-image:${yu};`) 
// magnifier.setAttribute('background-image',e.target.result)
//glass.style.backgroundImage=
/*document.querySelector('.fileinput').addEventListener('change',function(){
let curElement = document.querySelector('.image');
console.log(curElement);
let reader = new FileReader();
reader.onload = function (e) {
    // get loaded data and render thumbnail.
    curElement.setAttribute('src', e.target.result);
};
// read the image file as a data URL.
reader.readAsDataURL(this.files[0]);
)}*/