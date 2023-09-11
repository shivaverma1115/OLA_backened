const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    name: { type: String ,require:true},
    description: { type: String, require: true },
    category: { type: String, require: true },
    image: { type: String, require: true },
    location: { type: String, require: true },
    postedAt: { type: String, require: true },
    price: { type: String, require: true }
})
const PostModel = mongoose.model("OLApost", PostSchema);

module.exports = {
    PostModel
}