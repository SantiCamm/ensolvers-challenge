import { useContext, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalState"
import { Group, Loader, ScrollArea } from '@mantine/core';
import TodoItem from './TodoItem';
import FolderItem from './FolderItem';

const FolderList = () => {
  const { getFolders, folders, isLoading} = useContext(GlobalContext);

  useEffect(() => {
    getFolders();
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
            {folders.map((folder) => (
              <FolderItem key={folder.name} {...folder} />
            ))}
          </Group>
        : <Loader color="gray" variant="bars" size="md" />
      }
    </Group>
  );

}

export default FolderList;
