import { useEffect } from 'react';

interface AlertProps {
  message: string;
  onClose: () => void;
}

function CustomAlert({ message, onClose }: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 right-0 mt-5 flex justify-center">
      <div className="bg-green-500 text-white p-4 rounded shadow-lg">
        {message}
        <button
          type="button"
          onClick={onClose}
          className="ml-4 text-white underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CustomAlert;
