// app/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import ImageCard from '../components/ImageCard';
import ImageModal from '../components/ImageModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { fetchImages } from '../lib/api';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

const ITEMS_PER_PAGE = 9; // Number of images to load per page

export default function Home() {
  const [images, setImages] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  // 'isFetching' from useInfiniteScroll is used internally by the hook itself
  // and setIsFetching is used to control its state. The ESLint warning
  // for 'isFetching' being unused here is often a false positive if not directly
  // consumed in the JSX or another effect, but its presence is crucial for the hook's logic.
  // For strict ESLint, we ensure setIsFetching is correctly called,
  // and 'loading' state handles the UI indicator.
  const [_, setIsFetching] = useInfiniteScroll(fetchMoreImages); // Destructure without 'isFetching'

  const loadImages = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const newImages = await fetchImages(pageNum, ITEMS_PER_PAGE);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setPage(pageNum + 1);
    } catch (err) {
      setError('Failed to load images. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
      setIsFetching(false); // Reset fetching state after load
    }
  }, [setIsFetching]); // Dependencies for useCallback

  // Effect for initial load, now correctly depends on loadImages
  useEffect(() => {
    loadImages(1); // Explicitly load page 1 on mount
  }, [loadImages]); // 'loadImages' is stable due to useCallback

  function fetchMoreImages() {
    // Only fetch more if not already loading and no error
    if (!loading && !error) {
      loadImages(page);
    } else {
      setIsFetching(false); // Stop fetching if already loading or error exists
    }
  }

  const handleImageClick = (photo: Photo) => {
    setSelectedImage(photo);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10 mt-4">
        Picsum Image Gallery
      </h1>

      {error && <ErrorMessage message={error} />}

      {/* Corrected Responsive Grid Layout as per previous discussion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((photo) => (
          <ImageCard key={photo.id} photo={photo} onClick={handleImageClick} />
        ))}
      </div>

      {loading && <LoadingSpinner />}

      {!loading && !error && images.length === 0 && (
        <p className="text-center text-gray-600 mt-10">No images to display. Try refreshing.</p>
      )}

      {selectedImage && (
        <ImageModal photo={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}
