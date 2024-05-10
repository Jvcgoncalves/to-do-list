import { Injectable } from '@angular/core';
import { UserTasks } from '../interfaces/user-tasks';

@Injectable({
  providedIn: 'root'
})
export class UserTasksService {
  // https://to-do-list-backend-livid.vercel.app/tasks
  url: string = "http://localhost:3000/tasks";

  constructor() { }

  getAllUserTasks = async ({userId}: {userId: string | null}): Promise<UserTasks[] | [] | string> => {
    if(userId === "") return "invalid id"
    const response = await fetch(`${this.url}/${userId}`, {
      method: "GET",
      headers:{
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  }
  // name, description, delivery_date, register_date
  postNewUserTasks = async ({name, description, delivery_date, userId}: {name: string, description: string, delivery_date: string, userId: string}): Promise<string> =>{
    
    if(userId === "") return "invalid id"
    const response = await fetch(`${this.url}/${userId}`, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( { data: {name, description, delivery_date } } )
    })

    return response.json()
  }

  getSingleTask = async ({userId,taskId}: {userId: string, taskId: string}): Promise<UserTasks | string> => {
    if(userId === "" || taskId === "") return "invalid id"

    const response = await fetch(`${this.url}/${userId}/${taskId}`,{
      method: "GET",
      headers:{
        'Content-Type': 'application/json'
      }
    })
    
    return response.json()
  }

  deleteTask = async ({userId,taskId}: {userId: string, taskId: string}): Promise<UserTasks | string> =>{
    if(userId === "" || taskId === "") return "invalid id"

    const response = await fetch(`${this.url}/${userId }/${taskId}`,{
      method: "DELETE",
      headers:{
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  }
  ///:userId/:taskId
  editTask = async ({userId,taskId, newTaskData}: {userId: string, taskId: string, newTaskData: any}): Promise<UserTasks | string> =>{
    if(userId === "" || taskId === "") return "invalid id"

    const response = await fetch(`${this.url}/${userId }/${taskId}`,{
      method: "PUT",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: newTaskData})
    })

    return response.json();
  }
}
