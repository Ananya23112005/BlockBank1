import React, { useState } from 'react';
import { Coins, Building, Users, Gift, Shield, Eye, EyeOff, Lock } from 'lucide-react';

const TokenizationPage = () => {
  const [activeTab, setActiveTab] = useState('asset');
  const [showEntries, setShowEntries] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Storage for all entries
  const [entries, setEntries] = useState([]);
  
  // Form states
  const [assetForm, setAssetForm] = useState({
    assetType: '',
    value: '',
    description: '',
    location: ''
  });
  
  const [fractionalForm, setFractionalForm] = useState({
    assetName: '',
    totalTokens: '',
    pricePerToken: '',
    minInvestment: ''
  });
  
  const [loyaltyForm, setLoyaltyForm] = useState({
    customerName: '',
    purchaseAmount: '',
    rewardTokens: '',
    tierLevel: ''
  });
  
  const [stablecoinForm, setStablecoinForm] = useState({
    fromAddress: '',
    toAddress: '',
    amount: '',
    stablecoinType: ''
  });

  const ADMIN_PASSWORD = 'blockchain123';

  const handleAssetSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      type: 'Asset Tokenization',
      timestamp: new Date().toLocaleString(),
      data: { ...assetForm }
    };
    setEntries([...entries, newEntry]);
    setAssetForm({ assetType: '', value: '', description: '', location: '' });
    alert('Asset tokenization request submitted successfully!');
  };

  const handleFractionalSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      type: 'Fractional Ownership',
      timestamp: new Date().toLocaleString(),
      data: { ...fractionalForm }
    };
    setEntries([...entries, newEntry]);
    setFractionalForm({ assetName: '', totalTokens: '', pricePerToken: '', minInvestment: '' });
    alert('Fractional ownership setup completed!');
  };

  const handleLoyaltySubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      type: 'Loyalty Rewards',
      timestamp: new Date().toLocaleString(),
      data: { ...loyaltyForm }
    };
    setEntries([...entries, newEntry]);
    setLoyaltyForm({ customerName: '', purchaseAmount: '', rewardTokens: '', tierLevel: '' });
    alert('Loyalty tokens awarded successfully!');
  };

  const handleStablecoinSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      type: 'Stablecoin Transaction',
      timestamp: new Date().toLocaleString(),
      data: { ...stablecoinForm }
    };
    setEntries([...entries, newEntry]);
    setStablecoinForm({ fromAddress: '', toAddress: '', amount: '', stablecoinType: '' });
    alert('Stablecoin transaction initiated!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
      setPassword('');
    }
  };

  const resetAuth = () => {
    setIsAuthenticated(false);
    setShowEntries(false);
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
        activeTab === id
          ? 'bg-green-500 text-white shadow-lg'
          : 'bg-green-100 text-green-800 hover:bg-green-200'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  if (showEntries && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-yellow-100 p-6">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <Lock className="mx-auto mb-4 text-blue-600" size={48} />
            <h2 className="text-2xl font-bold text-gray-800">Admin Access Required</h2>
            <p className="text-gray-600 mt-2">Enter password to view entries</p>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
              required
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Access Entries
              </button>
              <button
                type="button"
                onClick={() => setShowEntries(false)}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (showEntries && isAuthenticated) {
    return (
      <div className="min-h-screen bg-yellow-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">All Entries ({entries.length})</h2>
              <button
                onClick={resetAuth}
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Close & Logout
              </button>
            </div>
            
            <div className="space-y-4">
              {entries.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No entries found</p>
              ) : (
                entries.map((entry) => (
                  <div key={entry.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-blue-700">{entry.type}</h3>
                      <span className="text-sm text-gray-500">{entry.timestamp}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(entry.data).map(([key, value]) => (
                        <div key={key} className="flex">
                          <span className="font-semibold text-gray-700 capitalize mr-2">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Blockchain Tokenization Engine
          </h1>
          <p className="text-center text-gray-600 text-lg">
            Asset tokenization, fractional ownership, and digital transactions
          </p>
          
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowEntries(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Eye size={20} />
              View All Entries
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TabButton id="asset" label="Asset Tokenization" icon={Building} />
            <TabButton id="fractional" label="Fractional Ownership" icon={Users} />
            <TabButton id="loyalty" label="Loyalty Rewards" icon={Gift} />
            <TabButton id="stablecoin" label="Stablecoin Transactions" icon={Coins} />
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {activeTab === 'asset' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Building className="text-green-600" />
                Asset Tokenization
              </h2>
              <form onSubmit={handleAssetSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Asset Type</label>
                  <select
                    value={assetForm.assetType}
                    onChange={(e) => setAssetForm({...assetForm, assetType: e.target.value})}
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    required
                  >
                    <option value="">Select Asset Type</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Commodities">Commodities</option>
                    <option value="Securities">Securities</option>
                    <option value="Art & Collectibles">Art & Collectibles</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Asset Value ($)</label>
                  <input
                    type="number"
                    value={assetForm.value}
                    onChange={(e) => setAssetForm({...assetForm, value: e.target.value})}
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    placeholder="Enter asset value"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={assetForm.description}
                    onChange={(e) => setAssetForm({...assetForm, description: e.target.value})}
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    placeholder="Asset description"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={assetForm.location}
                    onChange={(e) => setAssetForm({...assetForm, location: e.target.value})}
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    placeholder="Asset location"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Tokenize Asset
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'fractional' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Users className="text-blue-600" />
                Fractional Ownership
              </h2>
              <form onSubmit={handleFractionalSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Asset Name</label>
                  <input
                    type="text"
                    value={fractionalForm.assetName}
                    onChange={(e) => setFractionalForm({...fractionalForm, assetName: e.target.value})}
                    className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Name of the asset"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Tokens</label>
                  <input
                    type="number"
                    value={fractionalForm.totalTokens}
                    onChange={(e) => setFractionalForm({...fractionalForm, totalTokens: e.target.value})}
                    className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Total tokens to create"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price per Token ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={fractionalForm.pricePerToken}
                    onChange={(e) => setFractionalForm({...fractionalForm, pricePerToken: e.target.value})}
                    className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Price per token"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Investment ($)</label>
                  <input
                    type="number"
                    value={fractionalForm.minInvestment}
                    onChange={(e) => setFractionalForm({...fractionalForm, minInvestment: e.target.value})}
                    className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Minimum investment amount"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Setup Fractional Ownership
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'loyalty' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Gift className="text-yellow-600" />
                Tokenized Loyalty Rewards
              </h2>
              <form onSubmit={handleLoyaltySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name</label>
                  <input
                    type="text"
                    value={loyaltyForm.customerName}
                    onChange={(e) => setLoyaltyForm({...loyaltyForm, customerName: e.target.value})}
                    className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500 focus:outline-none"
                    placeholder="Customer name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Purchase Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={loyaltyForm.purchaseAmount}
                    onChange={(e) => setLoyaltyForm({...loyaltyForm, purchaseAmount: e.target.value})}
                    className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500 focus:outline-none"
                    placeholder="Purchase amount"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Reward Tokens</label>
                  <input
                    type="number"
                    value={loyaltyForm.rewardTokens}
                    onChange={(e) => setLoyaltyForm({...loyaltyForm, rewardTokens: e.target.value})}
                    className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500 focus:outline-none"
                    placeholder="Tokens to award"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tier Level</label>
                  <select
                    value={loyaltyForm.tierLevel}
                    onChange={(e) => setLoyaltyForm({...loyaltyForm, tierLevel: e.target.value})}
                    className="w-full p-3 border-2 border-yellow-200 rounded-lg focus:border-yellow-500 focus:outline-none"
                    required
                  >
                    <option value="">Select Tier</option>
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                  >
                    Award Loyalty Tokens
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'stablecoin' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Coins className="text-green-600" />
                Stablecoin Transactions
              </h2>
              <form onSubmit={handleStablecoinSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">From Address</label>
                  <input
                    type="text"
                    value={stablecoinForm.fromAddress}
                    onChange={(e) => setStablecoinForm({...stablecoinForm, fromAddress: e.target.value})}
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    placeholder="0x..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">To Address</label>
                  <input
                    type="text"
                    value={stablecoinForm.toAddress}
                    onChange={(e) => setStablecoinForm({...stablecoinForm, toAddress: e.target.value})}
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    placeholder="0x..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={stablecoinForm.amount}
                    onChange={(e) => setStablecoinForm({...stablecoinForm, amount: e.target.value})}
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    placeholder="Amount to transfer"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stablecoin Type</label>
                  <select
                    value={stablecoinForm.stablecoinType}
                    onChange={(e) => setStablecoinForm({...stablecoinForm, stablecoinType: e.target.value})}
                    className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
                    required
                  >
                    <option value="">Select Stablecoin</option>
                    <option value="USDT">USDT</option>
                    <option value="USDC">USDC</option>
                    <option value="DAI">DAI</option>
                    <option value="BUSD">BUSD</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Initiate Transaction
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenizationPage;