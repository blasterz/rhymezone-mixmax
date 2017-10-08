var request = require('request');
var _ = require('underscore');

// The Type Ahead API.
module.exports = function(req, res) {
    var term = req.query.text.trim();
    if (!term) {
        res.json([{
            title: '<i>(enter a search term)</i>',
            text: ''
        }]);
        return;
    }
    
    request({
        url: 'https://api.datamuse.com/words',
        qs: {
            rel_nry: term,
            max: 15
        },
        gzip: true,
        json: true,
        timeout: 10 * 1000
        }, function(err, response) {
            if (err || response.statusCode !== 200 || !response.body) {
                res.status(500).send('Error');
                return;
            }
            var results = _.chain(response.body)
                .map(function(word) {
                    return {
                        title: word.word,
                        text: word.word
                    };
                })
                .value();
            if (results.length === 0) {
                res.json([{
                    title: '<i>(no results)</i>',
                    text: ''
                }]);
            } else {
                res.json(results);
            }
        });
};
