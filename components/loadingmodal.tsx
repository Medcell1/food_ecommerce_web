// LoadingModal.tsx
import React from 'react';
import { SyncLoader } from 'react-spinners';

const LoadingModal: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm">
        <SyncLoader/>

    </div>
  );
};

export default LoadingModal;
