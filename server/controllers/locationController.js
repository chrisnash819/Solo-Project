const locationController = {};

//TODO I have req,res,next here and in server. I think I only need one
locationController.getTaxData = (req, res, next) => {
    const location = req.params.location;
    res.json({/*this will be a json object of the result of api fetch req*/});
};

locationController.getCivicStats = (req, res, next) => {
    const location = req.params.location;
    res.json({/*this will be a json object of the result of api fetch req*/});
};

module.exports = locationController