import { useEffect, useState, ReactNode, useMemo, useCallback } from "react";
import { AuthService } from "../../services/AuthService";
import { UserContext } from "./UserContext";
import { Routes } from "../../routes/CONSTANTS";
import { User } from "../../models/User";
import { useLocation, useNavigate } from "react-router-dom";
import { RoleEnum } from "../../models/enums/RoleEnum";

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | undefined>();
    const [userRoles, setUserRoles] = useState<Set<RoleEnum>>(new Set<RoleEnum>());
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        AuthService.me().then((user) => {
            setUser(user);
            setUserRoles(new Set(user.roles?.map(role => role.name)));
            if (user && window.location.pathname === Routes.ADMIN.LOGIN) navigate(Routes.ADMIN.DASHBOARD);
        }).catch(() => {
            if (window.location.pathname !== Routes.ADMIN.LOGIN) navigate(Routes.ADMIN.LOGIN);
        });
    }, [location]);

    const signOut = useCallback(() => {
        AuthService.signOut().then(() => {
            setUser(undefined);
            setUserRoles(new Set());
            navigate(Routes.ADMIN.LOGIN)
        });
    }, [navigate]);

    const value = useMemo(
        () => ({
            user,
            userRoles: userRoles,
            signOut
        }),
        [user, userRoles, signOut]
    );

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};