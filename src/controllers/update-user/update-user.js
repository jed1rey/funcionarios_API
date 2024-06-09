"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
class UpdateUserController {
    constructor(updateUserRepository) {
        this.updateUserRepository = updateUserRepository;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.params) === null || _a === void 0 ? void 0 : _a.id;
                const body = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
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
                const allowedFieldsToUpdate = [
                    "firstName",
                    "lastName",
                    "email",
                    "password",
                ];
                const someFieldIsNotAllowedToUpdate = Object.keys(body).some((key) => !allowedFieldsToUpdate.includes(key));
                if (someFieldIsNotAllowedToUpdate) {
                    return {
                        statusCode: 400,
                        body: "Esse campo não pode ser alterado",
                    };
                }
                const user = yield this.updateUserRepository.updateUser(id, body);
                return {
                    statusCode: 200,
                    body: user,
                };
            }
            catch (error) {
                console.error('Error updating user:', error); // Enhanced error logging
                return {
                    statusCode: 500,
                    body: "Algo deu errado",
                };
            }
        });
    }
}
exports.UpdateUserController = UpdateUserController;
