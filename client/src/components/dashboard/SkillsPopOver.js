import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  useDisclosure,
  ButtonGroup,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Tag,
  TagCloseButton,
  TagLabel,
  Text
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import ReactFocusLock from 'react-focus-lock';
import { getCurrentProfile, addSkills } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function SkillsPopOver({ getCurrentProfile, addSkills, profile: { profile }, display }) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [tagValue, setTagValue] = useState('');
  const [taglist, setTagfield] = useState([
    {
      tag: ''
    }
  ]);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  const Skills = ({ onCancel }) => {
    return (
      <Stack spacing={4}>
        <FormControl>
          <FormLabel color='teal'>Skills</FormLabel>
          <Input
            autoFocus
            name='tag'
            color='black'
            defaultValue={tagValue}
            onChange={(e) => {
              setTagValue(e.target.value);
            }}
            _focus={{ outline: 'none' }}
          ></Input>

          <Button
            onClick={handleAddTag}
            style={{ backgroundColor: '#38B2AC' }}
            marginTop='10px'
            marginBottom='10px'
          >
            Add Tag
          </Button>
          {taglist.map((taglist1, index) => (
            <div key={index}>
              {taglist1.tag !== '' && (
                <Tag borderRadius='full' variant='solid' colorScheme='teal' display='inline-flex'>
                  <TagLabel>{taglist1.tag}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      handleRemoveTag(index);
                    }}
                  />
                </Tag>
              )}
            </div>
          ))}
        </FormControl>
        <ButtonGroup d='flex' justifyContent='flex-end'>
          <Button variant='outline' onClick={onCancel} color='teal'>
            Cancel
          </Button>
        </ButtonGroup>
      </Stack>
    );
  };

  const handleAddTag = () => {
    if (tagValue === '') {
      return;
    }
    let flag = false;
    taglist.map((taglist1, index) => {
      if (taglist1.tag.toUpperCase() === tagValue.toUpperCase()) {
        flag = true;
      }
    });
    if (flag) {
      return;
    }
    setTagfield([...taglist, { tag: tagValue }]);
    addSkills(taglist)
  };

  const handleRemoveTag = (index) => {
    const values = [...taglist];
    values.splice(index, 1);
    setTagfield(values);
  };
  return (
    <div>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement='right'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton
            display={display}
            color='black'
            marginLeft='50px'
            marginTop='-70px'
            height='30px'
            size='sm'
            icon={<EditIcon />}
          />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <ReactFocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <Skills onCancel={onClose} />
          </ReactFocusLock>
        </PopoverContent>
      </Popover>

      {profile && profile.skills.map((taglist1, index) => (
        <div key={index}>
          <Text marginTop='5px' fontSize='17px' fontWeight={600} style={{ color: 'white' }}>
            {
              profile.skills[index].skillname
            }
          </Text>
        </div>
      ))}
    </div>
  );
}

SkillsPopOver.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  addSkills: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { addSkills, getCurrentProfile })(SkillsPopOver);
