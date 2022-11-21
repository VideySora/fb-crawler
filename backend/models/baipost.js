const mongoose = require('mongoose');
const { Schema } = mongoose;


const baipostSchema = new Schema({
    grouppagepost: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ""
    },
    image: [{
        type: String,
        default: ""
    }],
    grouppage: {
        type: Schema.Types.ObjectId,
        ref: 'Grouppage'
    }
});
const Baipost = mongoose.model('Baipost', baipostSchema);
module.exports = Baipost; 