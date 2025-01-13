import { User } from "../models/User";
import { handleErrorResponse } from "../utils/axiosUtils";
import privateApi from "./axiosInstances/privateApi";
import { MessageResponse } from "../models/responses/MessageResponse";

export const AuthService = {
    login: (email: string, password: string) => {
        return new Promise((resolve, reject) => {
            privateApi.get('csrf-cookie')
                .then(() => {
                    privateApi.post('iniciar-sesion', {
                        email: email,
                        password: password
                    }).then(response => resolve(response.data))
                        .catch(error => reject(handleErrorResponse(error)));
                })
                .catch(error => reject(handleErrorResponse(error)));
        });
    },
    me: () => {
        return new Promise<User>((resolve, reject) => {
            privateApi.get('me')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    signOut: (): Promise<MessageResponse> => {
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.post('cerrar-sesion')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)));
        });
    }
}