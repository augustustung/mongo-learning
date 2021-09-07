import { model, Schema, Types } from 'mongoose';

import { validateEmail } from '../ultis/regex';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    website: {
        type: String
    },
    posts: [
        {
            type: Types.ObjectId,
            ref: "Post"
        }
    ],
    email: {
        type: String,
        required: true,
        unique: true,
        match: validateEmail,
    },
    password: { type: String, required: true },
}, {
    timestamps: true
});

const User = model('User', UserSchema);

export default User;