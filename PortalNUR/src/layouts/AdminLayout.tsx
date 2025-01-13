import { Outlet } from "react-router-dom";
import AdminNavbarComponent from "../components/common/AdminNavbarComponent";
import { UserProvider } from "../contexts/user/UserProvider";

const AdminLayout = () => {
    return (<UserProvider>
        <AdminNavbarComponent />
        <main className="max-w-screen-2xl 2xl:mx-auto w-full px-8 sm:px-12 md:px-16 lg:px-24">
            <Outlet />
        </main>
    </UserProvider>);
}

export default AdminLayout;