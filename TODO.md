# TODO: Implement Role-Based Dashboard Landing

1. Modify server/auth.py register function to assign role based on email local part ('admin' -> Admin, 'editor' -> Editor, else Employee).
2. Create client/src/pages/AdminDashboard.jsx component.
3. Create client/src/pages/EditorDashboard.jsx component.
4. Create client/src/pages/EmployeeDashboard.jsx component.
5. Update client/src/App.jsx to add routes for /admin-dashboard, /editor-dashboard, /employee-dashboard, and modify root redirect based on user role.
6. Update client/src/pages/Login.jsx to navigate to role-specific dashboard after login success.
7. Update client/src/pages/Register.jsx to navigate to role-specific dashboard after registration success.
8. Test the implementation with different email registrations and logins.
