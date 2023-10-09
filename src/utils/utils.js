const axios  = require('axios')
const _ = require('lodash')

const fetchData = async()=>{
    try {
        const response = await axios.get(
            "https://intent-kit-16.hasura.app/api/rest/blogs",
            {
              headers: {
                "x-hasura-admin-secret":
                  "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
              },
            }
          );
      
          const blogData = response.data.blogs;
          return blogData;
          
    } catch (error) {
        throw new Error("Error occured while fetching data")
    }
}


const longest_title = (blogData)=>{
    console.log(blogData)
    const longest_title = _.maxBy(
        blogData,
        (blog) => blog.title.length
      ).title;
      return longest_title;
}

const privacyFilter = (blogData)=>{
    const blogs_with_privacy = _.size(
        _.filter(blogData, (blog) =>
          _.includes(blog.title.toLowerCase(), "privacy")
        )
      );
     return blogs_with_privacy; 
}

const unique_blogs_filter = (blogData)=>{
   return _.uniqBy(blogData, "title").map(
    (blog) => blog.title
  );
}

const search=(blogs,query)=>{
  return blogs.filter((blog) =>
  blog.title.toLowerCase().includes(query.toLowerCase())
)
}
module.exports = {fetchData,longest_title,privacyFilter, unique_blogs_filter,search}