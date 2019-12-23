
export enum TaskStatus{
    TODO,
    DONE
}

export class Task{
    static ID: number = 1
    static generateID(): number{
        return Task.ID++
    }

    id: number
    content: string
    taskStatus: TaskStatus
    constructor(content: string, taskStatus: TaskStatus = TaskStatus.TODO){
        this.content = content
        this.taskStatus = taskStatus
        this.id = Task.generateID()
    }

    setDoneStatus(isDone: boolean): Task{
        this.taskStatus = isDone ? TaskStatus.DONE : TaskStatus.TODO
        return this
    }
    isDoneStatus(): boolean{
        return this.taskStatus === TaskStatus.DONE
    }
}
