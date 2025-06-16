import React from 'react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onComplete, completing }) {
  return tasks.map((task) => (
    <TaskCard
      key={task.id}
      task={task}
      onComplete={onComplete}
      completing={completing}
    />
  ));
}
