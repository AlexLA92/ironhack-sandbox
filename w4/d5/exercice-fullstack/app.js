import mongoose from 'mongoose'
import express from 'express'
import hbs from 'hbs'

import { getCinemas , createCinema, getCinema, editCinema, searchCinemas} from './controllers/cinema.js'

mongoose.connect('mongodb://localhost:27017/webdev')

const app = express()

app.use(express.urlencoded({extended:true}))

app.set('view engine', 'hbs');


app.get('/cinemas', getCinemas)
app.post('/cinemas', createCinema)
app.get('/cinema/:id', getCinema)
app.post('/cinema/:id', editCinema)
app.get('/search', searchCinemas)

app.listen('3000', () => console.log('listening'))


