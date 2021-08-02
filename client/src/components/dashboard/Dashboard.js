import {
  Box,
  Button,
  Flex,
  FormLabel,
  Image,
  Input,
  Text,
  Stack,
  FormControl,
  useToast,
  Link,
  Select,
  Progress
} from '@chakra-ui/react';
import '@fontsource/ubuntu';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import Navbar from '../layout/Navbar';
import { addGeneral, addSocial, addSkills, getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Dashboard({
  addGeneral,
  getCurrentProfile,
  addSkills,
  addSocial,
  auth: { user },
  profile: { profile }
}) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile, addGeneral]);

  /* Profile Details */
  const toast = useToast();
  const [name, setName] = useState(''); // note: take the name of the user and set to this use state
  //  const [email, setEmail] = useState(''); // note: take the email of the user and set to use state
  const [status, setStatus] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  //const isInvalid = mobile === '' || email === '' || name === '' || address === '';
  const a = 'dddd';
  const splitName = name.split(' ');
  /* Social Media */
  const [facebook, setFacebook] = useState();
  const [github, setGitHub] = useState('');
  const [twitter, setTwiter] = useState('');
  const [linkedin, setLinkedIn] = useState('');
  const [website, setWebsite] = useState('');
  const [social, setSocialMedia] = useState('');

  /* Skills */
  const [selectedLanguage1, setSelectedLanguage1] = useState('');
  const [selectedLanguage2, setSelectedLanguage2] = useState('');
  const [selectedLanguage3, setSelectedLanguage3] = useState('');
  const [selectedLanguage4, setSelectedLanguage4] = useState('');
  const [selectedLanguage5, setSelectedLanguage5] = useState('');
  const [percentageValue1, setPercentageValue1] = useState('');
  const [percentageValue2, setPercentageValue2] = useState('');
  const [percentageValue3, setPercentageValue3] = useState('');
  const [percentageValue4, setPercentageValue4] = useState('');
  const [percentageValue5, setPercentageValue5] = useState('');
  const [skills, setSkills] = useState('');

  const gitHubUser = github.split('/');
  const twitterUser = twitter.split('/');
  const facebookl =
    profile && profile.socials && profile.socials.facebook
      ? profile.socials.facebook.split('/').pop()
      : '---';
  const twitterl =
    profile && profile.socials && profile.socials.twitter
      ? profile.socials.twitter.split('/').pop()
      : '---';
  const githubl =
    profile && profile.socials && profile.socials.github
      ? profile.socials.github.split('/').pop()
      : '---';
  const linkedinl =
    profile && profile.socials && profile.socials.linkedin
      ? profile.socials.linkedin.split('/').pop()
      : '---';

  const handleAddGeneral = (e) => {
    e.preventDefault();
    addGeneral({ status, address, mobile });
  };

  const handleAddSocial = (e) => {
    e.preventDefault();
    const socials = { facebook, twitter, github, linkedin };
    addSocial({ socials, website });
  };

  const handleAddSkills = (e) => {
    e.preventDefault();
    // const skillname = selectedLanguage1;
    // const percent = percentageValue1;
    const skills = {
      skills: [
        { skillname: selectedLanguage1, percent: percentageValue1 },
        { skillname: selectedLanguage2, percent: percentageValue2 },
        { skillname: selectedLanguage3, percent: percentageValue3 },
        { skillname: selectedLanguage4, percent: percentageValue4 },
        { skillname: selectedLanguage5, percent: percentageValue5 }
      ]
    };
    console.log(facebookl.split('/').pop());
    //console.log(profile && profile.skills);
    addSkills({ skills });
  };

  // profileDetailHandler executes when edit button is clicked it just hides the details box and shows the edit box of profile
  function profileDetailsHandler() {
    const profile = document.getElementById('profile-details');
    profile.style.display = 'none';
    const profileEdit = document.getElementById('profile-edit');
    profileEdit.style.display = 'block';
    const socialMediaBox = document.getElementById('social-media-box');
    socialMediaBox.style.display = 'none';
    const socialMediaDetailBox = document.getElementById('social-media-details-box');
    socialMediaDetailBox.style.display = 'none';
    const skillBox = document.getElementById('skill-box');
    skillBox.style.display = 'none';
    const skillDetailBox = document.getElementById('skills-details-box');
    skillDetailBox.style.display = 'none';
  }

  // profileEditHandler executes when back button is clicked it just hides the edit box and shows the details box of profile
  function profileEditHandler() {
    const profileEdit = document.getElementById('profile-edit');
    profileEdit.style.display = 'none';
    const profile = document.getElementById('profile-details');
    profile.style.display = 'block';
    //if (social) {
    const socialMediaDetailBox = document.getElementById('social-media-details-box');
    socialMediaDetailBox.style.display = 'block';
    //} else {
    // const socialMediaBox = document.getElementById('social-media-box');
    //  socialMediaBox.style.display = 'block';
    //}

    //if (skills) {
    const skillDetailBox = document.getElementById('skills-details-box');
    skillDetailBox.style.display = 'block';
    const skillBox = document.getElementById('skill-box');
    skillBox.style.display = 'none';
    //} else {
    //  const skillBox = document.getElementById('skill-box');
    //  skillBox.style.display = 'block';
    //}
  }

  // addSocialMedia executes when add button is clicked it hides the social media card and displays the social media add card
  function addSocialMediaHandler() {
    const profile = document.getElementById('profile-details');
    profile.style.display = 'none';
    const socialMediaBox = document.getElementById('social-media-box');
    socialMediaBox.style.display = 'none';
    const socialMediaDetailBox = document.getElementById('social-media-details-box');
    socialMediaDetailBox.style.display = 'none';

    const socialMedia = document.getElementById('add-social-media-links');
    socialMedia.style.display = 'block';
    const skillBox = document.getElementById('skill-box');
    skillBox.style.display = 'none';
    const skillDetailBox = document.getElementById('skills-details-box');
    skillDetailBox.style.display = 'none';
  }

  // addSocialMediaEditHandler executes when back button is clicked it hides the social media add card and displays the social media  card
  function socialMediaEditHandler() {
    const profile = document.getElementById('profile-details');
    profile.style.display = 'block';
    //if (social) {
    const socialMediaDetailBox = document.getElementById('social-media-details-box');
    socialMediaDetailBox.style.display = 'block';
    //} else {
    //  const socialMediaBox = document.getElementById('social-media-box');
    //  socialMediaBox.style.display = 'block';
    //}
    const socialMedia = document.getElementById('add-social-media-links');
    socialMedia.style.display = 'none';

    //if (skills) {
    const skillDetailBox = document.getElementById('skills-details-box');
    skillDetailBox.style.display = 'block';
    const skillBox = document.getElementById('skill-box');
    skillBox.style.display = 'none';
    //} else {
    //const skillBox = document.getElementById('skill-box');
    //skillBox.style.display = 'block';
    //}

    const windowWidth = window.innerWidth;
    if (windowWidth <= 420 && social) {
      const skillBox = document.getElementById('skill-box');
      skillBox.style.top = '162%';
      const skillDetailBox = document.getElementById('skills-details-box');
      skillDetailBox.style.top = '160%';
    }
  }

  // addSkillHandler executes when add button is clicked it hides the skills card and displays the skills add card
  function addSkillsHandler() {
    const profile = document.getElementById('profile-details');
    profile.style.display = 'none';
    const socialMediaBox = document.getElementById('social-media-box');
    socialMediaBox.style.display = 'none';
    const socialMediaDetailBox = document.getElementById('social-media-details-box');
    socialMediaDetailBox.style.display = 'none';
    const skillBox = document.getElementById('skill-box');
    skillBox.style.display = 'none';
    const skillDetailBox = document.getElementById('skills-details-box');
    skillDetailBox.style.display = 'none';

    const skillEdit = document.getElementById('skill-edit');
    skillEdit.style.display = 'block';
  }

  // skillEditHandler executes when add button is clicked it hides the skill add card and displays the skill card
  function skillEditHandler() {
    const profile = document.getElementById('profile-details');
    profile.style.display = 'block';
    //if (social) {
    const socialMediaDetailBox = document.getElementById('social-media-details-box');
    socialMediaDetailBox.style.display = 'block';
    //} else {
    // const socialMediaBox = document.getElementById('social-media-box');
    //socialMediaBox.style.display = 'block';
    //}

    const skillEdit = document.getElementById('skill-edit');
    skillEdit.style.display = 'none';

    //if (skills) {
    const skillDetailBox = document.getElementById('skills-details-box');
    skillDetailBox.style.display = 'block';
    const skillBox = document.getElementById('skill-box');
    skillBox.style.display = 'none';
    // } else {
    //   const skillBox = document.getElementById('skill-box');
    //   skillBox.style.display = 'block';
    // }
  }

  // function for disabling the option once select
  function onChangeHandler() {
    const selects = document.querySelectorAll('.select-group');
    selects.forEach((elem) => {
      console.log(selectedLanguage1);
      elem.addEventListener('change', (event) => {
        let values = Array.from(selects).map((select) => select.value);
        console.log(values);
        for (let select of selects) {
          select.querySelectorAll('option').forEach((option) => {
            let value = option.value;
            if (value && value !== select.value && values.includes(value)) {
              console.log(select.value);
              option.disabled = true;
            } else {
              option.disabled = false;
            }
          });
        }
      });
    });
  }

  return (
    <div>
      <Navbar />
      <Box
        mt={['10', '10', '10', '80px', '100px']}
        ml={['auto', '5', '5', '40', '80']}
        mr={['auto']}
        boxShadow='md'
        pt={['40px', '10px', '15px', '10px', '40']}
        pb={['5', '5', '25px', '35px', '10']}
        width={['280px', '280px', '300px', '300px', '20%']}
        id='profile-box'
      >
        <Image
          src={user && user.avatar}
          borderRadius={400}
          width={['150px', '150px', '150px', '160px', '50%']}
          ml='auto'
          mr='auto'
          mt={['null', 'null', 'null', 'null', '-150px']}
          align='center'
          id='profile-image'
        ></Image>
        <Box id='profile-text'>
          <Text
            fontFamily='ubuntu'
            fontWeight='bold'
            fontSize={['16', '8', '19', '20', '20']}
            mt={['7', '2', '5', '5', '5']}
            align='center'
          >
            {user && user.name}
          </Text>
          <Text
            align='center'
            fontFamily='ubuntu'
            color='GrayText'
            fontSize={['15', '15', '17', '18', '18']}
            mt={['3', '1', '3', '1', '3']}
            mb={['3', '1', '3', '1', '3']}
            noOfLines={1}
          >
            {profile && profile.status}
          </Text>
          <Text
            align='center'
            fontFamily='ubuntu'
            color='GrayText'
            fontSize={['15', '15', '17', '18', '18']}
          >
            {profile && profile.address}
          </Text>
        </Box>
      </Box>

      <div id='profile-details'>
        <Box
          ml={['auto', 'auto', '350px', '480px', '660px']}
          mr={['auto']}
          mt={['10', '-300px', '-300px', '-300px', '-320px']}
          boxShadow='md'
          pt={['10', '10', '10', '10', '10']}
          pb={['50px', '50px', '50px', '50px', '70px']}
          width={['280px', '400px', '400px', '400px', '40%']}
        >
          <Flex
            position='relative'
            top={['-30px']}
            left={['4']}
            justifyContent='space-between'
            width={['90%', '90%', '90%', '90%', '95%']}
            borderBottom='ActiveBorder'
            borderBottomStyle='ridge'
          >
            <FormLabel fontFamily='ubuntu' fontWeight='bold' display={['inline', 'inline', 'flex']}>
              Name{' '}
              <FormLabel
                ml={['0', '200px', '200px', '200px', '200px', '20']}
                color='GrayText'
                mb={['0', '2']}
              >
                {user && user.name}
              </FormLabel>
            </FormLabel>
          </Flex>

          <Flex
            position='relative'
            top={['-10px']}
            left={['4']}
            justifyContent='space-between'
            width={['90%', '90%', '90%', '90%', '95%']}
            borderBottom='ActiveBorder'
            borderBottomStyle='ridge'
          >
            <FormLabel fontFamily='ubuntu' fontWeight='bold' display={['inline', 'inline', 'flex']}>
              Email
              <FormLabel
                ml={['0', '100px', '100px', '100px', '90px']}
                mb={['0', '2']}
                color='GrayText'
              >
                {user && user.email}
              </FormLabel>
            </FormLabel>
          </Flex>

          <Flex
            position='relative'
            top={['10px']}
            left={['4']}
            justifyContent='space-between'
            width={['90%', '90%', '90%', '90%', '95%']}
            borderBottom='ActiveBorder'
            borderBottomStyle='ridge'
          >
            <FormLabel fontFamily='ubuntu' fontWeight='bold' display={['inline', 'inline', 'flex']}>
              Mobile
              <FormLabel
                ml={['0', '200px', '200px', '200px', '80px']}
                mb={['0', '2']}
                color='GrayText'
              >
                {profile && profile.mobile}
              </FormLabel>
            </FormLabel>
          </Flex>

          <Flex
            position='relative'
            top={['30px']}
            left={['4']}
            justifyContent='space-between'
            width={['90%', '90%', '90%', '90%', '95%']}
            borderBottom='ActiveBorder'
            borderBottomStyle='ridge'
          >
            <FormLabel fontFamily='ubuntu' fontWeight='bold' display={['inline', 'inline', 'flex']}>
              Address
              <FormLabel
                ml={['0', '80px', '80px', '80px', '70px']}
                mb={['0', '2']}
                color='GrayText'
              >
                {profile && profile.address}
              </FormLabel>
            </FormLabel>
          </Flex>

          <Button
            p='10px 20px 10px 20px'
            style={{ background: '#38B2AC' }}
            color='white'
            position='relative'
            top={['40px', '40px', '40px', '40px', '50px']}
            left={['200px', '200px', '310px', '310px', '525px']}
            onClick={profileDetailsHandler}
          >
            Edit
          </Button>
        </Box>
      </div>

      <div id='profile-edit' style={{ display: 'none' }}>
        <form onSubmit={handleAddGeneral}>
          <Box
            ml={['auto', 'auto', '350px', '480px', '660px']}
            mr={['auto']}
            mt={['10', '-300px', '-300px', '-300px', '-320px']}
            boxShadow='md'
            pt={['10', '10', '10', '10', '10']}
            pb={['140px', '50px', '35px', '35px', '50px']}
            width={['280px', '280px', '400px', '420px', '40%']}
          >
            <Stack margin='auto' spacing={5} marginTop={5}>
              <Flex position='relative' top={['-50px']} left={4}>
                <FormControl display={['inline', 'inline', 'flex']}>
                  <FormLabel htmlFor='name'>Name</FormLabel>
                  <Input
                    // required='required'
                    type='text'
                    id='name'
                    height={['40px', '40px', '30px']}
                    width={['245px', '245px', '270px', '290px', '465px']}
                    position='absolute'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    left={['0', '80px', '100px']}
                  ></Input>
                </FormControl>
              </Flex>

              <Flex position='relative' top={['-15px', '-15px', '-45px']} left={4}>
                <FormControl display={['inline', 'inline', 'flex']}>
                  <FormLabel htmlFor='status'>Status</FormLabel>
                  <Input
                    // required='required'
                    type='text'
                    id='status'
                    height={['40px', '40px', '30px']}
                    width={['245px', '245px', '270px', '290px', '465px']}
                    position='absolute'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    left={['0', '80px', '100px']}
                  ></Input>
                </FormControl>
              </Flex>

              <Flex position='relative' top={['25px', '15px', '-35px']} left={4}>
                <FormControl display={['inline', 'inline', 'flex']}>
                  <FormLabel htmlFor='mobile'>Mobile</FormLabel>
                  <Input
                    // required='required'
                    type='text'
                    id='mobile'
                    height={['40px', '40px', '30px']}
                    width={['245px', '245px', '270px', '290px', '465px']}
                    position='absolute'
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    left={['0', '80px', '100px']}
                  ></Input>
                </FormControl>
              </Flex>

              <Flex position='relative' top={['55px', '35px', '-25px']} left={4}>
                <FormControl display={['inline', 'inline', 'flex']}>
                  <FormLabel htmlFor='adress'>Address</FormLabel>
                  <Input
                    // required='required'
                    type='text'
                    id='address'
                    height={['40px', '40px', '30px']}
                    width={['245px', '245px', '270px', '290px', '465px']}
                    position='absolute'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    left={['0', '80px', '100px']}
                  ></Input>
                </FormControl>
              </Flex>

              <Flex
                position='relative'
                top={['35px', '35px', '-80px', '-80px', '-70px']}
                left={['4', '4', '4', '4']}
              >
                <FormControl>
                  <Button
                    type='submit'
                    color='white'
                    style={{ backgroundColor: '#38B2AC' }}
                    onClick={() => {
                      toast({
                        title: 'Profile Updated Successfully',
                        status: 'success',
                        isClosable: true
                      });
                    }}
                    position='absolute'
                    top='60px'
                  >
                    Save Changes
                  </Button>
                </FormControl>

                <Button
                  type='button'
                  color='white'
                  style={{ backgroundColor: '#38B2AC' }}
                  onClick={profileEditHandler}
                  position='absolute'
                  top='60px'
                  left={40}
                >
                  Back
                </Button>
              </Flex>
            </Stack>
          </Box>
        </form>
      </div>

      <Flex display={['inline-block', 'inline-block', 'flex']}>
        <div>
          <Box
            display='none'
            position='absolute'
            top={['104%', '104%', '106%']}
            left={['50%', '50%', '21%', '29.5%', '30%']}
            ml={['-140px']}
            mb={['-180px']}
            boxShadow='md'
            pt={['2', '10', '2', '2', '2']}
            pb={['0px', '0px', '0px', '0px', '0px']}
            width={['280px', '280px', '300px', '300px', '20%']}
            id='social-media-box'
          >
            <FormLabel
              position='relative'
              top={['15px']}
              left={['15px']}
              fontFamily='ubuntu'
              fontSize={18}
              fontWeight='bold'
            >
              Social Media
            </FormLabel>
            <Button
              color='white'
              style={{ backgroundColor: '#38B2AC' }}
              float='right'
              position='relative'
              top={['-25px']}
              left={['-10px']}
              onClick={addSocialMediaHandler}
            >
              Add
            </Button>
          </Box>

          <Box
            position='absolute'
            left={['50%', '50%', '21%', '29%', '30%']}
            ml={['-140px']}
            top={['104%', '102%', '104%']}
            boxShadow='md'
            pt={['2', '10', '2', '2', '2']}
            pb={['35px', '35px', '35px', '35px', '45px']}
            p="10px"
            width={['280px', '280px', '300px', '300px', '20%']}
            id='social-media-details-box'
            display='block'
          >
            <Flex
              display='flex'
              position='relative'
              width='100%'
              top={3}
              borderBottom='ActiveBorder'
              borderBottomStyle='ridge'
            >
              <Link href={facebook === '' ? '#' : facebook}>
                <FaFacebook
                  fontSize='30px'
                  color='#3b5998'
                  cursor='pointer'
                  style={{ marginLeft: '10px' }}
                />
              </Link>
              <Text ml='10px' fontFamily='ubuntu' fontSize='18px' fontWeight='bold' mb={3}>
                Facebook
              </Text>
            </Flex>
            <Text fontSize='18px' color='GrayText' align='right' mr={3} mt={['-30px']}>
              {facebookl}
            </Text>

            <Flex
              display='flex'
              position='relative'
              width='100%'
              top={['30px']}
              borderBottom='ActiveBorder'
              borderBottomStyle='ridge'
            >
              <Link href={github === '' ? '#' : github}>
                <FaGithub
                  fontSize='30px'
                  color='#333'
                  cursor='pointer'
                  style={{ marginLeft: '10px' }}
                />
              </Link>
              <Text ml='10px' fontFamily='ubuntu' fontSize='18px' fontWeight='bold' mb={3}>
                GitHub
              </Text>
            </Flex>
            <Text fontSize='18px' color='GrayText' align='right' mr={3} mt={['-10px']}>
              {githubl}
            </Text>

            <Flex
              display='flex'
              position='relative'
              width='100%'
              top={['30px']}
              borderBottom='ActiveBorder'
              borderBottomStyle='ridge'
            >
              <Link href={linkedin === '' ? '#' : linkedin}>
                <FaLinkedin fontSize='30px' color='#0e76a8' style={{ marginLeft: '10px' }} />
              </Link>
              <Text ml='10px' fontFamily='ubuntu' fontSize='18px' fontWeight='bold' mb={3}>
                LinkedIn
              </Text>
            </Flex>
            <Text fontSize='18px' color='GrayText' align='right' mr={3} mt={['-10px']}>
              {linkedinl}
            </Text>

            <Flex
              display='flex'
              position='relative'
              width='100%'
              top={['30px']}
              borderBottom='ActiveBorder'
              borderBottomStyle='ridge'
            >
              <Link href={twitter === '' ? '#' : twitter}>
                <FaTwitter fontSize='30px' color='#00acee' style={{ marginLeft: '10px' }} />
              </Link>
              <Text ml='10px' fontFamily='ubuntu' fontSize='18px' fontWeight='bold' mb={3}>
                Twitter
              </Text>
            </Flex>
            <Text fontSize='18px' color='GrayText' align='right' mr={3} mt={['-10px']}>
              {twitterl}
            </Text>

            <Flex
              display='flex'
              position='relative'
              width='100%'
              top={['30px']}
              borderBottom='ActiveBorder'
              borderBottomStyle='ridge'
            >
              <Link href={website === '' ? '#' : website}>
                <FaGlobe fontSize='30px' color='#333' style={{ marginLeft: '10px' }} />
              </Link>
              <Text ml='10px' fontFamily='ubuntu' fontSize='18px' fontWeight='bold' mb={3}>
                Website
              </Text>
            </Flex>
            <Text fontSize='18px' color='GrayText' align='right' mr={3} mt={['-10px']}>
              {website === '' ? '--' : website}
            </Text>
            <Button
              p='10px 20px 10px 20px'
              style={{ background: '#38B2AC' }}
              color='white'
              position='relative'
              top={['30px']}
              left={['200px', '200px', '220px']}
              onClick={addSocialMediaHandler}
            >
              Edit
            </Button>
          </Box>
        </div>

        <div id='add-social-media-links' style={{ display: 'none' }}>
          <form onSubmit={handleAddSocial}>
            <Box
              position='absolute'
              top={['104%', '104%', '35%']}
              ml={['-140px']}
              left={['50%', '50%', '65%', '65%', '55%']}
              height={['null', 'null', '300px', '305px', '320px']}
              boxShadow='md'
              pt={['10', '10', '10', '10', '10']}
              pb={['180px', '180px', '0px', '35px', '50px']}
              width={['280px', '280px', '400px', '420px', '40%']}
            >
              <Stack margin='auto' spacing={5} marginTop={5}>
                <Flex position='relative' top={['-40px']} left={['3']}>
                  <FormControl display={['inline', 'inline', 'flex']}>
                    <FormLabel htmlFor='facebook'>Facebook</FormLabel>
                    <Input
                      type='url'
                      id='facebook'
                      width={['245px', '245px', '280px', '300px', '485px']}
                      height={['40px', '40px', '30px']}
                      placeholder='Paste the links here'
                      position='absolute'
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      left={['0', '0', '90px']}
                    ></Input>
                  </FormControl>
                </Flex>

                <Flex
                  position='relative'
                  top={['-15px', '-50px', '-50px', '-50px', '-40px']}
                  left={['3']}
                >
                  <FormControl display={['inline', 'inline', 'flex']}>
                    <FormLabel htmlFor='github'>GitHub</FormLabel>
                    <Input
                      type='url'
                      id='github'
                      width={['245px', '245px', '280px', '300px', '485px']}
                      placeholder='Paste the links here'
                      height={['40px', '40px', '30px']}
                      position='absolute'
                      value={github}
                      onChange={(e) => setGitHub(e.target.value)}
                      left={['0', '0', '90px']}
                    ></Input>
                  </FormControl>
                </Flex>

                <Flex
                  position='relative'
                  top={['20px', '-60px', '-60px', '-60px', '-40px']}
                  left={['3']}
                >
                  <FormControl display={['inline', 'inline', 'flex']}>
                    <FormLabel htmlFor='twitter'>Twitter</FormLabel>
                    <Input
                      type='url'
                      id='twitter'
                      width={['245px', '245px', '280px', '300px', '485px']}
                      position='absolute'
                      placeholder='Paste the links here'
                      height={['40px', '40px', '30px']}
                      value={twitter}
                      onChange={(e) => setTwiter(e.target.value)}
                      left={['0', '0', '90px']}
                    ></Input>
                  </FormControl>
                </Flex>

                <Flex
                  position='relative'
                  top={['50px', '-70px', '-70px', '-70px', '-40px']}
                  left={['3']}
                >
                  <FormControl display={['inline', 'inline', 'flex']}>
                    <FormLabel htmlFor='linkedin'>LinkedIn</FormLabel>
                    <Input
                      type='url'
                      id='linkedin'
                      width={['245px', '245px', '280px', '300px', '485px']}
                      position='absolute'
                      placeholder='Paste the links here'
                      height={['40px', '40px', '30px']}
                      value={linkedin}
                      onChange={(e) => setLinkedIn(e.target.value)}
                      left={['0', '0', '90px']}
                    ></Input>
                  </FormControl>
                </Flex>

                <Flex
                  position='relative'
                  top={['80px', '-80px', '-80px', '-80px', '-40px']}
                  left={['3']}
                >
                  <FormControl display={['inline', 'inline', 'flex']}>
                    <FormLabel htmlFor='linkedin'>Website</FormLabel>
                    <Input
                      type='url'
                      id='linkedin'
                      width={['245px', '245px', '280px', '300px', '485px']}
                      position='absolute'
                      placeholder='Paste the links here'
                      height={['40px', '40px', '30px']}
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      left={['0', '0', '90px']}
                    ></Input>
                  </FormControl>
                </Flex>

                <Flex
                  position='relative'
                  top={['60px', '60px', '-140px', '-140px', '-110px']}
                  left={4}
                >
                  <FormControl>
                    <Button
                      type='submit'
                      color='white'
                      style={{ backgroundColor: '#38B2AC' }}
                      onClick={() => {
                        if (
                          facebook.includes('https://facebook.com') ||
                          github.includes('https://github.com') ||
                          twitter.includes('https://twitter.com') ||
                          linkedin.includes('https://linkedin.com')
                          //website.includes('.com')
                        ) {
                          toast({
                            title: 'Social Media Added Successfully',
                            status: 'success',
                            isClosable: true
                          });
                          setSocialMedia(true);
                        }
                      }}
                      position='absolute'
                      top='60px'
                    >
                      Save Changes
                    </Button>
                  </FormControl>

                  <Button
                    type='button'
                    color='white'
                    style={{ backgroundColor: '#38B2AC' }}
                    onClick={socialMediaEditHandler}
                    position='absolute'
                    top='60px'
                    left={40}
                  >
                    Back
                  </Button>
                </Flex>
              </Stack>
            </Box>
          </form>
        </div>

        {/* Skills Section */}
        <div>
          <Box
            display='none'
            position='absolute'
            top={['120%', '120%', '106%']}
            left={['50%', '50%', '64%', '61%', '800px']}
            ml={['-142px']}
            boxShadow='md'
            pt={['2', '10', '2', '2', '2']}
            pb={['0px', '0px', '0px', '0px', '0px']}
            width={['280px', '280px', '400px', '400px', '40%']}
            id='skill-box'
          >
            <FormLabel
              position='relative'
              top={['15px']}
              left={['10px', '10px', '10px', '10px', '15px']}
              fontFamily='ubuntu'
              fontSize={18}
              fontWeight='bold'
            >
              Skills
            </FormLabel>
            <Button
              color='white'
              style={{ backgroundColor: '#38B2AC' }}
              float='right'
              top={['-25px', '-25px', '-25px']}
              position='relative'
              onClick={addSkillsHandler}
              left={['-10px', '-10px', '-20px']}
            >
              Add
            </Button>
          </Box>

          <form onSubmit={handleAddSkills}>
            <Box
              position='absolute'
              textAlign='center'
              top={['110%', '120%', '-1%', '-1%', '35%']}
              left={['50%', '50%', '490px', '620px', '800px']}
              ml={['-140px']}
              botton={['10%']}
              boxShadow='md'
              pt={['2', '2', '2', '2', '2']}
              pb={['350px', '350px', '280px', '280px', '290px']}
              width={['280px', '280px', '300px', '300px', '300px']}
              id='skill-edit'
              display='none'
            >
              <Stack margin='auto' spacing={5} marginTop={5}>
                <Flex position='absolute' top={['4', '2']} left={['2']}>
                  <FormControl display='flex'>
                    <Select
                      onChange={(e) => {
                        onChangeHandler();
                        setSelectedLanguage1(e.target.value);
                      }}
                      height={['45px', '45px', '30px']}
                      value={selectedLanguage1}
                      className='select-group'
                      width={['145px', '40']}
                      placeholder='Language'
                    >
                      <option value='HTML'>HTML</option>
                      <option value='CSS'>CSS</option>
                      <option value='JavaScript'>JavaScript</option>
                      <option value='Python'>Python</option>
                      <option value='C/C++'>C/C++</option>
                      <option value='C#'>C#</option>
                      <option value='java'>Java</option>
                      <option value='PHP'>PHP</option>
                    </Select>
                    <Select
                      ml={['40px']}
                      onChange={(e) => setPercentageValue1(e.target.value)}
                      height={['45px', '45px', '30px']}
                      width={20}
                      value={percentageValue1}
                      placeholder='%'
                    >
                      <option value='10'>10%</option>
                      <option value='20'>20%</option>
                      <option value='30'>30%</option>
                      <option value='40'>40%</option>
                      <option value='50'>50%</option>
                      <option value='60'>60%</option>
                      <option value='70'>70%</option>
                      <option value='80'>80%</option>
                      <option value='90'>90%</option>
                      <option value='100'>100%</option>
                    </Select>
                  </FormControl>
                </Flex>

                <Flex position='absolute' top={['55px', '35px']} left={['2']}>
                  <FormControl display='flex'>
                    <Select
                      onChange={(e) => {
                        onChangeHandler();
                        setSelectedLanguage2(e.target.value);
                      }}
                      className='select-group'
                      height={['45px', '45px', '30px']}
                      width={['145px', '40']}
                      value={selectedLanguage2}
                      placeholder='Language'
                    >
                      <option value='HTML'>HTML</option>
                      <option value='CSS'>CSS</option>
                      <option value='JavaScript'>JavaScript</option>
                      <option value='Python'>Python</option>
                      <option value='C/C++'>C/C++</option>
                      <option value='C#'>C#</option>
                      <option value='java'>Java</option>
                      <option value='PHP'>PHP</option>
                    </Select>
                    <Select
                      ml={['40px']}
                      height={['45px', '45px', '30px']}
                      onChange={(e) => setPercentageValue2(e.target.value)}
                      width={20}
                      value={percentageValue2}
                      placeholder='%'
                    >
                      <option value='10'>10%</option>
                      <option value='20'>20%</option>
                      <option value='30'>30%</option>
                      <option value='40'>40%</option>
                      <option value='50'>50%</option>
                      <option value='60'>60%</option>
                      <option value='70'>70%</option>
                      <option value='80'>80%</option>
                      <option value='90'>90%</option>
                      <option value='100'>100%</option>
                    </Select>
                  </FormControl>
                </Flex>

                <Flex position='absolute' top={['115px', '85px']} left={['2']}>
                  <FormControl display='flex'>
                    <Select
                      onChange={(e) => {
                        onChangeHandler();
                        setSelectedLanguage3(e.target.value);
                      }}
                      height={['45px', '45px', '30px']}
                      className='select-group'
                      width={['145px', '40']}
                      value={selectedLanguage3}
                      placeholder='Language'
                    >
                      <option value='HTML'>HTML</option>
                      <option value='CSS'>CSS</option>
                      <option value='JavaScript'>JavaScript</option>
                      <option value='Python'>Python</option>
                      <option value='C/C++'>C/C++</option>
                      <option value='C#'>C#</option>
                      <option value='java'>Java</option>
                      <option value='PHP'>PHP</option>
                    </Select>
                    <Select
                      ml={['40px']}
                      height={['45px', '45px', '30px']}
                      onChange={(e) => setPercentageValue3(e.target.value)}
                      width={20}
                      value={percentageValue3}
                      placeholder='%'
                    >
                      <option value='10'>10%</option>
                      <option value='20'>20%</option>
                      <option value='30'>30%</option>
                      <option value='40'>40%</option>
                      <option value='50'>50%</option>
                      <option value='60'>60%</option>
                      <option value='70'>70%</option>
                      <option value='80'>80%</option>
                      <option value='90'>90%</option>
                      <option value='100'>100%</option>
                    </Select>
                  </FormControl>
                </Flex>

                <Flex position='absolute' top={['175px', '135px']} left={['2']}>
                  <FormControl display='flex'>
                    <Select
                      onChange={(e) => {
                        onChangeHandler();
                        setSelectedLanguage4(e.target.value);
                      }}
                      height={['45px', '45px', '30px']}
                      className='select-group'
                      width={['145px', '40']}
                      value={selectedLanguage4}
                      placeholder='Language'
                    >
                      <option value='HTML'>HTML</option>
                      <option value='CSS'>CSS</option>
                      <option value='JavaScript'>JavaScript</option>
                      <option value='Python'>Python</option>
                      <option value='C/C++'>C/C++</option>
                      <option value='C#'>C#</option>
                      <option value='java'>Java</option>
                      <option value='PHP'>PHP</option>
                    </Select>
                    <Select
                      ml={['40px']}
                      height={['45px', '45px', '30px']}
                      onChange={(e) => setPercentageValue4(e.target.value)}
                      width={20}
                      value={percentageValue4}
                      placeholder='%'
                    >
                      <option value='10'>10%</option>
                      <option value='20'>20%</option>
                      <option value='30'>30%</option>
                      <option value='40'>40%</option>
                      <option value='50'>50%</option>
                      <option value='60'>60%</option>
                      <option value='70'>70%</option>
                      <option value='80'>80%</option>
                      <option value='90'>90%</option>
                      <option value='100'>100%</option>
                    </Select>
                  </FormControl>
                </Flex>

                <Flex position='absolute' top={['235px', '185px']} left={['2']}>
                  <FormControl display='flex'>
                    <Select
                      onChange={(e) => {
                        onChangeHandler();
                        setSelectedLanguage5(e.target.value);
                        console.log(selectedLanguage1);
                      }}
                      height={['45px', '45px', '30px']}
                      className='select-group'
                      width={['145px', '40']}
                      value={selectedLanguage5}
                      placeholder='Language'
                    >
                      <option value='HTML'>HTML</option>
                      <option value='CSS'>CSS</option>
                      <option value='JavaScript'>JavaScript</option>
                      <option value='Python'>Python</option>
                      <option value='C/C++'>C/C++</option>
                      <option value='C#'>C#</option>
                      <option value='java'>Java</option>
                      <option value='PHP'>PHP</option>
                    </Select>
                    <Select
                      ml={['40px']}
                      onChange={(e) => setPercentageValue5(e.target.value)}
                      width={20}
                      height={['45px', '45px', '30px']}
                      value={percentageValue5}
                      placeholder='%'
                    >
                      <option value='10'>10%</option>
                      <option value='20'>20%</option>
                      <option value='30'>30%</option>
                      <option value='40'>40%</option>
                      <option value='50'>50%</option>
                      <option value='60'>60%</option>
                      <option value='70'>70%</option>
                      <option value='80'>80%</option>
                      <option value='90'>90%</option>
                      <option value='100'>100%</option>
                    </Select>
                  </FormControl>
                </Flex>

                <Flex position='absolute' top={['235px', '175px']} left={['2']}>
                  <FormControl>
                    <Button
                      type='submit'
                      color='white'
                      style={{ backgroundColor: '#38B2AC' }}
                      onClick={() => {
                        if (
                          selectedLanguage1 === '' &&
                          selectedLanguage2 === '' &&
                          selectedLanguage3 === '' &&
                          selectedLanguage4 === '' &&
                          selectedLanguage5 === '' &&
                          percentageValue1 === '' &&
                          percentageValue2 === '' &&
                          percentageValue3 === '' &&
                          percentageValue4 === '' &&
                          percentageValue5 === ''
                        ) {
                          toast({
                            title: 'Add Atleast one skill',
                            status: 'error',
                            isClosable: true
                          });
                        } else if (
                          selectedLanguage1 !== '' ||
                          selectedLanguage2 !== '' ||
                          selectedLanguage3 !== '' ||
                          selectedLanguage4 !== '' ||
                          selectedLanguage5 !== '' ||
                          percentageValue1 !== '' ||
                          percentageValue2 !== '' ||
                          percentageValue3 !== '' ||
                          percentageValue4 !== '' ||
                          percentageValue5 !== ''
                        ) {
                          selectedLanguage1 !== '' && percentageValue1 !== ''
                            ? (document.getElementById('language1').style.display = 'inline')
                            : (document.getElementById('language1').style.display = 'none');

                          selectedLanguage2 !== '' && percentageValue2 !== ''
                            ? (document.getElementById('language2').style.display = 'inline')
                            : (document.getElementById('language2').style.display = 'none');

                          selectedLanguage3 !== '' && percentageValue3 !== ''
                            ? (document.getElementById('language3').style.display = 'inline')
                            : (document.getElementById('language3').style.display = 'none');

                          selectedLanguage4 !== '' && percentageValue4 !== ''
                            ? (document.getElementById('language4').style.display = 'inline')
                            : (document.getElementById('language4').style.display = 'none');

                          selectedLanguage5 !== '' && percentageValue5 !== ''
                            ? (document.getElementById('language5').style.display = 'inline')
                            : (document.getElementById('language5').style.display = 'none');

                          toast({
                            title: 'Skills Added Successfully',
                            status: 'success',
                            isClosable: true
                          });
                          setSkills(true);
                        }
                      }}
                      position='absolute'
                      top='60px'
                    >
                      Save Changes
                    </Button>
                  </FormControl>

                  <Button
                    type='submit'
                    color='white'
                    style={{ backgroundColor: '#38B2AC' }}
                    onClick={skillEditHandler}
                    position='absolute'
                    top='60px'
                    left={40}
                  >
                    Back
                  </Button>
                </Flex>
              </Stack>
            </Box>
          </form>
          <div>
            <Box
              position='absolute'
              textAlign='center'
              top={['160%', '120%', '105%', '105%', '105%']}
              left={['50%', '50%', '490px', '620px', '800px']}
              ml={['-140px']}
              botton={['10%']}
              boxShadow='md'
              pt={['2', '2', '2', '2', '2']}
              pb={['10px', '10px', '10px', '15px', '10px']}
              width={['280px', '280px', '400px', '400px', '40%']}
              id='skills-details-box'
              verticalAlign='bottom'
              display='block'
            >
              <Flex display={['block']} id='language1'>
                <FormLabel
                  position='relative'
                  top={['5px', '5px', '2px']}
                  mb={['0', '0', '8px']}
                  left={4}
                  fontFamily='ubuntu'
                  fontWeight='bold'
                >
                  {/* {profile && profile.skills[0] ? profile.skills[0].skillname : 'language 1'} */}
                  {!(profile && profile.skills[0])
                    ? 'language 1'
                    : profile.skills[0].skillname === ''
                    ? 'language 1'
                    : profile.skills[0].skillname}
                </FormLabel>
                <Progress
                  mt={['15px', '-5px', '10px']}
                  ml={['4']}
                  size='sm'
                  colorScheme='teal'
                  // value={percentageValue1}
                  value={profile && profile.skills[0] ? profile.skills[0].percent : ''}
                  width={['90%', '90%', '90%', '90%', '95%']}
                ></Progress>
                <FormLabel
                  position='relative'
                  top={['-45px']}
                  left={['235px', '250px', '360px', '360px', '570px']}
                  fontFamily='ubuntu'
                  fontWeight='bold'
                  ml='-15px'
                >
                  {/* {profile && profile.skills[0] ? profile.skills[0].percent : '0'}% */}
                  {!(profile && profile.skills[0])
                    ? '0'
                    : profile.skills[0].skillname === ''
                    ? '0'
                    : profile.skills[0].percent}
                  %
                </FormLabel>
              </Flex>

              <Flex display={['block']} id='language2'>
                <FormLabel
                  position='relative'
                  top={['-10px', '-15px', '-10px']}
                  left={4}
                  fontFamily='ubuntu'
                  fontWeight='bold'
                >
                  {/* {profile && profile.skills[1] ? profile.skills[1].skillname : 'language 2'} */}
                  {!(profile && profile.skills[1])
                    ? 'language 2'
                    : profile.skills[1].skillname === ''
                    ? 'language 2'
                    : profile.skills[1].skillname}
                </FormLabel>
                <Progress
                  mt={['-10px', '-25px', '-10px']}
                  ml={4}
                  size='sm'
                  colorScheme='teal'
                  value={profile && profile.skills[1] ? profile.skills[1].percent : ''}
                  width={['90%', '90%', '90%', '90%', '95%']}
                ></Progress>
                <FormLabel
                  position='relative'
                  top={['-40px']}
                  left={['240px', '250px', '360px', '360px', '570px']}
                  fontFamily='ubuntu'
                  fontWeight='bold'
                  ml='-15px'
                >
                  {/* {profile && profile.skills[1] ? profile.skills[1].percent : ''} */}
                  {!(profile && profile.skills[1])
                    ? '0'
                    : profile.skills[1].skillname === ''
                    ? '0'
                    : profile.skills[1].percent}
                  %
                </FormLabel>
              </Flex>

              <Flex display={['block']} id='language3'>
                <FormLabel
                  position='relative'
                  top={['-10px']}
                  left={4}
                  fontFamily='ubuntu'
                  fontWeight='bold'
                >
                  {/* {profile && profile.skills[2] ? profile.skills[2].skillname : 'language 3'} */}
                  {!(profile && profile.skills[2])
                    ? 'language 3'
                    : profile.skills[2].skillname === ''
                    ? 'language 3'
                    : profile.skills[2].skillname}
                </FormLabel>
                <Progress
                  mt={['-10px', '-10px', '-10px']}
                  ml={4}
                  size='sm'
                  colorScheme='teal'
                  value={profile && profile.skills[2] ? profile.skills[2].percent : ''}
                  width={['90%', '90%', '90%', '90%', '95%']}
                ></Progress>
                <FormLabel
                  position='relative'
                  top={['-40px']}
                  left={['240px', '250px', '360px', '360px', '570px']}
                  fontFamily='ubuntu'
                  fontWeight='bold'
                  ml='-15px'
                >
                  {/* {profile && profile.skills[2] ? profile.skills[2].percent : ''} */}
                  {!(profile && profile.skills[2])
                    ? '0'
                    : profile.skills[2].skillname === ''
                    ? '0'
                    : profile.skills[2].percent}
                  %
                </FormLabel>
              </Flex>

              <Flex display={['block']} id='language4'>
                <FormLabel
                  position='relative'
                  top={['-10px']}
                  left={4}
                  fontFamily='ubuntu'
                  fontWeight='bold'
                >
                  {/* {profile && profile.skills[3] ? profile.skills[3].skillname : 'language 4'} */}
                  {!(profile && profile.skills[3])
                    ? 'language 4'
                    : profile.skills[3].skillname === ''
                    ? 'language 4'
                    : profile.skills[3].skillname}
                </FormLabel>
                <Progress
                  mt={['-10px', '-10px', '-10px']}
                  ml={4}
                  size='sm'
                  colorScheme='teal'
                  value={profile && profile.skills[3] ? profile.skills[3].percent : ''}
                  width={['90%', '90%', '90%', '90%', '95%']}
                ></Progress>
                <FormLabel
                  position='relative'
                  top={['-40px']}
                  left={['240px', '250px', '360px', '360px', '570px']}
                  fontFamily='ubuntu'
                  fontWeight='bold'
                  ml='-15px'
                >
                  {/* {profile && profile.skills[3] ? profile.skills[3].percent : ''} */}
                  {!(profile && profile.skills[3])
                    ? '0'
                    : profile.skills[3].skillname === ''
                    ? '0'
                    : profile.skills[3].percent}
                  %
                </FormLabel>
              </Flex>

              <Flex display={['block']} id='language5'>
                <FormLabel
                  position='relative'
                  top={['-10px']}
                  left={4}
                  fontFamily='ubuntu'
                  fontWeight='bold'
                >
                  {/* {profile && profile.skills[4] ? profile.skills[4].skillname : 'language 5'} */}
                  {!(profile && profile.skills[4])
                    ? 'language 5'
                    : profile.skills[4].skillname === ''
                    ? 'language 5'
                    : profile.skills[4].skillname}
                </FormLabel>
                <Progress
                  mt={['-10px', '-10px', '-10px']}
                  size='sm'
                  ml={4}
                  colorScheme='teal'
                  value={profile && profile.skills[4] ? profile.skills[4].percent : ''}
                  //value={!(profile && profile.skills[4]) ? '' : profile.skills[4].percent === '' ? null : profile.skills[4].percent}
                  width={['90%', '90%', '90%', '90%', '95%']}
                ></Progress>
                <FormLabel
                  position='relative'
                  top={['-40px']}
                  left={['240px', '250px', '360px', '360px', '570px']}
                  fontFamily='ubuntu'
                  fontWeight='bold'
                  ml='-15px'
                >
                  {/* {profile && profile.skills[4] ? profile.skills[4].skillname : ''} */}
                  {!(profile && profile.skills[4])
                    ? '0'
                    : profile.skills[4].skillname === ''
                    ? '0'
                    : profile.skills[4].percent}
                  %
                </FormLabel>
              </Flex>

              <Button
                p='10px 20px 10px 20px'
                style={{ background: '#38B2AC' }}
                color='white'
                position='relative'
                top={['-10px']}
                left={['95px', '95px', '150px', '150px', '250px']}
                onClick={addSkillsHandler}
              >
                Edit
              </Button>
            </Box>
          </div>
        </div>
      </Flex>
    </div>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  addGeneral: PropTypes.func.isRequired,
  addSocial: PropTypes.func.isRequired,
  addSkills: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, addGeneral, addSocial, addSkills })(
  Dashboard
);
