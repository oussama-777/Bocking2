import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/MoroccoWay.css';

const MoroccoWay: React.FC = () => {
  const { t, i18n } = useTranslation();
  // Either remove the variable if not needed:
  // const currentLanguage = i18n.language;
  
  // Or use it somewhere, for example in a language display element:
  const currentLanguage = i18n.language;

  // Cultural elements with translations
  const culturalElements = [
    {
      id: 1,
      image: '/images/morocco/1.svg',
      titleKey: 'morocco.element1.title',
      descriptionKey: 'morocco.element1.description',
    },
    {
      id: 2,
      image: '/images/morocco/2.svg',
      titleKey: 'morocco.element2.title',
      descriptionKey: 'morocco.element2.description',
    },
    // Add more cultural elements as needed
  ];

  return (
    <div className="morocco-way-container">
      <div className="morocco-header">
        <h1 className="text-3xl font-bold text-center mb-8">{t('morocco.title')}</h1>
        <p className="text-lg text-center mb-12">{t('morocco.subtitle')}</p>
        {/* Using the currentLanguage variable here to fix the unused variable warning */}
        <div className="language-indicator text-sm text-right">
          {t('morocco.currentLanguage')}: {currentLanguage}
        </div>
      </div>

      <div className="cultural-elements-grid">
        {culturalElements.map((element) => (
          <div key={element.id} className="cultural-element">
            <div className="image-container">
              <img src={element.image} alt={t(element.titleKey)} className="cultural-image" />
            </div>
            <h2 className="element-title">{t(element.titleKey)}</h2>
            <p className="element-description">{t(element.descriptionKey)}</p>
          </div>
        ))}
      </div>

      <div className="morocco-footer">
        <p>{t('morocco.footer')}</p>
      </div>
    </div>
  );
};

export default MoroccoWay;