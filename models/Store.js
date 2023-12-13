const mongoose = require("mongoose");
const geocoder = require("../utils/geocode");

const storeSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'Store id must be required.'],
        unique: true,
        maxlength: [10, 'store id must be less than or equal to 10 characters.']
    },
    address: {
        type: String,
        required: [true, 'Please add an address.']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        },
        formattedAddress: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Geocode and create location.
storeSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);

    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
    }

    // Do not save address: 
    this.address = undefined;
});

module.exports = mongoose.model("Store", storeSchema);