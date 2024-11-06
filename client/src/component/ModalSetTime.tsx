import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetTodo: (dateTime:Date, todo:string) => void;
  todo:string;
}

function ModalSetTime({
  isOpen, onClose, onSetTodo, todo,
}: ModalProps) {
  const [dateTime, setDateTime] = useState<Date | null>(null);

  const handleTimeChange = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const newDateTime = new Date();
    newDateTime.setHours(hours, minutes, 0);
    setDateTime(newDateTime);
  };

  const handleSubmit = () => {
    if (dateTime) {
      onSetTodo(dateTime, todo);
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-5">
        <h2 className="font-bold mb-4">Set Time</h2>
        <input
          type="time"
          onChange={(e) => handleTimeChange(e.target.value)}
          className="border p-2 rounded mb-4"
        />
        <div className="flex justify-end">
          <button type="button" onClick={onClose} className="mr-2 text-gray-500">Cancel</button>
          <button type="button" onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Set Time</button>
        </div>
      </div>
    </div>
  );
}

export default ModalSetTime;
