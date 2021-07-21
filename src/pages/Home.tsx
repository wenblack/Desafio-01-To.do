import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';



export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);



  function handleAddTask(newTaskTitle: string) {
    const novaTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(taskAtual => [...taskAtual, novaTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))


    const atulizarMarcador = updatedTasks.find(item => item.id === id);

    if (!atulizarMarcador)
      return;

    atulizarMarcador.done = !atulizarMarcador.done;
    setTasks(updatedTasks)

  }

  function handleRemoveTask(id: number) {
    const removerTasks = tasks.filter(
      task => task.id !== id
    )
    setTasks(removerTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})