import React from 'react';
import { ArrowLeft, Shield, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import KYCForm from '../components/KYCForm';

const KYCPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-pink-200"> {/* Light pink background */}
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              KYC & Identity Verification
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Secure your account with our blockchain-powered identity verification system.
              Complete the process once and enjoy seamless access across our platform.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your data is encrypted and stored securely using blockchain technology</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">One-Time Verification</h3>
            <p className="text-gray-600">Complete KYC once and use it across multiple services</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Processing</h3>
            <p className="text-gray-600">Automated verification process with quick approval times</p>
          </div>
        </div>

        {/* KYC Form */}
        <KYCForm />
        
        {/* Information Section */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Required Documents:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Government-issued photo ID (Passport, National ID, or Driver's License)</li>
                <li>• Clear photos of both front and back of your document</li>
                <li>• Ensure all text is legible and photos are well-lit</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Processing Time:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Automated verification: 5-10 minutes</li>
                <li>• Manual review (if needed): 24-48 hours</li>
                <li>• You'll receive email updates on your verification status</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCPage;
