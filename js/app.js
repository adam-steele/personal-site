// import functions and grab DOM elements

// initialize state

// set event listeners to update state and DOM
'use strict';

const app = {
    aboutMeImg: document.getElementById('me2'),
    headerName: document.getElementById('welcome'),
    responsiveMenu: document.getElementById("responsive-menu"),
    topNav: document.getElementsByTagName("a"),
    navLinks: document.getElementsByClassName('links-respond'),
    navLinksRes: document.getElementsByClassName('links-responded'),

};


var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid White }';
    document.body.appendChild(css);
};

const x = [...app.navLinks]

 const menuShow = function () {
    
    x.forEach(element => {
       
        if ( element.classList.contains('links-respond') || element.classList.contains('links-responded')){
            element.classList.toggle('links-respond');
            element.classList.toggle('links-responded');
        }
    });
}


app.responsiveMenu.onclick = menuShow;


const animate = function (params) {
    
}

const options = {
	root: null, // use the document's viewport as the container
	rootMargin: '0px', // % or px - offsets added to each side of the intersection 
	threshold: 0.9 // percentage of the target element which is visible
}

let callback = (entries) => { 
	entries.forEach(entry => {
		
		// If entry (box) is visible - according with the params set in `options`
		// then adds `isVisible` class to box
		// otherwise removes `isVisible` class
		if(entry.isIntersecting) {
                jQuery('.container').each(function(){
                jQuery(this).find('.bar').animate({
                  width:jQuery(this).attr('data-percent')
                },6000);
              });
            }

	});
}

// Create the intersection observer instance by calling its constructor and passing it a
// callback function to be run whenever a threshold is crossed in one direction or the other:
let observer = new IntersectionObserver(callback, options);

// Get all the `.bar` from DOM and attach the observer to these
document.querySelectorAll('.bar')
	.forEach(bar => { observer.observe(bar) });