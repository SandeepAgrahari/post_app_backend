const { default: mongoose } = require('mongoose')
const PostMessage = require('../model/postMessage')

exports.getPosts = async (rq,res)=>{
    try{
        const postMessages = await PostMessage.find()
        res.status(200).json(postMessages)
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

exports.createPost = async (req,res)=>{
    const post = req.body;

    const newPost = new PostMessage(post)
    try{
        await newPost.save()
        res.status(201).json(newPost)
    }
    catch(err){
        res.status(409).json({message:err.message})
    }
}

exports.updatePost = async (req,res)=>{
    const {id:_id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No Post with that id');
    }
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true})
    res.json(updatedPost)
}

exports.deletePost = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No Post with that id');
    }
    await PostMessage.findByIdAndRemove(id)
    res.json({message:'Post is deleted successfully!'})
}

exports.likePost = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No Post with that id');
    }
    const post = await PostMessage.findById(id)

    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount:post.likeCount+1}, {new: true})
    res.json(updatedPost)
}