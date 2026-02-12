
import React from 'react';
import { GalleryItem } from '../types';

const GalleryCard: React.FC<{ onBack: () => void; items?: GalleryItem[] }> = ({ onBack, items }) => {
  const fallbackItems = [
    { id: '1', imageUrl: '', caption: 'Cute as a kitten' },
    { id: '2', imageUrl: '', caption: 'Clever & bright' },
    { id: '3', imageUrl: '', caption: 'Sweet as a blossom' },
    { id: '4', imageUrl: '', caption: 'My sweet strawberry' },
    { id: '5', imageUrl: '', caption: 'One tough cookie' },
    { id: '6', imageUrl: '', caption: 'Cuddly like a panda' },
  ];
  const galleryItems = items && items.length > 0 ? items : fallbackItems;

  return (
    <div className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl card-enter">
      <h2 className="text-4xl font-romantic font-bold text-rose-600 text-center mb-10 underline decoration-rose-200 underline-offset-8">
        Look at this cutie!
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div key={item.id} className="group relative overflow-hidden bg-rose-50 p-4 rounded-3xl flex flex-col items-center gap-4 transition-all hover:bg-rose-100 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-rose-300">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.caption}
                className="w-full h-40 object-cover rounded-2xl shadow-sm"
              />
            ) : (
              <div className="text-7xl group-hover:animate-bounce">💝</div>
            )}
            <p className="font-bold text-rose-500 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              {item.caption}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button onClick={onBack} className="bg-rose-400 text-white px-12 py-3 rounded-full font-bold shadow-md hover:bg-rose-500 transition-all">
          Back Home
        </button>
      </div>
    </div>
  );
};

export default GalleryCard;
