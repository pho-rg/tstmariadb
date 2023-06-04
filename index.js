const express = require('express');
const dotenv = require('dotenv');

//fichier de variable d environnement
dotenv.config({path: '.env-local'});

//port
const PORT = process.env.PORT || '3001';
const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.get('/', (req, res) => {
	res.status(200).json({name:'ph', doing:'projet'})
})

const userRouter = require('./routes/user');

app.use('/user',userRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})