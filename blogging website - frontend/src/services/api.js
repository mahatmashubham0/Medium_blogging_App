const BASE_URL = "http://localhost:3300/api/v1"
// process.env.REACT_APP_BASE_URL

export const auth = {
    signup_api: BASE_URL + '/signup',
    login_api: BASE_URL + '/login',
    image_api: BASE_URL + '/upoloadimage',
    create_blog_api: BASE_URL + '/createBlog',
    fetchBlogs_api: BASE_URL + '/getallblogs'
}
