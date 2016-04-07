/**
 * Created by vincebloise on 4/5/16.
 */
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.locationsCreate = function (req, res) {
    sendJSONresponse(res, 200, {"status" : "success"});
};
module.exports.locationsListByDistance = function (req, res) {
    sendJSONresponse(res, 200, {"status" : "success"});
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
