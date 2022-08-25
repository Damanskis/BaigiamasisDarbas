const mongoose = require('mongoose');
const appName = 'profiles'
const url = `mongodb://127.0.0.1:27017/${appName}`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})