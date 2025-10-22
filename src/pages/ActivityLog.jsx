import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import DataTable from '../components/Common/DataTable';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { recentActivities, systemLogs } from '../data/mockData';

const ActivityLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('user');

  const userActivityColumns = [
    { header: 'Timestamp', key: 'timestamp' },
    { header: 'User', key: 'user' },
    { header: 'Aktivitas', key: 'action' },
    { header: 'Status', key: 'status' }
  ];

  const systemLogColumns = [
    { header: 'Timestamp', key: 'timestamp' },
    { header: 'Task', key: 'task' },
    { header: 'Status', key: 'status' },
    { header: 'Message', key: 'message' }
  ];

  const filteredUserActivities = recentActivities.filter(activity => {
    const matchesSearch = activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || activity.status === filterType;
    return matchesSearch && matchesFilter;
  });

  const filteredSystemLogs = systemLogs.filter(log => {
    const matchesSearch = log.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || log.status === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">{recentActivities.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">System Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{systemLogs.length}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed Tasks</p>
                <p className="text-2xl font-bold text-red-600">
                  {systemLogs.filter(log => log.status === 'Failed').length}
                </p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Log Aktivitas Sistem
          </CardTitle>
          <p className="text-sm text-gray-600">
            Monitor aktivitas user dan sistem secara real-time
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tab Navigation */}
          <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'user'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              User Activities
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'system'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              System Logs
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={`Cari ${activeTab === 'user' ? 'aktivitas user' : 'system logs'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  {activeTab === 'user' ? (
                    <>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Data Table */}
          {activeTab === 'user' ? (
            <DataTable 
              data={filteredUserActivities} 
              columns={userActivityColumns}
              actions={false}
            />
          ) : (
            <DataTable 
              data={filteredSystemLogs} 
              columns={systemLogColumns}
              actions={false}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLog;