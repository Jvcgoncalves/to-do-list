import { Injectable } from '@angular/core';
import { UserTasks } from '../interfaces/user-tasks';

@Injectable({
  providedIn: 'root'
})
export class UserTasksService {
  url: string = "http://localhost:3000/tasks";

  constructor() { }

  getAllUserTasks = async ({userId}: {userId: string | null}): Promise<UserTasks[] | []> => {
    const response = await fetch(`${this.url}/${userId}`, {
      method: "GET",
      headers:{
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  }
}
