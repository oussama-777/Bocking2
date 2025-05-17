import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Trash2, Tag, X } from 'lucide-react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',    description: '',
    address: '',
    region: 'Marrakech',
    category: 'Hotels',
    hotelCategory: '4 étoiles',
    price: 0,
    inventoryCount: 0,
    status: 'Active',
    featured: false,
    photos: [],
    // Nouveaux champs pour les hôtels
    roomTypes: '',
    totalRooms: 0,
    hotelCapacity: 0,
    cancellationPolicy: '',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    contactInfo: '',
    location: {
      latitude: 0,
      longitude: 0
    },
    languages: {
      french: false,
      arabic: false,
      english: false,
      spanish: false,
      german: false
    },
    services: {
      wifi: false,
      parking: false,
      breakfast: false,
      pool: false,
      spa: false,
      restaurant: false,
      roomService: false,
      airConditioning: false,
    },
  });
  
  // Get unique categories for filter
  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  // Filter products based on selected category
  const filteredProducts = categoryFilter === 'All' 
    ? products 
    : products.filter(product => product.category === categoryFilter);
  
  const handleEditProduct = (product: any) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      address: product.address || '',
      region: product.region || 'Marrakech',
      category: product.category,
      hotelCategory: product.hotelCategory || '4 étoiles',
      price: product.price,
      inventoryCount: product.inventoryCount,
      status: product.status,
      featured: product.featured,
      photos: product.photos || [],
      roomTypes: product.roomTypes || '',
      totalRooms: product.totalRooms || 0,
      hotelCapacity: product.hotelCapacity || 0,
      cancellationPolicy: product.cancellationPolicy || '',
      checkInTime: product.checkInTime || '14:00',
      checkOutTime: product.checkOutTime || '12:00',
      contactInfo: product.contactInfo || '',
      location: product.location || {
        latitude: 0,
        longitude: 0
      },
      languages: product.languages || {
        french: false,
        arabic: false,
        english: false,
        spanish: false,
        german: false
      },
      services: product.services || {
        wifi: false,
        parking: false,
        breakfast: false,
        pool: false,
        spa: false,
        restaurant: false,
        roomService: false,
        airConditioning: false,
      },
    });
    setIsModalOpen(true);
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

  const openAddProductModal = () => {
    setCurrentProduct(null);
    // Réinitialiser le formulaire en utilisant le setFormData existant
    setFormData({
      name: '',
      description: '',
      address: '',
      region: 'Marrakech',
      category: 'Hotels',
      hotelCategory: '4 étoiles',
      price: 0,
      inventoryCount: 0,
      status: 'Active',
      featured: false,
      photos: [],
      // Nouveaux champs pour les hôtels
      roomTypes: '',
      totalRooms: 0,
      hotelCapacity: 0,
      cancellationPolicy: '',
      checkInTime: '14:00',
      checkOutTime: '12:00',
      contactInfo: '',
      location: {
        latitude: 0,
        longitude: 0
      },
      languages: {
        french: false,
        arabic: false,
        english: false,
        spanish: false,
        german: false
      },
      services: {
        wifi: false,
        parking: false,
        breakfast: false,
        pool: false,
        spa: false,
        restaurant: false,
        roomService: false,
        airConditioning: false,
      },
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (field: string, value: any) => {
    if (field === 'services') {
      // Pour les services, nous recevons déjà l'objet services complet mis à jour
      setFormData({
        ...formData,
        services: value,
      });
    } else if (field === 'languages') {
      // Pour les langues, nous recevons l'objet languages mis à jour
      setFormData({
        ...formData,
        languages: value,
      });
    } else if (field === 'location') {
      // Pour la localisation, nous recevons l'objet location mis à jour
      setFormData({
        ...formData,
        location: value,
      });
    } else if (field === 'category' && value !== 'Hotels') {
      // Si la catégorie change et n'est pas "Hotels", réinitialiser les champs spécifiques aux hôtels
      setFormData({
        ...formData,
        [field]: value,
        description: '',
        address: '',
        region: 'Marrakech',
        hotelCategory: '4 étoiles',
        photos: [],
        services: {
          wifi: false,
          parking: false,
          breakfast: false,
          pool: false,
          spa: false,
          restaurant: false,
          roomService: false,
          airConditioning: false,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Préparer les données communes à tous les produits
    const commonProductData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price.toString()),
      inventoryCount: parseInt(formData.inventoryCount.toString()),
      status: formData.status,
      featured: formData.featured,
    };
    
    // Ajouter les données spécifiques aux hôtels si nécessaire
    const hotelSpecificData = formData.category === 'Hotels' ? {
      description: formData.description,
      address: formData.address,
      region: formData.region,
      hotelCategory: formData.hotelCategory,
      photos: formData.photos,
      roomTypes: formData.roomTypes,
      totalRooms: formData.totalRooms,
      hotelCapacity: formData.hotelCapacity,
      cancellationPolicy: formData.cancellationPolicy,
      checkInTime: formData.checkInTime,
      checkOutTime: formData.checkOutTime,
      contactInfo: formData.contactInfo,
      location: formData.location,
      languages: formData.languages,
      services: formData.services,
    } : {};
    
    if (currentProduct) {
      // Update existing product
      const updatedProducts = products.map(product => 
        product.id === currentProduct.id 
          ? { 
              ...product, 
              ...commonProductData,
              ...hotelSpecificData,
            } 
          : product
      );
      setProducts(updatedProducts);
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...commonProductData,
        ...hotelSpecificData,
        createdAt: new Date().toISOString(),
      };
      setProducts([...products, newProduct]);
    }
    
    setIsModalOpen(false);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('admin.products.title', 'Products Management')}
      </h2>
      
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={openAddProductModal}
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

      {/* Product Form Modal */
      isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentProduct 
                  ? t('admin.products.editProduct', 'Edit Product') 
                  : t('admin.products.addNewProduct', 'Add New Product')}
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('admin.products.name', 'Name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('admin.products.category', 'Category')}
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {categories
                      .filter(category => category !== 'All')
                      .map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))
                    }
                  </select>
                </div>
                
                {/* Champs spécifiques aux voitures */}
                {formData.category === 'Cars' && (
                  <>
                    {/* Tous vos champs pour les voitures */}
                    {/* ... */}
                    
                    {/* Conditions spéciales */}
                    <div className="sm:col-span-2">
                      <label htmlFor="specialConditions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('admin.products.specialConditions', 'Conditions spéciales')}
                      </label>
                      <textarea
                        id="specialConditions"
                        value={formData.specialConditions}
                        onChange={(e) => handleInputChange('specialConditions', e.target.value)}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Ex : interdiction de fumer, limite d'âge, etc."
                      />
                    </div>
                  </>
                )}
                {/* Champs spécifiques aux hôtels */}
                {formData.category === 'Hotels' && (
                  <>
                    <div className="sm:col-span-2">
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('admin.products.description', 'Description')} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        required
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Brève description de l'établissement"
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('admin.products.address', 'Adresse')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Rue, ville, code postal"
                      />
                    </div>
                    
                    {/* Types de chambres disponibles */}
                    <div className="sm:col-span-2">
                      <label htmlFor="roomTypes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('admin.products.roomTypes', 'Types de chambres disponibles')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="roomTypes"
                        required
                        value={formData.roomTypes}
                        onChange={(e) => handleInputChange('roomTypes', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Double, Suite, Familiale"
                      />
                    </div>
                    
                    {/* Nombre total de chambres */}
                    <div>
                      <label htmlFor="totalRooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('admin.products.totalRooms', 'Nombre total de chambres')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="totalRooms"
                        min="1"
                        required
                        value={formData.totalRooms}
                        onChange={(e) => handleInputChange('totalRooms', parseInt(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    
                    {/* Capacité de l'hôtel */}
                    <div>
                      <label htmlFor="hotelCapacity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('admin.products.hotelCapacity', 'Capacité de l\'hôtel')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="hotelCapacity"
                        min="1"
                        required
                        value={formData.hotelCapacity}
                        onChange={(e) => handleInputChange('hotelCapacity', parseInt(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    
                    {/* Politique d'annulation */}
                    <div className="sm:col-span-2">
                      <label htmlFor="cancellationPolicy" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('admin.products.cancellationPolicy', 'Politique d\'annulation')}
                      </label>
                      <textarea
                        id="cancellationPolicy"
                        value={formData.cancellationPolicy}
                        onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Conditions en cas d'annulation"
                      />
                    </div>
                    
                    {/* Check-in / Check-out */}
                    <div>
                      <label htmlFor="checkInTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('admin.products.checkInTime', 'Heure d\'arrivée (Check-in)')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        id="checkInTime"
                        required
                        value={formData.checkInTime}
                        onChange={(e) => handleInputChange('checkInTime', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="checkOutTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('admin.products.checkOutTime', 'Heure de départ (Check-out)')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        id="checkOutTime"
                        required
                        value={formData.checkOutTime}
                        onChange={(e) => handleInputChange('checkOutTime', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    
                    {/* Contact (email / téléphone) */}
                    <div className="sm:col-span-2">
                      <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('admin.products.contactInfo', 'Contact (email / téléphone)')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contactInfo"
                        required
                        value={formData.contactInfo}
                        onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Pour les réservations ou informations"
                      />
                    </div>
                    
                    {/* Localisation sur la carte */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('admin.products.location', 'Localisation sur la carte')} <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Latitude
                          </label>
                          <input
                            type="number"
                            id="latitude"
                            step="0.000001"
                            required
                            value={formData.location.latitude}
                            onChange={(e) => handleInputChange('location', {...formData.location, latitude: parseFloat(e.target.value)})}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Longitude
                          </label>
                          <input
                            type="number"
                            id="longitude"
                            step="0.000001"
                            required
                            value={formData.location.longitude}
                            onChange={(e) => handleInputChange('location', {...formData.location, longitude: parseFloat(e.target.value)})}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Vous pouvez obtenir ces coordonnées depuis Google Maps
                      </p>
                    </div>
                    
                    {/* Langues parlées */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('admin.products.languages', 'Langues parlées')}
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center">
                          <input
                            id="french"
                            type="checkbox"
                            checked={formData.languages.french}
                            onChange={(e) => handleInputChange('languages', {...formData.languages, french: e.target.checked})}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="french" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Français
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="arabic"
                            type="checkbox"
                            checked={formData.languages.arabic}
                            onChange={(e) => handleInputChange('languages', {...formData.languages, arabic: e.target.checked})}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="arabic" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Arabe
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="english"
                            type="checkbox"
                            checked={formData.languages.english}
                            onChange={(e) => handleInputChange('languages', {...formData.languages, english: e.target.checked})}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="english" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Anglais
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('admin.products.photos', 'Photos')} <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                              <span>{t('admin.products.uploadPhotos', 'Télécharger des photos')}</span>
                              <input 
                                id="file-upload" 
                                name="file-upload" 
                                type="file" 
                                multiple
                                accept="image/*"
                                className="sr-only" 
                                onChange={(e) => {
                                  if (e.target.files) {
                                    handleInputChange('photos', Array.from(e.target.files));
                                  }
                                }}
                              />
                            </label>
                            <p className="pl-1 dark:text-gray-400">ou glisser-déposer</p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            PNG, JPG, GIF jusqu'à 10 MB (max 10 photos)
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('admin.products.services', 'Services inclus')}
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <input
                            id="wifi"
                            type="checkbox"
                            checked={formData.services.wifi}
                            onChange={(e) => handleInputChange('services', {...formData.services, wifi: e.target.checked})}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="wifi" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Wi-Fi
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="parking"
                            type="checkbox"
                            checked={formData.services.parking}
                            onChange={(e) => handleInputChange('services', {...formData.services, parking: e.target.checked})}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="parking" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Parking
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="breakfast"
                            type="checkbox"
                            checked={formData.services.breakfast}
                            onChange={(e) => handleInputChange('services', {...formData.services, breakfast: e.target.checked})}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="breakfast" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Petit-déjeuner
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="pool"
                            type="checkbox"
                            checked={formData.services.pool}
                            onChange={(e) => handleInputChange('services', {...formData.services, pool: e.target.checked})}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="pool" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Piscine
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="spa"
                            type="checkbox"
                            checked={formData.services.spa}
                            onChange={(e) => handleInputChange('services', {...formData.services, spa: e.target.checked})}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="spa" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Spa
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="restaurant"
                            type="checkbox"
                            checked={formData.services.restaurant}
                            onChange={(e) => handleInputChange('services', {...formData.services, restaurant: e.target.checked})}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="restaurant" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Restaurant
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="roomService"
                            type="checkbox"
                            checked={formData.services.roomService}
                            onChange={(e) => handleInputChange('services', {...formData.services, roomService: e.target.checked})}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="roomService" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Service en chambre
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="airConditioning"
                            type="checkbox"
                            checked={formData.services.airConditioning}
                            onChange={(e) => handleInputChange('services', {...formData.services, airConditioning: e.target.checked})}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="airConditioning" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Climatisation
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('admin.products.price', 'Price')}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      min="0"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="pl-7 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="inventoryCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('admin.products.inventory', 'Inventory')}
                  </label>
                  <input
                    type="number"
                    id="inventoryCount"
                    min="0"
                    required
                    value={formData.inventoryCount}
                    onChange={(e) => handleInputChange('inventoryCount', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('admin.products.status', 'Status')}
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Limited">Limited</option>
                    <option value="Sold Out">Sold Out</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <input
                      id="featured"
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {t('admin.products.featured', 'Featured')}
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                >
                  {t('admin.common.cancel', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {currentProduct 
                    ? t('admin.common.update', 'Update') 
                    : t('admin.common.create', 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsTab;
