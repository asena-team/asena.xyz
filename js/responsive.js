var hamburgerMenu = document.querySelectorAll('.hamburger')[0];
var closeButton = document.querySelectorAll('.mobile_menu .top .close')[0];
var mobileMenu = document.querySelectorAll('.mobile_menu')[0];
var curtain = document.querySelectorAll('.curtain')[0];
var headerMenuList = document.querySelectorAll('.header .links')[0];

function openMobileMenu() {
    curtain.style.display = 'block';
    document.documentElement.classList.add('no_scroll');
    setTimeout(function () {
        curtain.classList.add('active');
        mobileMenu.classList.add('active');
    }, 1);
    var i = window.scrollY;
    var interval = setInterval(function () {
        if (window.scrollY <= 0) {
            clearInterval(interval);
            return;
        }
        i--;
        window.scrollTo(0, i);
    }, 10);
}

function closeMobileMenu() {
    curtain.style.display = 'none';
    document.documentElement.classList.remove('no_scroll');
    setTimeout(function () {
        curtain.classList.remove('active');
        mobileMenu.classList.remove('active');
    }, 1);
}

hamburgerMenu.onclick = openMobileMenu;
closeButton.onclick = closeMobileMenu;
curtain.onclick = closeMobileMenu;

window.onresize = function () {
    if (window.innerWidth < 655) {
        headerMenuList.classList.add('hidden');
        hamburgerMenu.style.display = 'flex';
    } else {
        headerMenuList.classList.remove('hidden');
        hamburgerMenu.style.display = 'none';
        curtain.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.documentElement.classList.remove('no_scroll');
        setTimeout(function () {
            curtain.style.display = 'none';
        }, 300);
    }
}

window.onresize();