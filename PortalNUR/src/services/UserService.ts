import { RoleEnum } from "../models/enums/RoleEnum";
import { MessageResponse } from "../models/responses/MessageResponse";
import { User } from "../models/User";
import { handleErrorResponse } from "../utils/axiosUtils";
import privateApi from "./axiosInstances/privateApi";

export const UserService = {
    list: () => {
        return new Promise<User[]>((resolve, reject) => {
            privateApi.get('usuarios')
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    get: (id: number) => {
        return new Promise<User>((resolve, reject) => {
            privateApi.get(`usuarios/${id}`)
                .then(response => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    create: (user: User) => {
        return new Promise<User>((resolve, reject) => {
            privateApi.post('usuarios', user)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    update: (id: number, user: User) => {
        return new Promise<User>((resolve, reject) => {
            privateApi.put(`usuarios/${id}`, user)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    delete: (id: number) => {
        return new Promise<MessageResponse>((resolve, reject) => {
            privateApi.delete(`usuarios/${id}`)
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    },
    assignRoles: (id: number, roles: RoleEnum[]) => {
        return new Promise<User>((resolve, reject) => {
            privateApi.post(`usuarios/${id}/roles`, { roles })
                .then((response) => resolve(response.data))
                .catch(error => reject(handleErrorResponse(error)))
        });
    }
}