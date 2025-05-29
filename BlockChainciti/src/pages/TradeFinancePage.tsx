import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  FileText, 
  Shield, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Wallet,
  Lock,
  Globe,
  ArrowRight,
  Upload,
  Download
} from 'lucide-react';

const TradeFinancePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [lcStatus, setLcStatus] = useState('draft');
  const [documents, setDocuments] = useState([]);

  // Mock blockchain data
  const [blockchainStats, setBlockchainStats] = useState({
    totalTransactions: 1247,
    activeContracts: 89,
    verifiedDocuments: 2340,
    savedCosts: '$2.4M'
  });

  // Mock transactions
  const transactions = [
    {
      id: 'TXN001',
      type: 'Letter of Credit',
      amount: '$500,000',
      status: 'active',
      parties: ['ABC Corp', 'XYZ Bank', 'Global Shipping'],
      progress: 75,
      blockHash: '0x1a2b3c...',
      createdAt: '2024-05-20'
    },
    {
      id: 'TXN002',
      type: 'Supply Chain Finance',
      amount: '$250,000',
      status: 'completed',
      parties: ['Tech Industries', 'Finance Bank', 'Logistics Co'],
      progress: 100,
      blockHash: '0x4d5e6f...',
      createdAt: '2024-05-18'
    },
    {
      id: 'TXN003',
      type: 'Trade Settlement',
      amount: '$750,000',
      status: 'pending',
      parties: ['Import Ltd', 'Export Inc', 'Trade Bank'],
      progress: 30,
      blockHash: '0x7g8h9i...',
      createdAt: '2024-05-25'
    }
  ];

  const documentTypes = [
    'Bill of Lading',
    'Commercial Invoice',
    'Packing List',
    'Certificate of Origin',
    'Insurance Certificate',
    'Inspection Certificate'
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setBlockchainStats(prev => ({
        ...prev,
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const StatusBadge = ({ status }) => {
    const colors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200',
      draft: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-pink-100 rounded-full h-2">
      <div 
        className="bg-gradient-to-r from-pink-400 to-pink-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-rose-200">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BlockTrade Finance</h1>
                <p className="text-sm text-gray-600">Blockchain-Powered Trade Solutions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-pink-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-700">Blockchain Active</span>
              </div>
              <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex space-x-1 bg-white/70 backdrop-blur-sm p-1 rounded-xl border border-pink-200">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'letters-of-credit', label: 'Letters of Credit', icon: CreditCard },
            { id: 'supply-chain', label: 'Supply Chain Finance', icon: Globe },
            { id: 'smart-contracts', label: 'Smart Contracts', icon: FileText },
            { id: 'tracking', label: 'Transaction Tracking', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-pink-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Transactions', value: blockchainStats.totalTransactions.toLocaleString(), icon: TrendingUp, color: 'pink' },
                { label: 'Active Contracts', value: blockchainStats.activeContracts, icon: FileText, color: 'rose' },
                { label: 'Verified Documents', value: blockchainStats.verifiedDocuments.toLocaleString(), icon: Shield, color: 'pink' },
                { label: 'Cost Savings', value: blockchainStats.savedCosts, icon: Wallet, color: 'rose' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-pink-200 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-500 rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Transactions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-pink-200">
              <div className="p-6 border-b border-pink-100">
                <h2 className="text-xl font-semibold text-gray-900">Recent Blockchain Transactions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {transactions.map(txn => (
                    <div key={txn.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-100">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-gray-900">{txn.id}</h3>
                          <StatusBadge status={txn.status} />
                          <span className="text-sm text-gray-500">{txn.type}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Amount: {txn.amount}</span>
                          <span>Parties: {txn.parties.length}</span>
                          <span>Block: {txn.blockHash}</span>
                        </div>
                        <div className="mt-2">
                          <ProgressBar progress={txn.progress} />
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedTransaction(txn)}
                        className="ml-4 p-2 text-pink-600 hover:bg-pink-100 rounded-lg transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Letters of Credit Tab */}
        {activeTab === 'letters-of-credit' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-pink-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Digital Letters of Credit on Blockchain</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Create New Letter of Credit</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary</label>
                      <input type="text" className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Enter beneficiary name" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                      <input type="text" className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="$0.00" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input type="date" className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select 
                        value={lcStatus} 
                        onChange={(e) => setLcStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      >
                        <option value="draft">Draft</option>
                        <option value="issued">Issued</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="executed">Executed</option>
                      </select>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all font-medium">
                    Create on Blockchain
                  </button>
                </div>
                
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-6 border border-pink-200">
                  <h3 className="font-medium text-gray-900 mb-4">Blockchain Benefits</h3>
                  <div className="space-y-3">
                    {[
                      'Immutable transaction records',
                      'Real-time status updates',
                      'Automated compliance checks',
                      'Reduced processing time by 80%',
                      'Enhanced security and transparency',
                      'Multi-party verification'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Supply Chain Finance Tab */}
        {activeTab === 'supply-chain' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-pink-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Supply Chain Financing with Document Verification</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Document Upload & Verification</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {documentTypes.map((docType, index) => (
                        <div key={index} className="border-2 border-dashed border-pink-200 rounded-lg p-4 hover:border-pink-400 transition-colors cursor-pointer">
                          <div className="flex flex-col items-center space-y-2">
                            <Upload className="w-8 h-8 text-pink-400" />
                            <span className="text-sm font-medium text-gray-700">{docType}</span>
                            <span className="text-xs text-gray-500">Drag & drop or click</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Uploaded Documents</h4>
                      <div className="space-y-2">
                        {[
                          { name: 'Commercial_Invoice_001.pdf', status: 'verified', hash: '0xabcd1234...' },
                          { name: 'Bill_of_Lading_001.pdf', status: 'pending', hash: '0xefgh5678...' },
                          { name: 'Packing_List_001.pdf', status: 'verified', hash: '0xijkl9012...' }
                        ].map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-100">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-5 h-5 text-pink-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                <p className="text-xs text-gray-500">Hash: {doc.hash}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <StatusBadge status={doc.status} />
                              <button className="p-1 text-pink-600 hover:bg-pink-100 rounded">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 border border-pink-200">
                    <h4 className="font-medium text-gray-900 mb-3">Verification Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Documents Verified</span>
                        <span className="text-sm font-medium text-green-600">2/3</span>
                      </div>
                      <ProgressBar progress={67} />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 border border-pink-200">
                    <h4 className="font-medium text-gray-900 mb-3">Financing Options</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Invoice Amount</span>
                        <span className="font-medium">$150,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Advance Rate</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Available Financing</span>
                        <span className="font-medium text-green-600">$127,500</span>
                      </div>
                    </div>
                    <button className="w-full mt-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all text-sm font-medium">
                      Request Financing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Smart Contracts Tab */}
        {activeTab === 'smart-contracts' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-pink-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Smart Contracts for Trade Settlements</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Active Smart Contracts</h3>
                  
                  <div className="space-y-3">
                    {[
                      {
                        id: 'SC001',
                        type: 'Payment Release',
                        parties: ['Buyer Corp', 'Seller Ltd'],
                        condition: 'Document verification complete',
                        status: 'active',
                        value: '$75,000'
                      },
                      {
                        id: 'SC002',
                        type: 'Escrow Release',
                        parties: ['Import Co', 'Export Inc'],
                        condition: 'Goods delivered & confirmed',
                        status: 'pending',
                        value: '$120,000'
                      },
                      {
                        id: 'SC003',
                        type: 'Insurance Claim',
                        parties: ['Cargo Owner', 'Insurance Co'],
                        condition: 'Damage assessment verified',
                        status: 'executed',
                        value: '$45,000'
                      }
                    ].map((contract, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-100">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{contract.id}</h4>
                          <StatusBadge status={contract.status} />
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><span className="font-medium">Type:</span> {contract.type}</p>
                          <p><span className="font-medium">Value:</span> {contract.value}</p>
                          <p><span className="font-medium">Condition:</span> {contract.condition}</p>
                          <p><span className="font-medium">Parties:</span> {contract.parties.join(', ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Create New Smart Contract</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contract Type</label>
                      <select className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                        <option>Payment Release</option>
                        <option>Escrow Release</option>
                        <option>Insurance Claim</option>
                        <option>Performance Bond</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contract Value</label>
                      <input type="text" className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="$0.00" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Trigger Condition</label>
                      <textarea className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" rows="3" placeholder="Define the conditions that trigger contract execution..."></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Counterparties</label>
                      <input type="text" className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" placeholder="Enter wallet addresses or entity names" />
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all font-medium">
                      Deploy Smart Contract
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-pink-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Multi-Party Transaction Tracking</h2>
              
              <div className="space-y-6">
                {transactions.map((txn, index) => (
                  <div key={index} className="border border-pink-200 rounded-lg p-6 bg-gradient-to-r from-pink-50 to-rose-50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{txn.id}</h3>
                        <p className="text-sm text-gray-600">{txn.type} • {txn.amount}</p>
                      </div>
                      <StatusBadge status={txn.status} />
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-600">{txn.progress}%</span>
                      </div>
                      <ProgressBar progress={txn.progress} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {txn.parties.map((party, partyIndex) => (
                        <div key={partyIndex} className="bg-white/70 rounded-lg p-3 border border-pink-200">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-pink-600" />
                            <span className="text-sm font-medium text-gray-900">{party}</span>
                          </div>
                          <div className="mt-2 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-xs text-gray-600">Connected</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-white/70 rounded-lg p-4 border border-pink-200">
                      <h4 className="font-medium text-gray-900 mb-2">Blockchain Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Block Hash:</span>
                          <p className="font-mono text-gray-900">{txn.blockHash}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Created:</span>
                          <p className="text-gray-900">{txn.createdAt}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Gas Used:</span>
                          <p className="text-gray-900">21,000 units</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Confirmations:</span>
                          <p className="text-gray-900">12/12</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Transaction Details</h3>
                <button 
                  onClick={() => setSelectedTransaction(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Transaction ID</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedTransaction.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className="mt-1">
                    <StatusBadge status={selectedTransaction.status} />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Amount</label>
                <p className="text-2xl font-bold text-gray-900">{selectedTransaction.amount}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Transaction Type</label>
                <p className="text-lg text-gray-900">{selectedTransaction.type}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Involved Parties</label>
                <div className="mt-2 space-y-2">
                  {selectedTransaction.parties.map((party, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-pink-50 rounded-lg">
                      <Users className="w-4 h-4 text-pink-600" />
                      <span className="text-gray-900">{party}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Progress</label>
                <div className="mt-2">
                  <ProgressBar progress={selectedTransaction.progress} />
                  <p className="text-sm text-gray-600 mt-1">{selectedTransaction.progress}% Complete</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Blockchain Information</label>
                <div className="mt-2 bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Block Hash:</span>
                    <span className="text-sm font-mono text-gray-900">{selectedTransaction.blockHash}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Created:</span>
                    <span className="text-sm text-gray-900">{selectedTransaction.createdAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Network:</span>
                    <span className="text-sm text-gray-900">Ethereum Mainnet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gas Fee:</span>
                    <span className="text-sm text-gray-900">0.0021 ETH</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedTransaction(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all">
                View on Explorer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm border-t border-pink-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-900">BlockTrade Finance</span>
              </div>
              <p className="text-sm text-gray-600">
                Revolutionizing trade finance through blockchain technology, ensuring secure, transparent, and efficient global transactions.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Letters of Credit</li>
                <li>Supply Chain Finance</li>
                <li>Trade Settlement</li>
                <li>Document Verification</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Technology</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Smart Contracts</li>
                <li>Blockchain Security</li>
                <li>Multi-Party Tracking</li>
                <li>Automated Compliance</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Contact Support</li>
                <li>System Status</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-pink-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              © 2024 BlockTrade Finance. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Powered by Ethereum</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Network Active</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TradeFinancePage;