import fs from 'fs';
import path from 'path';

/**
 * Sauvegarde une image base64 dans le système de fichiers
 * @param base64Data Données base64 de l'image (sans le préfixe data:image/...)
 * @param fileName Nom du fichier à sauvegarder
 * @returns Le chemin relatif vers l'image sauvegardée
 */
export const saveBase64Image = async (base64Data: string, fileName: string): Promise<string> => {
  try {
    // Extraire les données base64 si elles contiennent un préfixe
    let imageData = base64Data;
    if (base64Data.includes(',')) {
      imageData = base64Data.split(',')[1];
    }
    
    // Créer le chemin complet vers le fichier
    const publicDir = path.join(process.cwd(), 'public');
    console.log(`Public directory path: ${publicDir}`);
    
    const imgBlogDir = path.join(publicDir, 'img-blog');
    console.log(`Image blog directory path: ${imgBlogDir}`);
    
    const filePath = path.join(imgBlogDir, fileName);
    console.log(`Full file path: ${filePath}`);
    
    // Vérifier si le répertoire public existe
    if (!fs.existsSync(publicDir)) {
      console.log(`Public directory does not exist, creating: ${publicDir}`);
      try {
        fs.mkdirSync(publicDir, { recursive: true });
        console.log('Public directory created successfully');
      } catch (dirError) {
        console.error(`Error creating public directory: ${dirError}`);
        // Fallback: retourner une URL d'image par défaut
        return '/img-blog/default-post-image.jpg';
      }
    }
    
    // S'assurer que le répertoire img-blog existe
    if (!fs.existsSync(imgBlogDir)) {
      console.log(`Image blog directory does not exist, creating: ${imgBlogDir}`);
      try {
        fs.mkdirSync(imgBlogDir, { recursive: true });
        console.log('Image blog directory created successfully');
      } catch (dirError) {
        console.error(`Error creating img-blog directory: ${dirError}`);
        // Fallback: retourner une URL d'image par défaut
        return '/img-blog/default-post-image.jpg';
      }
    }
    
    // Convertir les données base64 en buffer et les écrire dans un fichier
    const buffer = Buffer.from(imageData, 'base64');
    
    try {
      fs.writeFileSync(filePath, buffer);
      console.log(`Image successfully saved to: ${filePath}`);
    } catch (writeError) {
      console.error(`Error writing image file: ${writeError}`);
      // Fallback: retourner une URL d'image par défaut
      return '/img-blog/default-post-image.jpg';
    }
    
    // Retourner le chemin relatif pour l'accès via URL
    return `/img-blog/${fileName}`;
  } catch (error) {
    console.error('Error in saveBase64Image:', error);
    // En cas d'erreur, retourner une URL d'image par défaut au lieu de lancer une exception
    return '/img-blog/default-post-image.jpg';
  }
};

/**
 * Détermine le type MIME d'une image à partir de ses données base64
 * @param base64Data Données base64 avec préfixe (data:image/...)
 * @returns Le type d'image (png, jpeg, gif, etc.)
 */
export const getImageTypeFromBase64 = (base64Data: string): string => {
  try {
    // Format attendu: data:image/png;base64,...
    const matches = base64Data.match(/^data:image\/([a-zA-Z0-9]+);base64,/);
    if (matches && matches.length > 1) {
      return matches[1];
    }
    return 'png'; // Type par défaut
  } catch (error) {
    console.error('Error determining image type:', error);
    return 'png'; // Type par défaut en cas d'erreur
  }
};
