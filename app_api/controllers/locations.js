/**
 * Created by vincebloise on 4/5/16.
 */
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

var theEarth = (function() {
    var earthRadius = 6371; // km, miles is 3959

    var getDistanceFromRads = function(rads) {
        return parseFloat(rads * earthRadius);
    };

    var getRadsFromDistance = function(distance) {
        return parseFloat(distance / earthRadius);
    };

    return {
        getDistanceFromRads: getDistanceFromRads,
        getRadsFromDistance: getRadsFromDistance
    };
})();

module.exports.locationsCreate = function (req, res) {
    sendJSONresponse(res, 200, {"status" : "success"});
};

/* GET list of locations */
module.exports.locationsListByDistance = function(req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var maxDistance = parseFloat(req.query.maxDistance);
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    var geoOptions = {
        spherical: true,
        maxDistance: theEarth.getRadsFromDistance(maxDistance),
        num: 10
    };
    if (!lng || !lat || !maxDistance) {
        console.log('locationsListByDistance missing params');
        sendJSONresponse(res, 404, {
            "message": "lng, lat and maxDistance query parameters are all required"
        });
        return;
    }
    Loc.geoNear(point, geoOptions, function(err, results, stats) {
        var locations;
        console.log('Geo Results', results);
        console.log('Geo stats', stats);
        if (err) {
            console.log('geoNear error:', err);
            sendJSONresponse(res, 404, err);
        } else {
            locations = buildLocationList(req, res, results, stats);
            sendJSONresponse(res, 200, locations);
        }
    });
};

var buildLocationList = function(req, res, results, stats) {
    var locations = [];
    results.forEach(function(doc) {
        locations.push({
            distance: theEarth.getDistanceFromRads(doc.dis),
            name: doc.obj.name,
            address: doc.obj.address,
            rating: doc.obj.rating,
            facilities: doc.obj.facilities,
            _id: doc.obj._id
        });
    });
    return locations;
};

/* GET a location by the id */
module.exports.locationsReadOne = function(req, res) {
    console.log('Finding location details', req.params);
    if (req.params && req.params.locationid) {
        Loc
            .findById(req.params.locationid)
            .exec(function(err, location) {
                if (!location) {
                    sendJSONresponse(res, 404, {
                        "message": "locationid not found"
                    });
                    return;
                } else if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(location);
                sendJSONresponse(res, 200, location);
            });
    } else {
        console.log('No locationid specified');
        sendJSONresponse(res, 404, {
            "message": "No locationid in request"
        });
    }
};

module.exports.locationsUpdateOne = function (rewq, res) {
    sendJSONresponse(res, 200, {"status" : "success"});
};
module.exports.locationsDeleteOne = function (req, res) {
    sendJSONresponse(res, 200, {"status" : "success"});
};
