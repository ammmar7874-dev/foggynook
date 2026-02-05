import logo from '../assets/logo.jpg'; // We need to copy this asset later

export const getImageUrl = (imagePath) => {
    if (!imagePath) return logo;

    // If it's a web URL
    if (imagePath.startsWith('http')) {
        return imagePath;
    }

    // If it's Base64 (starts with /9j/ or we just assume long string is base64)
    // Usually base64 needs prefix like data:image/jpeg;base64,
    // But our flutter app stores raw base64 string without prefix? 
    // Wait, Flutter's Image.memory takes raw bytes. Web needs prefix.
    // I will check if the stored string has prefix. If not, I'll add jpeg prefix as default.

    if (imagePath.length > 500) {
        if (imagePath.startsWith('data:image')) {
            return imagePath;
        }
        return `data:image/jpeg;base64,${imagePath}`;
    }

    return logo;
};
