import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Activity, DollarSign, Network, Clock, Database, Shield, TrendingUp, Users, AlertCircle } from 'lucide-react';

const InterbankPage = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdminLoggedIn(true);
      setAdminPassword('');
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  // Mock data for user view
  const networkStats = {
    totalTransactions: '2,847,239',
    dailyVolume: '$45.2B',
    activeNodes: 847,
    avgSettlementTime: '2.3s',
    networkUptime: '99.98%'
  };

  const recentTransactions = [
    { id: 'TXN001', from: 'Bank A', to: 'Bank B', amount: '$2.5M', status: 'Settled', time: '14:23:45' },
    { id: 'TXN002', from: 'Bank C', to: 'Bank D', amount: '$890K', status: 'Processing', time: '14:23:12' },
    { id: 'TXN003', from: 'Bank E', to: 'Bank F', amount: '$3.2M', status: 'Settled', time: '14:22:58' }
  ];

  // Mock admin data
  const adminData = {
    systemHealth: {
      blockchain: 'Operational',
      rtgs: 'Operational', 
      routing: 'Operational',
      liquidityPools: 'Warning',
      reconciliation: 'Operational'
    },
    liquidityPools: [
      { bank: 'JPMorgan Chase', balance: '$2.8B', utilization: '65%', status: 'Normal' },
      { bank: 'Bank of America', balance: '$1.9B', utilization: '82%', status: 'High' },
      { bank: 'Wells Fargo', balance: '$2.1B', utilization: '71%', status: 'Normal' },
      { bank: 'Citibank', balance: '$1.6B', utilization: '58%', status: 'Normal' }
    ],
    reconciliationQueue: [
      { id: 'REC001', type: 'Settlement Mismatch', priority: 'High', bank: 'Bank A vs Bank B' },
      { id: 'REC002', type: 'Timestamp Variance', priority: 'Medium', bank: 'Bank C vs Bank D' },
      { id: 'REC003', type: 'Amount Discrepancy', priority: 'Low', bank: 'Bank E vs Bank F' }
    ],
    systemMetrics: {
      blockHeight: '1,847,293',
      hashRate: '245.7 TH/s',
      consensusNodes: 24,
      pendingTransactions: 156,
      memoryUsage: '67%',
      cpuUsage: '43%'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Network className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Interbank Network</h1>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                LIVE
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Current Time</div>
              <div className="text-lg font-mono text-gray-900">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Network Overview Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Network Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">{networkStats.totalTransactions}</p>
                </div>
                <Activity className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Daily Volume</p>
                  <p className="text-2xl font-bold text-gray-900">{networkStats.dailyVolume}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Nodes</p>
                  <p className="text-2xl font-bold text-gray-900">{networkStats.activeNodes}</p>
                </div>
                <Network className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Settlement</p>
                  <p className="text-2xl font-bold text-gray-900">{networkStats.avgSettlementTime}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Network Uptime</p>
                  <p className="text-2xl font-bold text-gray-900">{networkStats.networkUptime}</p>
                </div>
                <Shield className="h-8 w-8 text-red-500" />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Blockchain Powers Interbank Networks</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-6 w-6 text-blue-500 mr-2" />
                Real-time Gross Settlement (RTGS)
              </h3>
              <p className="text-gray-700 mb-3">
                Blockchain enables instant settlement of high-value transactions between banks. Each transaction is recorded 
                on an immutable ledger, eliminating the need for traditional clearing houses and reducing settlement time 
                from days to seconds.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Traditional:</strong> 1-3 days settlement<br/>
                  <strong>Blockchain:</strong> 2-5 seconds settlement
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Network className="h-6 w-6 text-green-500 mr-2" />
                Multi-bank Transaction Routing
              </h3>
              <p className="text-gray-700 mb-3">
                Smart contracts automatically route transactions through the most efficient path across multiple banks. 
                The system finds optimal routes considering factors like liquidity, fees, and settlement speed.
              </p>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                  Reduces transaction costs by up to 60% through intelligent routing optimization.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 text-purple-500 mr-2" />
                Liquidity Pool Management
              </h3>
              <p className="text-gray-700 mb-3">
                Automated liquidity pools ensure sufficient funds are available for large transactions. Smart contracts 
                monitor pool levels and automatically rebalance funds across the network to maintain optimal liquidity.
              </p>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-800">
                  AI-driven algorithms predict liquidity needs and pre-position funds accordingly.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Database className="h-6 w-6 text-orange-500 mr-2" />
                Automated Reconciliation
              </h3>
              <p className="text-gray-700 mb-3">
                Blockchain's immutable ledger eliminates reconciliation disputes. All transactions are automatically 
                verified and reconciled in real-time, reducing operational costs and human error.
              </p>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-orange-800">
                  Reduces reconciliation time from hours to milliseconds with 99.99% accuracy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Transactions</h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      From
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {tx.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.from}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.to}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                        {tx.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          tx.status === 'Settled' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Admin Section */}
        <section className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Shield className="h-6 w-6 text-red-500 mr-2" />
              Administrative Control Panel
            </h2>
            {isAdminLoggedIn && (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Unlock className="h-4 w-4" />
                <span>Logout</span>
              </button>
            )}
          </div>

          {!isAdminLoggedIn ? (
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Lock className="h-12 w-12 text-gray-400" />
              </div>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
                <button
                  onClick={handleAdminLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold"
                >
                  Access Admin Panel
                </button>
                <p className="text-sm text-gray-500 text-center">
                  Demo password: admin123
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* System Health */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">System Health Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Object.entries(adminData.systemHealth).map(([system, status]) => (
                    <div key={system} className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-700 capitalize mb-2">
                        {system.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className={`flex items-center space-x-2 ${
                        status === 'Operational' ? 'text-green-600' : 
                        status === 'Warning' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          status === 'Operational' ? 'bg-green-500' : 
                          status === 'Warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-sm font-semibold">{status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Liquidity Pools */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Liquidity Pool Status</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Bank</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Balance</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Utilization</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {adminData.liquidityPools.map((pool) => (
                        <tr key={pool.bank}>
                          <td className="px-4 py-3 text-sm text-gray-900">{pool.bank}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">{pool.balance}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{pool.utilization}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              pool.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {pool.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* System Metrics */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Blockchain System Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(adminData.systemMetrics).map(([metric, value]) => (
                    <div key={metric} className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1 capitalize">
                        {metric.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-lg font-bold text-gray-900">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reconciliation Queue */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  Reconciliation Queue
                </h3>
                <div className="space-y-3">
                  {adminData.reconciliationQueue.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{item.type}</div>
                        <div className="text-sm text-gray-600">{item.bank}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          item.priority === 'High' ? 'bg-red-100 text-red-800' :
                          item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority}
                        </span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default InterbankPage;