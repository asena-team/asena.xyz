const hamburgerMenu = document.querySelectorAll('.hamburger')[0]
const closeButton = document.querySelectorAll('.mobile_menu .top .close')[0]
const mobileMenu = document.querySelectorAll('.mobile_menu')[0]
const curtain = document.querySelectorAll('.curtain')[0]
const headerMenuList = document.querySelectorAll('.header .links')[0]

function openMobileMenu(){
    curtain.style.display = 'block'
    document.documentElement.classList.add('no_scroll')
    setTimeout(function(){
        curtain.classList.add('active')
        mobileMenu.classList.add('active')
    }, 1)
    let i = window.scrollY
    const interval = setInterval(function(){
        if(window.scrollY <= 0){
            clearInterval(interval)
            return
        }
        i--
        window.scrollTo(0, i)
    }, 10)
}

function closeMobileMenu(){
    curtain.style.display = 'none'
    document.documentElement.classList.remove('no_scroll')
    setTimeout(function(){
        curtain.classList.remove('active')
        mobileMenu.classList.remove('active')
    }, 1)
}

hamburgerMenu.onclick = openMobileMenu
closeButton.onclick = closeMobileMenu
curtain.onclick = closeMobileMenu

window.onresize = function(){
    if(window.innerWidth < 655){
        headerMenuList.classList.add('hidden')
        hamburgerMenu.style.display = 'flex'
    }else{
        headerMenuList.classList.remove('hidden')
        hamburgerMenu.style.display = 'none'
        curtain.classList.remove('active')
        mobileMenu.classList.remove('active')
        document.documentElement.classList.remove('no_scroll')
        setTimeout(function(){
            curtain.style.display = 'none'
        }, 300)
    }
}

window.onresize()
