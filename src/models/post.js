var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PostSchema = new Schema({
    author: {
        type: String
    },
    topic: {
        type: String,
        required: [true, 'Topic is required']
    }
});
module.exports = mongoose.model('post'/*collection in de DB*/, PostSchema/*collection's structure*/);