import multer from 'multer';
import path from 'path';
const upload = multer({
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  limits: { fileSize: 2 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename(req, file, callback) {
      const fileName = `${Date.now()}${file.originalname}`;
      callback(null, fileName);
    },
  }),
});
export { upload };
