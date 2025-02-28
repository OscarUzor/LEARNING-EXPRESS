const userModel = require ("../My Models/user.Model")
const articleModel = require("../My Models/articleModel")

const  createArticle = async (req, res)=>{
    const user = req.user
    const {title, desc, authors} = req.body
    authors.push(user)
    try {
        const article = new articleModel({title, desc, authors})
        const savedArticle = await article.save()
        // Adding an article ID to the user field
        await Promise.all (authors.map(async(userId)=>{
            // Find article authors
            const articleAuthor = await userModel.findById(userId)
            const articleArray = articleAuthor.articles
            articleArray.push(savedArticle.id)
            //update the userModel informations with articles attributed to a user
            await userModel.findByIdAndUpdate(userId, {articles: articleArray}, {new: true}) 
        }))
        res.json({message: "Successful"})
    } catch (error) {
        res.send("Something went Wrong")
    }
}

const getOneArticle = async (req, res)=>{
    const {id} = req.params
    try {
        const oneArticle = await articleModel.findById(id).populate({path:"authors", select: "name email -_id"})
        res.json(oneArticle)
    } catch (error) {
        res.send("something went wrong")
    } 
}
module.exports = {createArticle, getOneArticle}