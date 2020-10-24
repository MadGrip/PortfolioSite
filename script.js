
    const scrollBar = window.scrollY;
    const header = document.querySelector("#header");
    if(scrollBar >= 500){
        header.classList.add("sticky-header");
    }else if(scrollBar < 500){
        header.classList.remove("sticky-header");
    }






    const services = document.getElementById("services");
    const options = {
        root: null,
        rootMargin: "-250px 0px",
        treshold: 0
    };

    const observer = new IntersectionObserver(function(entries, observer){
        entries.forEach(entry => {
            console.log(entry);
        })
    }, options);

    observer.observe(services);
    




