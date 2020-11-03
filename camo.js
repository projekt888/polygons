// As usual, I hope this over-commenting helps. Let's do this!

// Settings that we'll chuck into our gui in the top right
// if we load them into an object we can easily alter them,
// which I do at the very end of this code. Our code will 
// call these settings to draw itself, consider what else 
// you might add. Rotation perhaps? I'd love to hear.
let settings = {
  "count":100, // how many times we'll repeat our pattern
  "colors":{ // we'll choose a random color from this list
    1:'rgb(239,62,56)',
    2:'rgb(13,64,55)',
    3:'rgb(35,31,32)'
  },
  "bgColor":'rgb(35,31,32)', // background color
  'pathSrcIndex':0,  // this determines which path we pull from the pathSrcs array
  "angleVariance": 50, // determines the angle variability
  "scaleMin": 0.5,  // this is our minimum size 
  "scaleVariance": 4   // this multiplies by scaleMin to give our max size (ie "scaleMax" would be 2)
}

// Let's define our app
class App {
  // the constructor is run whenever we create an instance of the App
  // so anything in here will be called
  constructor(){
    // let's assign our variables to 'this' App
    // first we'll get our DOM elements
    this.wrapper = document.querySelector('#wrapper');
    this.svg = document.querySelector('svg');
    // then define our dimensions
    this.width = this.wrapper.offsetWidth;
    this.height = this.wrapper.offsetHeight;
    // and we'll set up an event listener that redefines the dimensions if the window is resized
    window.addEventListener('resize',function(){
      this.width = this.wrapper.offsetWidth;
      this.height = this.wrapper.offsetHeight;
    }.bind(this));
    
    // and let's run it!
    this.drawPattern();
  }
  
  // okay, so the constructor() will run automatically, but these other functions will have to be called. At the moment this is done using the GUI.
  // drawPattern draws our camoflage
  drawPattern(){
    // clear the svg
    document.querySelector('svg').innerHTML = "";
    // add the background color
    this.svg.style.backgroundColor = settings.bgColor;
    // add the pattern
    for (let i=0;i<settings.count;i++){
      // get one part of our svg
      let image = this.getImagePath();
      // append the image to the svg
      this.svg.innerHTML += image;
    }
  }
  
  getImagePath(){
    // fill our canvas
    // what is our path src
    let pathSrc = pathSrcs[settings.pathSrcIndex];
    // get the array of paths that match
    let src = pathSrc[(Math.floor(Math.random()*pathSrc.length))];
    // pick one of our colors
    let color = settings.colors[1+Math.floor(Math.random()*Object.keys(settings.colors).length)];
    // add our color to our string
    let path = addStyleToSVGPath(src,`fill:`+color);
    // get our transforms
    let scale = Math.random()*(settings.scaleVariance*settings.scaleMin)+settings.scaleMin;
    // okay this is a bit hacky, but my paths are based on a 100 by 100 view box, so to make sure go over the edges of the screen I'm taking half of their width and height away from their position. That's 50 in both cases
    let translateX = this.width*Math.random()-50*scale+`px`;
    let translateY = this.height*Math.random()-50*scale+`px`;
    // let's rotate it a bit too
    let rotate = Math.random()*settings.angleVariance+`deg`;
    
    // and add them
    path = addStyleToSVGPath(path,`transform: translate3d(${translateX},${translateY},0) rotate(${rotate}) scale(${scale})`);
    return path;
  }
}

function addStyleToSVGPath(path, style){
  // TODO if styling doesn't exist add it
  // then style our path
  let styledPath = path.slice(0,13)+style+`; `+path.slice(13);
  return styledPath;
}

// Here is the list of paths that we'll use to populate our 
// svg. I've given them names which you can see in the GUI
// If you open up an svg in a text editor - or even copy and
// paste out of Illustrator you'll see these paths. I put a 
// few into this array to play around with but you should be
// able to construct your own.
let pathSrcs = [
  [`<path style="" d="M36.15,108.27A2.83,2.83,0,0,0,37.35,106,15,15,0,0,0,40,102.53c.46-2.94,1.82-5.6,2.63-8.44a44.34,44.34,0,0,0,1.57-9.39q0-1.15,0-2.29c.12-.19.34-.37.35-.57.29-4.12.88-8.27-.06-12.35-.3-1.3.43-2.45,0-3.61-.51-1.51-.28-3.05-.37-4.58C44,57,43.84,52.76,42.5,48.65a1.68,1.68,0,0,1,0-1.13,3.6,3.6,0,0,0,0-2.23,31.46,31.46,0,0,0-3.22-9.73c-.2-.41-.59-.76-.35-1.25.63-1.28,0-2.43-.4-3.56a31.74,31.74,0,0,1-.83-3.07c-.56-2.28-.48-4.76-1.85-6.8A4.93,4.93,0,0,1,35,17.63a2.27,2.27,0,0,0-.5-1.73,6,6,0,0,1-1.16-2.74C33,11.48,32.1,10,31.67,8.36A2.63,2.63,0,0,0,30,6.58c-1.76-.76-1.74-.79-1.54-2.85a13.07,13.07,0,0,0,0-1.39c0-2.09-.58-2.61-2.68-2.23a6.1,6.1,0,0,1-2.46,0c-2-.41-2.63.08-3.09,2.07-.09.37,0,.77-.13,1.14-.38,1.64-.42,3.33-.93,5-.29.91-1.37,1.36-1.34,2.34s-.53,1.26-1.3,1.59a4.23,4.23,0,0,0-2.88,4.28,3.24,3.24,0,0,1-1.8,3.21,2.45,2.45,0,0,0-1.39,1.76c-.25,2.13-1.68,3.72-2.62,5.5-.52,1-1.17,1.93-1.64,3C5.19,32.39,5,35.06,3.91,37.44a16.46,16.46,0,0,0-1.27,7.18c.11,3.44-.84,6.67-1.49,10a1.09,1.09,0,0,1,.56.26,1.09,1.09,0,0,0-.56-.26C.5,55.31.8,56.2.78,57c-.06,2.06.17,4.14-.51,6.15a5.57,5.57,0,0,0-.09,3.13,11.11,11.11,0,0,1,.26,4A18.21,18.21,0,0,0,.8,77.75q0,.7,0,1.41a2.38,2.38,0,0,0,.49,1.37c-.34,1.74.35,3.4.42,5.1s-.39,3.24.39,4.73a15.83,15.83,0,0,1,1.54,5.9,1.47,1.47,0,0,0,.84,1.85l.1.92a.72.72,0,0,0,.38.92,3.13,3.13,0,0,0,.06.91c.92,2.38,1.37,4.92,2.49,7.23.09.19.17.58.09.63-1.2.76-.21,1.11.32,1.2,2.43.43,3.35,3.06,5.61,3.72.11,0,.19.23.27.36,1.07,1.74,2.38,3.36,2.65,5.5a3.55,3.55,0,0,0,2.93,3.11,7.79,7.79,0,0,1,3.25,1.59c1,.84,2.13,1.55,3.57,1,.65.18.89-.17,1-.74a1.16,1.16,0,0,0,.07-.37c.19-.11.57-.26.56-.33-.24-1.16.36-1.94,1-2.82a4.08,4.08,0,0,0,1-2.51l.08-.92c.61-1.11.85-2.44,2-3.23a.8.8,0,0,0,.27-.61C32,110.82,34.49,109.78,36.15,108.27Z"/>`],
  [
    `<path style="" d="M44.4,0.4c0,0-11-3-14,7s-10,21.5-19,18.7S-9,42.4,11.5,60c15.2,13.1-3.1,45.4,15.9,36.4s9-10,10-22s4-12,14-12	s28,6.6,22-13.2s-29-10.8-33-17.8s12-7,8-19S44.4,0.4,44.4,0.4z"/>`,
    `<path style="" d="M46.6,68.8C31.3,65.8,31.8,58,25.3,58S3,53.2,1.7,42S-2.2,16.9,3.9,8.6S30.5-3.9,34.4,4.7s-2.2,14.2,1.3,25
    c3.5,10.8,13.5-4.1,21.8,0.2s11.4,22.8,9.7,26.2C65.4,59.7,62.3,71.8,46.6,68.8z"/>`
  ],
  [`<path style="" d="M102,27c-0.3,0.6-0.7,1-1.2,1.3c-0.5,0.3-1.8,0.7-3.7,1.1c-2,0.4-5.3,0.8-10,1.1s-8.8,0.5-12.4,0.5 c0,0-5.2,0-5.4,0c-0.2,0-0.2,0.1-0.3,0.4c0,0.2,0.4,0.3,0.4,0.3l5.3,0.4c3.5,0.2,7.4,0.3,11.7,0.1c4.3-0.1,7.2-0.1,8.7,0 s2.5,0.3,3,0.7c0.5,0.3,0.9,0.9,1.2,1.7c0.2,0.8,0.2,1.5-0.2,2.3s-1,1.4-1.6,1.8c-0.7,0.5-1.9,0.9-3.5,1.2 c-1.6,0.3-3.9,0.6-6.9,0.9c-3,0.2-6.5,0.3-10.6,0.3c-4.2,0-7.2-0.1-9-0.3c-1.9-0.2-4,0-6.4,0.4c-2.4,0.5-4.4,1-6.1,1.7 c-1.7,0.7-3.2,1.4-4.2,2.1c-1.1,0.8-1.7,1.3-1.7,1.7c0,0.4,0.2,0.9,0.6,1.5c0.4,0.6,2.1,2,5.2,4.3c3.1,2.3,5,3.9,5.9,5.1 c0.9,1.1,1.6,2.2,2.1,3.3s0.9,2.2,1,3.2c0.2,1.1,0.1,2.1-0.1,3.1c-0.2,0.9-0.5,1.6-1,2c-0.5,0.4-0.9,0.5-1.3,0.3 c-0.4-0.1-1.2-0.7-2.4-1.8c-1.2-1.1-3.5-2.7-6.9-4.9c-3.4-2.2-5.6-3.4-6.4-3.8c-0.9-0.3-1.6-0.5-2.2-0.5c-0.6,0-1.7-0.2-3.4-0.7 c-1.8-0.4-2.9-0.9-3.5-1.2c-0.6-0.3-2.7-2.2-6.3-5.6c-3.7-3.4-6.2-5.9-7.4-7.6c-1.3-1.7-2.6-2.7-4.1-2.9C17.5,40.4,14,40.2,8.7,40 l-8.1-0.3l2.9-13.1l2.9-13l2.5,0.6c1.6,0.4,3.4,0.7,5.3,0.7c1.9,0.1,3.9-0.2,6-0.9c2.1-0.7,4.5-1.6,7.4-2.9c2.8-1.3,5.3-2.3,7.5-3 c2.1-0.6,4.9-1.2,8.4-1.7c3.4-0.5,6.5-0.8,9.3-0.8c2.8-0.1,7.2-0.9,13.4-2.4c6.1-1.5,9.9-2.3,11.3-2.5c1.4-0.2,2.5-0.2,3.2,0 c0.6,0.1,1.2,0.5,1.7,1.2c0.4,0.7,0.6,1.2,0.6,1.6s-0.2,0.8-0.4,1.1C82.2,5,78.6,6.4,71.6,8.7c0,0-10,3.3-10.4,3.5 c-0.4,0.2-1.9,2.1,1.5,2.2c2.3,0.1,2.3,0.1,0,0c0.9,0.2,6.2-0.5,15.7-2.1c0,0,11.6-2.3,13.1-2.3s2.2,0.2,2.2,0.2 c0.6,0.3,1.1,0.6,1.4,1.1c0.2,0.5,0.4,1.1,0.5,1.8c0,0.8-0.1,1.3-0.3,1.7c-0.3,0.4-0.6,0.7-1,1c-0.5,0.2-1.3,0.5-2.6,0.7 c-1.3,0.2-4.7,1-10.1,2.4c-5.4,1.4-9.1,2.2-11,2.4c0,0-2.6,0.2-3,0.4c-0.4,0.2-1.6,1,0.4,1.2c1.3,0.1,1.3,0.1,0,0 c0.6,0.1,3.1,0.1,7.4,0c4.3,0,9.3-0.3,15.1-0.6c0,0,5.7-0.4,7.4-0.4c1.6,0,2.7,0.4,2.7,0.4c1.4,1,1.6,1.2,1.6,2.7 C102.2,26.4,102,27,102,27z"/>`
]
]

// now that all the pieces are in place let's create a
// version of our App from above
let app = new App();
// And let's use our dat.gui library to make it easier 
// to play around with. You can see how I've loaded it
// by clicking the cogs to the left of the JS above. 
// You can also read about the library here:
// https://workshop.chromeexperiments.com/examples/gui
const gui = new dat.GUI();
  // choose a variable
  gui.add(settings, 'count', 1, 500);
  // choose a color
  gui.addColor(settings.colors, '1').name('Color 1');
  gui.addColor(settings.colors, '2').name('Color 2');
  gui.addColor(settings.colors, '3').name('Color 3');
  gui.addColor(settings, 'bgColor').name('Background');
  gui.add(settings, 'angleVariance', 1, 360);
  gui.add(settings, 'scaleMin', 0.01, 1);
  // give us a value to pull from our array
  gui.add(settings,'pathSrcIndex',{ leaf: 0, blob: 1, hand: 2 });
  // load a function
  gui.add(app,'drawPattern');
  // and open the gui so that the user can see it
  gui.open();
