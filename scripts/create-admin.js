// scripts/create-admin.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connexion à MongoDB
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Définir le schéma User si ce n'est pas déjà fait dans votre application
    const UserSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      password: String,
      role: { type: String, default: 'user' }
    });

    // Utiliser le modèle existant ou en créer un nouveau
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Vérifier si l'utilisateur admin existe déjà
    const existingUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (existingUser) {
      console.log('Admin user already exists. Updating password...');
      
      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      
      // Mettre à jour l'utilisateur existant
      await User.updateOne(
        { email: process.env.ADMIN_EMAIL },
        { 
          $set: { 
            password: hashedPassword,
            role: 'admin'
          } 
        }
      );
      
      console.log('Admin password updated successfully');
    } else {
      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      
      // Créer un nouvel utilisateur admin
      const newAdmin = new User({
        name: 'Administrator',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin'
      });
      
      await newAdmin.save();
      console.log('Admin user created successfully');
    }

    // Fermer la connexion
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
