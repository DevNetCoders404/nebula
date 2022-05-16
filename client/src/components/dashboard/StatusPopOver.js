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
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { addGeneral } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function StatusPopOver({ addGeneral, setStatus, display }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [status1, setStatus1] = useState();
  const save = () => {
    setStatus(status1);
    const status = status1;
    addGeneral({status})
  };
  const Status = ({ onCancel }) => {
    return (
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Input
            label='Name'
            id='name'
            defaultValue={status1}
            onChange={(e) => {
              setStatus1(e.target.value);
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
            <Status onCancel={onClose} />
          </ReactFocusLock>
        </PopoverContent>
      </Popover>
    </div>
  );
}

StatusPopOver.propTypes = {
  addGeneral: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { addGeneral })(StatusPopOver);
