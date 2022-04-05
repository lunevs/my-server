const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    const listWithMoreBlogs =[
        ...listWithOneBlog,
        {
            _id: '5a422aa71b54a676434d17f8',
            title: 'Some new title',
            author: 'New cool author',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 12,
            __v: 0
        },
        {
            _id: '5a422aa71b54a636234d17f8',
            title: 'Some new title 2',
            author: 'New cool author 2',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a636234d17f9',
            title: 'Some new title 3',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 12,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has 3 blogs, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithMoreBlogs)
        expect(result).toBe(34)
    })

    test('when list has 3 blogs, post with max likes', () => {
        const result = listHelper.favoriteBlog(listWithMoreBlogs)
        expect(result).toBe("{\"title\":\"Some new title\",\"author\":\"New cool author\",\"likes\":12}")
    })

    test('when list has 3 blogs, most likes author', () => {
        const result = listHelper.mostLikes(listWithMoreBlogs)
        expect(result).toBe(
            JSON.stringify({
                author:"Edsger W. Dijkstra",
                likes:17
            })
        )
    })
})