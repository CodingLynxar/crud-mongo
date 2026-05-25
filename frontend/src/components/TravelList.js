import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import API_BASE_URL from "../api";

function TravelList() {
  const [travels, setTravels] =
    useState([]);

  const [editId, setEditId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      customerName: "",
      vehicleType: "",
      source: "",
      destination: "",
    });

  useEffect(() => {
    fetchTravels();
  }, []);

  const fetchTravels = async () => {
    try {
      const response =
        await axios.get(
          `${API_BASE_URL}/api/travels`
        );

      setTravels(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTravel = async (
    id
  ) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/api/travels/${id}`
      );

      fetchTravels();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (travel) => {
    setEditId(travel._id);

    setEditData({
      customerName:
        travel.customerName,
      vehicleType:
        travel.vehicleType,
      source: travel.source,
      destination:
        travel.destination,
    });
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]:
        e.target.value,
    });
  };

  const updateTravel = async (
    id
  ) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/travels/${id}`,
        editData
      );

      setEditId(null);

      fetchTravels();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Travel List</h2>

      {travels.map((travel) => (
        <div
          key={travel._id}
          className="box"
        >
          {editId ===
          travel._id ? (
            <>
              <input
                type="text"
                name="customerName"
                value={
                  editData.customerName
                }
                onChange={
                  handleChange
                }
              />

              <input
                type="text"
                name="vehicleType"
                value={
                  editData.vehicleType
                }
                onChange={
                  handleChange
                }
              />

              <input
                type="text"
                name="source"
                value={
                  editData.source
                }
                onChange={
                  handleChange
                }
              />

              <input
                type="text"
                name="destination"
                value={
                  editData.destination
                }
                onChange={
                  handleChange
                }
              />

              <button
                onClick={() =>
                  updateTravel(
                    travel._id
                  )
                }
              >
                Update
              </button>
            </>
          ) : (
            <>
              <p>
                <b>Name:</b>{" "}
                {
                  travel.customerName
                }
              </p>

              <p>
                <b>Vehicle:</b>{" "}
                {
                  travel.vehicleType
                }
              </p>

              <p>
                <b>From:</b>{" "}
                {travel.source}
              </p>

              <p>
                <b>To:</b>{" "}
                {
                  travel.destination
                }
              </p>

              <button
                onClick={() =>
                  handleEdit(
                    travel
                  )
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteTravel(
                    travel._id
                  )
                }
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TravelList;
