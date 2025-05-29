import React, { useState, useEffect } from 'react';
import { Menu, X, Bitcoin, Mail, Phone, MapPin, Users, Shield, Zap, Globe, ChevronRight, CreditCard, Smartphone, PiggyBank, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'about' | 'contact' | 'customers' | null>(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: string) => {
    if (item === 'About') {
      setActiveModal('about');
    } else if (item === 'Contact') {
      setActiveModal('contact');
    } else if (item === 'For Customers') {
      setActiveModal('customers');
    } else if (item === 'Solutions') {
      // Scroll to SolutionsSection
      const element = document.getElementById('solutions-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item === 'Enterprise') {
      // Scroll to EnterpriseSection  
      const element = document.getElementById('enterprise-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // About Modal Component
  const AboutModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900">About BlockBank</h2>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Hero Section */}
          <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <Bitcoin className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-blue-900 mb-4">Revolutionizing Digital Banking</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              BlockBank is a cutting-edge blockchain-based banking platform that brings transparency, 
              security, and efficiency to financial services through distributed ledger technology.
            </p>
          </div>

          {/* Project Overview */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-blue-900 mb-4">Our Vision</h4>
              <p className="text-gray-600 leading-relaxed">
                To democratize banking by leveraging blockchain technology to create a transparent, 
                secure, and accessible financial ecosystem. We aim to eliminate traditional banking 
                intermediaries while maintaining regulatory compliance and user trust.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-900 mb-4">Our Mission</h4>
              <p className="text-gray-600 leading-relaxed">
                Empowering individuals and businesses with next-generation banking solutions that 
                combine the security of blockchain with the convenience of modern digital banking, 
                making financial services more inclusive and efficient.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-blue-900 mb-6 text-center">Key Features & Use Cases</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h5 className="font-semibold text-blue-900 mb-2">Secure Transactions</h5>
                <p className="text-sm text-gray-600">
                  Immutable blockchain records ensure transaction security and prevent fraud
                </p>
              </div>
              <div className="text-center">
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h5 className="font-semibold text-blue-900 mb-2">Instant Settlements</h5>
                <p className="text-sm text-gray-600">
                  Real-time transaction processing without traditional banking delays
                </p>
              </div>
              <div className="text-center">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h5 className="font-semibold text-blue-900 mb-2">Global Access</h5>
                <p className="text-sm text-gray-600">
                  Cross-border transactions with minimal fees and maximum transparency
                </p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h5 className="font-semibold text-blue-900 mb-2">DeFi Integration</h5>
                <p className="text-sm text-gray-600">
                  Access to decentralized finance protocols and yield farming opportunities
                </p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h4 className="text-xl font-semibold text-blue-900 mb-4">Primary Use Cases</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <ChevronRight className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-blue-900">Digital Asset Management</h5>
                  <p className="text-gray-600">Secure storage and management of cryptocurrencies and digital assets with institutional-grade security.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ChevronRight className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-blue-900">Smart Contract Banking</h5>
                  <p className="text-gray-600">Automated loan processing, insurance claims, and investment management through smart contracts.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ChevronRight className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-blue-900">Cross-Border Payments</h5>
                  <p className="text-gray-600">Instant international transfers with transparent fees and real-time tracking capabilities.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ChevronRight className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-blue-900">Decentralized Identity</h5>
                  <p className="text-gray-600">Self-sovereign identity management for secure and private financial interactions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-blue-900 mb-4">Technology Foundation</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-semibold text-blue-800 mb-2">Blockchain Layer</h5>
                <p className="text-sm text-gray-600">Ethereum-based smart contracts with Layer 2 scaling solutions</p>
              </div>
              <div>
                <h5 className="font-semibold text-blue-800 mb-2">Security</h5>
                <p className="text-sm text-gray-600">Multi-signature wallets, hardware security modules, and zero-knowledge proofs</p>
              </div>
              <div>
                <h5 className="font-semibold text-blue-800 mb-2">Compliance</h5>
                <p className="text-sm text-gray-600">Built-in KYC/AML protocols and regulatory reporting capabilities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Modal Component
  const ContactModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900">Contact Us</h2>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Contact Intro */}
          <div className="text-center py-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Get in Touch</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about BlockBank or want to learn more about our blockchain banking solutions? 
              Our team is here to help you navigate the future of digital finance.
            </p>
          </div>

          {/* Team Members */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-blue-900 mb-6 text-center">Our Team</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h5 className="font-semibold text-blue-900 mb-2">Ananya Shroff</h5>
                <p className="text-sm text-gray-600 mb-3">Lead Blockchain Developer</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">ananya.shroff@blockbank.in</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">+91 98765 43210</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h5 className="font-semibold text-blue-900 mb-2">Nachiket Rakhonde</h5>
                <p className="text-sm text-gray-600 mb-3">Smart Contract Architect</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">nachiket.rakhonde@blockbank.in</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">+91 87654 32109</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h5 className="font-semibold text-blue-900 mb-2">Ayush Sharma</h5>
                <p className="text-sm text-gray-600 mb-3">Full Stack Developer</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">ayush.sharma@blockbank.in</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">+91 76543 21098</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-blue-900">Contact Information</h4>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h5 className="font-semibold text-blue-900">Headquarters</h5>
                    <p className="text-gray-600">
                      BlockBank Technologies Pvt. Ltd.<br />
                      Tech Park, Sector 18<br />
                      Gurugram, Haryana 122015<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h5 className="font-semibold text-blue-900">General Inquiries</h5>
                    <p className="text-gray-600">
                      info@blockbank.in<br />
                      support@blockbank.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h5 className="font-semibold text-blue-900">Phone Support</h5>
                    <p className="text-gray-600">
                      +91 11 4567 8900<br />
                      Mon-Fri: 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-4">Quick Contact Form</h4>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                    <option>Investment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Customers Modal Component
  const CustomersModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900">For Customers</h2>
          <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Hero Section */}
          <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-blue-900 mb-4">Banking Made Simple</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of banking with BlockBank's customer-focused solutions. 
              Secure, transparent, and designed for your financial success.
            </p>
          </div>

          {/* Customer Services */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <CreditCard className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Digital Wallet</h4>
              <p className="text-sm text-gray-600">
                Secure digital wallet for all your cryptocurrencies and traditional assets in one place.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <Smartphone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Mobile Banking</h4>
              <p className="text-sm text-gray-600">
                Full-featured mobile app with instant transfers, bill payments, and investment tracking.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <PiggyBank className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Smart Savings</h4>
              <p className="text-sm text-gray-600">
                AI-powered savings plans with automated investing and goal-based financial planning.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Investment Hub</h4>
              <p className="text-sm text-gray-600">
                Access to DeFi protocols, yield farming, and traditional investment products.
              </p>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-blue-900 mb-6 text-center">Why Choose BlockBank?</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-1">Bank-Grade Security</h5>
                    <p className="text-sm text-gray-600">Multi-layer encryption, biometric authentication, and blockchain immutability protect your assets.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-1">Instant Transactions</h5>
                    <p className="text-sm text-gray-600">Send money anywhere in the world in seconds, not days, with transparent fees.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-1">Global Access</h5>
                    <p className="text-sm text-gray-600">Bank without borders - access your money from anywhere with internet connectivity.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Bitcoin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-1">Crypto Integration</h5>
                    <p className="text-sm text-gray-600">Seamlessly manage both traditional and digital currencies in one unified platform.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-1">24/7 Support</h5>
                    <p className="text-sm text-gray-600">Round-the-clock customer support with dedicated relationship managers.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-semibold text-blue-900 mb-1">Competitive Yields</h5>
                    <p className="text-sm text-gray-600">Earn higher returns on your savings through our DeFi integration and smart contracts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Types */}
          <div>
            <h4 className="text-xl font-semibold text-blue-900 mb-6 text-center">Choose Your Account Type</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h5 className="text-lg font-semibold text-blue-900">Personal</h5>
                  <p className="text-gray-600 text-sm">For individual banking needs</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Free digital wallet</li>
                  <li>• Mobile & web banking</li>
                  <li>• Basic crypto trading</li>
                  <li>• 24/7 customer support</li>
                  <li>• Savings & investment tools</li>
                </ul>
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors">
                  Get Started
                </button>
              </div>

              <div className="border-2 border-blue-500 rounded-lg p-6 relative hover:shadow-lg transition-all">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">POPULAR</span>
                </div>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h5 className="text-lg font-semibold text-blue-900">Premium</h5>
                  <p className="text-gray-600 text-sm">For advanced users & investors</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• All Personal features</li>
                  <li>• Advanced trading tools</li>
                  <li>• DeFi yield farming</li>
                  <li>• Priority support</li>
                  <li>• Investment advisory</li>
                </ul>
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors">
                  Upgrade Now
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h5 className="text-lg font-semibold text-blue-900">Business</h5>
                  <p className="text-gray-600 text-sm">For companies & organizations</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Multi-user access</li>
                  <li>• Corporate treasury</li>
                  <li>• Bulk transactions</li>
                  <li>• API integration</li>
                  <li>• Dedicated account manager</li>
                </ul>
                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h4 className="text-xl font-semibold text-blue-900 mb-6 text-center">Getting Started is Easy</h4>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h5 className="font-semibold text-blue-900 mb-2">Sign Up</h5>
                <p className="text-sm text-gray-600">Create your account in under 5 minutes with just your email and phone number.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h5 className="font-semibold text-blue-900 mb-2">Verify Identity</h5>
                <p className="text-sm text-gray-600">Complete KYC verification using our secure, blockchain-based identity system.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h5 className="font-semibold text-blue-900 mb-2">Fund Account</h5>
                <p className="text-sm text-gray-600">Add funds via bank transfer, card, or cryptocurrency deposit.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  4
                </div>
                <h5 className="font-semibold text-blue-900 mb-2">Start Banking</h5>
                <p className="text-sm text-gray-600">Begin using all BlockBank features - send, save, invest, and grow your wealth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-md py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Bitcoin className="h-8 w-8 text-blue-600 mr-2" />
            <span className={`font-bold text-2xl ${isScrolled ? 'text-blue-900' : 'text-white'}`}>
              BlockBank
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Solutions', 'Enterprise', 'For Customers', 'About', 'Contact'].map((item) => (
              <button 
                key={item} 
                onClick={() => handleNavClick(item)}
                className={`font-medium transition-colors hover:text-blue-500 ${
                  isScrolled ? 'text-blue-900' : 'text-white'
                }`}
              >
                {item}
              </button>
            ))}
            
            {/* Dashboard Link - Only show when user is signed in */}
            {user && (
              <a 
                href="/dashboard"
                className={`font-medium transition-colors hover:text-blue-500 ${
                  isScrolled ? 'text-blue-900' : 'text-white'
                }`}
              >
                Dashboard
              </a>
            )}
            
            {user ? (
              <button
                onClick={() => signOut()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-all hover:shadow-lg"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-all hover:shadow-lg"
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fadeIn">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {['Solutions', 'Enterprise', 'For Customers', 'About', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => handleNavClick(item)}
                  className="font-medium text-blue-900 py-2 hover:text-blue-500 transition-colors text-left"
                >
                  {item}
                </button>
              ))}
              
              {/* Dashboard Link - Only show when user is signed in */}
              {user && (
                <a 
                  href="/dashboard"
                  className="font-medium text-blue-900 py-2 hover:text-blue-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </a>
              )}
              
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-all hover:shadow-lg w-full"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    onAuthClick();
                    setIsMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-all hover:shadow-lg w-full"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      {activeModal === 'about' && <AboutModal />}
      {activeModal === 'contact' && <ContactModal />}
      {activeModal === 'customers' && <CustomersModal />}
    </>
  );
}

export default Header;