const blogSchema = require("./blog.schema");

module.exports.createBlog = () => async (req, res) => {
  try {
   if(!req.body.title || !req.body.content || !req.body.thumbnail || !req.body.shortDescription) return res.status(400).send({ success: false, message: 'Bad request' });
   await blogSchema.create({ title: req.body.title, content: req.body.content, thumbnail: req.body.thumbnail, shortDescription: req.body.shortDescription });
    return res.status(200).send({ success: true, message: 'Blog created successfully'})
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Something went wrong' });

  }
}


module.exports.getAllBlogs = () => async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const blogs = await blogSchema.paginate({}, { page, limit, sort: { createdAt: -1 } });
        return res.status(200).send({ success: true, message: 'Blogs fetched successfully', data: blogs })
        
    } catch (error) {
         console.log(error);
    return res.status(500).send({ success: false, message: 'Something went wrong' });
        
    }
}

module.exports.getSingleBlog = () => async (req, res) => {
    try {
        if(!req.params.id) return res.status(400).send({ success: false, message: 'Bad request' });
        const blog = await blogSchema.findById(req.params.id);
        if(!blog) return res.status(404).send({ success: false, message: 'No blog found with this id' });
        return res.status(200).send({ success: true, message: 'Blog fetched successfully', data: blog })
        
    } catch (error) {
         console.log(error);
    return res.status(500).send({ success: false, message: 'Something went wrong' });
        
    }
}

module.exports.patchBlog = () => async (req, res) => {
    try {
        if(!req.params.id) return res.status(400).send({ success: false, message: 'Bad request' });
        const blog = await blogSchema.findById(req.params.id);
        if(!blog) return res.status(404).send({ success: false, message: 'No blog found with this id' });
        if(req.body.title) blog.title=req.body.title;
        if(req.body.content) blog.content=req.body.content;
        if(req.body.thumbnail) blog.thumbnail=req.body.thumbnail;
        if(req.body.shortDescription) blog.shortDescription=req.body.shortDescription;
        await blog.save();
        return res.status(200).send({ success: true, message: 'Blog updated successfully', data: blog })
        
    } catch (error) {
         console.log(error);
    return res.status(500).send({ success: false, message: 'Something went wrong' });
        
    }
}

module.exports.deleteBlog = () => async (req, res) => {
    try {
        if(!req.params.id) return res.status(400).send({ success: false, message: 'Bad request' });
        const blog = await blogSchema.findById(req.params.id);
        if(!blog) return res.status(404).send({ success: false, message: 'No blog found with this id' });
        await blogSchema.findByIdAndDelete(req.params.id);
        return res.status(200).send({ success: true, message: 'Blog deleted successfully' })
        
    } catch (error) {
        console.log(error);
    return res.status(500).send({ success: false, message: 'Something went wrong' });
        
        
    }
}