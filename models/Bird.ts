import mongoose, { Schema, model, models } from 'mongoose';

const BirdSchema = new Schema({
  name: {
    ar: { type: String, required: true },
    he: { type: String, required: true },
  },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  features: [{ type: String, enum: ['eggs', 'meat', 'ornamental'] }],
  type: { 
    type: String, 
    required: true,
    enum: ['duck', 'goose', 'chicken', 'turkey', 'birds', 'eggs']
  },
}, { timestamps: true });

const Bird = models.Bird || model('Bird', BirdSchema);

export default Bird;
