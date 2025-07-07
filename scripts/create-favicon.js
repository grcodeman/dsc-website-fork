const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createFavicon() {
  try {
    // Path to the source JPEG image
    const inputPath = path.join(__dirname, '../public/dsc_logo.jpeg');
    // Path to save the favicon.ico
    const outputPath = path.join(__dirname, '../public/favicon.ico');
    
    // Resize to 32x32 (standard favicon size) and convert to ICO
    await sharp(inputPath)
      .resize(32, 32)
      .toFile(outputPath.replace('.ico', '.png'));
    
    console.log('Favicon created successfully!');
    console.log('Note: Since sharp cannot directly output .ico format, we\'ve created a PNG.');
    console.log('You\'ll need to manually convert this to ICO using a tool like https://convertio.co/png-ico/');
    
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon();
