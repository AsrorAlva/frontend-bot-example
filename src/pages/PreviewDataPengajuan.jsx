import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, Edit, File, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { previewDataPengajuan } from "@/data/mockData";


const PreviewDataPengajuan = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Simulasi ambil data dari backend setelah submit
useEffect(() => {
  setData(previewDataPengajuan);
  setLoading(false);
}, []);

const handleView = (id) => {
navigate(`/preview-data/detail/${id}`);
};

  const handleAjukan = (id) => {
    // logika untuk lanjut proses otomatis e-BPOM
    alert(`Proses pengajuan ID: ${id} dikirim ke e-BPOM`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Preview Data Pengajuan
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-6 text-gray-500">Memuat data...</div>
          ) : data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white text-left">
                    <th className="py-3 px-4 w-16">No</th>
                    <th className="py-3 px-4">Nama Pengajuan</th>
                    <th className="py-3 px-4 text-center w-40">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-blue-50 transition-all"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{item.nama}</td>
                      <td className="py-3 px-4 flex justify-center gap-3">
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 border-gray-300"
                          onClick={() => handleView(item.id)}
                        >
                          <Eye className="w-4 h-4" /> View
                        </Button>
                        <Button
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                          onClick={() => handleAjukan(item.id)}
                        >
                          <Send className="w-4 h-4" /> Ajukan
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              Belum ada data yang diupload.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewDataPengajuan;
