import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, Plus, Trash2 } from 'lucide-react';

// Mock data for payment methods
const mockPaymentMethods = [
  {
    id: 1,
    type: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2026,
    isDefault: true,
  },
  {
    id: 2,
    type: 'mastercard',
    last4: '5678',
    expMonth: 3,
    expYear: 2025,
    isDefault: false,
  },
];

// Mock data for transactions
const mockTransactions = [
  {
    id: 1,
    date: '2025-05-15',
    description: 'Grand Hotel Booking',
    amount: 240.00,
    status: 'completed',
  },
  {
    id: 2,
    date: '2025-05-10',
    description: 'Italian Bistro Reservation',
    amount: 180.00,
    status: 'completed',
  },
  {
    id: 3,
    date: '2025-05-01',
    description: 'Economy Car Rental',
    amount: 120.00,
    status: 'pending',
  },
];

const PaymentTab: React.FC = () => {
  const { t } = useTranslation();
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardName: '',
    expMonth: '',
    expYear: '',
    cvc: '',
    isDefault: false,
  });
  
  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewCard({
      ...newCard,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    const last4 = newCard.cardNumber.slice(-4);
    
    const newPaymentMethod = {
      id: Date.now(),
      type: newCard.cardNumber.startsWith('4') ? 'visa' : 'mastercard',
      last4,
      expMonth: parseInt(newCard.expMonth),
      expYear: parseInt(newCard.expYear),
      isDefault: newCard.isDefault,
    };
    
    let updatedMethods = [...paymentMethods, newPaymentMethod];
    
    if (newCard.isDefault) {
      updatedMethods = updatedMethods.map(method => ({
        ...method,
        isDefault: method.id === newPaymentMethod.id,
      }));
    }
    
    setPaymentMethods(updatedMethods);
    setShowAddCard(false);
    setNewCard({
      cardNumber: '',
      cardName: '',
      expMonth: '',
      expYear: '',
      cvc: '',
      isDefault: false,
    });
  };
  
  const handleSetDefault = (id: number) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id,
    }));
    setPaymentMethods(updatedMethods);
  };
  
  const handleRemoveCard = (id: number) => {
    let updatedMethods = paymentMethods.filter(method => method.id !== id);
    
    // If we removed the default card and there are other cards, make the first one default
    if (paymentMethods.find(method => method.id === id)?.isDefault && updatedMethods.length > 0) {
      updatedMethods = updatedMethods.map((method, index) => ({
        ...method,
        isDefault: index === 0,
      }));
    }
    
    setPaymentMethods(updatedMethods);
  };
  
  const getCardIcon = (type: string) => {
    if (type === 'visa') {
      return (
        <svg className="h-8 w-8 text-blue-800" viewBox="0 0 32 32" fill="currentColor">
          <path d="M13.18 11.123L8.624 20.875h-3L3.01 12.342c-.107-.42-.203-.573-.535-.75C1.707 11.246.874 10.941 0 10.75l.07-.625h5.026c.7 0 1.334.466 1.486 1.27l1.348 7.205 3.293-8.478h2.957zm4.078 6.539c.013-3.315-4.586-3.496-4.557-4.976.01-.45.439-.927 1.378-1.049.463-.063 1.744-.112 3.197.584l.57-2.65c-.788-.285-1.787-.56-3.033-.56-3.201 0-5.458 1.704-5.48 4.136-.023 1.802 1.609 2.805 2.84 3.405 1.248.61 1.686 1.003 1.68 1.55-.9.837-1.007.837-1.008.837-.348 0-2.055-.079-2.795-1.236l-.614.614-.495 2.311c.848.369 2.41.69 4.025.707 3.786 0 6.262-1.685 6.284-4.286l-.002-.387zm9.349 3.217h2.624l-2.32-9.766h-2.428c-.693 0-1.285.422-1.546 1.07l-5.43 8.696h3.03l.756-2.088h4.63l.364 2.088zm-4.042-4.696l1.483-4.090.848 4.09H22.565z"/>
        </svg>
      );
    } else if (type === 'mastercard') {
      return (
        <svg className="h-8 w-8" viewBox="0 0 32 32">
          <path d="M12 24h8V8h-8z" fill="#FF5F00"/>
          <path d="M13 16c0-3.2 1.5-6.1 3.9-8H11.1c-3.9 0-7.1 3.2-7.1 7.1S7.2 22.2 11.1 22.2h5.8c-2.4-1.9-3.9-4.8-3.9-8z" fill="#EB001B"/>
          <path d="M28 16c0 3.9-3.2 7.1-7.1 7.1h-5.8c2.4-1.9 3.9-4.8 3.9-8s-1.5-6.1-3.9-8H21c3.9 0 7.1 3.2 7.1 7.1h-.1z" fill="#F79E1B"/>
        </svg>
      );
    }
    return null;
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('dashboard.payment.title')}
      </h2>
      
      {/* Payment Methods */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {t('dashboard.payment.methods')}
          </h3>
          <button
            onClick={() => setShowAddCard(true)}
            className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <Plus className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
            {t('dashboard.payment.addCard')}
          </button>
        </div>
        
        {paymentMethods.length > 0 ? (
          <div className="space-y-4">
            {paymentMethods.map(method => (
              <div
                key={method.id}
                className={`border ${
                  method.isDefault
                    ? 'border-blue-500 dark:border-blue-400'
                    : 'border-gray-200 dark:border-gray-700'
                } rounded-lg p-4`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-3 rtl:ml-3 rtl:mr-0">
                      {getCardIcon(method.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        •••• •••• •••• {method.last4}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('dashboard.payment.expires')}: {method.expMonth}/{method.expYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {method.isDefault ? (
                      <span className="text-sm text-blue-600 dark:text-blue-400 mr-4 rtl:ml-4 rtl:mr-0">
                        {t('dashboard.payment.default')}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mr-4 rtl:ml-4 rtl:mr-0"
                      >
                        {t('dashboard.payment.setDefault')}
                      </button>
                    )}
                    <button
                      onClick={() => handleRemoveCard(method.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      disabled={paymentMethods.length === 1}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              {t('dashboard.payment.noMethods')}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {t('dashboard.payment.addMethodPrompt')}
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowAddCard(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                {t('dashboard.payment.addCard')}
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Add Card Form */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                {t('dashboard.payment.addNewCard')}
              </h3>
              
              <form onSubmit={handleAddCard}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('dashboard.payment.cardNumber')}
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={newCard.cardNumber}
                      onChange={handleCardInput}
                      maxLength={16}
                      pattern="[0-9]*"
                      placeholder="0000 0000 0000 0000"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t('dashboard.payment.cardName')}
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={newCard.cardName}
                      onChange={handleCardInput}
                      placeholder={t('dashboard.payment.cardNamePlaceholder')}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('dashboard.payment.expMonth')}
                      </label>
                      <input
                        type="text"
                        name="expMonth"
                        value={newCard.expMonth}
                        onChange={handleCardInput}
                        placeholder="MM"
                        maxLength={2}
                        pattern="[0-9]*"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {t('dashboard.payment.expYear')}
                      </label>
                      <input
                        type="text"
                        name="expYear"
                        value={newCard.expYear}
                        onChange={handleCardInput}
                        placeholder="YYYY"
                        maxLength={4}
                        pattern="[0-9]*"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        value={newCard.cvc}
                        onChange={handleCardInput}
                        placeholder="CVC"
                        maxLength={3}
                        pattern="[0-9]*"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="default-card"
                      name="isDefault"
                      checked={newCard.isDefault}
                      onChange={handleCardInput}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                    <label htmlFor="default-card" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {t('dashboard.payment.makeDefault')}
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-end space-x-3 rtl:space-x-reverse">
                  <button
                    type="button"
                    onClick={() => setShowAddCard(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
                  >
                    {t('dashboard.payment.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
                  >
                    {t('dashboard.payment.saveCard')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Transactions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {t('dashboard.payment.recentTransactions')}
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {t('dashboard.payment.date')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {t('dashboard.payment.description')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {t('dashboard.payment.amount')}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {t('dashboard.payment.status')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-white">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {transaction.status === 'completed'
                        ? t('dashboard.payment.completed')
                        : t('dashboard.payment.pending')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentTab;