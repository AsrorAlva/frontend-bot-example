import React from 'react';
import { MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const getStatusBadge = (status) => {
  const statusConfig = {
    'Disetujui': 'bg-green-100 text-green-800 hover:bg-green-200',
    'Ditolak': 'bg-red-100 text-red-800 hover:bg-red-200',
    'Dalam Review': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    'Pending': 'bg-orange-100 text-orange-800 hover:bg-orange-200',
    'Aktif': 'bg-green-100 text-green-800 hover:bg-green-200',
    'Nonaktif': 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    'Completed': 'bg-green-100 text-green-800 hover:bg-green-200',
    'In Progress': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    'Failed': 'bg-red-100 text-red-800 hover:bg-red-200'
  };

  return statusConfig[status] || 'bg-gray-100 text-gray-800 hover:bg-gray-200';
};

const DataTable = ({ data, columns, actions = true }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            {columns.map((column, index) => (
              <TableHead key={index} className="font-semibold text-gray-900 py-4">
                {column.header}
              </TableHead>
            ))}
            {actions && <TableHead className="font-semibold text-gray-900 py-4">Aksi</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-gray-50 border-b border-gray-100">
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className="py-4">
                  {column.key === 'status' ? (
                    <Badge className={getStatusBadge(row[column.key])}>
                      {row[column.key]}
                    </Badge>
                  ) : column.key === 'role' ? (
                    <Badge className={getStatusBadge(row[column.key])}>
                      {row[column.key]}
                    </Badge>
                  ) : (
                    <span className="text-gray-900">{row[column.key]}</span>
                  )}
                </TableCell>
              ))}
              {actions && (
                <TableCell className="py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;