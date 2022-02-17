import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import {
  Checkbox,
  Container,
  Group,
  Title,
  Popover,
  Button,
  Text,
  Textarea
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoItem = (todo) => {
  const [checked, setChecked] = useState(false);
  const { deleteTodo, modifyTodo, completeTodo } = useContext(GlobalContext);
  const [opened, setOpened] = useState(false);
  const [toDoText, setToDoText] = useState(todo.text);

  const handleDelete = (id) => {
    console.log(id);
    deleteTodo(id);
  };

  const handleCompleted = (completed, id) => {
    setChecked(completed);
    completeTodo(id, completed);
  };

  const handleSave = (id) => {
    modifyTodo(id, toDoText);
  };

  return (
    <Container
      styles={(theme) => ({
        root: {
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #f3c2c2",
          padding: "10px"
        }
      })}
    >
      <Group>
        <Checkbox
          checked={todo.completed}
          onChange={(e) => handleCompleted(e.currentTarget.checked, todo.id)}
        ></Checkbox>
        <Title order={5}>{todo.text}</Title>
      </Group>
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        target={<Button onClick={() => setOpened((o) => !o)}>Edit</Button>}
        width={260}
        position="bottom"
        withArrow
      >
        <div style={{ display: "flex" }}>
          <Text size="sm">
            <Textarea
              label="Edit to do"
              placeholder={todo.text}
              value={toDoText}
              onChange={(e) => setToDoText(e.currentTarget.value)}
            ></Textarea>
            <Button onClick={() => handleSave(todo.id)}>Save</Button>
            <Button>Cancel</Button>
          </Text>
        </div>
      </Popover>

      <a style={{ cursor: "pointer" }} onClick={() => handleDelete(todo.id)}>
        <Button>Delete</Button>
        {/* <FontAwesomeIcon style={{ fontSize: "20px", color: "#474747" }} icon={faTrash} /> */}
      </a>
    </Container>
  );
};

export default TodoItem;
