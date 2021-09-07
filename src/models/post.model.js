import { model, Schema, Types } from 'mongoose';

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String
    },
    author: {
        type: Types.ObjectId,
        ref: "User"
    }
    //auto create 2 fields createdAt and updatedAte
}, { timestamps: true });

const Post = model('Post', PostSchema);

export default Post;