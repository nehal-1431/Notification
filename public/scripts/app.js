var app = angular.module('app',['ngAria']);
 
//create factory to wrap socketIO events
app.factory('socket', function($rootScope) {
   
    var socket = io.connect();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});


var notificationCtrl = function ($scope, socket) {  
        
            var self = this;
        
            self.$onInit = function() {
            self.taskCount = 0;
            self.tasks= [];
            self.taskIndex = 0;
            self.taskTime = [];
            self.timeDisp = "Just Now";
            self.reminderCount = 0;
            self.notificationCount = 0;
            };
       
                self.getDate = function()
                {
                   var options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
                   var currDate  = new Date();
                   return currDate.toLocaleDateString("en-US",options);
                }

                socket.on('tasks.count', function (message) {
                    self.taskCount = message.count > 9 ? message.count : '0'+message.count;        
                });

                socket.on('reminders.count', function (message) {
                    self.reminderCount = message.count > 9 ? message.count : '0'+message.count;
                });


                socket.on('notifications.count', function (message) {
                    self.notificationCount = message.count > 9 ? message.count : '0'+message.count;
                });

                //add tasks
                socket.on('task.add', function (data) {

                   for(var i=0;i<=self.taskIndex;i++)
                   {
                           if(i == self.taskIndex)
                           {
                               self.timeDisp = "Just Now";
                               self.tasks[i] = { 'task': data.task.description,
                                                 'time': self.timeDisp
                                               };
                                self.taskTime[i] = data.time;
                           }
                           else{
                            var today = new Date();
                            var endDate = new Date(self.taskTime[i]);

                            var ml = today - endDate;
                            var mn = Math.abs(ml/1000/60);

                            if(mn < 1){
                                var formatSeconds = Math.ceil(mn*60) === 1 ? " second ago" : " seconds ago";
                               self.timeDisp = Math.ceil(mn*60) + formatSeconds;  
                            }
                            else if(mn > 60)
                                {
                                    var formatHours = (mn/60) === 1 ? " hour ago" : " hours ago";
                                    self.timeDisp = (mn/60) + formatHours;  
                                }
                            else{
                                var formatMinutes = Math.round(mn) === 1 ? " minute ago" : " minutes ago";
                                self.timeDisp = Math.round(mn) + formatMinutes; 
                            }
                               self.tasks[i].time = self.timeDisp;
                            }            
                       }
                   
                    self.taskIndex++;
                    self.taskTimeIndex++;    
               });

                // Add reminders
                socket.on('reminder.add', function (data) {

                   for(var i=0;i<=self.taskIndex;i++)
                   {
                           if(i == self.taskIndex)
                           {
                               self.timeDisp = "Just Now";
                                self.tasks[i] = { 'task': data.remind.description,
                                                 'time': self.timeDisp
                                                };
                               self.taskTime[i] = data.time;
                           }
                           else{
                            var today = new Date();
                            var endDate = new Date(self.taskTime[i]);

                            var ml = today - endDate;
                            var mn = Math.abs(ml/1000/60);

                            if(mn < 1){
                                var formatSeconds = Math.ceil(mn*60) === 1 ? " second ago" : " seconds ago";
                                self.timeDisp = Math.ceil(mn*60) + formatSeconds;  
                            }
                            else if(mn > 60)
                                {
                                    var formatHours = (mn/60) === 1 ? " hour ago" : " hours ago";
                                    self.timeDisp = (mn/60) + formatHours;  
                                }
                            else{
                                var formatMinutes = Math.round(mn) === 1 ? " minute ago" : " minutes ago";
                                self.timeDisp = Math.round(mn) + formatMinutes; 

                            }
                                 self.tasks[i].time = self.timeDisp;
                            }            
                    }
                      self.taskIndex++;

                });

                    socket.on('notification.add', function (data) {
                    for(var i=0;i<=self.taskIndex;i++)
                   {
                           if(i == self.taskIndex)
                           {
                               self.timeDisp = "Just Now";
                               self.tasks[i] = { 'task': data.notify.description,
                                                 'time': self.timeDisp
                                                };
                               self.taskTime[i] = data.time;
                           }
                           else{
                            var today = new Date();
                            var endDate = new Date(self.taskTime[i]);

                            var ml = today - endDate;
                            var mn = Math.abs(ml/1000/60);

                            if(mn < 1){
                                var formatSeconds = Math.ceil(mn*60) === 1 ? " second ago" : " seconds ago";
                                self.timeDisp = Math.ceil(mn*60) + formatSeconds;  
                            }
                            else if(mn > 60)
                                {
                                    var formatHours = Math.round(mn/60) === 1 ? " hour ago" : " hours ago";
                                    self.timeDisp = Math.round(mn/60) + formatHours;  
                                }
                            else{
                                var formatMinutes = Math.round(mn) === 1 ? " minute ago" : " minutes ago";
                                self.timeDisp = Math.round(mn) + formatMinutes; 

                            }
                                self.tasks[i].time = self.timeDisp;
                            }            
                       }
                      self.taskIndex++;
                      self.taskTimeIndex++;
                });
        
            
    }

notificationCtrl.$inject = ['$scope', 'socket'];

app.component('notificationComponent', {
      bindings: {
      },
      controllerAs:"model",
      templateUrl : '/static/pages/notificationTemplate.html',
      controller: notificationCtrl,
  });