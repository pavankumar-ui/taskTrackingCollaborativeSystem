class NotificationService {

    constructor(io){
        this.io=io;
this.notifications = [];
    }

notifyTaskAssignment(userId, taskData) {
    this.io.to(`user-${userId}`).emit('taskAssigned', {
        type: 'TASK_ASSIGNED',
        message: `New task assigned: ${taskData.title}`,
        task: taskData,
        createdAt: taskData.createdAt
    });

    console.log('Task assignment notification sent:', taskData);  

}

notifyTaskUpdate(userId, taskData) {
    this.io.to(`user-${userId}`).emit('taskUpdated', {
        type: 'TASK_UPDATED',
        message: `Task updated: ${taskData.title}`,
        task: taskData
    });
    console.log('Task update notification sent:', taskData);
  }

}

module.exports = NotificationService;