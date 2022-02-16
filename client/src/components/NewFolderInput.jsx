import React from "react";

const NewFolderInput = () => {
  const { addFolder } = useContext(GlobalContext);
  const [folder, setFolder] = useState("");

  const submitFolder = () => {
    const newFolder = {
      name: folder,
      todos: [],
    };

    addFolder(newFolder);
    setFolder("");
  };
  return (
    <>
      <form onSubmit={submitFolder} className="input">
        <TextInput
          label="Add a new folder"
          variant="filled"
          placeholder="Work"
          value={folder}
          onChange={() => {
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
    </>
  );
};

export default NewFolderInput;
