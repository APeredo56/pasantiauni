import { createContext } from "react";
import { User } from "../../models/User";
import { RoleEnum } from "../../models/enums/RoleEnum";

interface UserContextProps {
    user: User | undefined,
    userRoles: Set<RoleEnum>,
    signOut: () => void,
}

export const UserContext = createContext<UserContextProps>(
    {
        user: undefined,
        userRoles: new Set<RoleEnum>(),
        signOut: () => { throw new Error("No se implemento el metodo de cerrar sesión") }
    });