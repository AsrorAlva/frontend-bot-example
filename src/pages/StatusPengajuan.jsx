import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import DataTable from '../components/Common/DataTable';
import { Search, Filter, Download } from 'lucide-react';
import { submissionData } from '../data/mockData';

const StatusPengajuan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const columns = [
    { header: 'ID Pengajuan', key: 'id' },
    { header: 'Nama Produk', key: 'namaProduk' },
    { header: 'Perusahaan', key: 'perusahaan' },
    { header: 'Status', key: 'status' },
    { header: 'Tanggal Pengajuan', key: 'tanggalPengajuan' },
    { header: 'Reviewer', key: 'reviewer' }
  ];

  const filteredData = submissionData.filter(item => {
    const matchesSearch = item.namaProduk.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.perusahaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Status Pengajuan Dokumen
          </CardTitle>
          <p className="text-sm text-gray-600">
            Pantau status pengajuan dokumen impor Anda
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari berdasarkan nama produk, perusahaan, atau ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Disetujui">Disetujui</SelectItem>
                  <SelectItem value="Ditolak">Ditolak</SelectItem>
                  <SelectItem value="Dalam Review">Dalam Review</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-green-800">Disetujui</p>
              <p className="text-2xl font-bold text-green-600">
                {submissionData.filter(item => item.status === 'Disetujui').length}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-red-800">Ditolak</p>
              <p className="text-2xl font-bold text-red-600">
                {submissionData.filter(item => item.status === 'Ditolak').length}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Dalam Review</p>
              <p className="text-2xl font-bold text-blue-600">
                {submissionData.filter(item => item.status === 'Dalam Review').length}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-orange-800">Pending</p>
              <p className="text-2xl font-bold text-orange-600">
                {submissionData.filter(item => item.status === 'Pending').length}
              </p>
            </div>
          </div>

          {/* Data Table */}
          <DataTable data={filteredData} columns={columns} />
          
          {filteredData.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Tidak ada data yang sesuai dengan filter yang dipilih.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusPengajuan;