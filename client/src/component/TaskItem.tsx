import { useState } from 'react';
import { Task } from '../interfaces/taskResponse.ts';
import ModalSetTime from './ModalSetTime.tsx';
import withToast, { WithToastProps } from './Toast.tsx';
import { useTasks } from '../hooks/useTasks.tsx';

interface TaskItemProps extends WithToastProps {
  task: Task;
  handleModal: (dataTask: string, IdTask: number) => void;
  handleDelete: (id: number) => void;
}

function TaskItem({
  task, handleModal, handleDelete, showToast,
}: TaskItemProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>('');

  const { TaskProsesCreate, taskProses } = useTasks();

  const isTaskInProgress = taskProses?.data.some((item) => item.task === task.todo);

  const handleSetTodo = async (dateTime: Date, TodoData: string) => {
    await TaskProsesCreate(dateTime, TodoData);
    showToast('Todo list in progress successfully!');
  };

  const handleOpenModal = (dataTodo: string) => {
    setIsModalOpen(true);
    setTodo(dataTodo);
  };

  return (
    <div key={task.id} className="bg-white rounded-md p-2 font-medium font-serif flex justify-between items-center">
      <span>{task.todo}</span>
      <div className="flex gap-2">
        {!isTaskInProgress && (
          <>
            <button
              type="button"
              onClick={() => handleOpenModal(task.todo)}
              className="text-yellow-500 hover:text-yellow-700"
            >
              🔄
            </button>
            <button
              type="button"
              onClick={() => handleModal(task.todo, task.id)}
              className="text-blue-500 hover:text-blue-700"
            >
              ✏️
            </button>
            <button
              type="button"
              onClick={() => handleDelete(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </>
        )}
      </div>
      <ModalSetTime
        todo={todo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSetTodo={handleSetTodo}
      />
    </div>
  );
}

export default withToast(TaskItem);
