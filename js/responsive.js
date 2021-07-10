const hamburgerMenu = document.querySelector('.hamburger')
const closeButton = document.querySelector('.mobile_menu .top .close')
const mobileMenu = document.querySelector('.mobile_menu')
const curtain = document.querySelector('.curtain')
const headerMenuList = document.querySelector('.header .links')

function openMobileMenu(){
    curtain.style.display = 'block'
    document.documentElement.classList.add('no_scroll')
    setTimeout(function(){
        curtain.classList.add('active')
        mobileMenu.classList.add('active')
    })
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
    })
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
