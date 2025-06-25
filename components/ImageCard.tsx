// components/ImageCard.tsx
import Image from 'next/image';

// Define the Photo interface here for type safety
interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string; // Add url here if it's part of the photo object in page.tsx
  download_url: string;
}

interface ImageCardProps {
  photo: Photo; // Use the Photo interface directly
  onClick: (photo: Photo) => void; // Corrected 'any' to 'Photo'
}

const ImageCard: React.FC<ImageCardProps> = ({ photo, onClick }) => {
  // Removed 'aspectRatio' as it was assigned but not used
  // const aspectRatio = photo.height / photo.width;

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform duration-200 ease-in-out hover:scale-105"
      onClick={() => onClick(photo)}
    >
      <Image
        src={photo.download_url}
        alt={photo.author}
        width={photo.width}
        height={photo.height}
        className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-80"
        quality={75}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ aspectRatio: `${photo.width}/${photo.height}` }} // Uses photo.width and photo.height directly
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
        <p className="text-white text-sm font-semibold">{photo.author}</p>
      </div>
    </div>
  );
};

export default ImageCard;
