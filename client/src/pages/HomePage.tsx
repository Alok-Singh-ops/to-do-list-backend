import React from "react";
import useGetTaskHook, { Task } from "../hooks/useGetTaskHook";
import useAddTaskHook from "../hooks/useAddTaskHook";
import useDeleteTaskHook from "../hooks/useDeleteTaskHook";
const HomePage = () => {
  const { mutateAsync } = useAddTaskHook();
  const { mutateAsync: deleteTask } = useDeleteTaskHook();
  const { data } = useGetTaskHook();
  const [taskName, setTaskName] = React.useState<string>("");
  const handleSubmit = async () => {
    await mutateAsync(taskName);
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
  };

  return (
    <main className='flex flex-col h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
      <section className='flex flex-col h-3/4 bg-white h-1/2 w-1/2 m-auto p-[.75rem] pl-10 '>
        <h1 className='text-3xl font-bold text-black mb-4'>TODO App</h1>
        <div className='flex gap-3'>
          <input
            name='taskName'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className='border-2 border-gray-300 rounded-lg px-4 py-2 w-10/12 mb-4 bg bg-[#F5F5F5]'
            type='text'
            placeholder='Add your task here'
          />
          <button
            className='bg-[#FD7401] text-white font-bold px-4 py-2 rounded-lg mb-4 border border-solid border-black'
            onClick={handleSubmit}
          >
            Add Task
          </button>
        </div>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold text-black mb-4'>Tasks</h1>
          {data.length === 0 ? (
            <p className='text-red-500'>No tasks found</p>
          ) : (
            data.map((task: Task) => (
              <div className='flex gap-3' key={task.taskId}>
                <input
                  disabled
                  className='border-2 border-gray-300 rounded-lg px-4 py-2 w-10/12 mb-4 bg bg-[#F5F5F5]'
                  type='text'
                  value={task.taskName}
                />
                <button
                  className='bg-[#FD7401] text-white font-bold px-4 py-2 rounded-lg mb-4 border border-solid border-black'
                  onClick={() => handleDelete(task.taskId)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
