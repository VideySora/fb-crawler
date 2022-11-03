const mongoose = require('mongoose');
const Grouppage = require('./grouppage');
const { Schema } = mongoose;

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Project must have a name!']
    },
    grouppages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Grouppage'
        }
    ]
});
// DELETE ALL ASSOCIATED GROUPPAGES AFTER A PROJECT IS DELETED
projectSchema.post('findOneAndDelete', async function (project) {
    if (project.grouppages.length) {
        const res = await Grouppage.deleteMany({ _id: { $in: project.grouppages } })
        console.log(res);
    }
})
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;