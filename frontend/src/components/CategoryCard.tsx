import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Bed, Utensils, Sailboat } from 'lucide-react';

interface CategoryCardProps {
  type: 'cars' | 'hotels' | 'restaurants' | 'activities';
  title: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ type, title}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/booking/${type}`);
  };
  
  const renderIcon = () => {
    switch (type) {
      case 'cars':
        return <Car className="h-12 w-12 text-blue-500 ml-10" />;
      case 'hotels':
        return <Bed className="h-12 w-12 text-blue-500 ml-10" />;
      case 'restaurants':
        return <Utensils className="h-12 w-12 text-blue-500" />;
      case 'activities':
        return <Sailboat className="h-12 w-12 text-blue-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
    >
      <div className="p-4 flex items-center gap-2">
        <div className="flex-shrink-0">
          {renderIcon()}
        </div>
        <div className="text-center w-full"> {/* Modification ici */}
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-centre mr-10">{title}</h3>
        </div>
      </div>
      <div className="bg-blue-500 py-3 px-4">
        <p className="text-white text-center font-medium">Explore</p>
      </div>
    </div>
  );
};

export default CategoryCard;