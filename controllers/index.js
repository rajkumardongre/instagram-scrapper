const dotenv = require('dotenv');
const { scrapPostById, scrapPostByTags } = require('../scrapping/scrapping');

dotenv.config();


const fetchPostsByTag = async (req, res, next) => {
    try {
        const tag = req.params.tag;
        const posts = await scrapPostByTags(tag)
        
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message });
    }
};

const fetchPostsById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await scrapPostById(id)
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = {
    fetchPostsByTag,
    fetchPostsById
};
