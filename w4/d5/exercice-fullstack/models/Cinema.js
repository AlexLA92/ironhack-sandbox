import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  city: String,
  postal_code: String
})

const schema = new mongoose.Schema({
  name: { type: String, unique: true },
  address: addressSchema,
})

const Cinema = mongoose.model('Cinema', schema)

export default Cinema
