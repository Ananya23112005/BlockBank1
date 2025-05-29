import React, { useState, useEffect } from 'react';

interface LoanApplication {
  id: string;
  amount: number;
  purpose: string;
  duration: number;
  interestRate: number;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  collateral: number;
  creditScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  appliedDate: string;
  approvalDate?: string;
  monthlyPayment?: number;
}

interface ActiveLoan {
  id: string;
  principal: number;
  remaining: number;
  interestRate: number;
  nextPayment: string;
  monthlyPayment: number;
  status: 'active' | 'overdue' | 'completed';
}

const LendingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('apply');
  const [loanAmount, setLoanAmount] = useState(10000);
  const [loanPurpose, setLoanPurpose] = useState('business');
  const [loanDuration, setLoanDuration] = useState(12);
  const [collateralAmount, setCollateralAmount] = useState(15000);
  const [creditScore, setCreditScore] = useState(750);
  const [isProcessing, setIsProcessing] = useState(false);
  const [interestRate, setInterestRate] = useState(0);
  const [riskAssessment, setRiskAssessment] = useState<string>('');

  // Updated to use state for loan applications
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>([
    {
      id: 'L001',
      amount: 50000,
      purpose: 'Business Expansion',
      duration: 24,
      interestRate: 8.5,
      status: 'approved',
      collateral: 75000,
      creditScore: 780,
      riskLevel: 'low',
      appliedDate: '2024-01-15',
      approvalDate: '2024-01-16',
      monthlyPayment: 2250
    },
    {
      id: 'L002',
      amount: 25000,
      purpose: 'Equipment Purchase',
      duration: 18,
      interestRate: 9.2,
      status: 'pending',
      collateral: 35000,
      creditScore: 720,
      riskLevel: 'medium',
      appliedDate: '2024-01-20'
    }
  ]);

  const [activeLoans] = useState<ActiveLoan[]>([
    {
      id: 'AL001',
      principal: 50000,
      remaining: 42000,
      interestRate: 8.5,
      nextPayment: '2024-02-15',
      monthlyPayment: 2250,
      status: 'active'
    }
  ]);

  // Smart contract risk assessment simulation
  useEffect(() => {
    const calculateRisk = () => {
      const ltvRatio = (loanAmount / collateralAmount) * 100;
      let risk = 'low';
      let rate = 6.5;

      if (creditScore < 650 || ltvRatio > 80) {
        risk = 'high';
        rate = 12.5;
      } else if (creditScore < 700 || ltvRatio > 60) {
        risk = 'medium';
        rate = 9.5;
      }

      setRiskAssessment(risk);
      setInterestRate(rate);
    };

    calculateRisk();
  }, [loanAmount, collateralAmount, creditScore]);

  const generateLoanId = () => {
    return 'L' + String(Date.now()).slice(-6);
  };

  const handleLoanApplication = async () => {
    setIsProcessing(true);
    
    // Simulate smart contract processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const monthlyPayment = parseFloat(calculateMonthlyPayment(loanAmount, interestRate, loanDuration));
    
    const newApplication: LoanApplication = {
      id: generateLoanId(),
      amount: loanAmount,
      purpose: loanPurpose,
      duration: loanDuration,
      interestRate: interestRate,
      status: 'pending',
      collateral: collateralAmount,
      creditScore: creditScore,
      riskLevel: riskAssessment as 'low' | 'medium' | 'high',
      appliedDate: new Date().toISOString().split('T')[0],
      monthlyPayment: monthlyPayment
    };

    setLoanApplications(prev => [...prev, newApplication]);
    setIsProcessing(false);
    
    // Switch to applications tab to show the new application
    setActiveTab('applications');
    
    alert(`Loan application submitted successfully! 
Application ID: ${newApplication.id}
Interest Rate: ${interestRate}%
Risk Level: ${riskAssessment}
Monthly Payment: $${monthlyPayment.toFixed(2)}

Check your applications tab to track progress.`);

    // Simulate automatic approval/rejection after 5 seconds for demo
    setTimeout(() => {
      simulateApprovalProcess(newApplication.id);
    }, 5000);
  };

  const simulateApprovalProcess = (applicationId: string) => {
    setLoanApplications(prev => 
      prev.map(app => {
        if (app.id === applicationId) {
          // Simulate approval based on risk level
          const shouldApprove = Math.random() > (app.riskLevel === 'high' ? 0.7 : app.riskLevel === 'medium' ? 0.3 : 0.1);
          
          return {
            ...app,
            status: shouldApprove ? 'approved' : 'rejected' as 'approved' | 'rejected',
            approvalDate: shouldApprove ? new Date().toISOString().split('T')[0] : undefined
          };
        }
        return app;
      })
    );
  };

  const handleManualApproval = (applicationId: string, action: 'approve' | 'reject') => {
    setLoanApplications(prev => 
      prev.map(app => {
        if (app.id === applicationId) {
          return {
            ...app,
            status: action === 'approve' ? 'approved' : 'rejected',
            approvalDate: action === 'approve' ? new Date().toISOString().split('T')[0] : undefined
          };
        }
        return app;
      })
    );
  };

  const calculateMonthlyPayment = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / 100 / 12;
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1);
    return payment.toFixed(2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart Lending Platform</h1>
          <p className="text-gray-600">AI-powered loan processing with blockchain security</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
          <button
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'apply' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('apply')}
          >
            Apply for Loan
          </button>
          <button
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'applications' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('applications')}
          >
            My Applications ({loanApplications.length})
          </button>
          <button
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'active' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('active')}
          >
            Active Loans
          </button>
          <button
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'marketplace' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('marketplace')}
          >
            P2P Marketplace
          </button>
        </div>

        {/* Apply for Loan Tab */}
        {activeTab === 'apply' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Application Form */}
            <div className="bg-yellow-100 p-8 rounded-xl shadow-lg border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan Application</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount (USD)
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="500000"
                    step="1000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center mt-2">
                    <span className="text-2xl font-bold text-blue-600">
                      ${loanAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Purpose
                  </label>
                  <select
                    value={loanPurpose}
                    onChange={(e) => setLoanPurpose(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="business">Business Expansion</option>
                    <option value="equipment">Equipment Purchase</option>
                    <option value="real_estate">Real Estate</option>
                    <option value="working_capital">Working Capital</option>
                    <option value="refinance">Debt Refinancing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Duration (Months)
                  </label>
                  <input
                    type="range"
                    min="6"
                    max="60"
                    step="6"
                    value={loanDuration}
                    onChange={(e) => setLoanDuration(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center mt-2">
                    <span className="text-lg font-semibold text-gray-800">
                      {loanDuration} months
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collateral Value (USD)
                  </label>
                  <input
                    type="number"
                    value={collateralAmount}
                    onChange={(e) => setCollateralAmount(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter collateral value"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credit Score (Simulated)
                  </label>
                  <input
                    type="range"
                    min="300"
                    max="850"
                    step="10"
                    value={creditScore}
                    onChange={(e) => setCreditScore(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center mt-2">
                    <span className={`text-lg font-semibold ${
                      creditScore >= 750 ? 'text-green-600' :
                      creditScore >= 650 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {creditScore}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLoanApplication}
                  disabled={isProcessing}
                  className={`w-full py-4 px-6 rounded-lg font-medium transition-colors ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Smart Contract...
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </div>

            {/* Loan Assessment */}
            <div className="space-y-6">
              {/* Smart Contract Analysis */}
              <div className="bg-green-100 p-6 rounded-xl shadow-lg border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Contract Analysis</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Interest Rate</span>
                    <span className="text-lg font-bold text-blue-600">{interestRate}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Monthly Payment</span>
                    <span className="text-lg font-bold text-green-600">
                      ${calculateMonthlyPayment(loanAmount, interestRate, loanDuration)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">Risk Level</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      riskAssessment === 'low' ? 'bg-green-100 text-green-800' :
                      riskAssessment === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {riskAssessment.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">LTV Ratio</span>
                    <span className="text-lg font-bold text-gray-800">
                      {((loanAmount / collateralAmount) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Blockchain Features */}
              <div className="bg-pink-100 p-6 rounded-xl shadow-lg border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Blockchain Benefits</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Automated smart contract execution</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Transparent interest calculations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Immutable loan records</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Decentralized risk assessment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Instant approval for qualified applicants</span>
                  </div>
                </div>
              </div>

              {/* Collateral Management */}
              <div className="bg-blue-200 p-6 rounded-xl shadow-lg border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Collateral Management</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Digital Asset Collateral</h4>
                    <p className="text-blue-700 text-sm">
                      Your collateral is tokenized and held in a smart contract escrow
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-600">Required</div>
                      <div className="text-lg font-bold text-gray-900">
                        ${(loanAmount * 1.2).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-600">Provided</div>
                      <div className="text-lg font-bold text-green-600">
                        ${collateralAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg border text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{loanApplications.length}</div>
                <div className="text-gray-600">Total Applications</div>
              </div>
              <div className="bg-yellow-50 p-6 rounded-xl shadow-lg border text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {loanApplications.filter(app => app.status === 'pending').length}
                </div>
                <div className="text-gray-600">Pending Review</div>
              </div>
              <div className="bg-green-50 p-6 rounded-xl shadow-lg border text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {loanApplications.filter(app => app.status === 'approved').length}
                </div>
                <div className="text-gray-600">Approved</div>
              </div>
              <div className="bg-red-50 p-6 rounded-xl shadow-lg border text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {loanApplications.filter(app => app.status === 'rejected').length}
                </div>
                <div className="text-gray-600">Rejected</div>
              </div>
            </div>

            {loanApplications.map((application) => (
              <div key={application.id} className="bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Application #{application.id}</h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                        {application.status.toUpperCase()}
                      </span>
                      {application.status === 'pending' && (
                        <div className="flex items-center text-yellow-600">
                          <div className="animate-pulse w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                          <span className="text-sm">Processing...</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ${application.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">requested</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600">Purpose</div>
                    <div className="text-lg font-bold text-gray-900">{application.purpose}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600">Duration</div>
                    <div className="text-lg font-bold text-blue-600">{application.duration} months</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600">Interest Rate</div>
                    <div className="text-lg font-bold text-green-600">{application.interestRate}%</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600">Monthly Payment</div>
                    <div className="text-lg font-bold text-purple-600">
                      ${application.monthlyPayment?.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600">Applied Date</div>
                    <div className="text-lg font-bold text-blue-600">{application.appliedDate}</div>
                  </div>
                  {application.approvalDate && (
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-600">Approval Date</div>
                      <div className="text-lg font-bold text-green-600">{application.approvalDate}</div>
                    </div>
                  )}
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600">Risk Level</div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      application.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      application.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.riskLevel.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Action buttons for demo purposes */}
                {application.status === 'pending' && (
                  <div className="flex space-x-4 pt-4 border-t">
                    <button 
                      onClick={() => handleManualApproval(application.id, 'approve')}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Manual Approve (Demo)
                    </button>
                    <button 
                      onClick={() => handleManualApproval(application.id, 'reject')}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Manual Reject (Demo)
                    </button>
                  </div>
                )}

                {application.status === 'approved' && (
                  <div className="flex space-x-4 pt-4 border-t">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Accept Loan Terms
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      View Detailed Terms
                    </button>
                  </div>
                )}

                {application.status === 'rejected' && (
                  <div className="flex space-x-4 pt-4 border-t">
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Submit New Application
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      View Rejection Reason
                    </button>
                  </div>
                )}
              </div>
            ))}

            {loanApplications.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h3>
                <p className="text-gray-600 mb-6">Submit your first loan application to get started</p>
                <button 
                  onClick={() => setActiveTab('apply')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply for Loan
                </button>
              </div>
            )}
          </div>
        )}

        {/* Active Loans Tab */}
        {activeTab === 'active' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-brown-100 p-6 rounded-xl shadow-lg border text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{activeLoans.length}</div>
                <div className="text-gray-600">Active Loans</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${activeLoans.reduce((sum, loan) => sum + loan.principal, 0).toLocaleString()}
                </div>
                <div className="text-gray-600">Total Principal</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  ${activeLoans.reduce((sum, loan) => sum + loan.remaining, 0).toLocaleString()}
                </div>
                <div className="text-gray-600">Remaining Balance</div>
              </div>
            </div>

            {activeLoans.map((loan) => (
              <div key={loan.id} className="bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Loan #{loan.id}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      loan.status === 'active' ? 'bg-green-100 text-green-800' :
                      loan.status === 'overdue' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {loan.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ${loan.remaining.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">remaining</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600">Principal</div>
                    <div className="text-lg font-bold text-gray-900">
                      ${loan.principal.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600">Interest Rate</div>
                    <div className="text-lg font-bold text-blue-600">{loan.interestRate}%</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600">Monthly Payment</div>
                    <div className="text-lg font-bold text-green-600">
                      ${loan.monthlyPayment.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-600">Next Payment</div>
                    <div className="text-lg font-bold text-orange-600">{loan.nextPayment}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Repayment Progress</span>
                    <span>{(((loan.principal - loan.remaining) / loan.principal) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((loan.principal - loan.remaining) / loan.principal) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Make Payment
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}

            {activeLoans.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">💰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Loans</h3>
                <p className="text-gray-600 mb-6">Your approved loans will appear here once activated</p>
                <button 
                  onClick={() => setActiveTab('applications')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Check Applications
                </button>
              </div>
            )}
          </div>
        )}

        {/* P2P Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-lg border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Peer-to-Peer Lending Marketplace</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Lender Section */}
                <div className="border-r md:pr-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">For Lenders</h3>
                  <p className="text-gray-600 mb-6">
                    Earn competitive returns by funding loans directly to borrowers
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-blue-900">Business Loan Request</span>
                        <span className="text-blue-600 font-bold">8.5% APR</span>
                      </div>
                      <div className="text-sm text-blue-700">
                        Amount: $50,000 • Duration: 24 months • Risk: Low
                      </div>
                      <button className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Fund This Loan
                      </button>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-green-900">Equipment Finance</span>
                        <span className="text-green-600 font-bold">9.2% APR</span>
                      </div>
                      <div className="text-sm text-green-700">
                        Amount: $25,000 • Duration: 18 months • Risk: Medium
                      </div>
                      <button className="mt-3 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Fund This Loan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Borrower Section */}
                <div className="md:pl-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">For Borrowers</h3>
                  <p className="text-gray-600 mb-6">
                    Access competitive rates from individual and institutional lenders
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-pink-100 rounded-lg">
                      <div className="text-sm font-medium text-gray-600 mb-1">Average Rates</div>
                      <div className="text-2xl font-bold text-gray-900">6.5% - 12.5%</div>
                      <div className="text-sm text-gray-600">Based on credit profile</div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-600 mb-1">Active Lenders</div>
                      <div className="text-2xl font-bold text-gray-900">1,247</div>
                      <div className="text-sm text-gray-600">Ready to fund loans</div>
                    </div>
                    
                    <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Create Loan Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LendingPage;