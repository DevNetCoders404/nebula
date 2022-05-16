import React, { useState } from 'react';
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
  InputGroup,
  Tag,
  TagLabel,
  TagCloseButton,
  Link,
  Text
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import ReactFocusLock from 'react-focus-lock';
import { addSocial } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function SocialMediaPopOver({ display }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);
  const [sociallist, setSocialfield] = useState([
    {
      mediaName: '',
      link: ''
    }
  ]);
  const [mediaValue, setMediaValue] = useState('');
  const [mediaLinkValue, setMediaLinkValue] = useState('');
  const [focus, setFocus] = useState(false);
  const [focus1, setFocus1] = useState(true);

  const Social = ({ onCancel }) => {
    return (
      <Stack spacing={4}>
        <FormControl>
          <FormLabel color='teal'>Social Media</FormLabel>

          <InputGroup d='flex' justifyContent='flex-end' marginTop='10px'>
            <Input
              color='black'
              label='social-media'
              id='social-media'
              autoFocus={focus1}
              defaultValue={mediaValue}
              onChange={(e) => {
                setMediaValue(e.target.value);
              }}
              onClick={() => {
                setFocus(false);
                setFocus1(true);
              }}
              placeholder='Media Name'
              _focus={{ outline: 'none' }}
            />
            <Input
              color='black'
              autoFocus={focus}
              marginLeft='10px'
              label='Name'
              id='name'
              onClick={() => {
                setFocus(true);
                setFocus1(false);
              }}
              defaultValue={mediaLinkValue}
              onChange={(e) => {
                setMediaLinkValue(e.target.value);
              }}
              placeholder='Link'
              _focus={{ outline: 'none' }}
            />
          </InputGroup>

          <Button
            onClick={handleAddSocial}
            style={{ backgroundColor: '#38B2AC' }}
            marginTop='10px'
            marginBottom='10px'
          >
            Add Media
          </Button>
          {sociallist.map((sociallist1, index) => (
            <div key={index}>
              {sociallist1.mediaName !== '' && (
                <Tag borderRadius='full' variant='solid' colorScheme='teal' display='inline-flex'>
                  <TagLabel>{sociallist1.mediaName}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      handleRemoveMediaTag(index);
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

  const handleAddSocial = () => {
    if (mediaValue === '' || mediaLinkValue === '') {
      return;
    }

    let flag = false;
    sociallist.map((sociallist1, index) => {
      if (sociallist1.mediaName.toUpperCase() === mediaValue.toUpperCase()) {
        flag = true;
      }
    });

    if (flag) {
      return;
    }

    if (mediaLinkValue.includes('https://') && mediaLinkValue.includes('.')) {
      setSocialfield([...sociallist, { mediaName: mediaValue, link: mediaLinkValue }]);
    }
    addSocial(sociallist)
  };

  const handleRemoveMediaTag = (index) => {
    const values = [...sociallist];
    values.splice(index, 1);
    setSocialfield(values);
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
            marginLeft='110px'
            marginTop='-70px'
            height='30px'
            size='sm'
            icon={<EditIcon />}
          />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <ReactFocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <Social onCancel={onClose} />
          </ReactFocusLock>
        </PopoverContent>
      </Popover>
      {sociallist.map((sociallist1, index) => (
        <div key={index}>
          <Link
            href={sociallist1.link}
            style={{ textDecoration: 'none' }}
            _focus={{ outline: 'none' }}
          >
            <Text marginTop='5px' fontSize='17px' style={{ color: 'white' }}>
              {sociallist1.mediaName}
            </Text>
          </Link>
        </div>
      ))}
    </div>
  );
}

SocialMediaPopOver.propTypes = {
  addSocial: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { addSocial })(SocialMediaPopOver);
