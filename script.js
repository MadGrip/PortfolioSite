/* XXX Header--scrolled */
/* Header change color */
const header = document.getElementById("header");
const home = document.getElementById("home");
const observerHome = new IntersectionObserver(function(entries, observerHome){
    entries.forEach(entry => {
        console.log(entry);
        if(!entry.isIntersecting){
            header.classList.add("header--scrolled");
        }else if(entry.isIntersecting){
            header.classList.remove("header--scrolled");
            console.log("removed");
        }
    })
}, {
    rootMargin: "-20% 0% 0% 0%"
});
observerHome.observe(home);

/* XXX Responsive design */
const faServicesIcons = Array.from(document.querySelectorAll(".fa-3x"));
const faSocial = Array.from(document.querySelectorAll(".fa-facebook-square, .fa-instagram-square, .fa-linkedin"));

console.log(screen.width);
console.log(faSocial);

if(screen.width <= 425){
    faServicesIcons.forEach(icon => {
        icon.classList.remove("fa-3x");
        icon.classList.add("fa-2x");
    });

    

}
