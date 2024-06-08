import { User } from "../../models/user";
import { HttpResponse, HttpRequest } from "../protocols";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) {
        return {
          statusCode: 400,
          body: "ID inexistente",
        };
      }

      if (!body || Object.keys(body).length === 0) {
        return {
          statusCode: 400,
          body: "Nada para atualizar",
        };
      }

      const allowedFieldsToUpdate: (keyof UpdateUserParams)[] = [
        "firstName",
        "lastName",
        "email",
        "password",
      ];
      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateUserParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return {
          statusCode: 400,
          body: "Esse campo não pode ser alterado",
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);
      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      console.error('Error updating user:', error); // Enhanced error logging
      return {
        statusCode: 500,
        body: "Algo deu errado",
      };
    }
  }
}
