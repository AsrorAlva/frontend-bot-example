import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileUploader from '@/components/Upload/FileUploader';
import { useToast } from '@/hooks/use-toast';

const FormUpload = () => {
  const [formData, setFormData] = useState({
    namaPerusahaan: '',
    alamatPerusahaan: '',
    nomorIzin: '',
    namaProduk: '',
    jenisBarang: '',
    negaraAsal: '',
    pemasok: '',
    spesifikasiTeknis: '',
    keterangan: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Formulir Berhasil Dikirim",
      description: "Dokumen Anda telah berhasil diajukan dan akan segera diproses.",
      duration: 5000,
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Data Perusahaan */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              📋 Data Perusahaan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="namaPerusahaan">Nama Perusahaan *</Label>
                <Input
                  id="namaPerusahaan"
                  value={formData.namaPerusahaan}
                  onChange={(e) => handleInputChange('namaPerusahaan', e.target.value)}
                  placeholder="PT. Contoh Perusahaan"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomorIzin">Nomor Izin BPOM *</Label>
                <Input
                  id="nomorIzin"
                  value={formData.nomorIzin}
                  onChange={(e) => handleInputChange('nomorIzin', e.target.value)}
                  placeholder="NA18240100001"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="alamatPerusahaan">Alamat Perusahaan *</Label>
              <Textarea
                id="alamatPerusahaan"
                value={formData.alamatPerusahaan}
                onChange={(e) => handleInputChange('alamatPerusahaan', e.target.value)}
                placeholder="Jl. Contoh No. 123, Jakarta"
                className="min-h-[80px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Impor */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              🌍 Data Impor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="namaProduk">Nama Produk *</Label>
                <Input
                  id="namaProduk"
                  value={formData.namaProduk}
                  onChange={(e) => handleInputChange('namaProduk', e.target.value)}
                  placeholder="Serum Wajah Vitamin C"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Jenis Barang *</Label>
                <Select onValueChange={(value) => handleInputChange('jenisBarang', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis barang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kosmetik">Kosmetik</SelectItem>
                    <SelectItem value="obat">Obat</SelectItem>
                    <SelectItem value="suplemen">Suplemen</SelectItem>
                    <SelectItem value="makanan">Makanan Olahan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="negaraAsal">Negara Asal *</Label>
                <Input
                  id="negaraAsal"
                  value={formData.negaraAsal}
                  onChange={(e) => handleInputChange('negaraAsal', e.target.value)}
                  placeholder="Korea Selatan"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pemasok">Nama Pemasok *</Label>
                <Input
                  id="pemasok"
                  value={formData.pemasok}
                  onChange={(e) => handleInputChange('pemasok', e.target.value)}
                  placeholder="ABC Beauty Co. Ltd"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Teknis */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              🔬 Data Teknis Barang
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="spesifikasiTeknis">Spesifikasi Teknis *</Label>
              <Textarea
                id="spesifikasiTeknis"
                value={formData.spesifikasiTeknis}
                onChange={(e) => handleInputChange('spesifikasiTeknis', e.target.value)}
                placeholder="Mengandung Vitamin C 20%, Hyaluronic Acid, dan Niacinamide..."
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="keterangan">Keterangan Tambahan</Label>
              <Textarea
                id="keterangan"
                value={formData.keterangan}
                onChange={(e) => handleInputChange('keterangan', e.target.value)}
                placeholder="Informasi tambahan tentang produk (opsional)"
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Upload Dokumen */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              📁 Upload Dokumen
            </CardTitle>
            <p className="text-sm text-gray-600">
              Upload dokumen yang diperlukan untuk proses verifikasi
            </p>
          </CardHeader>
          <CardContent>
            <FileUploader 
              multiple={true}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              maxSize={10}
            />
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Dokumen yang diperlukan:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Certificate of Analysis (CoA)</li>
                <li>• Manufacturing License</li>
                <li>• Free Sale Certificate</li>
                <li>• Product Specification</li>
                <li>• Label dan Kemasan Produk</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Simpan Draft
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Kirim Pengajuan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormUpload;