import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
   res.send("Hello World!, ini adalah API Kelompok 5 LAGOS!");
});

// Fungsi untuk menghitung kecepatan
router.get("/kecepatan", (req, res) => {
   const {s, t} = req.query;
   if (!s || !t) {
      return res.status(400).json({"ERROR": "Parameter kosong / tidak lengkap"});
   } else {
      if (isNaN(s) || isNaN(t)) {
         return res.status(400).json({"ERROR": "Inputan/parameter harus berupa angka"});
      } else {
         
         const kecepatan = parseInt(s) / parseInt(t);
         res.json({
            "kecepatan": "jarak(s) m / waktu(t) detik",
            "Hasil": `${kecepatan} m/s`
         });
      };
   };
});

//konversi manual dari rupiah ke dollar
const conversionRate = 0.000065; //1 rupiah = 0.000065 dollar

// API untuk konversi rupiah ke dollar
router.get("/rupiahToDollar", (req, res) => {
   const {rupiah} = req.query;
   if (!rupiah) {
      return res.status(400).json({"ERROR": "Tidak ada parameter yang diberikan"});
   } else {
      if (isNaN(rupiah)) {
         return res.status(400).json({"ERROR": "Inputan/parameter harus berupa angka"});
      } else {
         const dollar = parseInt(rupiah) * conversionRate;
         res.json({
            "konversi": "rupiah -> dollar",
            "Hasil": `Rp.${rupiah} = $${dollar.toFixed(2)}`
         });
      };
   };
});

// API untuk konversi dollar ke rupiah
router.get("/dollarToRupiah", (req, res) => {
   const {dollar} = req.query;
   if (!dollar) {
      return res.status(400).json({"ERROR": "Tidak ada parameter yang diberikan"});
   } else{
      if (isNaN(dollar)) {
         return res.status(400).json({"ERROR": "Inputan/parameter harus berupa angka"});
      } else {
         const rupiah = parseInt(dollar) / conversionRate;
         res.json({
            "konversi": "dollar -> rupiah",
            "Hasil": `$${dollar} = Rp.${rupiah.toFixed(2)}`
         });
      };
   };
});

// Fungsi untuk menentukan status berat badan
const getStatusBB = (bmi) => {
  if (bmi < 18.5) {
    return 'Berat badan kurang';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Berat badan normal';
  } else {
    return 'Berat badan lebih';
  }
};

//API untuk menentukan status berat badan berdasarkan standar rumus broca dan BMI
router.get("/beratBadan", (req, res) => {
   const {gender, tinggi, berat} = req.query;
   if (!gender || !tinggi || !berat) {
      return res.status(400).json({"ERROR": "Parameter kosong / tidak lengkap"});
   } else {
      if (isNaN(tinggi) || isNaN(berat)) {
         return res.status(400).json({"ERROR": "berat & tinggi badan harus berupa angka"});
      } else {
         if (gender === "laki-laki") {
            const beratIdeal = parseInt(tinggi) - 100 - ((parseInt(tinggi) - 100) * 0.1);
            const heightInMeter = parseInt(tinggi) / 100;
            const BMI = parseInt(berat) / (heightInMeter * heightInMeter);
            const status = getStatusBB(BMI);
            res.json({
               "Gender": "laki-laki",
               "Berat Badan Ideal": `${beratIdeal} kg`,
               "BMI": BMI,
               "Status": status
            });
         } else if (gender === "perempuan") {
            const beratIdeal = parseInt(tinggi) - 100 - ((parseInt(tinggi) - 100) * 0.15);
            const heightInMeter = parseInt(tinggi) / 100;
            const BMI = parseInt(berat) / (heightInMeter * heightInMeter);
            const status = getStatusBB(BMI);
            res.json({
               "Gender": "perempuan",
               "Berat Badan Ideal": `${beratIdeal} kg`,
               "BMI": BMI,
               "Status": status
            });
         }
      }
   }
});

//API untuk menghitung umur
router.get("/umur", (req, res) => {
   const {thn, bln, tgl} = req.query;
   const tahunIni = new Date().getFullYear();
   if (!thn || !bln || !tgl) {
      return res.status(400).json({"ERROR": "Parameter kosong / tidak lengkap"});
   } else {
      if (isNaN(thn) || isNaN(bln) || isNaN(tgl)) {
         return res.status(400).json({"ERROR": "Inputan/parameter harus berupa angka"});
      } else {
         if (bln < 1 || bln > 12 || tgl < 1 || tgl > 31 || thn > tahunIni) {
            return res.status(400).json({"ERROR": "Inputan/parameter tidak valid"});
         } else {
            const today = new Date();
            const birthDate = new Date(thn, bln - 1, tgl);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
               age--; 
            };
            res.json({
               "Tanggal Lahir": `${thn}-${bln}-${tgl}`,
               "Umur": `${age} tahun`
            });
         }
      }
   }
});

export default router;

