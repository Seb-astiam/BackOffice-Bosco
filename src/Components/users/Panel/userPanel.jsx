import React from "react";
import UserProfileSidebar from "../UserPanelComponents/userProfleSidebar";
import UserProfile from "../UserPanelComponents/userProfile";
import { useParams } from "react-router-dom";
import axios from 'axios';

import { useState, useEffect } from 'react';
import UserHousing from "../UserPanelComponents/userHousing";
import Userpets from "../UserPanelComponents/userpets";
import UserReservation from "../UserPanelComponents/userReservation";
import UserBilletera from "../UserPanelComponents/userBilletera";
import UserModifications from "../UserPanelComponents/userModifications";

const UserPanel = () => {
  const [data, setData] = useState('');
  const [profile, setProfile] = useState('');
  const [housing, setHoising] = useState('');
  const [pet, setPet] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post(`/userinfo/${id}`);
        setData(data);
        setProfile(data.Profile);
        setHoising(data.Housings);
        setPet(data.UserMascota);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);
console.log('soy ',data);
console.log('hosuing',housing)
console.log('PEts',pet)
  return (
    <div className="w-full h-[100vh] flex flex-row flex-wrap mt-8 mr-4">
      <div className="w-full flex justify-around">
       
        <div className="overflow-hidden rounded px-8 pt-6 pb-8 mb-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <UserProfileSidebar data={data} />
          </div>
        </div>
        
        <div className="w-16"></div>
    
        <div className="overflow-hidden rounded px-8 pt-6 pb-8 mb-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <UserProfile profile={profile} iduser={data.id}  email={data.email}/>
          </div> 
        </div>
      </div>
      
      <div className="overflow-hidden rounded px-8 pt-6 pb-8 mb-4 w-full">
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full">
    <UserHousing housing={housing}/>
  </div>
        </div>


        <div className="overflow-hidden rounded px-8 pt-6 pb-8 mb-4 w-full">
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full">
    <Userpets pet={pet}/>
  </div>
        </div>

        <div className="overflow-hidden rounded px-8 pt-6 pb-8 mb-4 w-full">
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full">
    <UserReservation/>
  </div>
        </div>
  


        <div className="overflow-hidden rounded px-8 pt-6 pb-8 mb-4 w-full">
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full">
    <UserBilletera/>
  </div>
        </div>


        <div className="overflow-hidden rounded px-8 pt-6 pb-8 mb-4 w-full">
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full">
    <UserModifications/>
  </div>
        </div>
    </div>
  );
};


export default UserPanel;
