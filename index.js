require('dotenv').config();
const express = require('express')
const { PrismaClient} = require('./generated/prisma')

const prisma = new PrismaClient();
const app = express()

//json
app.use(express.json())

//cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

//test API
app.get('/test', (req, res) => {
    try{
        res.status(200).json({message: 'API is working!'})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//get all users
app.get('/users', async(req, res) => {
    try{
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//get user by id
app.get('/users/:id', async(req, res) => {
    try{
        const user = await prisma.user.findUnique({
            where:{
                id: Number(req.params.id),
            }
        })
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//create a user
app.post('/users', async(req, res) => {
    try{
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email
            },
        });
        res.status(201).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update a user
app.put('/users/:id', async(req, res) => {
    try{
        const user = await prisma.user.update({
            where:{
                id: Number(req.params.id),
            },
            data: {
                name: req.body.name,
                email: req.body.email
            },
        });
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//delete a user
app.delete('/users/:id', async(req, res) => {
    try{
        const user = await prisma.user.delete({
            where:{
                id: Number(req.params.id),
            },
        });
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));