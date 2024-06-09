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
exports.CreateUserController = void 0;
class CreateUserController {
    constructor(createUserRepository) {
        this.createUserRepository = createUserRepository;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!httpRequest.body) {
                    return {
                        statusCode: 400,
                        body: "por favor, especifique o body",
                    };
                }
                const user = yield this.createUserRepository.createUser(httpRequest.body);
                return {
                    statusCode: 201,
                    body: user,
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    body: "algo deu errado",
                };
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
