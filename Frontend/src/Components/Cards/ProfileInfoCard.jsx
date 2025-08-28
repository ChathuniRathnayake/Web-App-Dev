import React from 'react'
import {UserContext} from '../../Context/userContext';
import { useNavigate, useContext } from 'react-router-dom';

const ProfileInfoCard = () => {
    const {user, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = ()=> {
        localStorage.clear();
        clearUser();
        navigate('/')
    };
  return (
    <div className="">
        <img
            src={user.profileImageUrl}
            alt=""
            className=""/>

        <div>
            <div className="">{user.name || ""}</div>
            <button
                className=""
                onClick={handleLogout}>
                    Logout
                </button>
        </div>

            
    </div>
  )
}

export default ProfileInfoCard
