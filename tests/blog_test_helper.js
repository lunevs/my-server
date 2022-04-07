const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        title: 'Some new title',
        author: 'New cool author',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12,
    },
    {
        title: 'Some new title 3.0',
        author: 'New cool author 3.0',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 7,
    },
    {
        title: 'Some new title 2.0',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 8,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'anybody', url: 'http://localhost', likes: 0 })
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}


const totalLikes = (blogs) => {
    const reducer = (sum, item) => sum + item
    return blogs.map(el => el.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max( ...blogs.map(el => el.likes))
    const firstPostWithMaxLikes = blogs.find(el => el.likes === maxLikes)
    return JSON.stringify({
        title: firstPostWithMaxLikes.title,
        author: firstPostWithMaxLikes.author,
        likes: firstPostWithMaxLikes.likes
    })
}

const mostLikes = (blogs) => {
    const reducer = (sum, item) => sum + item
    let authors = []
    blogs.map(el => {
        const tmp = {
            author: el.author,
            likes: 0
        }
        authors = authors.concat(tmp)
    })
    authors.forEach(a_el => {
        a_el.likes = blogs.filter(blog => blog.author === a_el.author).map(blog => blog.likes).reduce(reducer, 0)
    })
    const maxLikes = Math.max(...authors.map(a => a.likes))
    const res = authors.find(el => el.likes === maxLikes)
    return JSON.stringify(res)
}


module.exports = {
    initialBlogs, nonExistingId, blogsInDb, totalLikes, favoriteBlog, mostLikes
}