import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Accordion, Group, Loader, Title } from "@mantine/core";
import TodoItem from "./TodoItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

const FolderList = () => {
  const { getFolders, folders, isLoading, deleteFolder } =
    useContext(GlobalContext);

  useEffect(() => {
    getFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    deleteFolder(id);
  };

  return (
    <Group
      spacing="md"
      position="center"
      styles={(theme) => ({
        root: {
          overflow: "auto",
          height: "300px",
          borderRadius: "5px",
          padding: "25px",
          // display: "flex",
          // flexDirection: "column",
          gap: "10px",
          width: "100%",
          backgroundColor: "white"
        }
      })}
    >
      {!isLoading ? (
        <Accordion
          disableIconRotation
          multiple
          style={{
            width: "100%"
          }}
        >
          {folders?.map((folder) => (
            <Accordion.Item
              label={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Title order={4}>{folder.name}</Title>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(folder.id)}
                    href="/#"
                  >
                    <FontAwesomeIcon
                      style={{ fontSize: "20px", color: "#474747" }}
                      icon={faBan}
                    />
                  </a>
                </div>
              }
              key={folder.name}
            >
              {folder?.todos?.map((todo) => (
                <TodoItem key={todo.id} {...todo} />
              ))}
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <Loader color="gray" variant="bars" size="md" />
      )}
    </Group>
  );
};

export default FolderList;
