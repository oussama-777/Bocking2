import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Trash2, Tag } from 'lucide-react';

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

const ProductsTab: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState(mockProducts);
  const [categoryFilter, setCategoryFilter] = useState('All');
  
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
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('admin.products.title', 'Products Management')}
      </h2>
      
      <div className="flex justify-between items-center mb-6">
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-300"
        >
          {t('admin.products.addNew', 'Add New Product')}
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
          green
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
                          ? 'bg-green-100 text-[#267c41] dark:bg-[#144122] dark:text-green-300'
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
                        className="text-green-600 hover:text-[#1a552c] dark:text-green-400"
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
