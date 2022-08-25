const express = require('express');
require('./db/mongoose');

// Creating initial app
const app = express();
const port = process.env.PORT || 8000;

// Routers
const userRouter = require('./routers/users');

app.use(express.json());
app.use(userRouter);


app.listen(port, () => {
    console.log('Server is up! Listening port: ' + port);
});

