import { Tooltip } from "@mui/material"
import { useSelector } from "react-redux"
import { Business as BusinessIcon, RocketLaunch as RocketLaunchIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
import Repos from "./Repos.tsx";
import { RootState } from "../features/slice.ts";

const Overview = ()=>{
    const { userData, repos } = useSelector((state: RootState) => state.slice)

    return( 
        <div className="px-4 flex flex-row justify-center items-start">
            <div className="bg-gray-0 px-4 py-3 rounded-md  m-2 flex flex-col justify-center ">
                <Tooltip title={`${userData.name}'s Profile Picture`} arrow  placement="left-end">
                    <img src={userData.avatar_url} alt={`${userData.login}'s profile picture`} className="rounded-md h-48 w-48" />
                </Tooltip>
                <Tooltip title="UserName" arrow  placement="left-end">
                    <strong className="w-auto text-2xl">{userData.login}</strong>
                </Tooltip>
                <Tooltip title="Name" arrow  placement="left-end">
                    <div className="w-auto font-light">{userData.name}</div>
                </Tooltip>
                {
                    userData.company&&
                    <Tooltip title="Company" arrow  placement="left-end">
                        <div className="w-auto flex flex-row items-center justify-start">
                            <BusinessIcon className="text-gray-600 text-2xl"/>
                            {userData.company}
                        </div>
                    </Tooltip>
                }
                {
                    userData.blog&&
                    <Tooltip title="Porfolio" arrow  placement="left-end">
                        <a href={userData.blog} target="_blank" className="w-auto flex flex-row items-center justify-start">
                            <RocketLaunchIcon className="text-gray-600"/>
                            {userData.blog}
                        </a>
                    </Tooltip>
                }
                {
                    userData.location&&
                    <Tooltip title="Location" arrow  placement="left-end">
                        <div className="w-auto flex flex-row items-center justify-start">
                            <LocationOnIcon className="text-gray-600"/>
                            {userData.location}
                        </div>
                    </Tooltip>
                }
            </div>
            <div className="flex flex-col m-2 w-3/5">

                <div className=" row-span-2 bg-gray-200 px-4 py-3 rounded-md m-2 flex flex-row justify-evenly items-center">
                    <div className="flex flex-col justify-center items-center">
                        <div className="text-md font-bold">Repositories</div>
                        <a href={`https://github.com/${userData.login}?tab=repositories`} target="_blank" className="text-gray-600">{repos.length}</a>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="text-md font-bold">Followers</div>
                        <a href={`https://github.com/${userData.login}?tab=followers`} target="_blank" className="text-gray-600">{userData.followers}</a>
                    </div>
                    <div className="flex flex-col justify-center items-center">

                        <div className="text-md font-bold">Following</div>
                        <a href={`https://github.com/${userData.login}?tab=following`} target="_blank" className="text-gray-600">{userData.following}</a>
                    </div>
                </div>
                <div className="bg-gray-0 px-4 py-3 rounded-md m-2">
                    <Repos/>
                </div>
            </div>
        </div>  
    )
}

export default Overview