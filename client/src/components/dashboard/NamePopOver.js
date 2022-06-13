import { EditIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { addName } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function NamePopOver({ addName, name, setName, display }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [name1, setName1] = useState('');
  const save = () => {
    let name2 = [];
    const name = name1;
    if (name1.length > 12) {
      name2 = name1.split(' ');
      setName(name2[0]);
      addName(name);
      return;
    }
    setName(name1);
    addName(name);
  };
  const Name = ({ onCancel }) => {
    return (
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            label='Name'
            id='name'
            defaultValue={name1}
            onChange={(e) => {
              setName1(e.target.value);
            }}
            autoFocus
          />
        </FormControl>
        <ButtonGroup d='flex' justifyContent='flex-end'>
          <Button variant='outline' onClick={onCancel} color='teal'>
            Cancel
          </Button>
          <Button
            colorScheme='teal'
            onClick={() => {
              save();
              onCancel();
            }}
          >
            Save
          </Button>
        </ButtonGroup>
      </Stack>
    );
  };
  return (
    <div>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement='right'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton
            display={display}
            color='black'
            height='30px'
            marginTop='-8px'
            marginLeft='20px'
            size='sm'
            icon={<EditIcon />}
          />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <ReactFocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <Name onCancel={onClose} />
          </ReactFocusLock>
        </PopoverContent>
      </Popover>
    </div>
  );
}

NamePopOver.propTypes = {
  addName: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { addName })(NamePopOver);
