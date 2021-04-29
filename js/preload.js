var preloader = document.querySelectorAll('.preloader_container')[0];

window.onload = function () {
    setTimeout(function () {
        preloader.style.opacity = 0;
        document.documentElement.classList.remove('no_scroll');
        setTimeout(function () {
            document.body.removeChild(preloader);
        }, 200);
    }, 500);
}