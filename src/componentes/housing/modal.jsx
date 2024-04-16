import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-modal";

import { ValidateFormdata } from "./validate";
import { useLocationProvincias } from "../../hooks/useLocationProvincias";
import { useServices } from "../../hooks/useServices";
import useCities from "../../hooks/useCities";
import { useLocalStorage } from '../../hooks/useLocalStorage';

import { useSelector } from "react-redux";

const Modals = ({
  isModalOpen,
  closeModal,
  actionType,
  reloadHousingsData,
  selectedHousing,
}) => {

  const [loggedInUser, setLoggedInUser] = useLocalStorage('loggedInUser', null);
  const [selectedHousingData, setSelectedHousingData] = useState(null);
  const statehousings = useSelector((state) => state.storage.allAlojamientos);
  const result = statehousings.find((re) => re.id === selectedHousing);

  useEffect(() => {
    if (actionType === "edit" && result) {
      const selectedServiceIds = result.Services.map((service) => service.id);
      const imagenClou = result.images.map((image) => image);
      setFormData({
        id: result.id,
        title: result.title,
        provinces: result.provinces,
        cities: result.cities,
        location: result.location,
        datesAvailable: result.datesAvailable,
        datesEnd: result.datesEnd,
        price: result.price,
        accommodationType: result.accommodationType,
        square: result.square,
        images: imagenClou,
        services: selectedServiceIds,
      });
    }
  }, [result]);

  // useEffect(() => {
  //   if (actionType === "edit" && selectedHousingData) {
  //     setFormData(selectedHousingData);
  //   }
  // }, [actionType, selectedHousingData]);

  useServices();
  useLocationProvincias();
  useCities();
  const provincias = useSelector((state) => state.storage.AllLocation);
  const servicesA = useSelector((state) => state.storage.AllService);

  const email = loggedInUser; //ACA ESTAS
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    provinces: "",
    cities: "",
    datesAvailable: "",
    datesEnd: "",
    price: "",
    accommodationType: "",
    services: [],
    square: "",
    images: [],
  });

  const selectedProvince = formData.provinces;
  const cities = useCities(selectedProvince ? selectedProvince : null);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, files, type, checked } = e.target;

    let newValue;

    if (name === "images") {
      // Para el campo de imágenes, manejamos los archivos por separado
      newValue = [
        ...formData.images,
        ...Array.from(files).slice(0, 3 - formData.images.length),
      ];
    } else if (type === "checkbox") {
      // Para casillas de verificación, agregamos o quitamos el valor según el estado de verificación
      newValue = checked
        ? [...formData.services, e.target.value]
        : formData.services.filter((service) => service !== e.target.value);
    } else {
      // Para otros tipos de campos, simplemente usamos el valor del campo
      newValue = e.target.value;
    }

    // Actualizamos el estado de formData con el nuevo valor
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    // Realizamos la validación del formulario
    const validationErrors = ValidateFormdata({
      ...formData,
      [name]: newValue,
    });
    setErrors(validationErrors);

    // Determinamos si se deben deshabilitar los botones de envío basándonos en los errores de validación
    const errorMessages = Object.values(validationErrors);
    setDisableSubmit(errorMessages.some((ermsg) => ermsg !== ""));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    const serviceId = parseInt(value);
    setFormData((prevData) => ({
      ...prevData,
      services: checked
        ? [...prevData.services, serviceId]
        : prevData.services.filter((service) => service !== serviceId),
    }));
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   // Verificar si hay nuevas imágenes seleccionadas por el usuario
const newImagesSelected = formData.images.some(image => typeof image !== 'string');

    // Crear un nuevo objeto FormData
    const formDataTo = new FormData();

// Recorrer todas las claves y valores del estado formData
for (const [key, value] of Object.entries(formData)) {
  if (key === "images" && newImagesSelected) {
    // Si hay nuevas imágenes seleccionadas, agregarlas al FormData
    value.forEach(image => formDataTo.append("images", image));
  } else if (key === "Services") {
    // Convertir los IDs de los servicios a una cadena JSON y agregarlos al FormData
    const serviceIds = value.map(service => service.id);
    formDataTo.append("ServiceIds", JSON.stringify(serviceIds));
  } else {
    // De lo contrario, agregar la clave y el valor al FormData
    formDataTo.append(key, value);
  }
}

 try {
      let response;

      if (actionType === "create") {
        response = await axios.post(
          `/profileHousing/register?email=${email}`,
          formDataTo
        );
        if (
          response.status === 201 &&
          response.data.message === "Datos recibidos correctamente"
        ) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Exitoso!",
            text: "Los datos del alojamiento han sido registrados correctamente.",
          });
          reloadHousingsData();
          clearFormData();
        }
      }
      if (actionType === "edit") {
        const response1 = await axios.put(
          `/profileHousing/update/${result.id}`,
          formDataTo
        );

        if (response1.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Registro Actualizado!",
            text: "Los datos del alojamiento han sido Actualizados correctamente.",
          });
          reloadHousingsData();
        }
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const clearFormData = () => {
    setFormData({
      title: "",
      cities: "",
      provinces: "",
      datesAvailable: "",
      datesEnd: "",
      price: "",
      accommodationType: "",
      services: [],
      square: 0,
      images: [],
    });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      mode={selectedHousing ? "edit" : "create"}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: "1000",
        },
      }}
    >
      <div>
        <button
          className="absolute top-2 right-2 bg-transparent border-none text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
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
        <h2 className="font-custom font-extrabold">Registrar alojamiento</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div class="grid grid-cols-4 gap-2">
            <div>
              <box-icon name="home"></box-icon>
              <div className="relative">
                <input
                  placeholder="Nombre Alojamiento"
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-[225px] outline-none border rounded ${
                    errors.title ? "border-red-500" : ""
                  }`}
                />
                {!errors.title && formData.title && (
                  <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-green-500">
                    <span role="img" aria-label="check">
                      {" "}
                      ✔️{" "}
                    </span>
                  </div>
                )}
              </div>

              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title}</span>
              )}
              {/**-------------------------------------------------------------------------------------------------- */}
            </div>

            <div>
              <label
                htmlFor="location"
                className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
              >
                <box-icon name="home"></box-icon>

                <select
                  name="provinces"
                  id="provinces"
                  onChange={handleChange}
                  value={formData.provinces}
                  className={`outline-none appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.provinces ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Ubicación</option>
                  {provincias.map((provincia) => {
                    return (
                      <option value={provincia.nombre} key={provincia.id}>
                        {provincia.nombre}
                      </option>
                    );
                  })}
                </select>
              </label>
              {!errors.location && formData.location && (
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-green-500">
                  <span role="img" aria-label="check">
                    ✔️
                  </span>
                </div>
              )}
              {errors.location && (
                <span className="text-red-500 text-sm italic">
                  {errors.location}
                </span>
              )}
            </div>

            <div>
              <label className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]">
                <box-icon name="map"></box-icon>
                <select
                  id="cities"
                  value={formData.cities}
                  onChange={handleChange}
                  name="cities"
                  className="w-[225px] outline-none"
                >
                  <option value="" disabled selected>
                    Selecciona una localidad
                  </option>
                  {cities.map((localidad) => (
                    <option value={localidad.name} key={localidad.id}>
                      {localidad.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label
                htmlFor="datesAvailable"
                className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
              >
                Fecha de inicio
                <input
                  placeholder="Fecha inicio"
                  type="date"
                  name="datesAvailable"
                  id="datesAvailable"
                  onChange={handleChange}
                  value={formData.datesAvailable}
                  max={formData.datesEnd}
                  className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.datesAvailable ? "border-red-500" : ""
                  }`}
                />
              </label>
              {!errors.datesAvailable && formData.datesAvailable && (
                <div className=" mr-3 text-green-500">
                  <span role="img" aria-label="check">
                    ✔️
                  </span>
                </div>
              )}
              {errors.datesAvailable && (
                <p className="text-red-500 text-xs italic">
                  {errors.datesAvailable}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="datesEnd"
                className="flex items-center px-[10px] py-[5px] bg-[white] rounded-[20px]"
              >
                Fecha Fin
                <input
                  type="date"
                  name="datesEnd"
                  id="datesEnd"
                  onChange={handleChange}
                  value={formData.datesEnd}
                  min={formData.datesAvailable}
                  className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.datesEnd ? "border-red-500" : ""
                  }`}
                />
              </label>
              {!errors.datesEnd && formData.datesEnd && (
                <div className=" mr-3 text-green-500">
                  <span role="img" aria-label="check">
                    {" "}
                    ✔️{" "}
                  </span>
                </div>
              )}
              {errors.datesEnd && (
                <p className="text-red-500 text-xs italic">{errors.datesEnd}</p>
              )}
            </div>
            <div>
              <input
                placeholder="Cantidad de plazas"
                type="number"
                name="square"
                id="square"
                onChange={handleChange}
                value={formData.square}
                className={`appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.square ? "border-red-500" : ""
                }`}
              />

              {!errors.square && formData.square > 0 && (
                <div className="mr-3 text-green-500">
                  <span role="img" aria-label="check">
                    ✔️
                  </span>
                </div>
              )}
              {errors.square && (
                <p className="text-red-500 text-xs italic">{errors.square}</p>
              )}
            </div>

            <div>
              <input
                placeholder=" Precio/hora"
                type="number"
                name="price"
                id="price"
                onChange={handleChange}
                value={formData.price}
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.price ? "border-red-500" : ""
                }`}
              />

              {!errors.price && formData.price && (
                <div className=" mr-3 text-green-500">
                  <span role="img" aria-label="check">
                    ✔️
                  </span>
                </div>
              )}
              {errors.price && (
                <p className="text-red-500 text-xs italic">{errors.price}</p>
              )}
            </div>
            <div>
              <select
                name="accommodationType"
                id="accommodationType"
                onChange={handleChange}
                value={formData.accommodationType}
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.accommodationType ? "border-red-500" : ""
                }`}
              >
                <option value="">Tipo de Alojamiento</option>
                <option value="Cabaña">Cabaña</option>
                <option value="Hotel">Hotel</option>
                <option value="Casa Rural">Casa Rural</option>
              </select>

              {!errors.accommodationType && formData.accommodationType && (
                <div className=" mr-3 text-green-500">
                  <span role="img" aria-label="check">
                    ✔️
                  </span>
                </div>
              )}
              {errors.accommodationType && (
                <p className="text-red-500 text-xs italic">
                  {errors.accommodationType}
                </p>
              )}
            </div>
            <div className="grid grid-cols-subgrid col-span-3">
              <label>
                Servicios
                <div
                  className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.services ? "border-red-500" : ""
                  }`}
                >
                  <div>
                    {servicesA &&
                      servicesA.map((service) => (
                        <label
                          key={service.id}
                          className="inline-flex items-center ml-4"
                        >
                          <input
                            type="checkbox"
                            name="services"
                            value={service.id}
                            onChange={handleServiceChange}
                            className="form-checkbox h-5 w-5 text-gray-600"
                            checked={formData.services.some(
                              (id) => id === service.id
                            )}
                          />
                          <span className="ml-2 text-gray-700">
                            {service.type}
                          </span>
                        </label>
                      ))}
                  </div>
                </div>
              </label>
              <div className="mt-2">
                {formData.services.map((serviceId, index) => {
                  // console.log("Selected service formdata:", formData.services);
                  const selectedService = servicesA.find(
                    (service) => service.id === serviceId
                  );
                  // console.log("Selected service:", selectedService);
                  return (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                    >
                      {selectedService ? selectedService.type : ""}
                    </span>
                  );
                })}
              </div>
              {!errors.services && formData.services && (
                <div className=" mr-3 text-green-500">
                  <span role="img" aria-label="check">
                    ✔️
                  </span>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="images"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Imágenes (mínimo 3)
              </label>
              <input
                type="file"
                accept="image/*"
                name="images"
                id="images"
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                multiple
              />
              {formData.images.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-700 text-sm font-bold mb-2">
                    Previsualización de Imágenes:
                  </p>
                  <div className="flex">
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex items-center mr-2">
                        <div className="relative">
                          <img
                            src={
                              typeof image === "string"
                                ? image
                                : URL.createObjectURL(image)
                            }
                            alt={`Imagen ${index + 1}`}
                            className="h-16 w-16 object-cover mr-2"
                          />
                          <button
                            type="button"
                            onClick={() => handleImageRemove(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white font-bold py-1 px-2 rounded-full"
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}

                    {[...Array(3 - formData.images.length)].map((_, index) => (
                      <div
                        key={index}
                        className="h-16 w-16 border border-gray-300 flex items-center justify-center rounded-md mr-2"
                      >
                        <span className="text-gray-400 text-xs">
                          Imagen {formData.images.length + index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {errors.images && (
                <p className="text-red-500 text-xs italic">{errors.images}</p>
              )}
            </div>

            <div className="flex items-center justify-between col-span-full">
              <button
                type="submit"
                className="font-bold font-custom cursor-pointer outline-none rounded-2xl m-2 px-5 py-3 bg-[black] text-white shadow-md"
                disabled={disableSubmit}
              >
                {actionType === "create" ? "Crear" : "Actualizar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Modals;
