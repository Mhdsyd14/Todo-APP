import { useEffect, useState } from 'react';
import Modal from './Modal.tsx';
import { deleteTask, getTasks, updateTask } from '../helpers/taskApi.ts';
import { Task } from '../interfaces/taskResponse.ts';
import CustomAlert from './Alert.tsx';
import TaskItem from './TaskItem.tsx';
import ListProgres from './ListProgres.tsx';
import withToast, { WithToastProps } from './Toast.tsx';
import { useTasks } from '../hooks/useTasks.tsx';
import TaskForm from './TaskForm.tsx';
import { getMe } from '../helpers/GetMe.ts';

type ListProps = WithToastProps;

function List({ showToast }: ListProps) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [todos, setTodos] = useState<string>('');
  const [taskId, setTaskId] = useState<number>();
  const [progressList, setProgressList] = useState<{id: number;
     todo: string; dateTime: string; }[]>([]);
  const [userId, setUserId] = useState<number>();

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      setErrorMessage(`${error}`);
    }
  };

  const fetchUser = async () => {
    try {
      const data = await getMe();
      setUserId(data.user.id);
    } catch (error) {
      setErrorMessage(`${error}`);
    }
  };

  const { GetTasksProses, taskProses, DeleteTaskProses } = useTasks();

  const handleDeleteProgress = async (id: number) => {
    try {
      await DeleteTaskProses(id);
      showToast('Task removed from todo progress list');
      fetchTasks();
    } catch (error) {
      setErrorMessage(`${error}`);
    }
  };
  const handleModal = (dataTask: string, IdTask: number) => {
    setModalOpen(true);
    setTodos(dataTask);
    setTaskId(IdTask);
  };

  useEffect(() => {
    fetchTasks();
    fetchUser();
    GetTasksProses();
  }, [GetTasksProses]);

  useEffect(() => {
    if (taskProses) {
      const progressData = taskProses.data.map((item: { id: number;
        time: string; task: string }) => ({
        id: item.id,
        todo: item.task,
        dateTime: new Date(item.time).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      }));
      setProgressList(progressData);
    }
  }, [taskProses]);

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setMessage('Successfully deleted tasks');
      setSuccess(true);
      fetchTasks();
    } catch (error) {
      setErrorMessage(`${error}`);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateTask(taskId!, todos);
      setMessage(response.message);
      setModalOpen(false);
      setSuccess(true);
      fetchTasks();
    } catch (error) {
      setErrorMessage(`${error}`);
    }
  };

  const handleClose = () => {
    setSuccess(false);
  };

  return (
    <div className="mt-3 flex flex-col gap-3">
      {success && <CustomAlert onClose={handleClose} message={message} />}
      {errorMessage && (
        <div className="bg-red-500 text-white p-2 rounded-md">
          {errorMessage}
        </div>
      )}
      <TaskForm id={userId} onTaskAdded={fetchTasks} />
      <div className="w-full bg-yellow-400 rounded-md p-2 text-center text-sm font-semibold">
        <h1>Todo List</h1>
      </div>
      {tasks.map((task) => (
        <div key={task.id}>
          <TaskItem
            task={task}
            handleModal={handleModal}
            handleDelete={handleDelete}
            showToast={showToast}
          />
          <Modal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            todo={todos}
            setTodos={setTodos}
            onUpdate={handleUpdate}
          />
        </div>
      ))}
      <div className="w-full bg-lime-500 rounded-md p-2 text-center text-sm font-bold">
        <h1>Progres Todo List</h1>
      </div>
      {progressList.map((progress) => (
        <ListProgres
          key={progress.todo}
          time={progress.dateTime}
          data={progress.todo}
          onDelete={() => handleDeleteProgress(progress.id)}
        />
      ))}
    </div>
  );
}

export default withToast(List);
