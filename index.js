var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// Запуск сервера с отслеживанием 3000 порта
server.listen(3000);

// При заходе на главную страничку будет вызываться index.html
app.get('/', function(request, respons) {
	respons.sendFile(__dirname + "/index.html");
});

users = [];
connections = [];

io.sockets.on('connection', function(socket) {
	console.log("Успешное соединение");
	connections.push(socket);

	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Успешное отсоединение");

	});

	socket.on('send mess', function(data) {
		io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
	});
});