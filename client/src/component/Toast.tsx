import { useState, ComponentType } from 'react';

export interface WithToastProps {
  showToast: (message: string) => void;
}

function withToast<T>(WrappedComponent: ComponentType<T & WithToastProps>) {
  return function WithToastComponent(props: T) {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    const showToast = (message: string) => {
      setToastMessage(message);
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setToastMessage(null), 300);
      }, 3000);
    };

    return (
      <>
        <WrappedComponent {...props as T} showToast={showToast} />
        {toastMessage && (
          <div
            className={`fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded shadow-lg transform transition-transform duration-300 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {toastMessage}
          </div>
        )}
      </>
    );
  };
}

export default withToast;
