const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors({
    origin: "*"
}));

app.get("/api/phones", (req, res) => {
    fs.readFile("./phones.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Gagal membaca data"
            });
        }

        res.json(JSON.parse(data));
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server berjalan");
});
