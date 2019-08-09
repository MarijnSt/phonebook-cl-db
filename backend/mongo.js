const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('add password')
    process.exit(1)
}

const pass = process.argv[2]

const url = `mongodb+srv://admin:${pass}@cluster0-ap0if.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const contactSchema = new mongoose.Schema({
    name: String,
    number: mongoose.Mixed
})

const Contact = mongoose.model('Contact', contactSchema)

const contactName = process.argv[3]
const contactNumber = process.argv[4]

const contact = new Contact({
    name: contactName,
    number: contactNumber
})

contact.save().then(result => {
    console.log(`added ${contactName} number ${contactNumber} to phonebook`)
    mongoose.connection.close()
})