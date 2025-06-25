// components/ImageCard.tsx
import Image from 'next/image';

interface ImageCardProps {
  photo: {
    id: string;
    author: string;
    width: number;
    height: number;
    download_url: string;
  };
  onClick: (photo: any) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ photo, onClick }) => {
  const aspectRatio = photo.height / photo.width; // Calculate aspect ratio for consistent height

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform duration-200 ease-in-out hover:scale-105"
      onClick={() => onClick(photo)}
    >
      <Image
        src={photo.download_url}
        alt={photo.author}
        width={photo.width} // Use original width/height for Next.js Image component for optimization
        height={photo.height}
        className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-80"
        quality={75} // Adjust quality as needed
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ aspectRatio: `${photo.width}/${photo.height}` }} // Maintain aspect ratio with CSS
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
        <p className="text-white text-sm font-semibold">{photo.author}</p>
      </div>
    </div>
  );
};

export default ImageCard;