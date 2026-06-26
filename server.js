const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const ParkingSpot = require("./models/ParkingSpot");
const Booking = require("./models/Booking");
const app = express();
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));
app.use(cors());
app.use(express.json());

let parkingSpots = [
  {
    id: 1,
    name: "Main Street Parking",
    lat: 17.385,
    lng: 78.4867,
    price: 50,
    available: true
  },
  {
    id: 2,
    name: "City Center Parking",
    lat: 17.395,
    lng: 78.4967,
    price: 70,
    available: true
  }
];

let bookings = [];

app.get("/spots", async (req, res) => {
  try {
    const spots = await ParkingSpot.find();
    res.json(spots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/spots", async (req, res) => {
  try {
    const spot = new ParkingSpot({
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng,
      price: req.body.price,
      available: true
    });

    await spot.save();
    res.json(spot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/book", async (req, res) => {
    try {
        const { spotId, userName } = req.body;

        const spot = await ParkingSpot.findById(spotId);

        if (!spot) {
            return res.status(404).json({ message: "Spot not found" });
        }

        if (!spot.available) {
            return res.json({ message: "Spot not available" });
        }

        spot.available = false;
        await spot.save();

        const booking = new Booking({
            spotId,
            userName
        });

        await booking.save();

        res.json({ message: "Booking Successful" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find().populate("spotId");
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});