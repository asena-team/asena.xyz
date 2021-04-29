const interactiveRaffleContent0 = document.querySelectorAll('.interactive_raffle_message .message_content')[0]
const interactiveRaffleContent1 = document.querySelectorAll('.interactive_raffle_message .message_content')[1]
const interactiveRaffleEmbed = document.querySelector('.interactive_raffle_message .message_embed')
const interactiveRaffleReact = document.querySelector('.interactive_raffle_message .message_reactions')
const interactiveRaffleInterval = document.querySelector('.interactive_raffle_message #interval_time')

let time = 10
interactiveRaffleInterval.innerHTML = '<b>' + time + '</b>'

interactiveRaffleReact.onclick = function(){
    interactiveRaffleReact.classList.toggle('selected')

    if(interactiveRaffleReact.classList.contains('selected')){
        window.interval = setInterval(function(){
            time--
            if(time < 1){
                clearInterval(window.interval)
                interactiveRaffleInterval.innerHTML = '<b>' + 0 + '</b>'

                interactiveRaffleEmbed.classList.add('hidden')
                interactiveRaffleReact.classList.add('hidden')
                interactiveRaffleContent0.classList.add('hidden')
                interactiveRaffleContent1.classList.remove('hidden')

                return;
            }
            interactiveRaffleInterval.innerHTML = '<b>' + time + '</b>'
        }, 1000)
    }else{
        clearInterval(window.interval)
    }
}
