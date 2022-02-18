import { useContext, useEffect, useState } from "react";
import { Button, Loader, Select, TextInput, Group } from "@mantine/core";
import { GlobalContext } from "../context/GlobalState";

const NewTodoInput = () => {
  const { addTodo, getFolders, isLoading, foldersSelect } =
    useContext(GlobalContext);
  const [todo, setTodo] = useState("");
  const [folder, setFolder] = useState("");

  useEffect(() => {
    getFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      text: todo,
      completed: false,
      folder
    };

    addTodo(newTodo);

    setTodo("");
  };

  return (
    <Group position="center">
      {!isLoading ? (
        <form onSubmit={submitTodo} className="input">
          <TextInput
            label="Add a Todo"
            variant="filled"
            required
            placeholder="Take out the trash"
            value={todo}
            onChange={(e) => {
              setTodo(e.currentTarget.value);
            }}
          />
          <Select
            data={foldersSelect}
            label="Folder"
            variant="filled"
            placeholder="Select a folder"
            nothingFound="Nothing found"
            clearable
            // searchable
            required
            value={folder}
            onChange={(e) => setFolder(e)}
          />
          <Button
            variant="light"
            color="teal"
            type="submit"
            size="sm"
            styles={(theme) => ({
              root: {
                width: 45,
                padding: 0,
                alignSelf: "flex-end"
              }
            })}
            {...(!todo && !folder && { disabled: true })}
          >
            +
          </Button>
        </form>
      ) : (
        <Loader color="white" variant="bars" size="md" />
      )}
    </Group>
  );
};

export default NewTodoInput;
