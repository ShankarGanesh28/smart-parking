const mongoose = require("mongoose");

const parkingSpotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("ParkingSpot", parkingSpotSchema);