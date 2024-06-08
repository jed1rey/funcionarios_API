import { IGetUsersRepository } from "../controllers/get-users/protocols";
import { User } from "../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Paula",
        lastName: "Abib",
        email: "paula.abib111@gmail.com",
        password: "123",
      },
    ];
  }
}
