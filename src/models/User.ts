import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser {
  email: string
  name: string
  image?: string
  emailVerified?: Date | null
  password?: string
}

const UserSchema = new mongoose.Schema<IUser>({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  image: String,
  emailVerified: {
    type: Date,
    default: null
  },
  password: String
}, {
  timestamps: true,
  strict: false // Allow additional fields from OAuth providers
})

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.comparePassword = async function(candidatePassword: string) {
  if (!this.password) return false
  return bcrypt.compare(candidatePassword, this.password)
}

// Remove password when converting to JSON
UserSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password
    return ret
  }
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
