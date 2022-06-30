import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private  users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createOne(username: string, password: string): Promise<boolean>{
    if(this.findOne(username) != undefined){
      this.users.push({userId: this.users.length + 1, username: username, password: password});
      console.log(this.users);
      return true
    }
    return false
  }
}