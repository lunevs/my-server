const mongoose = require('mongoose')

const url = `mongodb://ichtus:qwe123@127.0.0.1:27017/ichtusDB?directConnection=true&serverSelectionTimeoutMS=2000`
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})
const Person = mongoose.model('Person', noteSchema)

let persons = []

if (process.argv.length === 4) {
    const name = process.argv[2]
    const number = process.argv[3]
    console.log("adding new person", name, number)

    const person = new Person({
        id: Math.floor(Math.random()*1000000),
        name: name,
        number: number,
    })
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })

} else if (process.argv.length === 2) {
    Person.find({}).then(result => {
        result.forEach(p => {
            console.log(p)
            persons = persons.concat(p)
        })
        console.log("all persons", persons)
        mongoose.connection.close()
        console.log("connection closed")
    })

} else {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    mongoose.connection.close()
    process.exit(1)
}




