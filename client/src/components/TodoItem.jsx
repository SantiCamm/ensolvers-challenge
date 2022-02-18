import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import {
  Checkbox,
  Container,
  Group,
  Title,
  Popover,
  Button,
  Textarea
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faPen } from "@fortawesome/free-solid-svg-icons";

const TodoItem = (todo) => {
  const [checked, setChecked] = useState(false);
  const { deleteTodo, modifyTodo, completeTodo } = useContext(GlobalContext);
  const [opened, setOpened] = useState(false);
  const [toDoText, setToDoText] = useState(todo.text);

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const handleCompleted = (completed, id) => {
    setChecked(completed);
    completeTodo(id, checked);
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
          padding: "5px",

          [`@media (max-width: ${760}px)`]: {
            padding: "0px",
            margin: "5px 0"
          }
        },
        sm: {}
      })}
    >
      <Group style={{}}>
        <Checkbox
          checked={todo.completed}
          onChange={(e) => handleCompleted(e.currentTarget.checked, todo.id)}
        ></Checkbox>
        <Title order={5}>{todo.text}</Title>
      </Group>
      <Group>
        <Popover
          opened={opened}
          onClose={() => setOpened(false)}
          target={
            <a
              style={{ cursor: "pointer" }}
              onClick={() => setOpened((o) => !o)}
              href="/#"
            >
              <FontAwesomeIcon
                style={{ fontSize: "20px", color: "#474747" }}
                icon={faPen}
              />
            </a>
          }
          width={260}
          withArrow
          withCloseButton
          position="top"
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <Textarea
              label="Edit to do"
              placeholder={todo.text}
              value={toDoText}
              onChange={(e) => setToDoText(e.currentTarget.value)}
            ></Textarea>
            <Button color="green" onClick={() => handleSave(todo.id)}>
              Save
            </Button>
          </div>
        </Popover>

        <a href="/#" style={{ cursor: "pointer" }} onClick={() => handleDelete(todo.id)}>
          {/* <Button color="red">Delete</Button> */}
          <FontAwesomeIcon
            style={{ fontSize: "20px", color: "#474747" }}
            icon={faBan}
          />
        </a>
      </Group>
    </Container>
  );
};

export default TodoItem;
