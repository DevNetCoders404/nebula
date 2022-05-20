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
  InputGroup,
  Tag,
  TagLabel,
  TagCloseButton,
  Link,
  Text
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import ReactFocusLock from 'react-focus-lock';
import { getCurrentProfile, addSocial } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function SocialMediaPopOver({ getCurrentProfile, addSocial, profile: { profile }, display }) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);
  const [sociallist, setSocialfield] = useState([]);
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
          {profile &&
            profile.socials.map((sociallist1, index) => (
              <div key={index}>
                {sociallist1.socialname !== '' && (
                  <Tag borderRadius='full' variant='solid' colorScheme='teal' display='inline-flex'>
                    <TagLabel>{profile.socials[index].socialname}</TagLabel>
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

    let socials = [];

    if (mediaLinkValue.includes('https://') && mediaLinkValue.includes('.')) {
      sociallist.push({ socialname: mediaValue, link: mediaLinkValue });
      socials = [...profile.socials, ...sociallist];
      socials = socials.filter(
        (val, ind, self) =>
          ind === self.findIndex((t) => t.socialname === val.socialname && t.link === val.link)
      );
    }
    addSocial(socials);
  };

  const handleRemoveMediaTag = (index) => {
    let socials = [...profile.socials, ...sociallist];
    socials = socials.filter(
      (val, ind, self) =>
        ind === self.findIndex((t) => t.socialname === val.socialname && t.link === val.link)
    );
    socials.splice(index, 1);
    setSocialfield(socials);
    addSocial(socials);
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
      {profile &&
        profile.socials.map((sociallist1, index) => (
          <div key={index}>
            <Link
              href={profile.socials[index].link}
              style={{ textDecoration: 'none' }}
              _focus={{ outline: 'none' }}
              isExternal
            >
              <Text marginTop='5px' fontSize='17px' style={{ color: 'white' }}>
                {profile.socials[index].socialname}
              </Text>
            </Link>
          </div>
        ))}
    </div>
  );
}

SocialMediaPopOver.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  addSocial: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { addSocial, getCurrentProfile })(SocialMediaPopOver);
