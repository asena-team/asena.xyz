const preloader = document.querySelector('.preloader_container')

window.onload = function(){
    setTimeout(function(){
        preloader.style.opacity = 0
        document.documentElement.classList.remove('no_scroll')

        setTimeout(function(){
            document.body.removeChild(preloader)
        }, 200)
    }, 250)
}
