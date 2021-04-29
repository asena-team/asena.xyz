const aButtons = document.querySelectorAll('a.button')

aButtons.forEach(function(button){
    button.ondragstart = function(){
        return false
    }
})
