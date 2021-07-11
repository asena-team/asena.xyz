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

const dt = new Date()
const month = dt.getMonth() + 1
const year = dt.getFullYear()
const daysInMonth = new Date(year, month, 0).getDate()

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

    for(let i = 0; i < vars.length; i++){
        const pair = vars[i].split('=')
        if(decodeURIComponent(pair[0]) === variable){
            return decodeURIComponent(pair[1])
        }
    }

    return false
}

const startMS = parseInt(getQueryVariable('start'))
const startUnixTimestamp = Math.round(startMS / 1000)
const length = Math.round(parseInt(getQueryVariable('length')))
const finish = startUnixTimestamp + length
if(isNaN(finish) || startMS >= +new Date()){
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

            if(result.year !== 0) arr.push(`${result.year} ${getUnit('year')}`)
            if(result.month !== 0) arr.push(`${result.month} ${getUnit('month')}`)
            if(result.day !== 0) arr.push(`${result.day} ${getUnit('day')}`)
            if(result.hour !== 0) arr.push(`${result.hour} ${getUnit('hour')}`)
            if(result.minute !== 0) arr.push(`${result.minute} ${getUnit('minute')}`)
            if(result.second !== 0) arr.push(`${result.second} ${getUnit('second')}`)

            return arr.slice(0, chunk).join(' ')
        }
    })
}

endTimeElem.innerText = new Date(finish * 1000).toLocaleTimeString(language.split('_')[0], {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    weekday: 'long'
})
endTimeElem.dataset.date = finish

const finishProcess = () => {
    remainingElem.end.style.display = 'block'
    remainingElem.end.style.opacity = '1'
    remainingElem.main.remove()
}

let giveawayEnd = false
const progressInterval = setInterval(() => {
    const progress = (((Date.now() / 1000) + 1 - startUnixTimestamp) / length) * 100

    if(progress > 100 || giveawayEnd){
        progressBar.style.width = '100%'
        progressBar.title = '100%'
        progressBar.parentElement.title = '100%'
        giveawayEnd = true
        finishProcess()
        return clearInterval(progressInterval);
    }

    progressBar.style.width = progress + '%'
    progressBar.title = progress.toFixed(3) + '%'
    progressBar.parentElement.title = progress.toFixed(3) + '%'
}, 500)

const remainingInterval = setInterval(() => {
    if(giveawayEnd){
        return clearInterval(remainingInterval)
    }

    const dt = new Date()
    const month = dt.getMonth() + 1
    const year = dt.getFullYear()
    const daysInMonth = new Date(year, month, 0).getDate()

    const leftTime = secondsToString(finish - Date.now() / 1000)
    const leftSeconds = leftTime.second + (leftTime.minute * 60) + (leftTime.hour * 60 * 60) + (
        leftTime.day * 24 * 60 * 60) + (leftTime.month * daysInMonth * 24 * 60 * 60)

    if(leftTime.second === 0){
        leftTime.second = 60
        leftTime.minute = leftTime.minute - 1 < 0 ? 59 : leftTime.minute - 1
    }

    if(leftTime.second === 60 && leftTime.minute === 59){
        leftTime.hour = leftTime.hour - 1 < 0 ? 23 : leftTime.hour - 1
    }

    if(leftTime.second === 60 && leftTime.minute === 59 && leftTime.hour === 23){
        leftTime.day = leftTime.day - 1 < 0 ? daysInMonth - 1 : leftTime.day - 1
    }

    if(leftTime.second === 60 && leftTime.minute === 59 && leftTime.hour === 23 && leftTime.day === daysInMonth - 1){
        leftTime.month = leftTime.month - 1 < 0 ? 11 : leftTime.month - 1
    }

    if(leftSeconds <= daysInMonth * 86400){
        remainingElem.month.parentElement.remove()
        if(leftSeconds <= 86400){
            remainingElem.day.parentElement.remove()
            if(leftSeconds <= 3600){
                remainingElem.hour.parentElement.remove()
                if(leftSeconds <= 60){
                    remainingElem.minute.parentElement.remove()
                    if(leftSeconds <= 0){
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
