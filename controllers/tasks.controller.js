var tasks = [{
    id: 1,
    description: 'User1 has assigned interview - Book Travel task to you.'
}, {
     id: 2,
    description: 'User2 has assigned mobility - Submit task to you.'
}, {
    id: 3,
    description: 'User3 has assigned mobility - Compile task to you.'
}, {
    id: 4,
    description: 'User4 has assigned interview - Book Asia to you.'
},{
    id: 5,
    description: 'User5 has assigned interview - Book USA task to you.'
},{
    id: 6,
    description: 'User5 has assigned interview - Book USA task to you.'
},
{
    id: 7,
    description: 'User6 has assigned interview - Book Europe task to you.'
},
{
    id: 8,
    description: 'User7 has assigned interview - research1 task to you.'
},
{
    id: 9,
    description: 'User8 has assigned interview - Book USA task to you.'
},
{
    id: 10,
    description: 'User9 has assigned interview - Book USA task to you.'
},
{
    id: 11,
    description: 'User10 has assigned interview - Book Australia task to you.'
},
{
    id: 12,
    description: 'User11 has assigned interview - Book A task to you.'
},
{
    id: 13,
    description: 'User12 has assigned interview - Book B task to you.'
},
{
    id: 14,
    description: 'User13 has assigned interview - Book XY task to you.'
}];

module.exports = function (socket) {
       var i=0;
 
    //send events to client every 2 seconds
       setInterval(function () {
              if(i < 14){
                                socket.emit('task.add', {
                                   task: tasks[i],
                                   time: new Date()
                                });
                                socket.emit('tasks.count', {
                                        count: i + 1,
                                    });
                                  i++;
                        }
        }, 2000);
};
