import React, { useState, useEffect } from 'react';

function MahasiswaForm({ onAdd, onUpdate, selectedMahasiswa }) {
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [ipk, setIpk] = useState('');

  useEffect(() => {
    if (selectedMahasiswa) {
      setNim(selectedMahasiswa.nim);
      setNama(selectedMahasiswa.nama);
      setIpk(selectedMahasiswa.ipk);
    }
  }, [selectedMahasiswa]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mahasiswaData = { nim, nama, ipk };
    if (selectedMahasiswa) {
      onUpdate(selectedMahasiswa.nim, mahasiswaData);
    } else {
      onAdd(mahasiswaData);
    }
    setNim('');
    setNama('');
    setIpk('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block">NIM</label>
        <input
          type="text"
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          className="w-full p-2 border"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Nama</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full p-2 border"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">IPK</label>
        <input
          type="number"
          value={ipk}
          onChange={(e) => setIpk(e.target.value)}
          step="0.01"
          min="0"
          max="4"
          className="w-full p-2 border"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
      >
        {selectedMahasiswa ? 'Update' : 'Add'}
      </button>
    </form>
  );
}

export default MahasiswaForm;
