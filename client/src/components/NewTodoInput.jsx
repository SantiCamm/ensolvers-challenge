import React, { useContext, useEffect, useState } from "react";
import { Button, Select, TextInput } from "@mantine/core";
import { GlobalContext } from "../context/GlobalState";

const NewTodoInput = () => {
  const { addTodo } = useContext(GlobalContext);
  const [todo, setTodo] = useState("");
  const [folder, setFolder] = useState("");

  const submitTodo = () => {
    e.preventDefault();
    const newTodo = {
      text: todo,
      completed: false,
      folder,
    };

    addTodo(newTodo);

    setTodo("");
  };

  return (
    <div>
      <form onSubmit={submitTodo} className="input">
        <TextInput
          label="Add a Todo"
          variant="filled"
          placeholder="Take out the trash"
          value={todo}
          onChange={() => {
            setTodo(e.currentTarget.value);
          }}
        />
        <Select />
        <Button
          variant="light"
          color="teal"
          type="submit"
          size="sm"
          styles={(theme) => ({
            root: {
              width: 45,
              padding: 0,
              alignSelf: "flex-end",
            },
          })}
          {...(!todo && { disabled: true })}
        >
          +
        </Button>
      </form>
    </div>
  );
};

export default NewTodoInput;
