'use client';

import { useState } from 'react';

interface FolderTabsProps {
  categories: string[];
  onSelect: (category: string) => void;
  defaultCategory?: string;
}

const FolderTabs: React.FC<FolderTabsProps> = ({ categories, onSelect, defaultCategory }) => {
  const [active, setActive] = useState(defaultCategory || categories[0]);
  const [localCategories, setLocalCategories] = useState(categories);

  const handleClick = (cat: string) => {
    setActive(cat);
    onSelect(cat);
  };

  const handleAddCategory = () => {
    const newCat = prompt('Enter new category name:');
    if (
      newCat &&
      !localCategories.includes(newCat.toLowerCase().trim())
    ) {
      const updated = [...localCategories, newCat.toLowerCase()];
      setLocalCategories(updated);
      setActive(newCat.toLowerCase());
      onSelect(newCat.toLowerCase());
    }
  };

  return (
    <div className="relative flex flex-row items-center gap-3">
      {/* Tabs */}
      <div className="flex">
        {localCategories.map((cat, i) => (
          <button
            key={i}
            onClick={() => handleClick(cat)}
            className={`z-10 px-6 py-2 text-md font-medium rounded-t-xl ${
              active === cat
                ? "[box-shadow:0_-3px_6px_rgba(0,0,0,0.1),2px_0_0px_rgba(0,0,0,0.1),-2px_0_0px_rgba(0,0,0,0.1)] text-purple-900"
                : "bg-transparent text-purple-800"
            }`}
            style={{ marginRight: '-1px' }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Plus Button */}
      <button
        onClick={handleAddCategory}
        className="rounded-md text-purple-700 text-2xl font-bold transition-all p-1"
        title="Add New Category"
      >
        +
      </button>
    </div>
  );
};

export default FolderTabs;
