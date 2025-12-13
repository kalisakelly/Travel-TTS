import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    // {
    //   path: '/admin/dashboard',
    //   icon: '📊',
    //   label: 'Dashboard',
    //   description: 'Overview & Analytics'
    // },
    {
      path: '/admin/gallery',
      icon: '🖼️',
      label: 'Gallery',
      description: 'Manage images & photos'
    },
    {
      path: '/admin/services',
      icon: '🛠️',
      label: 'Services',
      description: 'Service offerings'
    },
    {
      path: '/admin/tours',
      icon: '✈️',
      label: 'Tours',
      description: 'Travel packages'
    },
    // {
    //   path: '/admin/bookings',
    //   icon: '📅',
    //   label: 'Bookings',
    //   description: 'Reservations & orders'
    // },
    // {
    //   path: '/admin/users',
    //   icon: '👥',
    //   label: 'Users',
    //   description: 'User management'
    // },
    // {
    //   path: '/admin/settings',
    //   icon: '⚙️',
    //   label: 'Settings',
    //   description: 'System configuration'
    // }
  ];

  const quickActions = [
    { icon: '➕', label: 'Add New Item', action: () => console.log('Add new') },
    { icon: '📊', label: 'View Reports', action: () => console.log('View reports') },
    { icon: '📧', label: 'Check Messages', action: () => console.log('Check messages') }
  ];

  const stats = {
    totalItems: 124,
    activeTours: 12,
    pendingBookings: 5
  };

  return (
    <div className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sidebar-header">
        <button 
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? '→' : '←'}
        </button>
        
        {!isCollapsed && (
          <div className="header-content">
            <h2 className="admin-title">Admin Panel</h2>
            <p className="admin-subtitle">Manage your website</p>
          </div>
        )}
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="user-profile">
          <div className="user-avatar">
            <span className="avatar-text">A</span>
          </div>
          <div className="user-info">
            <h4 className="user-name">Admin User</h4>
            <p className="user-role">Administrator</p>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="quick-stats">
          <div className="stat-item">
            <span className="stat-icon">📦</span>
            <div className="stat-info">
              <span className="stat-value">{stats.totalItems}</span>
              <span className="stat-label">Total Items</span>
            </div>
          </div>
          <div className="stat-item">
            <span className="stat-icon">✈️</span>
            <div className="stat-info">
              <span className="stat-value">{stats.activeTours}</span>
              <span className="stat-label">Active Tours</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          {!isCollapsed && (
            <h3 className="section-title">Navigation</h3>
          )}
          <ul className="nav-menu">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                    title={isCollapsed ? `${item.label} - ${item.description}` : ''}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {!isCollapsed && (
                      <div className="nav-content">
                        <span className="nav-label">{item.label}</span>
                        <span className="nav-description">{item.description}</span>
                      </div>
                    )}
                    {isActive && !isCollapsed && (
                      <span className="active-indicator"></span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="nav-section">
            <h3 className="section-title">Quick Actions</h3>
            <div className="quick-actions">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="quick-action-btn"
                  onClick={action.action}
                >
                  <span className="action-icon">{action.icon}</span>
                  <span className="action-label">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Collapsed Navigation */}
        {isCollapsed && (
          <div className="collapsed-menu">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `collapsed-nav-link ${isActive ? 'active' : ''}`
                }
                title={`${item.label} - ${item.description}`}
              >
                <span className="collapsed-icon">{item.icon}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        {!isCollapsed && (
          <>
            <div className="footer-links">
              <a href="/" className="footer-link">🌐 View Site</a>
              <a href="/admin/support" className="footer-link">🆘 Help & Support</a>
            </div>
            <div className="system-status">
              <div className="status-indicator online"></div>
              <span className="status-text">System Online</span>
            </div>
          </>
        )}
        
        {isCollapsed && (
          <div className="collapsed-footer">
            <a href="/" className="collapsed-footer-link" title="View Site">🌐</a>
            <a href="/admin/support" className="collapsed-footer-link" title="Help & Support">🆘</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSidebar;