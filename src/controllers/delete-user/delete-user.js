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
exports.DeleteUserController = void 0;
class DeleteUserController {
    constructor(deleteUserRepository) {
        this.deleteUserRepository = deleteUserRepository;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.params) === null || _a === void 0 ? void 0 : _a.id;
                if (!id) {
                    return {
                        statusCode: 400,
                        body: "Faltando ID",
                    };
                }
                const user = yield this.deleteUserRepository.deleteUser(id);
                return {
                    statusCode: 200,
                    body: user,
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    body: "Algo deu errado",
                };
            }
        });
    }
}
exports.DeleteUserController = DeleteUserController;
