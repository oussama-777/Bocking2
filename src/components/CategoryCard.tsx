import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Hotel, Utensils, Recycle as Bicycle } from 'lucide-react';

interface CategoryCardProps {
  type: 'cars' | 'hotels' | 'restaurants' | 'activities';
  title: string;
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ type, title, description }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/booking/${type}`);
  };
  
  const renderIcon = () => {
    switch (type) {
      case 'cars':
        return <Car className="h-12 w-12 text-blue-500" />;
      case 'hotels':
        return <Hotel className="h-12 w-12 text-blue-500" />;
      case 'restaurants':
        return <Utensils className="h-12 w-12 text-blue-500" />;
      case 'activities':
        return <Bicycle className="h-12 w-12 text-blue-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-center mb-4">
          {renderIcon()}
        </div>
        <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-center">{description}</p>
      </div>
      <div className="bg-blue-500 py-3 px-4">
        <p className="text-white text-center font-medium">Explore</p>
      </div>
    </div>
  );
};

export default CategoryCard;