const remainingElem = {
    main: document.querySelector('.timer'),
    end: document.querySelector('.timer-end'),
    month: document.querySelector('.timer .timer-unit.month .number'),
    day: document.querySelector('.timer .timer-unit.day .number'),
    hour: document.querySelector('.timer .timer-unit.hour .number'),
    minute: document.querySelector('.timer .timer-unit.minute .number'),
    second: document.querySelector('.timer .timer-unit.second .number'),
}
const endTimeElem = document.querySelector('.giveaway-timer .end-time .time')
const progressBar = document.querySelector('.giveaway-timer .timer-progress-bar .bar')

let dt = new Date()
let month = dt.getMonth() + 1
let year = dt.getFullYear()
let daysInMonth = new Date(year, month, 0).getDate()

const TimeUnitSeconds = {
    year: 31536000,
    month: daysInMonth * 86400,
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

if (
    (!getQueryVariable('start') || !getQueryVariable('length')) ||
    (isNaN(parseInt(getQueryVariable('start'))) || isNaN(parseInt(getQueryVariable('length'))))
) {
    location.href = location.origin
}

const getUnit = (unit) => {
    return (languages[language] || languages[DEFAULT_LANGUAGE])[`date-time.units.${unit}`]
}

const secondsToString = (delta, locale = DEFAULT_LANGUAGE, chunk = 5) => {
    const result = {
        year: 0,
        month: 0,
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
            if (result.day !== 0) arr.push(`${result.day} ${getUnit('day')}`)
            if (result.hour !== 0) arr.push(`${result.hour} ${getUnit('hour')}`)
            if (result.minute !== 0) arr.push(`${result.minute} ${getUnit('minute')}`)
            if (result.second !== 0) arr.push(`${result.second} ${getUnit('second')}`)

            return arr.slice(0, chunk).join(' ')
        }
    })
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

const finishProcess = () => {
    remainingElem.end.style.display = 'block'
    remainingElem.end.style.opacity = '1'
    remainingElem.main.remove()
}

const progressInterval = setInterval(() => {
    const progress = (((Date.now() / 1000) - start) / length) * 100

    if (progress > 100) {
        progressBar.style.width = '100%'
        giveawayEnd = true
        finishProcess()
        return clearInterval(progressInterval);
    }

    progressBar.style.width = progress.toFixed(3) + '%'
    progressBar.title = progress.toFixed(3) + '%'
    progressBar.parentElement.title = progress.toFixed(3) + '%'
}, 500)


const remainingInterval = setInterval(() => {
    const leftTime = secondsToString(finish - Date.now() / 1000)

    if (giveawayEnd) {
        return clearInterval(remainingInterval)
    }

    const dt = new Date()
    const month = dt.getMonth() + 1
    const year = dt.getFullYear()
    const daysInMonth = new Date(year, month, 0).getDate()

    if (leftTime.second === 0) {
        leftTime.second = 60
        leftTime.minute = leftTime.minute - 1 < 0 ? 59 : leftTime.minute - 1
    }

    if (leftTime.second === 60 && leftTime.minute === 59) {
        leftTime.hour = leftTime.hour - 1 < 0 ? 23 : leftTime.hour - 1
    }

    if (leftTime.second === 60 && leftTime.minute === 59 && leftTime.hour === 23) {
        leftTime.day = leftTime.day - 1 < 0 ? daysInMonth - 1 : leftTime.day - 1
    }

    if (leftTime.second === 60 && leftTime.minute === 59 && leftTime.hour === 23 && leftTime.day === daysInMonth - 1) {
        leftTime.month = leftTime.month - 1 < 0 ? 11 : leftTime.month - 1
    }

    if (leftTime.month === 0) {
        remainingElem.month.parentElement.remove()

        if (leftTime.day === 0) {
            remainingElem.day.parentElement.remove()

            if (leftTime.hour === 0) {
                remainingElem.hour.parentElement.remove()

                if (leftTime.minute === 0 || leftTime.minute === 59) {
                    remainingElem.minute.parentElement.remove()

                    if (leftTime.second === 0 || leftTime.second === 60) {
                        giveawayEnd = true
                        finishProcess()
                        remainingElem.second.parentElement.remove()
                    }
                }
            }
        }
    }

    remainingElem.month.innerText = leftTime.month
    remainingElem.day.innerText = leftTime.day
    remainingElem.hour.innerText = leftTime.hour
    remainingElem.minute.innerText = leftTime.minute
    remainingElem.second.innerText = leftTime.second
}, 500)
