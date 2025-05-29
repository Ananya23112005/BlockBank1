import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const DashboardPage = () => {
  const [portfolioData] = useState([
    { name: 'Jan', value: 4000, loans: 2400, trades: 1600 },
    { name: 'Feb', value: 3000, loans: 1398, trades: 1800 },
    { name: 'Mar', value: 2000, loans: 9800, trades: 2200 },
    { name: 'Apr', value: 2780, loans: 3908, trades: 2500 },
    { name: 'May', value: 1890, loans: 4800, trades: 2800 },
    { name: 'Jun', value: 2390, loans: 3800, trades: 3200 },
  ]);

  const [assetDistribution] = useState([
    { name: 'Loans', value: 45, color: '#8884d8' },
    { name: 'Payments', value: 30, color: '#82ca9d' },
    { name: 'Trade Finance', value: 15, color: '#ffc658' },
    { name: 'Tokenized Assets', value: 10, color: '#ff7300' },
  ]);

  const [transactions] = useState([
    { id: '1', type: 'Payment', amount: 1500, currency: 'USD', status: 'Completed', date: '2024-01-15', to: 'John Smith' },
    { id: '2', type: 'Loan', amount: 50000, currency: 'USD', status: 'Approved', date: '2024-01-14', to: 'Smart Contract' },
    { id: '3', type: 'Trade Finance', amount: 25000, currency: 'EUR', status: 'Processing', date: '2024-01-13', to: 'Global Corp' },
    { id: '4', type: 'Tokenization', amount: 100000, currency: 'USD', status: 'Completed', date: '2024-01-12', to: 'Real Estate Token' },
  ]);

  const [notifications] = useState([
    { id: 1, type: 'success', message: 'Loan application approved for $50,000', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'New trade finance opportunity available', time: '4 hours ago' },
    { id: 3, type: 'warning', message: 'KYC verification expires in 30 days', time: '1 day ago' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600';
      case 'Processing':
        return 'text-yellow-600';
      case 'Approved':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Banking Dashboard</h1>
        <p className="text-gray-600">Manage your blockchain banking operations</p>
      </header>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-sm text-gray-600">Total Balance</p>
          <p className="text-3xl font-bold text-gray-900">$247,582</p>
          <p className="text-sm text-green-600">+12.5% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-sm text-gray-600">Active Loans</p>
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-sm text-blue-600">$125,000 total</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-sm text-gray-600">Transactions</p>
          <p className="text-3xl font-bold text-gray-900">1,247</p>
          <p className="text-sm text-green-600">+5.2% this week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-sm text-gray-600">Network Uptime</p>
          <p className="text-3xl font-bold text-green-600">99.9%</p>
          <p className="text-sm text-gray-600">Reliable</p>
        </div>
      </section>

      {/* Charts & Transactions */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Portfolio Chart */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-xl font-bold mb-4">Portfolio Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="loans" stroke="#82ca9d" strokeWidth={2} />
                <Line type="monotone" dataKey="trades" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Transactions List */}
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
            <div className="space-y-1">
              {transactions.map(tx => (
                <div key={tx.id} className="py-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-900 font-medium">{tx.type}</p>
                      <p className="text-sm text-gray-500">To: {tx.to} | {tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{tx.currency} {tx.amount.toLocaleString()}</p>
                      <p className={`text-sm ${getStatusColor(tx.status)}`}>{tx.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pie Chart & Notifications */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-xl font-bold mb-4">Asset Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={assetDistribution} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={100} 
                  label
                >
                  {assetDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            <div className="space-y-2">
              {notifications.map(note => (
                <div key={note.id} className={`p-3 rounded-lg border ${getNotificationBg(note.type)}`}>
                  <p className="font-medium text-gray-800">{note.message}</p>
                  <p className="text-sm text-gray-500">{note.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;