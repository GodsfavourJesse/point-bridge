import React from 'react';

export default function TaskTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { key: 'video', label: '🎥 Video Tasks' },
    { key: 'survey', label: '📝 Survey Tasks' },
    { key: 'ads', label: '📢 Ads Tasks' },
    { key: 'gaming', label: '🎮 Gaming Tasks' },
  ];

  const tabClasses = (tab) =>
    `px-4 py-2 rounded-t-md ${
      activeTab === tab ? 'bg-white font-bold' : 'bg-gray-200 text-gray-600'
    }`;

  return (
    <div className="flex space-x-4 border-b pb-2 mb-4">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          className={tabClasses(key)}
          onClick={() => setActiveTab(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
