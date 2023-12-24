"use client";

import TaskTable from "@/components/dashboard/TasksTable";
import AddNewTask from "@/components/dashboard/add-new-task";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

const page = () => {
  const { currentUser } = useAuth();
  const [{ tasks, important, completed }, setTasks] = useState({
    tasks: [],
    important: [],
    completed: [],
  });

  useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const headers = { email: currentUser?.email };
      const res = await fetch("/api/tasks", { headers });
      const tasks = (await res.json())?.tasks || [];
      const important = tasks.filter(task => task.important);
      const completed = tasks.filter(task => task.status === "completed");
      setTasks({ tasks, important, completed });
      return tasks;
    },
    enabled: !!currentUser,
  });

  const handleDragDrop = results => {
    const { destination, source, type } = results;
    console.log(results);

    if (!destination) return;
    if (
      destination.draggableId === source.draggableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newTasks = [...tasks];

    if (
      source.draggableId === "all-tasks" &&
      destination.draggableId === "important-tasks"
    ) {
      const newImportantTasks = [...important];
      const [reorderedTask] = newTasks.splice(source.index, 1);
      newImportantTasks.splice(destination.index, 0, reorderedTask);
      return setTasks(prev => ({
        ...prev,
        tasks: newTasks,
        newImportantTasks,
      }));
    }

    const [reorderedTask] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, reorderedTask);
    setTasks(prev => {
      return { ...prev, tasks: newTasks };
    });
  };

  return (
    <>
      <AddNewTask />

      <DragDropContext onDragEnd={handleDragDrop}>
        <section className="mt-8">
          <h3 className="text-2xl font-bold mb-3">All recent tasks</h3>
          <div className="overflow-x-auto">
            <TaskTable tasks={tasks} droppableId="all-tasks" type="all" />
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-bold mb-3">Important tasks</h3>
          <div className="overflow-x-auto">
            <TaskTable
              tasks={important}
              type="important"
              droppableId="important-tasks"
            />
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-2xl font-bold mb-3">Completed tasks</h3>
          <div className="overflow-x-auto">
            <TaskTable
              tasks={completed}
              type="completed"
              droppableId="completed-tasks"
            />
          </div>
        </section>
      </DragDropContext>
    </>
  );
};

export default page;
