const postModel = require("../My Models/post.model")
const userModel = require("../My Models/user.Model")


const createPost = async (req, res) => {
    const user = req.user
    const body = req.body
    try {
        //creating new post
        const newPost = new postModel({...body, creator: user})
        const  savedPost = await newPost.save()
        // modifying user's account
        const getUser = await userModel.findById(user)
        const allPostIds = getUser.posts
        allPostIds.push(savedPost.id)
        await userModel.findByIdAndUpdate(user, {posts: allPostIds}, {new: true})
        res.json({message: "Post Created Successfully"})
    } catch (error) {
        res.send("Something went Wrong")
    }
}

const getAllPost = async (req, res) => {
    try {
        const allPosts = await postModel.find().select("title desc previewPix -_id").populate({path:"creatorId", select:"name email -_id"})
        res.json(allPosts)
        // const allUserPost = await Promise.all(
        //     allPosts.map(async(posts)=>{
        //         const user = await userModel.findById(post.creatorId)
        //         return {...post.toObject(), crator: user}
        //     })
        // )
        // res.json(allPosts)
    } catch (error) {
        res.send("Something went wrong")
    }
}

const getOnePost = async (req, res) => {
    const{id} = req.params
    try {
        const onePost = await postModel.findById(id).populate("creator")
        res.json(onePost)
    } catch (error) {
        res.send("Something Went Wrong")    
    }    
}


const deletePost = async (req, res) =>{
    const user = req.user
    const{id} = req.params
    try {
        const post = await postModel.findById(id)
        // checking if post exist before authorizing to delete
        if(!post){
            return res.status(404).send("This post does not exist")
        }
        // Comparing post CreatorId with that saved in the database
        if(post.creatorId.toString() !== user){
            return res.status(400).send("error: Post Is not yours")
        }
        await postModel.findByIdAndDelete(id)
        res.status(200).send("Post deleted successfully")
    } catch (error) {
        res.send("Something Went Wrong")
    }
}


const updatePost = async (req, res) => {
    const {id} = req.params
    const user = req.user
    // const {id: creatorId} = jwt.verify(token, "UzorOscar")
    const {id:postId, ...others} = req.body
    try {
        // We have to to first find the post that want to be deleted
        const post = await postModel.findById(id)
        if(!post){
            return res.json({message: "Post does not exist"})
        }
        // If post is found, we then compare the post Id with that in our database
        if (post.creatorId != user) {
            return res.json({message: "Invalid creatorId, Can't delete post"})
        }
        // finally here all processes above are approved then we can noow delete post
        await postModel.findByIdAndUpdate(id, {...others}, {new: true})
        res.json({message: "Post updated successfully"})
    } catch (error) {
        res.send("Something Went Wrong")
    }
}


module.exports = {createPost, getAllPost, getOnePost, deletePost, updatePost}