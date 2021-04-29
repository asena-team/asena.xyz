var slides = [
    {
        header: {
            tr_TR: "Türkçe 1",
            en_US: "English 1",
        },
        description: {
            tr_TR: "TÜRKÇE Lorem ipsum dolor sit amet, consectetur adipiscing elit. 1",
            en_US: "ENGLISH Lorem ipsum dolor sit amet, consectetur adipiscing elit. 1",
        },
        image: {
            tr_TR: {
                link: "1.png",
                alt: "Image"
            },
            en_US: {
                link: "1.png",
                alt: "Image"
            }
        },
    },
    {
        header: {
            tr_TR: "Türkçe 2",
            en_US: "English 2",
        },
        description: {
            tr_TR: "TÜRKÇE Lorem ipsum dolor sit amet, consectetur adipiscing elit. 12",
            en_US: "ENGLISH Lorem ipsum dolor sit amet, consectetur adipiscing elit. 12",
        },
        image: {
            tr_TR: {
                link: "2.png",
                alt: "Image"
            },
            en_US: {
                link: "2.png",
                alt: "Image"
            }
        },
    },
    {
        header: {
            tr_TR: "Türkçe 3",
            en_US: "English 3",
        },
        description: {
            tr_TR: "TÜRKÇE Lorem ipsum dolor sit amet, consectetur adipiscing elit. 123",
            en_US: "ENGLISH Lorem ipsum dolor sit amet, consectetur adipiscing elit. 123",
        },
        image: {
            tr_TR: {
                link: "3.png",
                alt: "Image"
            },
            en_US: {
                link: "3.png",
                alt: "Image"
            }
        },
    },
];

var slider = document.querySelectorAll('.swiper-wrapper')[0];
var language = localStorage.getItem('language') ? localStorage.getItem('language') : 'tr_TR';

slider.innerHTML = '';
slides.forEach(function (slide, index) {
    slider.innerHTML += `
        <div class="swiper-slide">
            <div class="swiper-slide-wrapper">
                <div class="slide-text">
                    <h2 data-index="${index}" data-type="header" data-slidetext="${slide.header[language] || slider.header.tr_TR}">${slide.header[language] || slider.header.tr_TR}</h2>
                    <p data-index="${index}" data-type="description" data-slidetext="${slide.description[language] || slider.description.tr_TR}" class="inline">${slide.description[language] || slider.description.tr_TR}</p>
                    <span class="br"></span>
                    <div class="slider-buttons">
                        <a href="https://discord.com/oauth2/authorize?permissions=347200&scope=bot&client_id=716259870910840832&redirect_uri=https%3A%2F%2Fdiscord.gg%2FCRgXhfs&response_type=code"
                           class="button button__blue" target="_blank" data-translate="inviteButton"></a>
                        <a class="button button__bordered" href="https://wiki.asena.xyz" target="_blank" data-translate="readWikiButton"></a>
                    </div>
                </div>
                <div class="slide-image">
                    <img src="./img/slider/${language}/${slide.image[language].link || slide.image.tr_TR.link}"
                        alt="${slide.image[language].alt || slide.image.tr_TR.alt}"
                        class="slide_image" data-source="${slide.image[language].link}">
                </div>
            </div>
        </div>
    `;
});