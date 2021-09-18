import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';
/*Para validação mais fácil, utilizar uma váriavel nova e comparar 
com a existente
*/
export interface Props {
  id: number,
  title: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //Exemplo de Validação Início
    const mesmoTitulo = tasks.find(task => task.title === newTaskTitle)

    if (mesmoTitulo) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }
    //Fim da validação

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
    //Exemplo de Alerta com Confirmaçao
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não'

      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const removerTasks = tasks.filter(
            task => task.id !== id
          )
          setTasks(removerTasks);
        }
      }
    ]

    )

  }

  function handleEditTask({ id, title }: Props) {
    const updatedTasks = tasks.map(task => ({ ...task }))


    const taskAtulizada = updatedTasks.find(item => item.id === id);

    if (!taskAtulizada)
      return;

    taskAtulizada.title = title;
    setTasks(updatedTasks)

  }



  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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