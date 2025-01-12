const socket = io();
const input = document.querySelector("#note");
const btn = document.querySelector("#btn");

btn.addEventListener("click", ev => {
    socket.emit('msg', input.value);
    input.value = '';
});

socket.on('msg', (msg) => {
    alert(msg);
});