import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this post'],
    maxlength: [150, 'Title cannot be more than 150 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide the content for this post'],
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide a short excerpt for this post'],
    maxlength: [500, 'Excerpt cannot be more than 500 characters'],
  },
  featuredImage: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    required: true,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Forcer la recompilation du modèle en ajoutant un timestamp
const modelName = 'Post';

// Supprimer le modèle s'il existe déjà pour forcer sa recompilation
if (mongoose.models && mongoose.models[modelName]) {
  delete mongoose.models[modelName];
}

export default mongoose.model(modelName, PostSchema)
