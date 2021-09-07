import PostModel from '../models/post.model'

const getPostService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const post = await PostModel.find();
            resolve({
                errCode: 0,
                data: post
            })
        } catch (e) {
            console.log('get post err: ', e)
            reject({
                errCode: 1,
                errMessage: "Get post failed"
            })
        }
    })
}

const createPostService = (postInfo) => {
    return new Promise(async (resolve, reject) => {
        try {

            const post = new PostModel(postInfo);

            await post.save();
            resolve({
                errCode: 0,
                message: "Created post!"
            })
        } catch (e) {
            console.log('create post err: ', e)
            reject({
                errCode: 1,
                errMessage: "Create post failed"
            })
        }
    })
}

const updatePostService = (updatePostInfo) => {
    return new Promise(async (resolve, reject) => {
        try {

            const post = await PostModel.findOneAndUpdate(
                { _id: updatePostInfo._id },
                updatePostInfo,
                { new: true }
            );

            if (post) {
                resolve({
                    errCode: 0,
                    message: "Updated post!"
                })
            } else {
                reject({
                    errCode: 1,
                    errMessage: "Update post failed"
                })
            }
        } catch (e) {
            console.log('Update post err: ', e)
            reject({
                errCode: 1,
                errMessage: "Update post failed"
            })
        }
    })
}

const deletePostService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const post = await PostModel.findById(id);
            await post.remove();

            resolve({
                errCode: 0,
                message: "Deleted post!"
            })
        } catch (e) {
            console.log('delete post err: ', e)
            reject({
                errCode: 1,
                errMessage: "delete post failed"
            })
        }
    })
}

module.exports = {
    getPostService: getPostService,
    createPostService: createPostService,
    updatePostService: updatePostService,
    deletePostService: deletePostService
}

// 0: 24: 41