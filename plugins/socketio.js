'use strict';

const user     = require('../controllers/user').notifier;
const Moment   = require('moment');

exports.register = function (server, options, next) {

    const io = require('socket.io')(server.select('websocket').listener);

    // turn off debug
    // io.set('log level', 1);

    io.on('connection', (socket) => {

        console.log(`Websocket running at: ${server.select('websocket').info.uri}`);

        console.log(`Socket ${socket.id} connected !`);

        socket.emit('message',{ message: 'Hello From Server :)' });

        // setInterval(() => {
        //     socket.emit('stream', { 'title': 'A new title via Socket.IO!' });
        // }, 1000);

        user.on('ListUser', (data) => {
            socket.emit('ListUser', {
                result: data,
                relativeTime: Moment(data.createdAt).startOf('hour').fromNow()
            });
        });


        // Tell all clients that someone connected
        // socket.emit('UserJoined', socket.id);


    });

    next();
};

exports.register.attributes = {
    name: 'socketio'
};
