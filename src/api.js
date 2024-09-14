import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
   res.send("Hello World!, ini adalah API Kelompok 5 LAGOS!");
});

router.get("/kecepatan", (req, res) => {
   // rumus menghitung kecepatan
   const {s, t} = req.query;
   if (isNaN(s) || isNaN(t)) {
      return res.status(400).json({"ERROR": "Inputan/parameter harus berupa angka"});
   } else {
      
      const kecepatan = parseInt(s) / parseInt(t);
      res.json({
         "kecepatan": "jarak(s) m / waktu(t) detik",
         "Hasil": `${kecepatan} m/s`
      })
   }
});

export default router;

