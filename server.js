var express = require('express'),
    app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    server, io;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/static', express.static(__dirname + '/public'));
server = http.Server(app);
server.listen(5000);

io = socketIO(server);

io.on('connection', function (socket) {
    var controllers = ['tasks', 'reminders','notifications'];
    for (var i = 0; i < controllers.length; i++) {
        require('./controllers/' + controllers[i] + '.controller')(socket);
    }
});
