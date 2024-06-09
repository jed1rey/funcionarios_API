import { ObjectId } from "mongodb";
import { IDeleteUserRepository } from "../../controllers/delete-user/protocols";
import { User } from "../../models/user";
import { MongoClient } from "../../database/mongo";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(id) }); // Use the id parameter here

    if (!user) {
      throw new Error("Funcionário não encontrado");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Usuário não deletado");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
