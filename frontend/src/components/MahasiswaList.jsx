import React from 'react';

function MahasiswaList({ mahasiswa, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border-b">NIM</th>
            <th className="py-2 border-b">Nama</th>
            <th className="py-2 border-b">IPK</th>
            <th className="py-2 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((mhs) => (
            <tr key={mhs.nim}>
              <td className="py-2 text-center border-b">{mhs.nim}</td>
              <td className="py-2 text-center border-b">{mhs.nama}</td>
              <td className="py-2 text-center border-b">{mhs.ipk}</td>
              <td className="py-2 text-center border-b">
                <button
                  onClick={() => onEdit(mhs)}
                  className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(mhs.nim)}
                  className="px-2 py-1 text-white bg-red-500 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MahasiswaList;
