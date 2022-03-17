const mongoose = require('mongoose')
const { serializeInteger } = require('whatwg-url')
mongoose.connect('mongodb://localhost:27017/allocine')


const movieSchema = {
    'title' : String,
    'director' : String,
    'rate' : Number
}
const Movie = mongoose.model('Movie', movieSchema)


const theaterSchema = {
    'name' : String,
    'city' : String,
    'company' : String,
    'capacity' : Number
}
const Theater = mongoose.model('Theater', theaterSchema)


const showtimeSchema = {
    theater: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater' },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    showtime_day : Number,
    showtime_hour : Number,
    showtime_minutes : Number

}
const Showtime = mongoose.model('Showtime', showtimeSchema)


async function createNewTheater(theater){
    const newTheater = await Theater.create({
        'name' : theater.name,
        'city' : theater.city,
        'company' : theater.company,
        'capacity' : theater.capacity
    })
    console.log("New theater created", newTheater)
}


const moviesCollection = [
    {
        'title' : "The Batman",
        'director' : "Matt Reeves",
        'rate' : 10
    },
    {
        'title' : "Jujustu Kaizen",
        'director' : "Park Sung-ho",
        'rate' : "3.9"
    },
    {
        'title' : "Uncharted",
        'director' : "Ruben Fleischer",
        'rate' : 3.5
    }
]
async function createNewMovie(movie){
    const newMovie = await Movie.create({
        'title' : movie.title,
        'director' : movie.director,
        'rate' : movie.rate
    })
    console.log("New movie created", newMovie)
    return newMovie
}

function createNewMoviesCollection(moviesCollection){
    return moviesCollection.map(createNewMovie)
}

async function createNewMoviesCollectionBis(moviesCollection){
    await moviesCollection.forEach( async movie => {
         createNewMovie(movie)
    })
}

async function createNewShowtime(showtime){
    const newShowtime = await Showtime.create({
        'theater' : showtime.theater,
        'movie' : showtime.movie,
        'showtime_day' : showtime.showtime_day,
        'showtime_hour' : showtime.showtime_hour,
        'showtime_minutes' : showtime.showtime_minutes
    })
    console.log("New shwotime created", newShowtime)
    return newShowtime
}


async function addShowtime(movieTitle, theaterName, day, hour, minutes){
    const movie = await Movie.findOne({title : movieTitle})
    if(!movie){
        console.log("Movie : Could not find" , movieTitle)
        return 
    }
    console.log('searched movie',movie)
    const theater = await Movie.findOne({name : theaterName})
    if(!theater){
        console.log("Theater: Could not find" , theaterName)
        return 
    }
    console.log('searched theater',theater)
    await createNewShowtime({
        theater: theater._id,
        movie: movie._id,
        showtime_day : day,
        showtime_hour : hour,
        showtime_minutes : minutes
    })
}



async function buildDatabase(){
    await Movie.deleteMany()  
    await Theater.deleteMany()  
    await createNewTheater({
        'name' : "Pathe So Ouest",
        'city' : "Levallois",
        'company' : "Gaumont Pathe",
        'capacity' : "1000"
    })
    await Promise.all(createNewMoviesCollection(moviesCollection))
    //await createNewMoviesCollectionBis(moviesCollection)
    addShowtime ("The Batman", "Pathe So Ouest" , "3", "16", "45")

}

buildDatabase()



