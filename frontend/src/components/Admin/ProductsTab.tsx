import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Trash2, Tag, Plus, Upload } from 'lucide-react';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: 'Premium Hotel Room',
    category: 'Hotels',
    price: 199.99,
    inventoryCount: 15,
    status: 'Active',
    featured: true,
    createdAt: '2023-05-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'Economy Car Rental',
    category: 'Cars',
    price: 49.99,
    inventoryCount: 8,
    status: 'Active',
    featured: false,
    createdAt: '2023-06-20T14:45:00Z',
  },
  {
    id: 3,
    name: 'Luxury Dining Experience',
    category: 'Restaurants',
    price: 299.99,
    inventoryCount: 5,
    status: 'Limited',
    featured: true,
    createdAt: '2023-04-10T18:15:00Z',
  },
  {
    id: 4,
    name: 'City Tour Package',
    category: 'Activities',
    price: 79.99,
    inventoryCount: 20,
    status: 'Active',
    featured: false,
    createdAt: '2023-07-05T09:00:00Z',
  },
];

// Interface pour le type d'hôtel
interface Hotel {
  id: number;
  name: string;
  description: string;
  address: string;
  region: string;
  pricePerNight: number;
  category: string;
  photos: string[];
  amenities: string[];
  roomTypes: string[];
  totalRooms: number;
  cancellationPolicy: string;
  checkIn: string;
  checkOut: string;
  contact: string;
  location: {
    lat: number;
    lng: number;
  };
  languages: string[];
  status: string;
  featured: boolean;
  createdAt: string;
}

const ProductsTab: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState(mockProducts);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newHotel, setNewHotel] = useState<Partial<Hotel>>({
    name: '',
    description: '',
    address: '',
    region: '',
    pricePerNight: 0,
    category: '',
    photos: [],
    amenities: [],
    roomTypes: [],
    totalRooms: 0,
    cancellationPolicy: '',
    checkIn: '',
    checkOut: '',
    contact: '',
    location: { lat: 0, lng: 0 },
    languages: [],
    status: 'Active',
    featured: false
  });
  
  // Get unique categories for filter
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  // Filter products based on selected category
  const filteredProducts = categoryFilter === 'All' 
    ? products 
    : products.filter(product => product.category === categoryFilter);
  
  const handleEditProduct = (product: any) => {
    // In a real app, this would open an edit form
    console.log('Edit product:', product);
  };
  
  const handleDeleteProduct = (productId: number) => {
    // In a real app, this would call an API to delete the product
    setProducts(products.filter(product => product.id !== productId));
  };
  
  const toggleProductFeatured = (productId: number) => {
    // In a real app, this would call an API to update the product
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, featured: !product.featured } 
        : product
    ));
  };
  
  const handleAddProduct = () => {
    setIsAddProductModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsAddProductModalOpen(false);
    setNewHotel({
      name: '',
      description: '',
      address: '',
      region: '',
      pricePerNight: 0,
      category: '',
      photos: [],
      amenities: [],
      roomTypes: [],
      totalRooms: 0,
      cancellationPolicy: '',
      checkIn: '',
      checkOut: '',
      contact: '',
      location: { lat: 0, lng: 0 },
      languages: [],
      status: 'Active',
      featured: false
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewHotel(prev => ({ ...prev, [name]: checked }));
    } else if (name === 'pricePerNight' || name === 'totalRooms') {
      setNewHotel(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else if (name === 'amenities' || name === 'languages') {
      const isChecked = (e.target as HTMLInputElement).checked;
      const amenityValue = (e.target as HTMLInputElement).value;
      
      setNewHotel(prev => {
        const currentArray = prev[name as keyof typeof prev] as string[] || [];
        if (isChecked) {
          return { ...prev, [name]: [...currentArray, amenityValue] };
        } else {
          return { ...prev, [name]: currentArray.filter(item => item !== amenityValue) };
        }
      });
    } else if (name === 'roomTypes') {
      // Séparation des types de chambres par virgule
      const roomTypesArray = value.split(',').map(type => type.trim());
      setNewHotel(prev => ({ ...prev, [name]: roomTypesArray }));
    } else {
      setNewHotel(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Dans une application réelle, vous téléchargeriez ces fichiers sur un serveur
      // Ici, nous simulons simplement en stockant les noms des fichiers
      const fileNames = Array.from(files).map(file => file.name);
      setNewHotel(prev => ({
        ...prev,
        photos: [...(prev.photos || []), ...fileNames]
      }));
    }
  };
  
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Dans une application réelle, ceci appellerait une API pour ajouter l'hôtel
    const newProductWithId = {
      ...newHotel,
      id: Math.max(...products.map(p => p.id)) + 1,
      createdAt: new Date().toISOString()
    };
    
    // Conversion pour correspondre au format existant des produits
    const formattedProduct = {
      id: newProductWithId.id,
      name: newProductWithId.name,
      category: newProductWithId.category,
      price: newProductWithId.pricePerNight,
      inventoryCount: newProductWithId.totalRooms,
      status: newProductWithId.status,
      featured: newProductWithId.featured,
      createdAt: newProductWithId.createdAt
    };
    
    setProducts(prevProducts => [...prevProducts, formattedProduct]);
    handleCloseModal();
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('admin.products.title', 'Gestion des Hôtels')}
      </h2>
      
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleAddProduct}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t('admin.products.addNew', 'Ajouter un Nouvel Hôtel')}
        </button>
        
        <div className="flex space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => setCategoryFilter('All')}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
              categoryFilter === 'All'
                ? 'text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            All
          </button>
          {categories
            .filter((category) => category !== 'All')
            .map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                  categoryFilter === category
                    ? 'text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-left text-sm font-semibold">
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">{t('admin.products.name', 'Name')}</th>
              <th className="px-6 py-3">{t('admin.products.category', 'Category')}</th>
              <th className="px-6 py-3">{t('admin.products.price', 'Price')}</th>
              <th className="px-6 py-3">{t('admin.products.inventory', 'Inventory')}</th>
              <th className="px-6 py-3">{t('admin.products.status', 'Status')}</th>
              <th className="px-6 py-3">{t('admin.products.featured', 'Featured')}</th>
              <th className="px-6 py-3">{t('admin.products.createdAt', 'Created At')}</th>
              <th className="px-6 py-3">{t('admin.products.actions', 'Actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.inventoryCount}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{product.status}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => toggleProductFeatured(product.id)}
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                        product.featured
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {product.featured ? t('admin.products.yes', 'Yes') : t('admin.products.no', 'No')}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  {t('admin.products.noResults', 'No products found.')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTab;
