var socket = io();

function itemPress() {
    socket.emit('square press', {map: 4});
}

socket.on('update', function(msg) {
    document.getElementById('title').innerHTML = msg.mytext;
});