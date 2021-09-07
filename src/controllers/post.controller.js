const Post = require('../models/post.model');
const User = require('../models/user.model');


const CreatePost = async (req, res) => {
    const { title, subtitle, userId } = req.body;
    const post = await Post.default.create({
        title,
        subtitle,
        author: userId        //relationship
    });

    await post.save();

    const userById = await User.default.findById(userId);

    userById.posts.push(post);
    await userById.save();

    return res.send(userById);
}

//find posts of user by postId
const UserByPost = async (req, res) => {
    const { id } = req.query;
    /*.populate('users') is equevalent to */
    //relationship 'author'
    const post = await Post.default.findById(id)

    const userByPost = await post.populate('author'); //db save name of schema: all characters are lowercase and "s" at the end.
    /* This
        userByPost.user.find(userId => userId === id)
    */
    res.send(userByPost);
}

module.exports = {
    CreatePost: CreatePost,
    UserByPost: UserByPost
}