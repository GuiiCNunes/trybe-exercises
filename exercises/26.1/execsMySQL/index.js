const { application } = require('express');
const express = require('express');
const userRoute = require('./routes/userRoute');

const app = express();

app.use(express.json());

app.use('/user', userRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Ouvindo a porta ${PORT}`);
});
