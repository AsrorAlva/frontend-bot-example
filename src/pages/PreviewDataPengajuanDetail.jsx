import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Eye, Edit, File, Send, FileText, Archive, Pencil, Play } from "lucide-react";

import { previewDataPengajuanDetail } from "@/data/mockData";

const PreviewDataPengajuanDetail = () => {
  const [csvData, setCsvData] = useState([]);
  const [zipData, setZipData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCsvData(previewDataPengajuanDetail.csvData);
    setZipData(previewDataPengajuanDetail.zipData);
    setLoading(false);
  }, []);

  const handleEditCSV = (id) => {
    alert(`Edit data CSV dengan ID: ${id}`);
  };

  const handleEditZIP = (id) => {
    alert(`Ganti dokumen ZIP dengan ID: ${id}`);
  };

  const handleViewZIP = (id) => {
    alert(`Preview dokumen ZIP ID: ${id}`);
  };

  const handleRunBot = () => {
    alert("Bot Automation dijalankan untuk pengajuan ini 🚀");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Detail Data Pengajuan
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center py-6 text-gray-500">Memuat data...</div>
          ) : (
            <>
              {/* === TABEL CSV === */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Data CSV
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-blue-600 text-white text-left">
                        <th className="py-3 px-4 w-16">No</th>
                        <th className="py-3 px-4">Nama Produk</th>
                        <th className="py-3 px-4">No Batch</th>
                        <th className="py-3 px-4">Tanggal</th>
                        <th className="py-3 px-4">Negara Asal</th>
                        <th className="py-3 px-4">Jumlah</th>
                        <th className="py-3 px-4 text-center w-32">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b hover:bg-blue-50 transition-all"
                        >
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">{item.namaProduk}</td>
                          <td className="py-3 px-4">{item.noBatch}</td>
                          <td className="py-3 px-4">{item.tanggal}</td>
                          <td className="py-3 px-4">{item.negaraAsal}</td>
                          <td className="py-3 px-4">{item.jumlah}</td>
                          <td className="py-3 px-4 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2 border-gray-300 mx-auto"
                              onClick={() => handleEditCSV(item.id)}
                            >
                              <Pencil className="w-4 h-4" /> Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* === TABEL ZIP === */}
              <div className="mb-10">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Archive className="w-5 h-5 text-blue-600" />
                  Dokumen ZIP
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-blue-600 text-white text-left">
                        <th className="py-3 px-4 w-16">No</th>
                        <th className="py-3 px-4">Nama ZIP</th>
                        <th className="py-3 px-4 text-center w-32">View</th>
                        <th className="py-3 px-4 text-center w-40">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {zipData.map((item, index) => (
                        <tr
                          key={item.id}
                          className="border-b hover:bg-blue-50 transition-all"
                        >
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">{item.namaZip}</td>
                          <td className="py-3 px-4 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2 border-gray-300 mx-auto"
                              onClick={() => handleViewZIP(item.id)}
                            >
                              <Eye className="w-4 h-4" /> View
                            </Button>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Button
                              size="sm"
                              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 mx-auto"
                              onClick={() => handleEditZIP(item.id)}
                            >
                              <Pencil className="w-4 h-4" /> Ganti Dokumen
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* === RUN BOT BUTTON === */}
              <div className="flex justify-end mt-8">
                <Button
                  onClick={handleRunBot}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-2 text-white"
                >
                  <Play className="w-5 h-5" /> Jalankan Bot Otomatis
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewDataPengajuanDetail;
