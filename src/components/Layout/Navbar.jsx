import React from 'react';
import { Bell, User, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

const Navbar = ({ pageTitle = "Dashboard" }) => {
  const { currentUser } = useApp();

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'verifikator':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* === LEFT SECTION: PAGE TITLE === */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
            {pageTitle}
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
            <span>e-BPOM Automation System</span>
            <span className="text-gray-400">•</span>
            <span>
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* === RIGHT SECTION: NOTIFICATION & PROFILE === */}
        <div className="flex items-center space-x-4">
          {/* Notification Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100 rounded-full"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded-lg"
              >
                <Avatar className="w-9 h-9">
                  <AvatarImage
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                    {currentUser?.name
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900 leading-tight">
                    {currentUser?.name}
                  </p>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium ${getRoleBadgeColor(
                      currentUser?.role
                    )}`}
                  >
                    {currentUser?.role
                      ?.charAt(0)
                      ?.toUpperCase() + currentUser?.role?.slice(1)}
                  </span>
                </div>

                <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 " align="end">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{currentUser?.name}</p>
                <p className="text-xs text-gray-500">{currentUser?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem>Pengaturan</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
