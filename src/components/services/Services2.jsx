import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2";

const Services2 = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newServiceName, setNewServiceName] = useState({ type: "" });
  const [actionType, setActionType] = useState("create");
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(10);

  useEffect(() => {
    fetchServices();
  }, [currentPage]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        `/service/allServices?page=${currentPage}&limit=${servicesPerPage}`
      );
      setServices(response.data);
    } catch (error) {
      console.error("Algo falló en la petición a mi Backend", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewServiceName({
      ...newServiceName,
      [name]: value,
    });
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });
  
      if (result.isConfirmed) {
        const response = await axios.delete(`/role/role/${id}`);
        if (response.status === 200) {
          setServices((prevServices) =>
            prevServices.filter((service) => service.id !== id)
          );
          Swal.fire({
            icon: "success",
            title: "¡Rol Eliminado!",
            text: "El Rol Se ha eliminado.",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (actionType === "create") {
        response = await axios.post(
          `/service/newService`,
          newServiceName
        );
        Swal.fire({
          icon: "success",
          title: "¡Registro Exitoso!",
          text: "El servicio ha sido registrado correctamente.",
        });
      } else if (actionType === "update") {
        response = await axios.put(
          `/service/${selectedService.id}`,
          newServiceName
        );
        Swal.fire({
          icon: "success",
          title: "¡Registro Exitoso!",
          text: "El servicio ha sido Actualizado correctamente.",
        });
      }
      fetchServices();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      closeModal();
    }
  };

  const handleActivate = (id) => {
    console.log(`Activando servicio con ID ${id}`);
  };

  const openModal = (type, service = null) => {
    setActionType(type);
    if (type === "update" && service) {
      setSelectedService(service);
      setNewServiceName({ type: service.type });
    } else {
      setSelectedService(null);
      setNewServiceName({ type: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nombre del Servicio</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentServices.sort((a, b) =>   b.id-a.id).map((service) => (
            <tr key={service.id}>
              <td className="border px-2 py-1">{service.id}</td>
              <td className="border px-2 py-1">{service.type}</td>
              <td className="border px-2 py-1">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
                  onClick={() => handleDelete(service.id)}
                >
                  Eliminar
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                  onClick={() => handleActivate(service.id)}
                >
                  Suspender
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                  onClick={() => openModal("update", service)}
                >
                  Actualizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => openModal("create")}
      >
        Crear servicio
      </button>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-l"
        >
          Anterior
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentServices.length < servicesPerPage}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-r"
        >
          Siguiente
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            padding: "0",
            maxWidth: "400px",
            maxHeight: "80vh",
            overflow: "auto",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "1000",
          },
        }}
        contentLabel={actionType === "create" ? "Crear Servicio" : "Actualizar Servicio"}
      >
        <div className="p-4 max-w-md mx-auto">
          <button
            className="absolute top-2 right-2 bg-transparent border-none text-gray-500 hover:text-gray-800"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"            viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-lg font-bold mb-4">{actionType === "create" ? "Crear Servicio" : "Actualizar Servicio"}</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <label htmlFor="type" className="block text-sm font-bold">
              Nombre del Servicio:
            </label>
            <input
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
              type="text"
              name="type"
              value={newServiceName.type}
              onChange={handleChange}
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              {actionType === "create" ? "Crear" : "Actualizar"}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};
 export default Services2;