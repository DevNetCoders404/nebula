import React, { useState } from 'react';
import AceEditor from 'react-ace';
import { FaUndo, FaRedo, FaFileDownload } from 'react-icons/fa';
import { Button, Flex, Select, IconButton, Textarea, useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/post';

export const editor = React.createRef();
function Editor({ addPost }) {
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [text, setText] = useState('');
  const history = useHistory();
  const toast = useToast();

  require('brace');
  require(`brace/mode/${selectedLanguage}`);
  require('brace/theme/monokai');
  require(`brace/snippets/${selectedLanguage}`);
  require('brace/ext/language_tools');
  require('ace-builds/src-noconflict/ace');

  function onChange(newValue) {
    // console.log("change", newValue);
    setCode(newValue);
    //console.log(code);
  }

  function handleChange(value) {
    setSelectedLanguage(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ text, code });
    console.log(code, text);
    history.push('/feed');
    history.go(0);
  };

  function dwnld_func() {
    console.log(code);
    var blob = new Blob([code], { type: 'text/plain' });
    var anchor = document.createElement('a');
    anchor.download = 'demofile';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = '_blank';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
  return (
    <div className='editor'>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <Textarea
          value={text}
          ml='300px'
          width='750px'
          top='110px'
          placeholder='Enter the text for the post'
          onChange={(e) => {
            setText(e.target.value);
          }}
          required
        />
        <Flex display='inline-block' ml='300px' mt='120px'>
          <Flex direction='row' mb={10}>
            <Select
              value={selectedLanguage}
              width='30%'
              mr={5}
              onChange={(e) => handleChange(e.target.value)}
            >
              <option value='javascript'>JavaScript</option>
              <option value='python'>Python</option>
              <option value='c_cpp'>C or C++</option>
              <option value='java'>Java</option>
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
            <IconButton mr={5} onClick={dwnld_func} icon={<FaFileDownload />}></IconButton>
            <Button
              type='submit'
              onClick={(e) => {
                if (text === '') {
                  toast({
                    title: 'Please Enter text',
                    status: 'error',
                    isClosable: true
                  });
                  return;
                }
              }}
            >
              Post
            </Button>
          </Flex>
          <AceEditor
            value={code}
            ref={editor}
            mode={selectedLanguage}
            theme='monokai'
            width='1000px'
            fontSize='18px'
            onChange={onChange}
            name='UNIQUE_ID_OF_DIV'
            editorProps={{ $blockScrolling: true }}
            onLoad={(editor) => {
              editor.getSession().getUndoManager().reset();
              editor.setShowPrintMargin(false);
            }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true
            }}
          />
        </Flex>
      </form>
    </div>
  );
}

Editor.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(Editor);
