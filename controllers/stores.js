const StoreModel = require("../models/Store");

// @desc Get all stores
// @route GET /api/v1/stores
// @access public
exports.getAllStores = async (req, res, next) => {
    try {
        const stores = await StoreModel.find();

        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

// @create a store
// @route POST /api/v1/stores
// @access public
exports.addStore = async (req, res, next) => {
    try {
        const addedStore = {
            storeId: req.body.storeId,
            address: req.body.storeAddress
        }

        console.log(addedStore);

        const store = await StoreModel.create(addedStore);

        // return res.status(200).json({
        //     success: true,
        //     data: store
        // });

        res.redirect("/");
    }
    catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Duplicate store_id found.' });
        }
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getAPIKey = async (req, res, next) => {
    res.json({ GEOCODER_API_KEY: process.env.GEOCODER_API_KEY });
}