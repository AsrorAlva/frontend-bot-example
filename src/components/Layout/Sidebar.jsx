import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  Users, 
  Settings, 
  Activity,
  ChevronDown,
  ChevronRight,
  Menu,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { menuItems } from '../../data/mockData';
import { useToast } from '../../hooks/use-toast';

const iconMap = {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Users,
  Settings,
  Activity
};

const Sidebar = () => {
  const { sidebarCollapsed, setSidebarCollapsed, checkAccess } = useApp();
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();
  const { toast } = useToast();

  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleRestrictedAccess = (item) => {
    if (!checkAccess(item.role)) {
      toast({
        variant: "destructive",
        title: "Admin Only",
        description: "You don't have permission to access this feature.",
        duration: 3000,
      });
      return true;
    }
    return false;
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isSubmenuActive = (submenu) => {
    return submenu.some(item => location.pathname === item.path);
  };

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      sidebarCollapsed ? 'w-16' : 'w-64'
    } h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">eB</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-sm">e-Bpom</h1>
              <p className="text-xs text-gray-500">Automation System</p>
            </div>
          </div>  
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => {
          const IconComponent = iconMap[item.icon];
          const hasAccess = checkAccess(item.role);
          
          if (item.submenu) {
            const isExpanded = expandedMenus[item.id];
            const isSubActive = isSubmenuActive(item.submenu);
            
            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (handleRestrictedAccess(item)) return;
                    toggleSubmenu(item.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isSubActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : hasAccess 
                        ? 'text-gray-700 hover:bg-gray-50' 
                        : 'text-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-4 h-4" />
                    {!sidebarCollapsed && <span className="font-medium">{item.title}</span>}
                    {!hasAccess && !sidebarCollapsed && (
                      <AlertCircle className="w-3 h-3 text-orange-500" />
                    )}
                  </div>
                  {!sidebarCollapsed && (
                    <div className="text-gray-400">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  )}
                </button>
                
                {isExpanded && !sidebarCollapsed && hasAccess && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.id}
                        to={subItem.path}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive(subItem.path)
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={(e) => {
                if (handleRestrictedAccess(item)) {
                  e.preventDefault();
                }
              }}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : hasAccess 
                    ? 'text-gray-700 hover:bg-gray-50' 
                    : 'text-gray-400'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {!sidebarCollapsed && (
                <>
                  <span className="font-medium">{item.title}</span>
                  {!hasAccess && <AlertCircle className="w-3 h-3 text-orange-500" />}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-2 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          <LogOut className="w-4 h-4" />
          {!sidebarCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;