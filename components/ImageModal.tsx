// components/ImageModal.tsx
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface ImageModalProps {
  photo: Photo | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ photo, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false); // Controls DOM presence for fade-out

  // Effect to manage modal's DOM presence and fade-in/out
  useEffect(() => {
    if (photo) {
      setShouldRender(true); // Mount the component to start fade-in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { // Double rAF for robust transition trigger
          setIsVisible(true);
        });
      });
    } else {
      // Start fade-out animation
      setIsVisible(false);
      // After transition, unmount the component from DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // This must match the CSS transition duration (duration-300)
      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [photo]);

  // Effect for event listeners and body overflow (runs when 'shouldRender' changes)
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isVisible && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (isVisible && event.key === 'Escape') {
        onClose();
      }
    };

    if (shouldRender) { // Only add listeners if modal is in the DOM
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = ''; // Re-enable background scrolling
    }

    return () => { // Cleanup listeners and overflow style
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [shouldRender, isVisible, onClose]);

  if (!shouldRender) {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4
                  transition-opacity duration-300 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className={`w-11/12 max-w-3xl h-[80vh] flex flex-col overflow-y-auto
                    relative rounded-lg bg-white shadow-xl
                    transform transition-all duration-300 ease-out ${isVisible ? 'scale-100' : 'scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-white text-2xl z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {/* Container for the image, ensure it takes up available space */}
        <div className="relative flex-grow flex items-center justify-center p-4">
          {photo && (
            <Image
              src={photo.download_url}
              alt={photo.author}
              width={photo.width}
              height={photo.height}
              className="max-w-full max-h-full object-contain"
              quality={90}
              sizes="(max-width: 768px) 90vw, 75vw"
            />
          )}
        </div>
        {/* Details section, positioned at the bottom relative to the modal's fixed height */}
        <div className="relative bg-black to-transparent p-6 text-white flex justify-between items-center"> {/* Added flex and justify-between */}
          {photo && (
            <>
              <div> {/* Wrapper for text details */}
                <p className="text-lg font-bold">{photo.author}</p>
                <p className="text-sm">ID: {photo.id}</p>
                <p className="text-sm">Dimensions: {photo.width}x{photo.height}</p>
              </div>
              {/* Download Button */}
              <a
                href={photo.download_url}
                download={`${photo.author.replace(/\s/g, '_')}_${photo.id}.jpg`} // Suggests a filename
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-lg flex items-center space-x-2"
                target="_blank" // Open in new tab (good fallback if download attribute is ignored)
                rel="noopener noreferrer" // Security best practice for target="_blank"
              >
                {/* Download icon (inline SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 000-1.414zM10 3a1 1 0 011 1v7a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Download</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
