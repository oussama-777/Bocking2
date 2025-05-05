import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Trash2, Shield } from 'lucide-react';

// Define User interface
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  createdAt: string;
}

// Mock data for users
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2023-07-15T10:30:00Z',
    createdAt: '2023-01-10T08:15:00Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2023-07-14T14:45:00Z',
    createdAt: '2023-02-20T09:30:00Z',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2023-06-30T11:20:00Z',
    createdAt: '2023-03-15T13:45:00Z',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'Moderator',
    status: 'Active',
    lastLogin: '2023-07-12T16:10:00Z',
    createdAt: '2023-04-05T10:00:00Z',
  },
];

const UsersTab: React.FC = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roleFilter, setRoleFilter] = useState('All');
  
  // Get unique roles for filter
  const roles = ['All', ...new Set(users.map(user => user.role))];
  
  // Filter users based on selected role
  const filteredUsers = roleFilter === 'All' 
    ? users 
    : users.filter(user => user.role === roleFilter);
  
  const handleEditUser = (user: User) => {
    // In a real app, this would open an edit form
    console.log('Edit user:', user);
  };
  
  const handleDeleteUser = (userId: number) => {
    // In a real app, this would call an API to delete the user
    setUsers(users.filter(user => user.id !== userId));
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('admin.users.title', 'Users Management')}
      </h2>
      
      <div className="flex justify-between items-center mb-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          {t('admin.users.addNew', 'Add New User')}
        </button>
        
        <div className="flex space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => setRoleFilter('All')}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
              roleFilter === 'All'
                ? 'text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {t('admin.users.filters.all', 'All')}
          </button>
          {roles
            .filter((role) => role !== 'All')
            .map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                  roleFilter === role
                    ? 'text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {t(`admin.users.roles.${role.toLowerCase()}`, role)}
              </button>
            ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-left text-sm font-semibold">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">{t('admin.users.name', 'Name')}</th>
              <th className="px-6 py-3">{t('admin.users.email', 'Email')}</th>
              <th className="px-6 py-3">{t('admin.users.role', 'Role')}</th>
              <th className="px-6 py-3">{t('admin.users.status', 'Status')}</th>
              <th className="px-6 py-3">{t('admin.users.lastLogin', 'Last Login')}</th>
              <th className="px-6 py-3">{t('admin.users.createdAt', 'Created At')}</th>
              <th className="px-6 py-3">{t('admin.users.actions', 'Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'Admin'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : user.role === 'Moderator'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      <Shield className="w-3 h-3 mr-1" />
                      {t(`admin.users.roles.${user.role.toLowerCase()}`, user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {t(`admin.users.status.${user.status.toLowerCase()}`, user.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        title={t('admin.users.actions.edit', 'Edit User')}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                        title={t('admin.users.actions.delete', 'Delete User')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  {t('admin.users.noResults', 'No users found.')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTab;