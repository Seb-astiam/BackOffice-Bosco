import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocationProvincias } from "../../hooks/useLocationProvincias";

const OcupancyReport = () => {
  useLocationProvincias();

  const provincias = useSelector((state) => state.storage.AllLocation);

  const [housingData, setHousingData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    let query = "?";

    for (const [key, value] of Object.entries(searchQuery)) {
      if (value) query += `${key}=${value}&`;
    }

    try {
      console.log(query);
      const { data } = await axios.get(
        `/profileHousing/ocupancyreport${query}`
      );
      setHousingData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="m-content">
        <div className="m-subheader">
          <div className="m-portlet__head-title">
            <h3 className="m-portlet__head-text">Reportes</h3>
            <div className="mb-6 flex flex-row items-center justify-between space-x-3">
              <div className="flex items-center space-x-2">
                <select
                  onChange={handleChange}
                  name="location"
                  className="py-2 px-4 rounded-lg border border-gray-300"
                  value={searchQuery.location || ""}
                >
                  <option value="">Escoge una Ubicación</option>
                  {provincias.map((provincia) => (
                    <option value={provincia.nombre} key={provincia.id}>
                      {provincia.nombre}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-primary px-4 py-2 rounded-lg"
                  onClick={handleSearch}
                >
                  <FontAwesomeIcon
                    icon={faSearchLocation}
                    style={{ fontSize: "1.5em" }}
                  />
                </button>
              </div>
              <button
                className="btn btn-primary px-4 py-2 rounded-lg"
                onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faPrint} />
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
                        <th className="px-4 py-2 text-sm">
                          Cantidad de Alojamientos
                        </th>
                        <th className="px-4 py-2 text-sm">Cantidad Ocupados</th>
                        <th className="px-4 py-2 text-sm">
                          Cantidad Disponibles
                        </th>
                        <th className="px-4 py-2 text-sm">
                          Porcentaje de Ocupación
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          className="border px-4 py-2 text-sm"
                          aria-placeholder="$"
                        >
                          {housingData.cantidadTotal}
                        </td>
                        <td className="border px-4 py-2 text-sm">
                          {housingData.cantidadOcupados}
                        </td>
                        <td className="border px-4 py-2 text-sm">
                          {housingData.cantidadDisponibles}
                        </td>
                        <td className="border px-4 py-2 text-sm">
                          {housingData.porcentajeOcupacion}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OcupancyReport;
