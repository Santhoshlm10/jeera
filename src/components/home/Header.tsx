import { Avatar } from "./../ui/avatar"
import AppLogo from "./../../assets/app_logo.svg"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { BiHome } from "react-icons/bi"
import { LuWorkflow } from "react-icons/lu";
import { FaUsers } from "react-icons/fa";
import { GoProject } from "react-icons/go";
import { HStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "../ui/menu";

export const Header = () => {
    const location = useLocation();
    const getStyles = useCallback((route: string) => {
        if (location.pathname === route) {
            return "font-semibold text-[color:--primary]";
        } else {
            return "";
        }
    }, [location]);

    const onLogoutClick = useCallback(async() => {
        await localStorage.clear();
        window.location.reload()
    },[])


    return (
        <div>
            <div className="flex justify-between w-full bg-[color:--secondary] p-4 items-center border-b-2 border-gray-300">
                <div className="flex flex-row gap-2 items-center">
                    <img src={AppLogo} alt="App Logo" className="h-10 w-10" />
                    <p className="text-xl font-bold text-gray-800 lg:text-2xl">
                        Jeera
                    </p>
                </div>
                <div className="flex gap-8 items-center">
                    <Link to="/" >
                        <HStack className={getStyles("/")}>
                            <BiHome /> Home
                        </HStack>
                    </Link>
                    <Link to="/projects">
                        <HStack className={getStyles("/projects")}>
                            <GoProject />Projects
                        </HStack>
                    </Link>
                    <Link to="/workflows">
                        <HStack className={getStyles("/workflows")}><LuWorkflow />Workflows
                        </HStack>
                    </Link>
                    <Link to="/users">
                        <HStack gap={1} className={getStyles("/users")}>
                            <FaUsers />Users
                        </HStack>
                    </Link>
                    <div>
                        <MenuRoot>
                            <MenuTrigger asChild>
                                <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
                            </MenuTrigger>
                            <MenuContent>
                                <MenuItem value="new-txt">My Profile</MenuItem>
                                <MenuItem value="new-file" onClick={onLogoutClick}>Logout</MenuItem>
                            </MenuContent>
                        </MenuRoot>
                    </div>
                </div>
            </div>
        </div>
    )
}