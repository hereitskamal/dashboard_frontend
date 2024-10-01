// Skeleton.js
import React from 'react';

const Skeleton = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-card"></div>
      <style jsx>{`
        .skeleton-loader {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .skeleton-card {
          width: 100%;
          height: 150px;
          background: rgba(200, 200, 200, 0.3);
          border-radius: 8px;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default Skeleton;
