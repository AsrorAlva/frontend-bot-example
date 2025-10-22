import React from 'react';
import StatsCard from '../components/Dashboard/StatsCard';
import ActivityChart from '../components/Dashboard/ActivityChart';
import DataTable from '../components/Common/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { dashboardStats, recentActivities } from '../data/mockData';

const Dashboard = () => {
  const activityColumns = [
    { header: 'User', key: 'user' },
    { header: 'Aktivitas', key: 'action' },
    { header: 'Waktu', key: 'timestamp' },
    { header: 'Status', key: 'status' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>

        {/* Quick Stats */}
        <Card className="bg-white border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Ringkasan Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-900">Pengajuan Baru</span>
                <span className="text-lg font-bold text-blue-600">12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-900">Review Selesai</span>
                <span className="text-lg font-bold text-green-600">8</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-medium text-orange-900">Menunggu Review</span>
                <span className="text-lg font-bold text-orange-600">5</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium text-purple-900">Bot Automation</span>
                <span className="text-lg font-bold text-purple-600">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Aktivitas Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={recentActivities} 
            columns={activityColumns}
            actions={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;