var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  res.json({
    body: term,
    raw: true
  });
  return;
};
