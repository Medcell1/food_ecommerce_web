import React from "react";

interface CircleAvatarProps {
  src?: string;
  alt?: string;
}

const CircleAvatar: React.FC<CircleAvatarProps> = ({ src, alt }) => {
  return (
    <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
      {src ? (
        <img
          className="w-full h-full object-cover"
          src={src}
          alt={alt}
        />
      ) : (
        <svg
          className="w-full h-full text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      )}
    </div>
  );
};

export default CircleAvatar;
