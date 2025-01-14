import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

// Define __dirname for ESM.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer storage
const photoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images')); // Save images to the "images" folder
  },
  filename: function (req, file, cb) {
    if (file) {
      // Generate a unique filename with the current timestamp
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
  }
});

// Configure multer upload
const photoUpload = multer({
  storage: photoStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true); // Allow image files
    } else {
      cb({ message: 'Unsupported file format' }, false); // Reject non-image files
    }
  },
  limits: { fileSize: 1024 * 1024 } // Set file size limit to 1MB
});

export { photoUpload };
