import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ImageSlider() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [items, setItems] = useState([
    {
      name: "Casablanca",
      description: "Experience the modern side of Morocco in its largest city",
      image: "/src/images/morocco-mosque-casablanca-symmetry-216571135dafe106c9848a48878ab996.jpg"
    },
    {
      name: "Traditional Morocco",
      description: "Discover the rich cultural heritage of Morocco",
      image: "/src/images/ramadan-morocco-traditional-mosque-178462f66f794a61f498a71a6994d018.jpg"
    },
    {
      name: "Desert Adventure",
      description: "Embark on an unforgettable journey through the Moroccan desert",
      image: "/src/images/travel-blog-travel-photography-desert-caravan-087f844dfea95fcf0d5f23223ee7a2db.jpg"
    },
    {
      name: "Morocco Highlights",
      description: "Explore the diverse landscapes and attractions of Morocco",
      image: "/src/images/téléchargement.jpeg"
    },
    {
      name: "Scenic Morocco",
      description: "Enjoy breathtaking views across Morocco's varied terrain",
      image: "/src/images/wallpaperflare.com_wallpaper.jpg"
    }
  ]);

  const handleNextClick = () => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      const firstItem = updatedItems.shift();
      updatedItems.push(firstItem);
      return updatedItems;
    });
  };

  const handlePrevClick = () => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      const lastItem = updatedItems.pop();
      updatedItems.unshift(lastItem);
      return updatedItems;
    });
  };

  return (
    <div className="w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-full h-[350px] rounded-lg shadow-xl relative overflow-hidden">
        {/* Main slide with full background */}
        <div
          className="w-full h-full absolute top-0 left-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${items[0].image})`,
          }}
        >
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#144122]/60 to-[#267c41]/30"></div>
          
          {/* Content for main slide */}
          <div className="absolute top-1/3 left-16 w-72 -translate-y-1/2 text-left text-white font-sans">
            <div className="text-4xl font-bold uppercase animate-fadeIn">
              {items[0].name}
            </div>
            <div className="mt-2 mb-4 text-sm animate-fadeInDelayed">
              {items[0].description}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative inline-flex items-center justify-center gap-3 group">
                <div
                  className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
                ></div>
                <button 
                  onClick={() => navigate('/booking/hotels')}
                  className="group relative inline-flex items-center justify-center text-base rounded-xl bg-green-600 px-8 py-3 font-semibold text-white border-2 border-green-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30"
                >
                  {t('home.hero.bookNow', 'Book Now')}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 10 10"
                    height="10"
                    width="10"
                    fill="none"
                    className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                  >
                    <path
                      d="M0 5h7"
                      className="transition opacity-0 group-hover:opacity-100"
                    ></path>
                    <path
                      d="M1 1l4 4-4 4"
                      className="transition group-hover:translate-x-[3px]"
                    ></path>
                  </svg>
                </button>
              </div>
              <button 
                onClick={() => navigate('/')}
                className=" bg-white hover:bg-gray-100 text-[#267c41] px-8 py-3 text-lg rounded-md font-medium transition duration-300 "
              >
                {t('LearnMore', 'Learn more')}
              </button>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            <button
              onClick={handlePrevClick}
              className="w-8 h-8 rounded bg-white bg-opacity-90 flex items-center justify-center text-gray-800 shadow-md transition-colors duration-300 hover:bg-opacity-100"
            >
              ←
            </button>
            <button
              onClick={handleNextClick}
              className="w-8 h-8 rounded bg-white bg-opacity-90 flex items-center justify-center text-gray-800 shadow-md transition-colors duration-300 hover:bg-opacity-100"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-in-out forwards;
        }
        
        .animate-fadeInDelayed {
          animation: fadeIn 0.7s ease-in-out 0.2s forwards;
        }
        
        .animate-fadeInMoreDelayed {
          animation: fadeIn 0.7s ease-in-out 0.4s forwards;
        }
      `}</style>
    </div>
  );
}