import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FormUpload = () => {
  const { toast } = useToast();
  const [csvFile, setCsvFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);

  // Fungsi handle upload file
  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = type === 'csv' ? 5 : 50; // MB
    const isValidType =
      (type === 'csv' && file.name.endsWith('.csv')) ||
      (type === 'zip' && file.name.endsWith('.zip'));

    if (!isValidType) {
      toast({
        title: "Format File Tidak Sesuai",
        description: `File ${type.toUpperCase()} harus berformat .${type}`,
        variant: "destructive",
      });
      return;
    }

    if (file.size / 1024 / 1024 > maxSize) {
      toast({
        title: "Ukuran File Terlalu Besar",
        description: `Maksimal ${maxSize} MB untuk file ${type.toUpperCase()}`,
        variant: "destructive",
      });
      return;
    }

    if (type === 'csv') setCsvFile(file);
    else setZipFile(file);
  };

  const navigate = useNavigate();
  // Fungsi submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!csvFile || !zipFile) {
      toast({
        title: "Upload Belum Lengkap",
        description: "Pastikan Anda sudah mengunggah file CSV dan ZIP.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Upload Berhasil 🎉",
      description: "Data CSV dan ZIP berhasil diunggah. Sistem akan memproses pengajuan Anda.",
      duration: 5000,
    });

    // Reset form
    setCsvFile(null);
    setZipFile(null);

    navigate('/preview-data');
  };

  return (
    <div className="w-full p-8 bg-gray-50 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* 📘 Div 1: Panduan Upload */}
        <Card className="w-full bg-white border border-gray-200 shadow-md rounded-2xl">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              📘 Panduan Upload Dokumen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-gray-700 text-base leading-relaxed pt-4">
            <p>
              Sebelum melakukan proses upload, pastikan folder <b>CSV</b> dan <b>ZIP</b> sudah disiapkan dengan format yang benar.
            </p>
            <p>
              Berikut adalah <b>template Excel</b> yang digunakan untuk pengisian data — jangan lupa ubah formatnya ke <b>CSV (Comma Delimited)</b> sebelum diunggah ke sistem.
            </p>
            <p>
              Berikut adalah panduan lengkap melalui <b>video tutorial</b> agar proses upload berjalan dengan lancar.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button variant="outline" type="button" className="px-5 py-2">
                📥 Download Template Excel
              </Button>
              <Button variant="secondary" type="button" className="px-5 py-2">
                🎥 Lihat Video Tutorial
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 📄 Div 2: Upload CSV */}
        <Card className="w-full bg-white border border-gray-200 shadow-md rounded-2xl">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              📄 Upload File CSV
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <label
              htmlFor="csvUpload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all"
            >
              <Upload className="w-10 h-10 text-gray-500 mb-3" />
              <span className="text-gray-700 text-sm font-medium">
                Klik atau seret file CSV ke sini
              </span>
              <span className="text-xs text-gray-500 mt-1">(Maksimal 5 MB)</span>
              <input
                id="csvUpload"
                type="file"
                accept=".csv"
                onChange={(e) => handleFileUpload(e, 'csv')}
                className="hidden"
              />
            </label>

            {csvFile && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm flex justify-between items-center">
                ✅ File CSV terpilih: <b>{csvFile.name}</b>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCsvFile(null)}
                  className="text-red-600 hover:text-red-700"
                >
                  Hapus
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 📦 Div 3: Upload ZIP */}
        <Card className="w-full bg-white border border-gray-200 shadow-md rounded-2xl">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              📦 Upload File ZIP
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <label
              htmlFor="zipUpload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all"
            >
              <Upload className="w-10 h-10 text-gray-500 mb-3" />
              <span className="text-gray-700 text-sm font-medium">
                Klik atau seret file ZIP ke sini
              </span>
              <span className="text-xs text-gray-500 mt-1">(Maksimal 50 MB)</span>
              <input
                id="zipUpload"
                type="file"
                accept=".zip"
                onChange={(e) => handleFileUpload(e, 'zip')}
                className="hidden"
              />
            </label>

            {zipFile && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm flex justify-between items-center">
                ✅ File ZIP terpilih: <b>{zipFile.name}</b>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setZipFile(null)}
                  className="text-red-600 hover:text-red-700"
                >
                  Hapus
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tombol Aksi */}
        <div className="flex justify-end pt-4 space-x-4">
          <Button type="button" variant="outline" className="px-6 py-2">
            Simpan Draft
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            Kirim Pengajuan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormUpload;
