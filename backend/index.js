// app.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dataPath = './data.json';

// Baca semua data mahasiswa
app.get('/mahasiswa', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send(err.message);
        res.send(JSON.parse(data));
    });
});

// Baca data mahasiswa berdasarkan NIM
app.get('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim;
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send(err.message);
        const mahasiswa = JSON.parse(data).find(mhs => mhs.nim === nim);
        if (mahasiswa) {
            res.send(mahasiswa);
        } else {
            res.status(404).send('Mahasiswa tidak ditemukan');
        }
    });
});

// Tambah data mahasiswa baru
app.post('/mahasiswa', (req, res) => {
    const mahasiswaBaru = req.body;
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send(err.message);
        const mahasiswa = JSON.parse(data);
        mahasiswa.push(mahasiswaBaru);
        fs.writeFile(dataPath, JSON.stringify(mahasiswa, null, 2), err => {
            if (err) return res.status(500).send(err.message);
            res.status(201).send('Mahasiswa berhasil ditambahkan');
        });
    });
});

// Update data mahasiswa berdasarkan NIM
app.put('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim;
    const updateData = req.body;
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send(err.message);
        const mahasiswa = JSON.parse(data);
        const index = mahasiswa.findIndex(mhs => mhs.nim === nim);
        if (index !== -1) {
            mahasiswa[index] = { ...mahasiswa[index], ...updateData };
            fs.writeFile(dataPath, JSON.stringify(mahasiswa, null, 2), err => {
                if (err) return res.status(500).send(err.message);
                res.send('Data mahasiswa berhasil diperbarui');
            });
        } else {
            res.status(404).send('Mahasiswa tidak ditemukan');
        }
    });
});

// Hapus data mahasiswa berdasarkan NIM
app.delete('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim;
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) return res.status(500).send(err.message);
        const mahasiswa = JSON.parse(data).filter(mhs => mhs.nim !== nim);
        fs.writeFile(dataPath, JSON.stringify(mahasiswa, null, 2), err => {
            if (err) return res.status(500).send(err.message);
            res.send('Data mahasiswa berhasil dihapus');
        });
    });
});

app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
