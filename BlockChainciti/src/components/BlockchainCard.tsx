import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BlockchainCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  color: string;
  onLearnMore?: () => void;
}

const BlockchainCard: React.FC<BlockchainCardProps> = ({
  icon,
  title,
  description,
  benefits,
  color,
  onLearnMore
}) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      
      <div className="space-y-3 mb-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color} mr-3`}></div>
            <span className="text-sm text-gray-700">{benefit}</span>
          </div>
        ))}
      </div>
      
      {onLearnMore && (
        <button
          onClick={onLearnMore}
          className={`group inline-flex items-center text-sm font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
        >
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 text-current group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default BlockchainCard;