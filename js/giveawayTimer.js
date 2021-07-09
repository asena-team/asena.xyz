const popupCurtain = document.querySelector('.giveaway-timer .popup-curtain')
const popup = document.querySelector('.giveaway-timer .popup')
const remainingElem = {
    month: document.querySelector('.timer .timer-unit.month .number'),
    week: document.querySelector('.timer .timer-unit.week .number'),
    day: document.querySelector('.timer .timer-unit.day .number'),
    hour: document.querySelector('.timer .timer-unit.hour .number'),
    minute: document.querySelector('.timer .timer-unit.minute .number'),
    second: document.querySelector('.timer .timer-unit.second .number'),
}
const endTimeElem = document.querySelector('.giveaway-timer .end-time .time')
const progressBar = document.querySelector('.giveaway-timer .timer-progress-bar .bar')
const TimeUnitSeconds = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
}

const getQueryVariable = (variable) => {
    const query = location.search.substring(1)
    const vars = query.split('&')

    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=')

        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1])
        }
    }

    return false
}

const getUnit = (unit) => {
    return (languages[language] || languages[DEFAULT_LANGUAGE])[`date-time.units.${unit}`]
}

const secondsToString = (delta, locale = DEFAULT_LANGUAGE, chunk = 5) => {
    const result = {
        year: 0,
        month: 0,
        week: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
    }

    Object.keys(TimeUnitSeconds).forEach((key) => {
        result[key] = Math.floor(delta / TimeUnitSeconds[key])
        delta -= result[key] * TimeUnitSeconds[key]
    })

    return Object.assign(result, {
        toString: () => {
            let arr = []

            if (result.year !== 0) arr.push(`${result.year} ${getUnit('year')}`)
            if (result.month !== 0) arr.push(`${result.month} ${getUnit('month')}`)
            if (result.week !== 0) arr.push(`${result.week} ${getUnit('week')}`)
            if (result.day !== 0) arr.push(`${result.day} ${getUnit('day')}`)
            if (result.hour !== 0) arr.push(`${result.hour} ${getUnit('hour')}`)
            if (result.minute !== 0) arr.push(`${result.minute} ${getUnit('minute')}`)
            if (result.second !== 0) arr.push(`${result.second} ${getUnit('second')}`)

            return arr.slice(0, chunk).join(' ')
        }
    })
}

const openPopup = () => {
    popupCurtain.style.display = 'block'
    popup.style.visibility = 'visible'

    setTimeout(() => {
        popupCurtain.style.opacity = 1
        popup.style.opacity = 1
    })
}

if (!getQueryVariable('start') || !getQueryVariable('length')) {
    location.href = location.origin
}

let giveawayEnd = false
const start = Math.round(parseInt(getQueryVariable('start')) / 1000)
const length = parseInt(getQueryVariable('length'))
const finish = start + length
const endDate = new Date(finish * 1000).toLocaleTimeString(language.split('_')[0], {
    year: 'numeric', month: 'long', day: '2-digit', weekday: 'long'
})

endTimeElem.innerText = endDate
endTimeElem.dataset.date = finish

const progressInterval = setInterval(() => {
    const progress = Math.round((((Date.now() / 1000) - start) / length) * 100);

    if (progress >= 100) {
        progressBar.style.width = '100%'
        giveawayEnd = true
        openPopup()

        return clearInterval(progressInterval);
    }

    progressBar.style.width = progress + '%'
    progressBar.title = progress + '%'
    progressBar.parentElement.title = progress + '%'
}, 500)


const remainingInterval = setInterval(() => {
    const leftTime = secondsToString(finish - Date.now() / 1000)

    if (giveawayEnd) {
        remainingElem.month.innerText = 0
        remainingElem.week.innerText = 0
        remainingElem.day.innerText = 0
        remainingElem.hour.innerText = 0
        remainingElem.minute.innerText = 0
        remainingElem.second.innerText = 0

        return clearInterval(remainingInterval)
    }

    remainingElem.month.innerText = leftTime.month
    remainingElem.week.innerText = leftTime.week
    remainingElem.day.innerText = leftTime.day
    remainingElem.hour.innerText = leftTime.hour
    remainingElem.minute.innerText = leftTime.minute
    remainingElem.second.innerText = leftTime.second
}, 500)
