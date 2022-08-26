import postsControllers from './post.controllers.js';

const getAll = (req, res) => {
    try {
        const data = postsControllers.getAllPosts();
        res.status(200).json({ "quanty_post": data.length, response: data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getOne = (req, res) => {
    try {
        const { id } = req.params;
        const post = postsControllers.getPostById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
};

const create = (req, res) => {
    try {
        const { id } = req.user;
        const data = req.body;
    
        if (!Object.keys(data).length) throw { message: 'Missing data' };
        if (!(data.title && data.content && data['header_image'])) throw { message: 'All fields must be completed' };

        const newPost = postsControllers.createPost(Object.assign(data, { 'user_id': id }));
        
        res.status(201).json({ message: 'User succesfully created', newPost });
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
};

const edit = (req, res) => {
    try {
        const post_id = req.params.id;
        const data = req.body;

        if (!Object.keys(data).length) throw { message: 'Missing data' };

        if (!(data.title && data.content && data.header_image && (typeof data.published === 'boolean'))) throw {
            message: "All fields must be completed",
            fields: {
                title: "My Amazing Post",
                content: "Content of my amazing post",
                header_image: "image_of_my_amazing_post.jpg",
                published: true
            }
        };

        const edited_post = postsControllers.editPost(post_id, data);
        res.status(200).json({ message: 'Post edited succesfully', edited_post });
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message, fields: error.fields || null });
    }
};

const remove = (req, res) => {
    try {
        const post_id = req.params.id;

        const deleted_post = postsControllers.deletePost(post_id);
        res.status(204).json({ message: 'Post deleted succesfully', deleted_post });
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
}

const getMyPosts = (req, res) => {
    try {
        const user_id = req.user.id;
        const posts = postsControllers.getPostsByUser(user_id);

        res.status(200).json({ user_id, quanty_posts: posts.length, posts });

    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
};

const getOneOfMyPosts = (req, res) => {
    try {
        const post_id = req.params.id;
        const user_id = req.user.id;

        const post = postsControllers.getPostByIdAndByUser(post_id, user_id);
        res.status(200).json(post);
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
};

const editMyPost = (req, res) => {
    try {
        const post_id = req.params.id;
        const user_id = req.user.id;
        const data = req.body;

        const post = postsControllers.getPostById(post_id);
        if (post.user_id !== user_id) throw { message: "You can't edit this post because you aren't its owner", status: 401 };

        if (!Object.keys(data).length) throw { message: 'Missing data' };

        if (!(data.title && data.content && data.header_image && (typeof data.published === 'boolean'))) throw {
            message: "All fields must be completed",
            fields: {
                title: "My Amazing Post",
                content: "Content of my amazing post",
                header_image: "image_of_my_amazing_post.jpg",
                published: true
            }
        };

        const edited_post = postsControllers.editPost(post_id, data);
        res.status(200).json({ message: 'Post edited succesfully', edited_post });
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message, fields: error.fields || null });
    }
};

const deleteMyPost = (req, res) => {
    try {
        const post_id = req.params.id;
        const user_id = req.user.id;

        const post = postsControllers.getPostById(post_id);
        if (post.user_id !== user_id) throw { message: "You can't delete this post because you aren't its owner", status: 401 };

        const deleted_post = postsControllers.deletePost(post_id);
        res.status(200).json({ message: 'Post deleted succesfully', deleted_post });
    } catch (error) {
        res.status(error.status || 400).json({ message: error.message });
    }
};

export default {
    getAll,
    getOne,
    create,
    edit,
    remove,
    getMyPosts,
    getOneOfMyPosts,
    editMyPost,
    deleteMyPost
}