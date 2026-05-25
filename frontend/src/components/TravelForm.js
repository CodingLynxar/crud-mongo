import React, {
  useState,
} from "react";

import axios from "axios";
import API_BASE_URL from "../api";

function TravelForm() {
  const [formData, setFormData] =
    useState({
      customerName: "",
      vehicleType: "",
      source: "",
      destination: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      !formData.customerName ||
      !formData.vehicleType ||
      !formData.source ||
      !formData.destination
    ) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/api/travels`,
        formData
      );

      alert(
        "Travel Added Successfully"
      );

      setFormData({
        customerName: "",
        vehicleType: "",
        source: "",
        destination: "",
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="customerName"
        placeholder="Customer Name"
        value={
          formData.customerName
        }
        onChange={handleChange}
      />

      <input
        type="text"
        name="vehicleType"
        placeholder="Vehicle Type"
        value={
          formData.vehicleType
        }
        onChange={handleChange}
      />

      <input
        type="text"
        name="source"
        placeholder="Source"
        value={formData.source}
        onChange={handleChange}
      />

      <input
        type="text"
        name="destination"
        placeholder="Destination"
        value={
          formData.destination
        }
        onChange={handleChange}
      />

      <button type="submit">
        Add
      </button>
    </form>
  );
}

export default TravelForm;
