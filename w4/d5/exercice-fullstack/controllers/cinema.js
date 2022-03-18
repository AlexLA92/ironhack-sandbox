import Cinema from '../models/Cinema.js'

async function getCinemas(request, response, next) {
  const cinemas = await Cinema.find()
  console.log(cinemas)
  response.render('cinemas', {cinemas})
}

async function createCinema(request, response, next) {
  
  const {name, city , postal_code} =  request.body

  const newCinema = {
    name, 
    address :{
      city,
      postal_code
    }
  }
  
  const newCinemaDocument = await Cinema.create(newCinema)
  
  const cinemas = await Cinema.find()
  response.render('cinemas', {cinemas})
}

async function getCinema(request, response, next) {
    
  let id = request.params.id
  console.log('id',id)

  const cinema = await Cinema.findById(id)
  console.log('cinema',cinema)
  response.render('cinema', {cinema})
}

async function editCinema(request, response, next) {
  
  let id = request.params.id

  const {name, city , postal_code} =  request.body

  const updatedCinema = {
    name, 
    address :{
      city,
      postal_code
    }
  }
  console.log(updatedCinema)
  
  const updatedCinemaDocument = await Cinema.findByIdAndUpdate(id, updatedCinema, {new:true})
  
  response.render('cinema', {cinema : updatedCinemaDocument})
}

async function searchCinemas(request, response, next) {
  
  let { q } = request.query

  let term = new RegExp(q)

  const cinemas = await Cinema.find( { name : term })

  console.log(cinemas)
    
  response.render('search', {cinemas })
}

export { getCinemas , createCinema ,getCinema, editCinema , searchCinemas}
