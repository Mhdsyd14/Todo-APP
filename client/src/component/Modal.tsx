interface ModalProps {
    isOpen: boolean;
    onClose: ()=> void;
    setTodos: (value:string) => void;
    onUpdate: ()=> void;
    todo:string;
}

function Modal({
  isOpen, onClose, todo, setTodos, onUpdate,
}:ModalProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodos(e.target.value);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full">
      <div className="bg-white rounded-md p-4 w-1/3">
        <h2 className="font-medium">Update Todo</h2>
        <input
          className="w-full p-2 border border-gray-300 rounded-md mt-2"
          type="text"
          id="title"
          value={todo}
          onChange={handleInputChange}
          placeholder="Input ToDo"
          required
        />
        <div>
          <button
            type="submit"
            onClick={onUpdate}
            className=" text-black bg-lime-400 p-2 rounded-md"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className=" text-black  ml-4 mt-3 p-2 bg-red-400 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
