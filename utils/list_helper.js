const {json} = require("express");
const dummy = (blogs) => {
    return 1
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
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikes
}

