const languages = {tr_TR, en_US}

const elements = document.querySelectorAll('*')
const dropdownLanguages = document.querySelectorAll('.lang_select .dropdown_languages ul')[0]
const selectedLanguage = document.querySelectorAll('.lang_select .selected_language .language_name')[0]
const sliderImages = document.querySelectorAll('.swiper-container .swiper-wrapper img.slide_image')

let navigatorLanguage = navigator.language || navigator.userLanguage || navigator.languages[0]
let language
switch(navigatorLanguage){
    case 'az':
    case 'az-AZ':
    case 'tr_TR':
    case 'tr-TR':
    case 'tur':
    case 'tr':
        language = 'tr_TR'
        break

    default:
        language = DEFAULT_LANGUAGE
        break
}

if(localStorage.getItem('language')){
    if(!languages[localStorage.getItem('language')]){
        localStorage.setItem('language', DEFAULT_LANGUAGE)
    }

    translate()
}else{
    setLanguage(language)
}

function translate(){
    language = localStorage.getItem('language')
    elements.forEach(function(item){
        if (item.dataset.translate){
            item.innerHTML = (languages[language] || languages[DEFAULT_LANGUAGE])[item.dataset.translate]
        }

        if (item.dataset.date) {
            item.innerHTML = new Date(
                parseInt(item.dataset.date) * 1000).toLocaleTimeString(language.split('_')[0],
                {
                year: 'numeric', month: 'long', day: '2-digit', weekday: 'long'
            })
        }
    })

    refreshSlider()
    refreshDropdown()
}

function setLanguage(lang){
    localStorage.setItem('language', languages[lang] ? lang : DEFAULT_LANGUAGE)

    translate()
}

function refreshDropdown(){
    dropdownLanguages.innerHTML = ''
    Object.values(languages).forEach(function(lang){
        const code = lang['language.code']
        if(language === code){
            selectedLanguage.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" style="vertical-align:text-bottom;margin-right:5px"><path fill="currentColor" d="M19.753 10.909c-.624-1.707-2.366-2.726-4.661-2.726-.09 0-.176.002-.262.006l-.016-2.063 3.525-.607c.115-.019.133-.119.109-.231-.023-.111-.167-.883-.188-.976-.027-.131-.102-.127-.207-.109-.104.018-3.25.461-3.25.461l-.013-2.078c-.001-.125-.069-.158-.194-.156l-1.025.016c-.105.002-.164.049-.162.148l.033 2.307s-3.061.527-3.144.543c-.084.014-.17.053-.151.143.019.09.19 1.094.208 1.172.018.08.072.129.188.107l2.924-.504.035 2.018c-1.077.281-1.801.824-2.256 1.303-.768.807-1.207 1.887-1.207 2.963 0 1.586.971 2.529 2.328 2.695 3.162.387 5.119-3.06 5.769-4.715 1.097 1.506.256 4.354-2.094 5.98-.043.029-.098.129-.033.207l.619.756c.08.096.206.059.256.023 2.51-1.73 3.661-4.515 2.869-6.683zm-7.386 3.188c-.966-.121-.944-.914-.944-1.453 0-.773.327-1.58.876-2.156a3.21 3.21 0 011.229-.799l.082 4.277a2.773 2.773 0 01-1.243.131zm2.427-.553l.046-4.109c.084-.004.166-.01.252-.01.773 0 1.494.145 1.885.361.391.217-1.023 2.713-2.183 3.758zm-8.95-7.668a.196.196 0 00-.196-.145h-1.95a.194.194 0 00-.194.144L.008 16.916c-.017.051-.011.076.062.076h1.733c.075 0 .099-.023.114-.072l1.008-3.318h3.496l1.008 3.318c.016.049.039.072.113.072h1.734c.072 0 .078-.025.062-.076-.014-.05-3.083-9.741-3.494-11.04zm-2.618 6.318l1.447-5.25 1.447 5.25H3.226z"></path></svg>' + lang['language.name']
        }

        dropdownLanguages.innerHTML += `
            <li class="${language === code ? 'selected' : ''}"
                onclick="${language === code ? 'return false' : 'setLanguage(\'' + code + '\')'}">
                ${lang['language.name']}
            </li>
        `
    })
}

function refreshSlider(){
    sliderImages.forEach(function(sliderImage){
        sliderImage.src = `./images/slider/${language}/${sliderImage.dataset.source}`
    })
}
