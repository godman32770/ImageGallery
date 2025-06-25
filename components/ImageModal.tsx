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
        // KEY CHANGES HERE FOR FIXED SIZE:
        // w-11/12: Take up 90% of screen width on smaller screens
        // max-w-3xl: Cap the width at Tailwind's '3xl' breakpoint (~768px) for larger screens
        // h-[80vh]: Set a fixed height as 80% of the viewport height, ensuring consistency
        // flex flex-col: Use flexbox for vertical alignment of image and text
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
              // Image will object-contain within the now fixed-size parent
              className="max-w-full max-h-full object-contain"
              quality={90}
              sizes="(max-width: 768px) 90vw, 75vw" // Adjust sizes to reflect new modal max-width
            />
          )}
        </div>
        {/* Details section, positioned at the bottom relative to the modal's fixed height */}
        <div className="relative bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          {photo && (
            <>
              <p className="text-lg font-bold">{photo.author}</p>
              <p className="text-sm">ID: {photo.id}</p>
              <p className="text-sm">Dimensions: {photo.width}x{photo.height}</p>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
