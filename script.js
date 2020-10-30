/* XXX Header--scrolled */
function headerScrolled() {
    /* Header change color */
    const header = document.getElementById("header");
    const home = document.getElementById("home");
    const observerHome = new IntersectionObserver(function(entries, observerHome){
        entries.forEach(entry => {
            if(!entry.isIntersecting){
                header.classList.add("header--scrolled");
            }else if(entry.isIntersecting){
                header.classList.remove("header--scrolled");
            }
        })
    }, {
        rootMargin: "-20% 0% 0% 0%"
    });
    observerHome.observe(home);
}
document.addEventListener('DOMContentLoaded', headerScrolled);

/* XXX Header links animations */
function headerLinksAnimate() {
    const headerLinks = Array.from(document.querySelectorAll(".navbar ul li a"));
    const sections = Array.from(document.querySelectorAll("section"));
    //Add intersection observer for each section
    sections.forEach(section =>{
        const observerSection = new IntersectionObserver(function(entries){
            //Get currently intersected section
            entries.forEach(entry =>{
                if(entry.isIntersecting & entry.target.id != "hire"){
                    //Compare intersected section content with header link content and add class
                    const intersectedSection = entry.target.id;
                    const intersectedLink = headerLinks.filter(link => link.innerHTML.toLowerCase() == intersectedSection);
                    intersectedLink[0].parentElement.classList.add("selected-link");
                }
                // Remove class from links
                else if(!entry.isIntersecting & entry.target.id != "hire"){
                    let redSection = entry.target.id;
                    let redLink = headerLinks.filter(link => link.innerHTML.toLowerCase() == redSection)
                    redLink[0].parentElement.classList.remove("selected-link");
                }
            })
        }, {
            rootMargin: "-20% 0% -60% 0%",
            threshold: 0
        });
        observerSection.observe(section);
    })
}
document.addEventListener('DOMContentLoaded', headerLinksAnimate);


/* XXX Home text animation */
class TypeWriter{
    constructor(txtElement, words, wait = 3000){
        this.txtElement = txtElement; //span
        this.words = words;
        this.wordIndex = 0;
        this.txt = ''; //current text
        this.wait = parseInt(wait, 10); //wait time at the end
        this.isDeleting = false;
        this.type(); //method that types text
    }

    type(){
        //Index of current word
        const current = this.wordIndex % this.words.length;
        //Current word that is typed in
        const fullTxt = this.words[current];

      // YYY Adding and removing characters
        if(this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

      // YYY Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

      // YYY Initial Type Speed
        let typeSpeed = 100;
        if(this.isDeleting) {
        typeSpeed /= 2;
        }

      // YYY If word is complete
        if(!this.isDeleting && this.txt === fullTxt){
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === ''){
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}


  // YYY Init On DOM Load
    document.addEventListener('DOMContentLoaded', init);

  // YYY Init App
    function init() {
        const txtElement = document.querySelector('.type-effect');
        const wait = txtElement.getAttribute('data-wait');
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
    }


/* XXX Responsive design */
function responsiveDesign() {
    const faServicesIcons = Array.from(document.querySelectorAll(".fa-3x"));
    const faSocial = Array.from(document.querySelectorAll(".fa-facebook-square, .fa-instagram-square, .fa-linkedin"));
    
    if(screen.width <= 425){
        faServicesIcons.forEach(icon => {
            icon.classList.remove("fa-3x");
            icon.classList.add("fa-2x");
        });
    }
}
document.addEventListener('DOMContentLoaded', responsiveDesign);

/* XXX Gallery filtering */
function galleryFiltering() {
    const filters = Array.from(document.querySelectorAll(".portfolio-filter--container ul li"));
    const imageBlocks = Array.from(document.querySelectorAll(".portfolio-grid--block"));
    const images = Array.from(document.querySelectorAll(".portfolio-grid--block div a img"));
    //Default values when page loads
    let clickedFilter = Array.from(document.querySelectorAll(".portfolio-filter--container ul li"))[0];
    let filteredImages = images;

    //Add default styles for ALL filter and show all images
    clickedFilter.classList.add("li--filtered");
    filteredImages.forEach(img => {
        img.parentElement.parentElement.parentElement.classList.add("img--show");
    })

    //Add event listener to every link
    filters.forEach(filter => {
        filter.addEventListener("click", function(){
            //YYY FILTER ... Remove class from previously clicked filter
            clickedFilter.classList.remove("li--filtered");
            //Find clicked filter and add class to it
            clickedFilter = filter;
            clickedFilter.classList.add("li--filtered");
            let clickedFilterText = filter.innerText.toLowerCase();

            //YYY IMG .... Hide all unrelevant images
            filteredImages.forEach(img => {
                img.parentElement.parentElement.parentElement.classList.remove("img--show");
            })
            //Find relevant images and show them
            if(clickedFilterText == "all"){
                filteredImages = images;
                filteredImages.forEach(img => {
                    img.parentElement.parentElement.parentElement.classList.add("img--show");
                })
            }else{
                filteredImages = images.filter(image => image.getAttribute("data-id").includes(clickedFilterText));
                filteredImages.forEach(img => {
                    img.parentElement.parentElement.parentElement.classList.add("img--show");
                })
            }
        })
    })
}
document.addEventListener('DOMContentLoaded', galleryFiltering);

/* XXX Smooth Scroll */
const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 800,
    speedAsDuration: true
});


/* XXX Particles JS */
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'particles.json', function() {
    console.log('callback - particles.js config loaded');
});