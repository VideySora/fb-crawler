const mongoose = require('mongoose');
const Baipost = require('./baipost');
const { Schema } = mongoose;


const grouppageSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    isgroup: {
        type: Boolean,
        default: true
    },
    scrolls: {
        type: Number,
        default: 2
    },
    link: {
        type: String,
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    
    baipost: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Baipost'
        }
    ]
});


const Grouppage = mongoose.model('Grouppage', grouppageSchema);

module.exports = Grouppage; 