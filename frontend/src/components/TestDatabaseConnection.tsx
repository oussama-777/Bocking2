import React, { useState, useEffect } from 'react';

const TestDatabaseConnection: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Testing database connection...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/test-db');
        
        if (response.ok) {
          const data = await response.json();
          setStatus('success');
          setMessage(data.message || 'Database connection successful!');
        } else {
          setStatus('error');
          setMessage('Failed to connect to database. Check server logs.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Error connecting to server. Is the backend running?');
        console.error('Connection test error:', error);
      }
    };

    testConnection();
  }, []);

  return (
    <div className={`p-4 rounded-md ${
      status === 'loading' ? 'bg-green-100 text-green-700' :
      status === 'success' ? 'bg-lime-100 text-lime-700' :
      'bg-red-100 text-red-700'
    }`}>
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default TestDatabaseConnection;