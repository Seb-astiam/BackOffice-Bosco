import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = ({ isLoading, duration }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, duration); // Utiliza la duración proporcionada
      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [isLoading, duration]);

  return (
    showLoader && 
    <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
      <FontAwesomeIcon icon={faSpinner} spin className="text-white text-4xl" />
    </div>
  );
}

export default Loading;
