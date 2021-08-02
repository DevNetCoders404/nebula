import React, { useState } from "react";
import AceEditor from "react-ace";

import { FaUndo, FaRedo, FaFileDownload, FaSave } from "react-icons/fa";

import {
  Button,
  Flex,
  Select,
  IconButton,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import Nav from "./Nav";

export const editor = React.createRef();
function Editor() {
  const [editorValue, setEditorValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [caption, setCaption] = useState("");
  const history = useHistory();
  const toast = useToast();

  require("brace");
  require(`brace/mode/${selectedLanguage}`);
  require("brace/theme/monokai");
  require(`brace/snippets/${selectedLanguage}`);
  require("brace/ext/language_tools");
  require("ace-builds/src-noconflict/ace");

  function onChange(newValue) {
    // console.log("change", newValue);
    setEditorValue(newValue);
    console.log(editorValue);
  }

  function handleChange(value) {
    setSelectedLanguage(value);
  }

  function dwnld_func() {
    console.log(editorValue);
    var blob = new Blob([editorValue], { type: "text/plain" });
    var anchor = document.createElement("a");
    anchor.download = "demofile";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = "_blank";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
  return (
    <div className="editor">
      <Nav />
      <Textarea
        ml="300px"
        width="750px"
        top="110px"
        placeholder="Enter the caption for the post"
        onChange={(e) => {
          setCaption(e.target.value);
        }}
        required
      ></Textarea>
      <Flex display="inline-block" ml="300px" mt="120px">
        <Flex direction="row" mb={10}>
          <Select
            width="30%"
            mr={5}
            onChange={(e) => handleChange(e.target.value)}
          >
            <option value="javascript" selected>
              JavaScript
            </option>
            <option value="python">Python</option>
            <option value="c_cpp">C or C++</option>
            <option value="java">Java</option>
          </Select>
          <IconButton
            mr={5}
            onClick={() => editor.current.editor.undo()}
            icon={<FaUndo />}
          ></IconButton>
          <IconButton
            mr={5}
            onClick={() => editor.current.editor.redo()}
            icon={<FaRedo />}
          ></IconButton>
          <IconButton
            mr={5}
            onClick={dwnld_func}
            icon={<FaFileDownload />}
          ></IconButton>
          {/*<Link to="/post">*/}
          <Button
            onClick={(e) => {
              if (caption === "") {
                toast({
                  title: "Please Enter Caption",
                  status: "error",
                  isClosable: true,
                });
                return;
              }
              e.preventDefault();
              const showMessage = false;
              const post = { editorValue, showMessage, caption };

              fetch(" http://localhost:8000/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(post),
              }).then(() => {
                console.log("Data Added");
              });
              history.push("/feed");
            }}
          >
            Post
          </Button>
          {/*</Link>*/}
        </Flex>
        <AceEditor
          ref={editor}
          mode={selectedLanguage}
          theme="monokai"
          width="1000px"
          fontSize="18px"
          onChange={onChange}
          value={editorValue}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          onLoad={(editor) => {
            editor.getSession().getUndoManager().reset();
          }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
      </Flex>
    </div>
  );
}

export default Editor;
