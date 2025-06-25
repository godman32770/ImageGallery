// components/ImageCard.tsx
import Image from 'next/image';

interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface ImageCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo, onClick }) => {
  return (
    <div
      // KEY CHANGES HERE:
      // Added 'aspect-square' to make the card a consistent square shape.
      // Removed 'h-auto' from the Image tag as its parent now defines the height.
      // Removed 'style={{ aspectRatio: ... }}' from Image as it's handled by parent.
      className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform duration-200 ease-in-out hover:scale-105 aspect-square"
      onClick={() => onClick(photo)}
    >
      <Image
        src={photo.download_url}
        alt={photo.author}
        // Next.js Image component needs original width/height for optimization,
        // but its display size will be governed by the parent and 'object-cover'.
        width={photo.width}
        height={photo.height}
        // Fill the parent container (which is now aspect-square)
        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
        quality={75}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        // No inline style for aspect ratio here, parent handles it
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
        <p className="text-white text-sm font-semibold">{photo.author}</p>
      </div>
    </div>
  );
};

export default ImageCard;
