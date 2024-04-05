import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import Modals from "./modal";
import axios from "axios";
import Swal from "sweetalert2";
import { useAlojamiento } from "../../hooks/useAlojamiento";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllAlojamientos } from "../../redux/boscoSlice";
import { useLocationProvincias } from "../../hooks/useLocationProvincias";

// import { useServices } from "../../hooks/useServices";

const Housings = () => {
  const dispatch = useDispatch();
  useAlojamiento();
  useLocationProvincias();

  const statehousings = useSelector((state) => state.storage.allAlojamientos);
  const provincias = useSelector((state) => state.storage.AllLocation);
  const services = useSelector((state) => state.storage.AllService);

  useEffect(() => {
    setHousingData(statehousings);
  }, [statehousings]);

  const [housingData, setHousingData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHousing, setSelectedHousing] = useState(null);
  

  const reloadHousingsData = async () => {
    try {
      const response = await axios.get("/profileHousing/filtered");

      dispatch(getAllAlojamientos(response.data));
    } catch (error) {
      console.error("Error al recargar los alojamientos:", error);
    }
  };

  const handleEdit = (id) => {

    setSelectedHousing(id);

    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then( async (result) => {
      if (result.isConfirmed) {
        try {
         await  axios.delete(`/profileHousing/${id}`);
        
          reloadHousingsData();
        } catch (error) {}

        Swal.fire({
          icon: "success",
          title: "¡Registro Exitoso!",
          text: "Los datos del alojamiento han sido Eliminados correctamente.",
        });
      }
    });
  };

 

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
  };
  
  const handleSearch = async () => {
    let query = "?";
  
    for (const [key, value] of Object.entries(searchQuery)) {
      if (value) query += `${key}=${value}&`;
    }
  
    try {
      const { data } = await axios.get(`/profileHousing/filtered${query}`);
      dispatch(getAllAlojamientos(data));
    } catch (error) {
      console.log(error);
    }
  };
  
  

  

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="overflow-x-auto">
      <div className="m-content">
        <div className="m-subheader">
          <div className="m-portlet__head-title">
            <h3 className="m-portlet__head-text">Alojamientos</h3>
            <div className="mb-20 flex flex-row items-center justify-between space-x-3">
  <select
    onChange={handleChange}
    name="location"
    className="py-1 my-2 font-custom font-semibold w-4/5 rounded-lg border-solid border-2"
    value={searchQuery.location || ""}
  >
    <option value="">Escoge una Ubicacion</option>
    {provincias.map((provincia) => {
      return (
        <option value={provincia.nombre} key={provincia.id}>
          {provincia.nombre}
        </option>
      );
    })}
  </select>
  <label htmlFor="price" >Precio</label>
  <input
    type="text"
    placeholder="Buscar por Precio"
    name="price"
    value={searchQuery.price || ""}
    onChange={handleChange}
    className="rounded-lg border px-4 py-2"
  />
  <select
  onChange={handleChange}
  name="accommodationType"
  value={searchQuery.accommodationType || ""}
  className="py-1 my-2 font-custom font-semibold w-4/5 rounded-lg border-solid border-2"
>
  <option value="">Selecciona un tipo de alojamiento</option>
  <option value="Cabaña">Cabaña</option>
  <option value="Hotel">Hotel</option>
  <option value="Casa Rural">Casa Rural</option>
</select>
   <label htmlFor="square" >Plazas</label>
  <input
    placeholder="Buscar por plazas"
    type="number"
    id="square"
    name="square"
    min="1"
    max="20"
    value={searchQuery.square || ""}
    onChange={handleChange}
    defaultValue={1}
    className="rounded-lg border px-4 py-2"
  />
  <select
    onChange={handleChange}
    name="serviceId"
    className="py-1 my-2 font-custom font-semibold w-4/5 rounded-lg border-solid border-2"
    value={searchQuery.serviceId || ""}
  >
    <option value="">Servicios</option>
    {services.map((service) => {
      return (
        <option value={service.id} key={service.id}>
          {service.type}
        </option>
      );
    })}
  </select>

  <button
    className="btn btn-primary px-4 py-2 rounded-lg"
    onClick={handleSearch}
  >
    <FontAwesomeIcon icon={faSearch} style={{ fontSize: "2em" }} />
  </button>
</div>

          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="m-portlet m-portlet--mobile">
              <div className="m-portlet__head">
                <div className="m-portlet__head-caption"></div>
              </div>
              <div className="m-portlet__body">
                <div className="table-responsive">
                  <table className="table-auto">
                    <thead>
                      <tr>
                        <th className="px-2 py-2 text-sm">OP</th>
                        <th className="px-2 py-2 text-sm">Usuario</th>
                        <th className="px-2 py-2 text-sm">Título</th>
                        <th className="px-2 py-2 text-sm">
                          Fechas Disponibles
                        </th>
                        <th className="px-2 py-2 text-sm">
                          Fechas de Finalización
                        </th>
                        <th className="px-2 py-2 text-sm">Tipo</th>
                        <th className="px-2 py-2 text-sm">Precio</th>
                        <th className="px-2 py-2 text-sm">Provincia</th>
                        <th className="px-2 py-2 text-sm">Localidad</th>

                        <th className="px-2 py-2 text-sm">Plazas</th>
                        <th className="px-2 py-2 text-sm">Disponibilidad</th>
                        <th className="px-2 py-2 text-sm">
                          Tipo de Alojamiento
                        </th>
                        <th className="px-2 py-2 text-sm">Fecha de Creación</th>
                        <th className="px-2 py-2 text-sm">
                          Fecha de Actualización
                        </th>
                        <th className="px-2 py-2 text-sm">Imágenes</th>
                        <th className="px-2 py-2 text-sm">Servicios</th>
                      </tr>
                    </thead>
                    <tbody>
                      {housingData &&
                        housingData.map((housing) => (
                          <tr key={housing.id}>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-0.5">
                              <div className="flex">
                                <button onClick={() => handleEdit(housing.id)}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                  onClick={() => handleDelete(housing.id)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housing.User.email}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housing.title}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housing.datesAvailable}
                            </td>
                            <td className="border px-2 py-0.3 text-sm w-20 mt-1">
                              {housing.datesEnd}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housing.type}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housing.price}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housing.provinces}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housing.cities}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housing.square}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housing.availability
                                ? "Disponible"
                                : "No disponible"}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housing.accommodationType}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housing.createdAt}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              {housing.updatedAt}
                            </td>
                            <td className="border px-1 py-0.3 text-sm w-20 mt-1">
                              <div className="flex">
                                {housing.images &&
                                  housing.images.map((image, index) => (
                                    <img
                                      key={index}
                                      src={image}
                                      alt={`Image ${index}`}
                                      className="max-h-8 max-w-8 mr-2 mb-2"
                                    />
                                  ))}
                              </div>
                            </td>
                            <td className="border px-0.5 py-0.5 text-sm w-20 mt-1">
                              <div className="flex flex-row">
                                {housing.Services &&
                                  housing.Services.map((service, index) => (
                                    <span
                                      key={index}
                                      className="bg-gray-200 text-xs px-0.5 py-0.5 rounded mr-1 mb-1"
                                    >
                                      {service.type}
                                    </span>
                                  ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => openModal("create")}
        >
          Crear Alojamiento
        </button>

        <div>
          {/* Contenido del modal si lo hubiera */}

          <Modals
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            reloadHousingsData={reloadHousingsData}
            actionType={selectedHousing ? "edit" : "create"}
            selectedHousing={selectedHousing}
          />
        </div>
      </div>
    </div>
  );
};

export default Housings;
