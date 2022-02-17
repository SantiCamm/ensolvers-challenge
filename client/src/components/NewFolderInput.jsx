import React, { useContext, useEffect, useState } from "react";
import { Button, Select, TextInput } from "@mantine/core";
import { GlobalContext } from "../context/GlobalState";

const NewFolderInput = () => {
  const { addFolder } = useContext(GlobalContext);
  const [folder, setFolder] = useState("");

  const submitFolder = (e) => {
    e.preventDefault();
    const newFolder = {
      name: folder
    };

    addFolder(newFolder);
    setFolder("");
  };
  
  return (
    <div>
      <form onSubmit={submitFolder} className="input">
        <TextInput
          label="Add a new folder"
          variant="filled"
          placeholder="Work"
          value={folder}
          onChange={(e) => {
            setFolder(e.currentTarget.value);
          }}
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
              alignSelf: "flex-end",
            },
          })}
          {...(!folder && { disabled: true })}
        >
          +
        </Button>
      </form>
    </div>
  );
};

export default NewFolderInput;
