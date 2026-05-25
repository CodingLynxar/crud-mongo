const express = require("express");

const router = express.Router();

const Travel = require("../models/Travel");


// CREATE
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      vehicleType,
      source,
      destination,
    } = req.body;

    if (
      !customerName ||
      !vehicleType ||
      !source ||
      !destination
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newTravel = new Travel({
      customerName,
      vehicleType,
      source,
      destination,
    });

    const savedTravel = await newTravel.save();

    res.status(201).json(savedTravel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// READ
router.get("/", async (req, res) => {
  try {
    const travels = await Travel.find();

    res.status(200).json(travels);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedTravel =
      await Travel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(updatedTravel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Travel.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
