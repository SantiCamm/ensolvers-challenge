import { useContext, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalState"
import { Accordion, Group, Loader, ScrollArea, Title } from '@mantine/core';
import TodoItem from './TodoItem';
import FolderItem from './FolderItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const FolderList = () => {
  const { getFolders, folders, isLoading} = useContext(GlobalContext);

  useEffect(() => {
    getFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Group spacing="xs" position="center" styles={(theme) => ({
      root: {
        // overflow: "auto",
        // height: "100%"
      }
    })}>
      {!isLoading ?
          <Accordion multiple styles={(theme) => ({
            root: {
              width: "100%",
            }
          })}>
            {folders.map((folder) => (
            <Accordion.Item label={folder.name} key={folder.id}>
              {folder?.todos?.map((todo) => (<TodoItem key={todo.id} {...todo}/>))}
            </Accordion.Item>
            ))}
          </Accordion>
        : <Loader color="gray" variant="bars" size="md" />
      }
    </Group>
  );

}

export default FolderList;
