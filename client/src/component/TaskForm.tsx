import { useState } from 'react';
import { createTask } from '../helpers/taskApi.ts';
import CustomAlert from './Alert.tsx';

interface TaskProps {
  id: number | undefined;
  onTaskAdded: () => void;
}

function TaskForm({ id, onTaskAdded }:TaskProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState<string>('');
  const [succes, setSucces] = useState<boolean>(false);
  const [erorMessage, setErorMessage] = useState <string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createTask({ todo: title, userId: id });
      setMessage(response.message);
      setSucces(true);
      setTitle('');
      onTaskAdded();
    } catch (error) {
      setErorMessage(`${error}`);
    }
  };

  const handleClose = () => {
    setSucces(false);
  };

  return (
    <div className="w-full flex flex-row mt-3">
      {erorMessage && (
        <div className="bg-red-500 text-white p-2 rounded-md">
          {erorMessage}
        </div>
      )}
      {succes && <CustomAlert onClose={handleClose} message={message} />}
      <form className="mt-3 w-full flex flex-row" onSubmit={handleSubmit}>
        <div className=" w-3/4">
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            id="title"
            value={title}
            onChange={handleInputChange}
            placeholder="Input ToDo"
            required
          />
        </div>
        <button
          type="submit"
          className="ml-3 bg-orange-400 text-white rounded-md p-1 w-[160px]"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
