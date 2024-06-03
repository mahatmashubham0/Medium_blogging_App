import mongoose, { Schema } from "mongoose";

const blogImageSchema = mongoose.Schema({
    userImage: {
        type: String,
    },
    blogImage: {
        type: String,
    }
})

export default mongoose.model("blogImages", blogImageSchema)