const fs = require('fs');
const path = require('path');

// Fonction pour créer un SVG d'avatar simple avec des initiales
function generateAvatar(index, color) {
  const colors = [
    '#4F46E5', // Indigo
    '#7C3AED', // Violet
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#10B981'  // Emerald
  ];
  
  const selectedColor = color || colors[index % colors.length];
  const initials = String.fromCharCode(65 + index) + String.fromCharCode(65 + (index + 5) % 26);
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <rect width="100" height="100" fill="${selectedColor}" />
    <text x="50" y="50" font-family="Arial" font-size="35" fill="white" text-anchor="middle" dominant-baseline="central" font-weight="bold">${initials}</text>
  </svg>`;
}

// Créer le dossier testimonials s'il n'existe pas
const testimonialsDir = path.join(__dirname, '../public/testimonials');
if (!fs.existsSync(testimonialsDir)) {
  fs.mkdirSync(testimonialsDir, { recursive: true });
}

// Générer 5 avatars
for (let i = 1; i <= 5; i++) {
  const svgContent = generateAvatar(i - 1);
  const filePath = path.join(testimonialsDir, `user${i}.svg`);
  fs.writeFileSync(filePath, svgContent);
  console.log(`Avatar ${i} créé: ${filePath}`);
}

console.log('Génération des avatars terminée!');
