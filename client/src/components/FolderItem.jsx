import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Checkbox, Container, Group, Title, Accordion } from "@mantine/core";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'

const FolderItem = (folder) => {
  const [completed, setCompleted] = useState(false);
  const { deleteTodo } = useContext(GlobalContext);
  const handleDelete = (id) => {
    deleteTodo(id);
  };

  return (
    // <Group
    //   styles={(theme) => ({
    //     root: {
    //       width: "100%",
    //       display: "flex",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //       borderBottom: "1px solid #f3c2c2",
    //       padding: "10px",
    //     },
    //   })}
    // >
    //   <Group>
    //     <Title order={5}>{folder.name}</Title>
    //   </Group>
    //   <a style={{ cursor: "pointer" }} onClick={() => handleDelete(folder.id)}>
    //     <FontAwesomeIcon style={{ fontSize: "20px", color: "#474747" }} icon={faTrash} />
    //   </a>
    //   adasdasd
    // </Group>

    <Accordion.Item label={folder.name}>
      {folder.todos.map((todo) => (
        <h1>{todo.text}</h1>
      ))}
    </Accordion.Item>
  );
};

export default FolderItem;
