/**
 * Created by vincebloise on 3/23/16.
 */
/* GET home page. */
module.exports.about = function (req, res) {
    res.render('generic-text', {title: 'About'});
};