const express = require('express')
const router = express.Router()
const {get_blog_data, search_blog} = require('../controllers/controllers')

router.route('/test').get((req,res)=>{
    res.send("Works")
})

//**API to retrive data ***/
router.route('/api/blog-stats').get(get_blog_data)
router.route('/api/blog-search').get(search_blog)
module.exports = router;