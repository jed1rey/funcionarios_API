import { User } from "../../models/user";
import { HttpResponse, HttpRequest} from "../protocols";


export interface UpdateUserParams{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export interface IUpdateUserController{
    handle(httpRequest: HttpResponse<any>): Promise<HttpResponse<User>>
}

export interface IUpdateUserRepository{
    updateUser(id: string, params: UpdateUserParams): Promise<User>
}