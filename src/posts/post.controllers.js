import {v4 as uuidv4} from 'uuid';

const postDB = [
    {
        id: 'post-c12f8725-813e-43a5-afd6-b967d646f630',
        title: 'Bienvenido a Academlo Blog',
        content: 'Academlo es más que una academia, es una comunidad donde encuentras apoyo en tu proceso de aprendizaje de desarrollo web.',
        'header_image': 'algo.jpg',
        'user_id': '042fb8f4-cf93-489e-8357-c888b8265cd9',
        published: true
    }
];

const getAllPosts = cb => {
    return postDB;
};

const getPostById = id => {
    const post = postDB.find(e => e.id === id);

    if (!post) throw { message: 'Post not found', status: 404 };

    return post;
};

const getPostsByUser = idUser => {
    const posts = postDB.filter(post => post.user_id === idUser);

    return posts;
};

const getPostByIdAndByUser = (idPost, idUser) => {
    const post = postDB.find(p => p.id === idPost && p.user_id === idUser);

    if (!post) throw { message: 'Post not found', status: 404 };

    return post;
};

const createPost = data => {
    const { title, content, header_image, user_id } = data;

    const newPost = {
        id: `post-${uuidv4()}`,
        title,
        content,
        header_image,
        user_id,
        published: true
    };

    postDB.push(newPost);

    return newPost;
};

const editPost = (id, data) => {
    const index = postDB.findIndex(post => post.id === id);
    if (index === -1) throw { message: 'Post not found', status: 404 };

    const { title, content, header_image, published } = data;
    const editPost = {
        id,
        title,
        content,
        header_image,
        user_id: postDB[index].user_id,
        published
    };

    postDB[index] = editPost;
    return editPost;
};

const deletePost = id => {
    const index = postDB.findIndex(post => post.id === id);
    if (index === -1) throw { message: 'Post not found', status: 404 };

    return postDB.splice(index, 1)[0];
};

export default {
    getAllPosts,
    getPostById,
    createPost,
    editPost,
    deletePost,
    getPostsByUser,
    getPostByIdAndByUser
}