import { Outlet } from "react-router-dom"
import NavBar from "../Components/navbar"

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    )
}
export default MainLayout