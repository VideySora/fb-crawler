const mongoose = require('mongoose');
const { Schema } = mongoose;


const baipostSchema = new Schema({
    post_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        default: ""
    },
    text: {
        type: String,
        default: ""
    },
    time: {
        type: String,
        default: ""
    },
    image: [{
        type: String,
        default: ""
    }],
    likes: {
        type: Number
    },
    comments: {
        type: Number
    },
    shares: {
        type: Number
    },
    grouppage: {
        type: Schema.Types.ObjectId,
        ref: 'Grouppage'
    }
});
const Baipost = mongoose.model('Baipost', baipostSchema);
module.exports = Baipost; 