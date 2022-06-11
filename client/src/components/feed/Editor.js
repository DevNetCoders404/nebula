import React, { useState } from 'react';
import AceEditor from 'react-ace';
import { FaUndo, FaRedo, FaFileDownload } from 'react-icons/fa';
import { Button, Flex, Select, IconButton, Textarea, useToast, Tooltip } from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost, addComment } from '../../actions/post';
import { execCode } from '../../actions/codex';

export const editor = React.createRef();
function Editor({ addPost, addComment, execCode, codex, loading, stdout, stderr }) {
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [text, setText] = useState('');
  const history = useHistory();
  const toast = useToast();
  const [input, setInput] = useState('');
  const langs = {
    golang: 'golang',
    python: 'py',
    c_cpp: 'c_cpp',
    java: 'java'
  };
  require('brace');
  require(`brace/mode/${selectedLanguage}`);
  require('brace/theme/monokai');
  require(`brace/snippets/${selectedLanguage}`);
  require('brace/ext/language_tools');
  require('ace-builds/src-noconflict/ace');

  function onChange(newValue) {
    setCode(newValue);
  }

  function handleChange(value) {
    setSelectedLanguage(value);
  }

  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.state && location.state.postId) {
      addComment(location.state.postId, { text, code });
      history.goBack();
    } else {
      addPost({ text, code });
      history.push('/feed');
    }
  };

  const handleRun = (e) => {
    let langid;
    if (selectedLanguage === 'c_cpp') {
      langid = 1;
    } else if (selectedLanguage === 'python') {
      langid = 2;
    } else if (selectedLanguage === 'java') {
      langid = 3;
    } else if (selectedLanguage === 'golang') {
      langid = 4;
    }
    execCode(langid, code, input);
  };

  function dwnld_func() {
    let ext = 'dl';
    Object.keys(langs).map((key) => key === selectedLanguage && (ext = langs[key]));
    var blob = new Blob([code], { type: 'text/plain' });
    var anchor = document.createElement('a');
    anchor.download = `code.${ext}`;
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
          marginLeft={{ md: '5%', lg: '2%', xl: '2%', '2xl': '110px', '3xl': '100px' }}
          width={{ md: '5%', lg: '600px', xl: '800px', '2xl': '800px', '3xl': '800px' }}
          top='90px'
          placeholder='Enter the text for the post'
          onChange={(e) => {
            setText(e.target.value);
          }}
          required
        />
        <Flex
          display='inline-block'
          marginLeft={{ md: '5%', lg: '2%', xl: '2%', '2xl': '7%', '3xl': '-29.3%' }}
          marginTop={{ md: '5%', lg: '11%', xl: '8%', '2xl': '8%', '3xl': '8%' }}
        >
          <Flex display='inline-flex'>
            <AceEditor
              value={code}
              ref={editor}
              mode={selectedLanguage}
              theme='monokai'
              width='800px'
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
            <Flex display='inline' marginLeft='40px'>
              <Textarea
                width='120%'
                height='20%'
                placeholder='Input'
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              ></Textarea>
              {!loading && !stderr && (
                <Textarea width='120%' readOnly marginTop='40px' height='50%' placeholder='Output'>
                  {stdout}
                </Textarea>
              )}
              {!loading && !stdout && (
                <Textarea width='120%' readOnly marginTop='40px' height='50%' placeholder='Output'>
                  {stderr}
                </Textarea>
              )}
            </Flex>
          </Flex>
          <Flex direction='row' mb={10} marginTop='20px'>
            <Select
              value={selectedLanguage}
              width='30%'
              mr={5}
              onChange={(e) => handleChange(e.target.value)}
            >
              <option value='golang'>Go</option>
              <option value='python'>Python</option>
              <option value='c_cpp'>C++</option>
              <option value='java'>Java</option>
            </Select>
            <Tooltip label='Undo'>
              <IconButton
                mr={5}
                onClick={() => editor.current.editor.undo()}
                icon={<FaUndo />}
              ></IconButton>
            </Tooltip>
            <Tooltip label='Redo'>
              <IconButton
                mr={5}
                onClick={() => editor.current.editor.redo()}
                icon={<FaRedo />}
              ></IconButton>
            </Tooltip>
            <Tooltip label='Download'>
              <IconButton mr={5} onClick={dwnld_func} icon={<FaFileDownload />}></IconButton>
            </Tooltip>
            <Button mr={5} onClick={handleRun}>
              Run
            </Button>
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
        </Flex>
      </form>
    </div>
  );
}

Editor.propTypes = {
  addPost: PropTypes.func.isRequired,
  execCode: PropTypes.func.isRequired,
  codex: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  loading: state.codex.loading,
  stdout: state.codex.stdout,
  stderr: state.codex.stderr
});

export default connect(mapStateToProps, { addPost, addComment, execCode })(Editor);
