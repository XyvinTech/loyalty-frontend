export const securityMiddleware = {
  // Session management
  checkSession: () => {
    const lastActivity = localStorage.getItem('lastActivity');
    const timeout = 30 * 60 * 1000; // 30 minutes

    if (lastActivity && Date.now() - parseInt(lastActivity) > timeout) {
      // Session expired
      return false;
    }
    localStorage.setItem('lastActivity', Date.now().toString());
    return true;
  },

  // Activity logging
  logActivity: (action, details) => {
    const log = {
      timestamp: new Date().toISOString(),
      action,
      details,
      user: localStorage.getItem('userId'),
      ip: window.clientIP // This should be set from the backend
    };
    // Send to backend
    console.log('Activity logged:', log);
  },

  // Data access control
  checkPermission: (resource, action) => {
    const userRole = localStorage.getItem('userRole');
    const permissions = {
      admin: ['read', 'write', 'delete'],
      manager: ['read', 'write'],
      staff: ['read']
    };
    return permissions[userRole]?.includes(action) || false;
  }
}; 