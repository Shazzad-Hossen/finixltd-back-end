const { auth } = require("../middlewares");
const { createBlog, getAllBlogs, getSingleBlog, patchBlog, deleteBlog } = require("./blog.entity");



function blog(){
    
    this.route.post('/blog', auth,createBlog(this));
    this.route.get('/blogs', auth, getAllBlogs(this));
    this.route.get('/blog/:id', auth, getSingleBlog(this));
    this.route.patch('/blog/:id', auth, patchBlog(this));
    this.route.delete('/blog/:id', auth, deleteBlog(this));

}

module.exports=blog;