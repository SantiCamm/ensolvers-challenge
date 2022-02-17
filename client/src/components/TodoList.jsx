import { useContext, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalState"
import { Group, Loader, ScrollArea } from '@mantine/core';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { getTodos, todos, isLoading} = useContext(GlobalContext);

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Group spacing="xs" position="center" styles={(theme) => ({
      root: {
        overflow: "auto",
        height: "100%"
      }
    })}>
      {!isLoading ?
          <Group spacing="xs" styles={(theme) => ({
            root: {
              width: "100%",
            }
          })}>
            {todos.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </Group>
        : <Loader color="gray" variant="bars" size="md" />
      }
    </Group>
  );

}

export default TodoList;
