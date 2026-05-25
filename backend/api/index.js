const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const travelSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Travel =
  mongoose.models.Travel ||
  mongoose.model("Travel", travelSchema);

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
};

app.get("/api/travels", async (req, res) => {
  try {
    await connectDB();

    const travels = await Travel.find().sort({
      createdAt: -1,
    });

    res.status(200).json(travels);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/api/travels", async (req, res) => {
  try {
    await connectDB();

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

    const newTravel = await Travel.create({
      customerName,
      vehicleType,
      source,
      destination,
    });

    res.status(201).json(newTravel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.put("/api/travels/:id", async (req, res) => {
  try {
    await connectDB();

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

app.delete("/api/travels/:id", async (req, res) => {
  try {
    await connectDB();

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

module.exports = app;
