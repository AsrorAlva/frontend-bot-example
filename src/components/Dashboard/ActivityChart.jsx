import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const ActivityChart = () => {
  // 🔹 Dummy data sementara
  const chartData = {
    monthly: [
      { month: 'Jan', pengajuan: 20, disetujui: 15, ditolak: 5 },
      { month: 'Feb', pengajuan: 30, disetujui: 25, ditolak: 5 },
      { month: 'Mar', pengajuan: 40, disetujui: 35, ditolak: 5 },
      { month: 'Apr', pengajuan: 25, disetujui: 20, ditolak: 5 },
      { month: 'Mei', pengajuan: 50, disetujui: 45, ditolak: 5 },
      { month: 'Jun', pengajuan: 35, disetujui: 30, ditolak: 5 },
    ],
  };

  const maxValue = Math.max(...chartData.monthly.map(item => item.pengajuan));

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          Tren Pengajuan Bulanan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Total Pengajuan</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Disetujui</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Ditolak</span>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-3">
            {chartData.monthly.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.month}</span>
                  <span className="text-gray-500">{item.pengajuan} total</span>
                </div>
                <div className="flex space-x-1 h-6">
                  <div
                    className="bg-blue-500 rounded-sm flex items-center justify-center text-xs text-white font-medium"
                    style={{
                      width: `${(item.pengajuan / maxValue) * 100}%`,
                      minWidth: '20px',
                    }}
                  >
                    {item.pengajuan}
                  </div>
                  <div
                    className="bg-green-500 rounded-sm flex items-center justify-center text-xs text-white font-medium"
                    style={{
                      width: `${(item.disetujui / maxValue) * 100}%`,
                      minWidth: '15px',
                    }}
                  >
                    {item.disetujui}
                  </div>
                  <div
                    className="bg-red-500 rounded-sm flex items-center justify-center text-xs text-white font-medium"
                    style={{
                      width: `${(item.ditolak / maxValue) * 100}%`,
                      minWidth: '10px',
                    }}
                  >
                    {item.ditolak}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
