import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DataTable from '@/components/Common/DataTable';
import { Plus, Search, UserPlus } from 'lucide-react';
import { userData } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({
    nama: '',
    email: '',
    role: '',
    status: 'Aktif'
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Nama', key: 'nama' },
    { header: 'Email', key: 'email' },
    { header: 'Role', key: 'role' },
    { header: 'Status', key: 'status' },
    { header: 'Last Login', key: 'lastLogin' }
  ];

  const filteredData = userData.filter(user => 
    user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.nama || !newUser.email || !newUser.role) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Semua field wajib diisi.",
      });
      return;
    }

    toast({
      title: "User Berhasil Ditambahkan",
      description: `User ${newUser.nama} telah berhasil ditambahkan.`,
    });
    
    setNewUser({ nama: '', email: '', role: '', status: 'Aktif' });
    setDialogOpen(false);
  };

  const roleStats = {
    admin: userData.filter(u => u.role === 'Admin').length,
    verifikator: userData.filter(u => u.role === 'Verifikator').length,
    user: userData.filter(u => u.role === 'User').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{userData.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admin</p>
                <p className="text-2xl font-bold text-red-600">{roleStats.admin}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verifikator</p>
                <p className="text-2xl font-bold text-blue-600">{roleStats.verifikator}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">User</p>
                <p className="text-2xl font-bold text-green-600">{roleStats.user}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Manajemen User
              </CardTitle>
              <p className="text-sm text-gray-600">
                Kelola pengguna sistem e-BPOM
              </p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah User Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap *</Label>
                    <Input
                      id="nama"
                      value={newUser.nama}
                      onChange={(e) => setNewUser(prev => ({...prev, nama: e.target.value}))}
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser(prev => ({...prev, email: e.target.value}))}
                      placeholder="user@bpom.go.id"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role *</Label>
                    <Select onValueChange={(value) => setNewUser(prev => ({...prev, role: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Verifikator">Verifikator</SelectItem>
                        <SelectItem value="User">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select 
                      value={newUser.status}
                      onValueChange={(value) => setNewUser(prev => ({...prev, status: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setDialogOpen(false)}
                    >
                      Batal
                    </Button>
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={handleAddUser}
                    >
                      Tambah User
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari berdasarkan nama, email, atau role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Data Table */}
          <DataTable data={filteredData} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;