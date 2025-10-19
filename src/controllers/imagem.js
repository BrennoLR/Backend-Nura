import express from "express";
import multer from "multer";
import path from "path";
import pg from "pg";

const app = express();
const pool = new pg.Pool({
  connectionString: process.env.CHAVE_BANCODEDADOS, 
  ssl: { rejectUnauthorized: false }
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

app.post("/createcamp", upload.single("imagem"), async (req, res) => {
  try {
    const { cam_nome, cam_desc, cam_codigo } = req.body;
    const cam_img = `/uploads/${req.file.filename}`;

    if (cam_codigo) {
      await pool.query(
        [cam_nome, cam_desc, cam_img]
      );
    } else {
      await pool.query(
        [cam_nome, cam_desc, cam_img]
      );
    }

    res.json({ success: true, url: cam_img });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao salvar campanha" });
  }
});