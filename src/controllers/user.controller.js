const User = require('../models/user.model');

const CreateUser = async (req, res) => {
    const { name, bio, website, email, password } = req.body;

    const user = await User.default.create({
        name,
        bio,
        website,
        email,
        password
    });

    return res.send(user);
}

const findAllUser = async (req, res) => {
    const user = await User.default.find()
    return res.send(user)
}

//find posts of user by userId
const postsByUser = async (req, res) => {
    const { id } = req.query;
    /*.populate('posts') equevalent to */
    const user = await User.default.findById(id).populate('posts');
    /*This
        user.posts.forEach(async element => {
           const post = await Post.findById(element);
              console.log(post);
        });
    */

    res.send(user.posts);
}

module.exports = {
    CreateUser: CreateUser,
    findAllUser: findAllUser,
    postsByUser: postsByUser
}