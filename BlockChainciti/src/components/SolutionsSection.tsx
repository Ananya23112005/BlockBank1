import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Users, FileText, DollarSign, Banknote, X, ArrowRight, Shield, Clock, Globe, Network } from 'lucide-react';
import BlockchainCard from './BlockchainCard';

interface SolutionDetail {
  title: string;
  description: string;
  features: string[];
  stats: { label: string; value: string }[];
  useCases: string[];
  image: string;
  color: string;
}

const SolutionsSection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSolution, setSelectedSolution] = useState<SolutionDetail | null>(null);

  const solutionDetails: { [key: string]: SolutionDetail } = {
    'Payments': {
      title: 'Cross-Border Payments Revolution',
      description: 'Transform international money transfers with blockchain technology. Send payments across borders in seconds, not days, with complete transparency and minimal fees.',
      features: [
        'Real-time settlement in under 10 seconds',
        'Up to 90% lower fees than traditional banking',
        'Support for 50+ currencies and cryptocurrencies',
        'End-to-end transaction tracking',
        'Smart contract automation',
        'Regulatory compliance built-in'
      ],
      stats: [
        { label: 'Transaction Speed', value: '<10 sec' },
        { label: 'Fee Reduction', value: '90%' },
        { label: 'Supported Currencies', value: '50+' },
        { label: 'Success Rate', value: '99.9%' }
      ],
      useCases: [
        'International remittances for families',
        'B2B cross-border payments',
        'E-commerce international transactions',
        'Freelancer payments across countries',
        'Supply chain payments'
      ],
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
      color: 'from-blue-500 to-blue-700'
    },
    'KYC & Identity': {
      title: 'Decentralized Identity Verification',
      description: 'Secure, user-controlled identity verification that eliminates repetitive onboarding while maintaining the highest security standards.',
      features: [
        'One-time verification for multiple services',
        'Zero-knowledge proof technology',
        'Biometric authentication support',
        'Document verification automation',
        'Privacy-preserving data sharing',
        'Instant identity verification'
      ],
      stats: [
        { label: 'Verification Time', value: '<2 min' },
        { label: 'Fraud Reduction', value: '95%' },
        { label: 'User Satisfaction', value: '98%' },
        { label: 'Cost Savings', value: '80%' }
      ],
      useCases: [
        'Digital banking onboarding',
        'Financial services access',
        'Government service applications',
        'Healthcare record verification',
        'Educational credential verification'
      ],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      color: 'from-teal-500 to-teal-700'
    },
    'Trade Finance': {
      title: 'Smart Contract Trade Finance',
      description: 'Revolutionize trade finance with automated, transparent, and efficient blockchain-based solutions that reduce processing time from weeks to hours.',
      features: [
        'Automated letter of credit processing',
        'Real-time shipment tracking',
        'Smart contract escrow services',
        'Digital document management',
        'Multi-party transaction coordination',
        'Compliance automation'
      ],
      stats: [
        { label: 'Processing Time', value: '2-4 hours' },
        { label: 'Cost Reduction', value: '70%' },
        { label: 'Document Accuracy', value: '99.8%' },
        { label: 'Partner Banks', value: '200+' }
      ],
      useCases: [
        'Import/Export financing',
        'Supply chain financing',
        'Invoice factoring',
        'Working capital solutions',
        'International trade settlements'
      ],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      color: 'from-indigo-500 to-indigo-700'
    },
    'Lending': {
      title: 'Decentralized Lending Platform',
      description: 'Access credit through peer-to-peer lending with automated risk assessment, transparent terms, and instant approvals powered by smart contracts.',
      features: [
        'Automated credit scoring using AI',
        'Peer-to-peer lending marketplace',
        'Collateral management via smart contracts',
        'Real-time interest rate optimization',
        'Cross-collateral lending options',
        'Instant loan approvals'
      ],
      stats: [
        { label: 'Approval Time', value: '<30 min' },
        { label: 'Interest Rates', value: '2-15%' },
        { label: 'Default Rate', value: '<2%' },
        { label: 'Active Lenders', value: '10K+' }
      ],
      useCases: [
        'Personal loans and credit',
        'Business working capital',
        'Mortgage and real estate financing',
        'Student and education loans',
        'Asset-backed lending'
      ],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
      color: 'from-green-500 to-green-700'
    },
    'Tokenization': {
      title: 'Real-World Asset Tokenization',
      description: 'Convert physical and digital assets into blockchain tokens, enabling fractional ownership, improved liquidity, and global accessibility.',
      features: [
        'Real estate fractional ownership',
        'Art and collectibles tokenization',
        'Commodity and precious metals tokens',
        'Intellectual property tokenization',
        'Revenue-sharing token models',
        'Regulatory-compliant token structures'
      ],
      stats: [
        { label: 'Assets Tokenized', value: '$2B+' },
        { label: 'Liquidity Increase', value: '300%' },
        { label: 'Access Improvement', value: '90%' },
        { label: 'Transaction Cost', value: '-85%' }
      ],
      useCases: [
        'Real estate investment platforms',
        'Art and luxury goods investment',
        'Infrastructure project funding',
        'Startup equity tokenization',
        'Renewable energy asset tokens'
      ],
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
      color: 'from-amber-500 to-amber-700'
    },
    'Interbank Network': {
      title: 'Blockchain Interbank Network',
      description: 'Revolutionary interbank communication and settlement network built on blockchain technology, enabling seamless cooperation and instant settlements between financial institutions.',
      features: [
        'Real-time interbank settlements',
        'Shared liquidity pools across institutions',
        'Automated correspondent banking',
        'Cross-border regulatory compliance',
        'Multi-signature transaction approval',
        'Transparent audit trails'
      ],
      stats: [
        { label: 'Settlement Time', value: '<5 min' },
        { label: 'Network Banks', value: '500+' },
        { label: 'Daily Volume', value: '$10B+' },
        { label: 'Cost Reduction', value: '75%' }
      ],
      useCases: [
        'Interbank fund transfers',
        'Correspondent banking services',
        'Cross-border settlement networks',
        'Regulatory reporting automation',
        'Shared KYC and compliance data'
      ],
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      color: 'from-purple-500 to-purple-700'
    }
  };

  const handleLearnMore = (solutionType: string) => {
    const detail = solutionDetails[solutionType];
    if (detail) {
      setSelectedSolution(detail);
    } else {
      // Fallback to navigation for solutions without details
      switch (solutionType) {
        case 'KYC & Identity':
          navigate('/kyc-verification');
          break;
        case 'Payments':
          navigate('/payments');
          break;
        case 'Trade Finance':
          navigate('/trade-finance');
          break;
        case 'Lending':
          navigate('/lending');
          break;
        case 'Tokenization':
          navigate('/tokenization');
          break;
        case 'Interbank Network':
          navigate('/interbank');
          break;
        default:
          console.log(`Learn more clicked for: ${solutionType}`);
      }
    }
  };

  const solutions = [
    {
      icon: <CreditCard className="h-10 w-10 text-blue-500" />,
      title: 'Payments',
      description: 'Instant cross-border transactions with minimal fees and real-time settlement, powered by blockchain.',
      benefits: ['Instant settlements', 'Lower transaction fees', 'Cross-border efficiency'],
      color: 'from-blue-500 to-blue-700',
      onLearnMore: () => handleLearnMore('Payments')
    },
    {
      icon: <Users className="h-10 w-10 text-teal-500" />,
      title: 'KYC & Identity',
      description: 'Secure, decentralized identity verification that reduces onboarding friction and enhances security.',
      benefits: ['Single verification', 'User-controlled data', 'Reduced fraud'],
      color: 'from-teal-500 to-teal-700',
      onLearnMore: () => handleLearnMore('KYC & Identity')
    },
    {
      icon: <FileText className="h-10 w-10 text-indigo-500" />,
      title: 'Trade Finance',
      description: 'Transparent supply chain financing with smart contracts automating approvals and payments.',
      benefits: ['Automated verification', 'Real-time tracking', 'Reduced paperwork'],
      color: 'from-indigo-500 to-indigo-700',
      onLearnMore: () => handleLearnMore('Trade Finance')
    },
    {
      icon: <DollarSign className="h-10 w-10 text-green-500" />,
      title: 'Lending',
      description: 'Decentralized lending platforms with peer-to-peer options and smart contract-enforced terms.',
      benefits: ['Automated approvals', 'Transparent terms', 'Reduced intermediaries'],
      color: 'from-green-500 to-green-700',
      onLearnMore: () => handleLearnMore('Lending')
    },
    {
      icon: <Banknote className="h-10 w-10 text-amber-500" />,
      title: 'Tokenization',
      description: 'Convert real-world assets into digital tokens for fractional ownership and improved liquidity.',
      benefits: ['Asset fractioning', 'Increased liquidity', 'Expanded access'],
      color: 'from-amber-500 to-amber-700',
      onLearnMore: () => handleLearnMore('Tokenization')
    },
    {
      icon: <Network className="h-10 w-10 text-purple-500" />,
      title: 'Interbank Network',
      description: 'Blockchain-based interbank communication network enabling seamless cooperation and instant settlements.',
      benefits: ['Real-time settlements', 'Shared liquidity', 'Automated compliance'],
      color: 'from-purple-500 to-purple-700',
      onLearnMore: () => handleLearnMore('Interbank Network')
    }
  ];

  return (
    <>
      <section id="solutions" className="py-24 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Blockchain Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Transforming Banking Functions
            </h2>
            <p className="text-lg text-gray-600">
              Our blockchain technology revolutionizes core banking operations, delivering
              unprecedented efficiency, security, and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <BlockchainCard
                key={index}
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
                benefits={solution.benefits}
                color={solution.color}
                onLearnMore={solution.onLearnMore}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal for detailed information */}
      {selectedSolution && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className={`bg-gradient-to-r ${selectedSolution.color} p-6 text-white relative`}>
              <button
                onClick={() => setSelectedSolution(null)}
                className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-3xl font-bold mb-2">{selectedSolution.title}</h2>
              <p className="text-lg opacity-90">{selectedSolution.description}</p>
            </div>

            <div className="p-6">
              {/* Hero Image */}
              <div className="mb-8">
                <img
                  src={selectedSolution.image}
                  alt={selectedSolution.title}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {selectedSolution.stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-500" />
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {selectedSolution.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Use Cases */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-green-500" />
                    Use Cases
                  </h3>
                  <ul className="space-y-3">
                    {selectedSolution.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start">
                        <Clock className="h-4 w-4 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedSolution(null);
                    if (selectedSolution.title.includes('Payments')) {
                      navigate('/payments');
                    } else if (selectedSolution.title.includes('KYC') || selectedSolution.title.includes('Identity')) {
                      navigate('/kyc');
                    }
                    else if (selectedSolution.title.includes('Trade') || selectedSolution.title.includes('Finance')) {
                      navigate('/trade-finance');
                    }
                    else if (selectedSolution.title.includes('Lending') ) {
                      navigate('/lending');
                    }
                    else if (selectedSolution.title.includes('Tokenization') ) {
                      navigate('/tokenization');
                    }
                    else if (selectedSolution.title.includes('Interbank') ) {
                      navigate('/interbank');
                    }
                  }}
                  className={`flex-1 bg-gradient-to-r ${selectedSolution.color} text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold`}
                >
                  Get Started
                </button>
                <button
                  onClick={() => setSelectedSolution(null)}
                  className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SolutionsSection;