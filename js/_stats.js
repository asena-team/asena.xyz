var stats = {
    serverCount: "7K",
    userCount: "15K",
    commandCount: "15+",
};

var serverCount = document.querySelector('.stat_heading#server_count');
var userCount = document.querySelector('.stat_heading#user_count');
var commandCount = document.querySelector('.stat_heading#command_count');

serverCount.innerText = stats.serverCount;
userCount.innerText = stats.userCount;
commandCount.innerText = stats.commandCount;