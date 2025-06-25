// components/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center py-8 text-red-600 font-semibold text-lg">
      <p>Error: {message}</p>
    </div>
  );
};

export default ErrorMessage;