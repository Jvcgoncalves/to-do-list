import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = "http://localhost:3000/users/";

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

  sendFormAndSignUp({ email, password, userName }: { email: string, password: string, userName: string }){
    console.log({email,password,userName});
  }

  getUserData = async ({userId}: {userId: string}): Promise<Users> => {
    const userData = await fetch(`${this.url}/${userId}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      },
    })

    return userData.json() ?? {}
  }
}
