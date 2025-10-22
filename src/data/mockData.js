// Mock data for e-BPOM Automation Dashboard

export const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/',
    role: 'all'
  },
  {
    id: 'pengajuan',
    title: 'Pengajuan',
    icon: 'FileText',
    role: 'all',
    submenu: [
      {
        id: 'form-upload',
        title: 'Formulir & Upload Dokumen',
        path: '/pengajuan/form-upload',
        role: 'all'
      },
      {
        id: 'status-pengajuan',
        title: 'Status Pengajuan',
        path: '/pengajuan/status',
        role: 'all'
      }
    ]
  },
  {
    id: 'verifikasi',
    title: 'Verifikasi',
    icon: 'CheckSquare',
    role: 'verifikator',
    submenu: [
      {
        id: 'review-dokumen',
        title: 'Review Dokumen & Validasi',
        path: '/verifikasi/review',
        role: 'verifikator'
      },
      {
        id: 'hasil-review',
        title: 'Hasil Review Teknis',
        path: '/verifikasi/hasil',
        role: 'verifikator'
      }
    ]
  },
  {
    id: 'user-management',
    title: 'Manajemen User',
    icon: 'Users',
    path: '/users',
    role: 'admin'
  },
  {
    id: 'system-settings',
    title: 'Pengaturan Sistem',
    icon: 'Settings',
    path: '/settings',
    role: 'admin'
  },
  {
    id: 'activity-log',
    title: 'Log Aktivitas',
    icon: 'Activity',
    path: '/logs',
    role: 'admin'
  }
];

export const dashboardStats = [
  {
    title: 'Total Pengajuan',
    value: '1,245',
    change: '+12%',
    icon: 'FileText',
    color: 'text-blue-600'
  },
  {
    title: 'Disetujui',
    value: '892',
    change: '+8%',
    icon: 'CheckCircle',
    color: 'text-green-600'
  },
  {
    title: 'Ditolak',
    value: '134',
    change: '-3%',
    icon: 'XCircle',
    color: 'text-red-600'
  },
  {
    title: 'Dalam Proses',
    value: '219',
    change: '+15%',
    icon: 'Clock',
    color: 'text-orange-600'
  }
];

export const recentActivities = [
  {
    id: 1,
    user: 'Ahmad Sutanto',
    action: 'Mengajukan dokumen impor kosmetik',
    timestamp: '2 menit yang lalu',
    status: 'pending'
  },
  {
    id: 2,
    user: 'Siti Nurhaliza',
    action: 'Menyetujui pengajuan ID-2024-001',
    timestamp: '15 menit yang lalu',
    status: 'approved'
  },
  {
    id: 3,
    user: 'Budi Pratama',
    action: 'Menolak pengajuan ID-2024-002',
    timestamp: '1 jam yang lalu',
    status: 'rejected'
  },
  {
    id: 4,
    user: 'Indira Sari',
    action: 'Upload dokumen tambahan',
    timestamp: '2 jam yang lalu',
    status: 'pending'
  },
  {
    id: 5,
    user: 'Rudi Habibie',
    action: 'Memperbarui profil perusahaan',
    timestamp: '3 jam yang lalu',
    status: 'completed'
  }
];

export const submissionData = [
  {
    id: 'ID-2024-001',
    namaProduk: 'Serum Wajah Vitamin C',
    perusahaan: 'PT. Kosmetik Nusantara',
    status: 'Disetujui',
    tanggalPengajuan: '2024-01-15',
    reviewer: 'Dr. Sari Wulandari'
  },
  {
    id: 'ID-2024-002', 
    namaProduk: 'Krim Anti Aging Premium',
    perusahaan: 'CV. Beauty Indonesia',
    status: 'Ditolak',
    tanggalPengajuan: '2024-01-14',
    reviewer: 'Dr. Ahmad Rifai'
  },
  {
    id: 'ID-2024-003',
    namaProduk: 'Masker Wajah Charcoal',
    perusahaan: 'PT. Herbal Sejahtera',
    status: 'Dalam Review',
    tanggalPengajuan: '2024-01-13',
    reviewer: '-'
  },
  {
    id: 'ID-2024-004',
    namaProduk: 'Toner Mawar Organik',
    perusahaan: 'UD. Natural Care',
    status: 'Pending',
    tanggalPengajuan: '2024-01-12',
    reviewer: '-'
  }
];

export const userData = [
  {
    id: 1,
    nama: 'Dr. Sari Wulandari',
    email: 'sari@bpom.go.id',
    role: 'Admin',
    status: 'Aktif',
    lastLogin: '2024-01-15 09:30'
  },
  {
    id: 2,
    nama: 'Dr. Ahmad Rifai',
    email: 'ahmad@bpom.go.id',
    role: 'Verifikator',
    status: 'Aktif',
    lastLogin: '2024-01-15 08:45'
  },
  {
    id: 3,
    nama: 'Indira Sari',
    email: 'indira@company.com',
    role: 'User',
    status: 'Aktif',
    lastLogin: '2024-01-14 16:20'
  },
  {
    id: 4,
    nama: 'Budi Pratama',
    email: 'budi@company.com',
    role: 'User',
    status: 'Nonaktif',
    lastLogin: '2024-01-10 14:15'
  }
];

export const systemLogs = [
  {
    id: 1,
    task: 'Auto-validation dokumen ID-2024-001',
    status: 'Completed',
    timestamp: '2024-01-15 10:15:30',
    message: 'Semua dokumen valid, siap untuk review manual'
  },
  {
    id: 2,
    task: 'Batch processing 15 dokumen',
    status: 'In Progress',
    timestamp: '2024-01-15 10:00:00',
    message: 'Memproses 15 dokumen baru, estimasi selesai 5 menit'
  },
  {
    id: 3,
    task: 'Database backup',
    status: 'Failed',
    timestamp: '2024-01-15 03:00:00',
    message: 'Backup gagal - storage penuh'
  }
];

export const chartData = {
  monthly: [
    { month: 'Jan', pengajuan: 120, disetujui: 89, ditolak: 31 },
    { month: 'Feb', pengajuan: 135, disetujui: 98, ditolak: 37 },
    { month: 'Mar', pengajuan: 149, disetujui: 110, ditolak: 39 },
    { month: 'Apr', pengajuan: 162, disetujui: 125, ditolak: 37 },
    { month: 'May', pengajuan: 158, disetujui: 119, ditolak: 39 },
    { month: 'Jun', pengajuan: 171, disetujui: 134, ditolak: 37 }
  ]
};