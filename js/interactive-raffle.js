var interactiveRaffleContent0 = document.querySelectorAll('.interactive_raffle_message .message_content')[0];
var interactiveRaffleContent1 = document.querySelectorAll('.interactive_raffle_message .message_content')[1];
var interactiveRaffleEmbed = document.querySelector('.interactive_raffle_message .message_embed');
var interactiveRaffleReact = document.querySelector('.interactive_raffle_message .message_reactions');
var interactiveRaffleInterval = document.querySelector('.interactive_raffle_message #interval_time');

var time = 10;
interactiveRaffleInterval.innerHTML = '<b>' + time + '</b>';

interactiveRaffleReact.onclick = function () {
    interactiveRaffleReact.classList.toggle('selected');

    if (interactiveRaffleReact.classList.contains('selected')) {
        window.interval = setInterval(function () {
            time--;
            if (time < 1) {
                clearInterval(window.interval);
                interactiveRaffleInterval.innerHTML = '<b>' + 0 + '</b>';

                interactiveRaffleEmbed.classList.add('hidden');
                interactiveRaffleReact.classList.add('hidden');
                interactiveRaffleContent0.classList.add('hidden');
                interactiveRaffleContent1.classList.remove('hidden');

                return;
            }
            interactiveRaffleInterval.innerHTML = '<b>' + time + '</b>';
        }, 1000);
    } else {
        clearInterval(window.interval);
    }
}