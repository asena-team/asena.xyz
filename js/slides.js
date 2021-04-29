const slides = [
    {
        header: {
            tr_TR: 'Türkçe 1',
            en_US: 'English 1',
        },
        description: {
            tr_TR: 'TÜRKÇE Lorem ipsum dolor sit amet, consectetur adipiscing elit. 1',
            en_US: 'ENGLISH Lorem ipsum dolor sit amet, consectetur adipiscing elit. 1',
        },
        image: {
            tr_TR: {
                link: '1.png',
                alt: 'Image'
            },
            en_US: {
                link: '1.png',
                alt: 'Image'
            }
        },
    },
    {
        header: {
            tr_TR: 'Türkçe 2',
            en_US: 'English 2',
        },
        description: {
            tr_TR: 'TÜRKÇE Lorem ipsum dolor sit amet, consectetur adipiscing elit. 12',
            en_US: 'ENGLISH Lorem ipsum dolor sit amet, consectetur adipiscing elit. 12',
        },
        image: {
            tr_TR: {
                link: '2.png',
                alt: 'Image'
            },
            en_US: {
                link: '2.png',
                alt: 'Image'
            }
        },
    },
    {
        header: {
            tr_TR: 'Türkçe 3',
            en_US: 'English 3',
        },
        description: {
            tr_TR: 'TÜRKÇE Lorem ipsum dolor sit amet, consectetur adipiscing elit. 123',
            en_US: 'ENGLISH Lorem ipsum dolor sit amet, consectetur adipiscing elit. 123',
        },
        image: {
            tr_TR: {
                link: '3.png',
                alt: 'Image'
            },
            en_US: {
                link: '3.png',
                alt: 'Image'
            }
        },
    },
];

const slider = document.querySelectorAll('.swiper-wrapper')[0];
const lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : DEFAULT_LANGUAGE;

slider.innerHTML = '';
slides.forEach(function(slide, index){
    slider.innerHTML += `
        <div class="swiper-slide">
            <div class="swiper-slide-wrapper">
                <div class="slide-text">
                    <h2 data-index="${index}" data-type="header" data-slidetext="${slide.header[lang] || slider.header[DEFAULT_LANGUAGE]}">${slide.header[lang] || slider.header[DEFAULT_LANGUAGE]}</h2>
                    <p data-index="${index}" data-type="description" data-slidetext="${slide.description[lang] || slider.description[DEFAULT_LANGUAGE]}" class="inline">${slide.description[lang] || slider.description[DEFAULT_LANGUAGE]}</p>
                    <span class="br"></span>
                    <div class="slider-buttons">
                        <a href="https://invite.asena.xyz"
                           class="button button__blue" target="_blank" data-translate="buttons.invite"></a>
                        <a class="button button__bordered" href="https://wiki.asena.xyz" target="_blank" data-translate="buttons.wiki"></a>
                    </div>
                </div>
                <div class="slide-image">
                    <img src="./images/slider/${lang}/${slide.image[lang].link || slide.image[DEFAULT_LANGUAGE].link}"
                        alt="${slide.image[lang].alt || slide.image[DEFAULT_LANGUAGE].alt}"
                        class="slide_image" data-source="${slide.image[lang].link}">
                </div>
            </div>
        </div>
    `;
});
