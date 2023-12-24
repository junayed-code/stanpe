"use client";

import moment from "moment";
import DeleteButton from "./DeleteButton";
import { Draggable, Droppable } from "react-beautiful-dnd";

const TaskTable = ({ tasks, droppableId, type }) => {
  return (
    <table className="min-w-full border border-collapse border-slate-400">
      <thead className="text-left">
        <tr>
          <th className="py-2 px-4 border">Name</th>
          <th className="py-2 px-4 border">Date</th>
          <th className="py-2 px-4 border">Important</th>
          <th className="py-2 px-4 border">Status</th>
          <th className="py-2 px-4 border">Delete</th>
        </tr>
      </thead>
      <Droppable droppableId={droppableId} type={type}>
        {provided => (
          <tbody {...provided.droppableProps} ref={provided.innerRef}>
            {tasks?.length == 0 && (
              <Draggable draggableId="none" index={0}>
                {provided => (
                  <tr
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <td className="py-2 px-4 border">-</td>
                    <td className="py-2 px-4 border">-</td>
                    <td className="py-2 px-4 border">-</td>
                    <td className="py-2 px-4 border">-</td>
                    <td className="py-2 px-4 border text-center pointer-events-none">
                      <DeleteButton />
                    </td>
                  </tr>
                )}
              </Draggable>
            )}

            {tasks.map((task, inx) => (
              <Draggable key={task._id} draggableId={task._id} index={inx}>
                {provided => (
                  <tr
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    <td className="py-2 px-4 border">{task.title}</td>
                    <td className="py-2 px-4 border">
                      {moment(task.createdAt).format("DD MMM, YYYY")}
                    </td>
                    <td className="py-2 px-4 border">
                      {task.important ? "Yes" : "No"}
                    </td>
                    <td className="py-2 px-4 border">{task.status}</td>
                    <td className="py-2 px-4 border text-center">
                      <DeleteButton taskID={task._id} />
                    </td>
                  </tr>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </table>
  );
};

export default TaskTable;
