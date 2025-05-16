import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Calendar, Filter } from 'lucide-react';

// Mock data for reports
const mockReports = [
  {
    id: 1,
    name: 'Monthly Sales Report',
    description: 'Summary of all sales for the current month',
    type: 'Sales',
    format: 'PDF',
    lastGenerated: '2023-07-01T10:30:00Z',
  },
  {
    id: 2,
    name: 'User Activity Report',
    description: 'Analysis of user engagement and activity',
    type: 'Analytics',
    format: 'Excel',
    lastGenerated: '2023-07-05T14:45:00Z',
  },
  {
    id: 3,
    name: 'Inventory Status',
    description: 'Current inventory levels and availability',
    type: 'Inventory',
    format: 'PDF',
    lastGenerated: '2023-07-10T09:15:00Z',
  },
  {
    id: 4,
    name: 'Financial Summary',
    description: 'Overview of revenue, expenses, and profit',
    type: 'Finance',
    format: 'Excel',
    lastGenerated: '2023-06-30T16:20:00Z',
  },
];

const ReportsTab: React.FC = () => {
  const { t } = useTranslation();
  const [reports, setReports] = useState(mockReports);
  const [typeFilter, setTypeFilter] = useState('All');
  
  // Get unique types for filter
  const types = ['All', ...new Set(reports.map(report => report.type))];
  
  // Filter reports based on selected type
  const filteredReports = typeFilter === 'All' 
    ? reports 
    : reports.filter(report => report.type === typeFilter);
  
  const generateReport = (reportId: number) => {
    // In a real app, this would call an API to generate the report
    console.log('Generating report:', reportId);
    // Update last generated date
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, lastGenerated: new Date().toISOString() } 
        : report
    ));
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('admin.reports.title', 'Reports')}
      </h2>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => setTypeFilter('All')}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
              typeFilter === 'All'
                ? 'text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Filter className="w-4 h-4 inline mr-1" />
            All
          </button>
          {types
            .filter((type) => type !== 'All')
            .map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                  typeFilter === type
                    ? 'text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div 
              key={report.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{report.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{report.description}</p>
                  
                  <div className="mt-4 flex items-center space-x-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      {report.type}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-[#1a552c] dark:bg-green-900 dark:text-green-300">
                      {report.format}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {t('admin.reports.lastGenerated', 'Last generated')}: {new Date(report.lastGenerated).toLocaleString()}
                  </div>
                </div>
                
                <button
                  onClick={() => generateReport(report.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t('admin.reports.generate', 'Generate')}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-gray-500 dark:text-gray-400">
            {t('admin.reports.noResults', 'No reports found.')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsTab;