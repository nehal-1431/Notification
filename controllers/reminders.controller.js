var reminders = [{
    id: 1,
    description: 'You have meeting in next 15 minutes.'
}, {
     id: 2,
    description: 'You have guest arriving in next one hour'
},{
     id: 3,
    description: 'You have dr. appointment today'
},{
     id: 4,
    description: 'You have pick up kids from show in next 30 minutes.'
},
{
     id: 5,
    description: 'You have meeting at your kids school in 20 minutes'
},
{
     id: 6,
    description: 'You have Dr appointment in one hour'
},
{
     id: 7,
    description: 'You have meeting at A Plaza'
},
{
     id: 8,
    description: 'You have meeting at B Plaza'
},
{
     id: 9,
    description: 'You have meeting at E Plaza'
},
{
     id: 10,
    description: 'You have meeting at your kids school in 1 hour'
}                 
];

module.exports = function (socket) {
    var i =0;
   
    setInterval(function () {
         if(i < 5){
            socket.emit('reminder.add', {
                        remind: reminders[i],
                        time: new Date()
            });
            socket.emit('reminders.count', {
                    count: i + 1
            });
            socket.emit('reminder.time', {
                    time: new Date()
            });
           i++;
        }
      }, 14000);

  };
