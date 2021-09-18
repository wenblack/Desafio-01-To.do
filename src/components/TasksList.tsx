import React from 'react';
import { FlatList } from 'react-native';
import { ItemTask } from './ItemTask';
import { Props } from '../pages/Home';
import { ItemWrapper } from './ItemWrapper';

export interface Task {
  id: number;
  title: string;
  done: boolean;

}

export interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ id, title }: Props) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <ItemTask
              tasks={item}
              editTask={editTask}
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 25
      }}
    />
  )
}

