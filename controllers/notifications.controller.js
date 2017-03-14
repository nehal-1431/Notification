var notifications = [{
    id: 1,
    description: 'The posting of pipeline 1 has been approved'
}, {
    id: 2,
    description: 'You have been added as a member of pipeline - 2A'
}, {
    id: 3,
    description: 'User4 has completed questionnaire against pipleline 1'
}, {
    id: 4,
    description: 'You have been added as a member of pipeline - 4A'
}, 
{
    id: 5,
    description: 'You have been added as a member of assignment B'
},
{
    id: 6,
    description: 'You have been added as a member of assignment X'
},
{
    id: 7,
    description: 'You have completed xy trainning'
},
{
    id: 8,
    description: 'You have been added as a member of assignment AA'
},
{
    id: 9,
    description: 'You have been added as a member of assignment BB'
},
{
    id: 10,
    description: 'You have been added as a member of assignment UU'
}                     
];

module.exports = function (socket) {
    var i=0;
    
    setInterval(function () {
        if(i < 5){
           socket.emit('notification.add',{ 
                      notify: notifications[i],
                      time: new Date()
           });
            socket.emit('notifications.count', {
                count: i + 1
            });
           
           i++;
        }
    }, 6000);
};
