import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEnvelope, faChartBar, faPen, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';

const UserProfileSidebar = (props) => {
  const [block, setBlock] = useState({
    block: false,
    email: ''
  });

  useEffect(() => {
    setBlock(props);
  }, [props]); // Actualizar el estado local cuando cambie props.data.status
console.log('soy el estatus',props.data.status)
  // const toggleBlock = async () => {
  //   try {
  //     const response = await axios.put(`/user/status`, { email: props.data.email, block: !block });

  //     Swal.fire({
  //       position: "top-end",
  //       icon: "success",
  //       title: response.data,
  //       showConfirmButton: false,
  //       timer: 1500
  //     });

  //     setBlock(!block); // Cambiar el estado local
  //   } catch (error) {
  //     window.alert('Error al cambiar el estado del usuario');
  //     console.error(error);
  //   }
  // };
  const toggleBlock = async () => {
    try {
      const response = await axios.put(`/user/status`, { email: props.data.email, block: !block.block });
  
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.data,
        showConfirmButton: false,
        timer: 1500
      });
  
      setBlock(prevState => ({
        ...prevState,
        block: !prevState.block
      })); // Cambiar el estado local
    } catch (error) {
      window.alert('Error al cambiar el estado del usuario');
      console.error(error);
    }
  };
  
  return (
    <div key={props.data.email} className="col-span-12 sm:col-span-4 md:col-span-3">
      {/* Agregar una clave única al componente */}
      <div className="m-portlet m-portlet--mobile">
        <div className="m-portlet__head">
          <input type="hidden" className="user-id" id="userId" value="288423" />
          <div className="pf-box">
            <div className="flex">
              <div className="flex-none">
                <img src="https://playbox.juegaenlinea.com/img/profile.png" onError={(e) => { e.target.onerror = null; e.target.src = "https://playbox.juegaenlinea.com/img/profile.png" }} alt="Profile" className="mt-3 rounded-full w-24 h-24 object-cover" style={{ maxWidth: "100px" }} />
              </div>
              <div className="flex-grow px-4 py-2">
                <div className="pf-realname text-center text-lg font-semibold mt-4">
                  <strong>{props.data.name}</strong>
                </div>
                <div className="pf-username text-center text-primary">
                  <i className="fa fa-user">{props.data.name}</i>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <div className="flex justify-end">
              <button type="button" className={props.data.status === true ? "bg-green-500 text-white py-2 px-4 rounded-lg" : "bg-red-500 text-white py-2 px-4 rounded-lg"}>
                {props.data.status === true ? 'ACTIVO' : 'BLOQUEADO'}
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="profile-stat mr-4">
            <i className="fa fa-money"></i> VEF 1.494,42
          </div>
          <div className="profile-stat">
            <i className="fa fa-trophy"></i> PTS. 4263.00
          </div>
        </div>
        <hr />
        <div className="profile-check-data" data-scan="https://endpoint.jumio.dot2.ws/api/verification" data-id="288423">
          <div className="profile-check-top">
            <b>Estado de verificación de cuenta:</b> <span className="badge badge-pill badge-secondary">No verificada</span>
          </div>
        </div>
        <div className="m-portlet__body p-0">
          <ul className="list-group">
            {/* <li className="list-group-item flex justify-between items-center">
              {props.data.status === true ? <span>Bloquear</span> : <span>Desbloquear</span>}
              <div className="rounded-full bg-blue-500 p-2">
                <FontAwesomeIcon
                  icon={props.data.status ? faLock : faLockOpen}
                  className="text-white"
                  values={props.data.status ? `bloquear` : `desbloquear`}
                  onClick={toggleBlock}
                />
              </div>
            </li> */}
            
            <li className="list-group-item flex justify-between items-center">
              <span>Redactar mensaje</span>
              <div className="rounded-full bg-green-500 p-2">
                <FontAwesomeIcon icon={faPen} className="text-white" />
              </div>
            </li>
            <li className="list-group-item flex justify-between items-center">
              <span>Enviar correo</span>
              <div className="rounded-full bg-red-500 p-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-white" />
              </div>
            </li>
            <li className="list-group-item flex justify-between items-center">
              <span>Estadísticas</span>
              <div className="rounded-full bg-yellow-500 p-2">
                <FontAwesomeIcon icon={faChartBar} className="text-white" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
