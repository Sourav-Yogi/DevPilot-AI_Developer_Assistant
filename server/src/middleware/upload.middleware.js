import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/temp";

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage,

    limits: {
        fileSize: 100 * 1024 * 1024, // 100 MB
    },

    fileFilter(req, file, cb) {
        if (
            file.mimetype === "application/zip" ||
            file.originalname.endsWith(".zip")
        ) {
            cb(null, true);
        } else {
            cb(new Error("Only ZIP files are allowed."));
        }
    },
});

export default upload;