// ProgressLoader.js
import React from 'react';

const ProgressLoader = ({ progress }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <div className="text-center mb-4">
          <div className="text-2xl font-semibold mb-2 text-gray-800">
            {progress < 100 ? 'Logging you in...' : 'Almost there!'}
          </div>
          <div className="loader mb-2 flex justify-center">
            {progress < 100 && (
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-4 border-blue-500 border-t-transparent"></div>
            )}
          </div>
          <div className="text-lg font-medium text-gray-700">{progress}%</div>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
          <div
            className={`bg-blue-500 h-full rounded-full transition-all duration-300`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {progress < 100 && (
          <div className="mt-2 text-gray-500 text-sm">Hang tight! We’re processing your request.</div>
        )}
      </div>
    </div>
  );
};

export default ProgressLoader;
