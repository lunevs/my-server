const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObj = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObj.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is contain id field', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(el => {
        expect(el.id).toBeDefined()
    })
})




describe('total likes', () => {

    test('when list has only one blog, equals the likes of that', () => {
        const result = helper.totalLikes( [helper.initialBlogs[0]])
        expect(result).toBe(5)
    })

    test('when list has more blogs, equals the likes of that', () => {
        const result = helper.totalLikes(helper.initialBlogs)
        expect(result).toBe(32)
    })

    test('when list has more blogs, post with max likes', () => {
        const result = helper.favoriteBlog(helper.initialBlogs)
        expect(result).toBe("{\"title\":\"Some new title\",\"author\":\"New cool author\",\"likes\":12}")
    })

    test('when list has more blogs, most likes author', () => {
        const result = helper.mostLikes(helper.initialBlogs)
        expect(result).toBe(
            JSON.stringify({
                author:"Edsger W. Dijkstra",
                likes: 13
            })
        )
    })
})

afterAll(() => {
    mongoose.connection.close()
})