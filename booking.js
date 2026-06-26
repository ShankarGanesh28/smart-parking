const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    spotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ParkingSpot",
        required: true
    },
    userName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Booking", bookingSchema);