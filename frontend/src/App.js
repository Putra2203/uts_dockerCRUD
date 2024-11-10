import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MahasiswaList from './components/MahasiswaList';
import MahasiswaForm from './components/MahasiswaForm';

function App() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const fetchMahasiswa = async () => {
    try {
      const response = await axios.get('http://localhost:3000/mahasiswa');
      setMahasiswa(response.data);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  const handleAddMahasiswa = async (data) => {
    try {
      await axios.post('http://localhost:3000/mahasiswa', data);
      fetchMahasiswa();
    } catch (error) {
      console.error('Gagal menambahkan mahasiswa:', error);
    }
  };

  const handleUpdateMahasiswa = async (nim, data) => {
    try {
      await axios.put(`http://localhost:3000/mahasiswa/${nim}`, data);
      fetchMahasiswa();
      setSelectedMahasiswa(null);
    } catch (error) {
      console.error('Gagal memperbarui data mahasiswa:', error);
    }
  };

  const handleDeleteMahasiswa = async (nim) => {
    try {
      await axios.delete(`http://localhost:3000/mahasiswa/${nim}`);
      fetchMahasiswa();
    } catch (error) {
      console.error('Gagal menghapus mahasiswa:', error);
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Data Mahasiswa</h1>
      <MahasiswaForm
        onAdd={handleAddMahasiswa}
        onUpdate={handleUpdateMahasiswa}
        selectedMahasiswa={selectedMahasiswa}
      />
      <MahasiswaList
        mahasiswa={mahasiswa}
        onEdit={setSelectedMahasiswa}
        onDelete={handleDeleteMahasiswa}
      />
    </div>
  );
}

export default App;
