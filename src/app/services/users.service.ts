import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = "http://localhost:3000/users/";

  constructor() { }

  sendFormAndLogin = async ({ email, password }: { email: string, password: string }): Promise<Users> => {
    const userData = await fetch(`${this.url}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      },
    })
    return await userData.json() ?? {}
  }

  sendFormAndSignUp = async ({ email, password, userName }: { email: string, password: string, userName: string }): Promise<string> => {
    const response = await fetch(`${this.url}`,{
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, userName })
    })
    
    return response.text()
  }

  getUserData = async ({userId}: {userId: string}): Promise<Users | string> => {
    const userData = await fetch(`${this.url}/${userId}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      },
    })

    return userData.json() ?? {}
  }
}
