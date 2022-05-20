import {
  Center,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  Flex,
  Box,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SkillsPopOver from './SkillsPopOver';
import SocialMediaPopOver from './SocialMediaPopOver';
import NamePopOver from './NamePopOver';
import StatusPopOver from './StatusPopOver';
import Navbar from '../layout/Navbar';
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Dashboard({ getCurrentProfile, auth: { user }, profile: { profile } }) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const followEdit = true;
  const [display, setDisplay] = useState('none');
  const displayHandler = () => {
    if (display === 'none') {
      setDisplay('inline');
    } else {
      setDisplay('none');
    }
  };
  return (
    <div>
      <Navbar />
      <Grid
        h='100%'
        templateColumns='repeat(5, 1fr)'
        marginTop='10%'
        marginBottom='5%'
        marginLeft={{ md: '5%', lg: '15%', xl: '25%', '2xl': '25%', '3xl': '25%' }}
      >
        <GridItem
          rowSpan={2}
          colSpan={1}
          bg='#38B2AC'
          marginLeft={{ '3xl': '45%' }}
          width={{ md: '100%', lg: '100%', xl: '100%', '2xl': '100%', '3xl': '55%' }}
          paddingBottom='110px'
          borderLeftRadius='50px'
          boxShadow='lg'
        >
          <Center>
            <Image
              src={user && user.avatar}
              borderRadius='full'
              boxSize='150px'
              marginTop='30px'
            ></Image>
          </Center>
          <Text color='white' marginLeft='40px' marginTop='40px' fontSize='18px'>
            Skills
            <SkillsPopOver display={display} />
          </Text>

          <Text color='white' marginLeft='40px' marginTop='40px' fontSize='18px'>
            Social Media
            <SocialMediaPopOver display={display} />
          </Text>
        </GridItem>
        <GridItem
          colSpan={4}
          rowSpan={6}
          width='550px'
          paddingBottom='50px'
          borderRightRadius='50px'
          boxShadow='lg'
        >
          <Heading marginTop='6%' marginLeft='5%'>
            {user && user.name}
          </Heading>
          <Box marginTop='-40px' display='flex' justifyContent='flex-end' marginRight='10px'>
            <Button
              padding='10px 50px 10px 50px'
              borderRadius='full'
              display='inline-flex'
              style={{ backgroundColor: '#38B2AC' }}
              onClick={() => {
                if (followEdit === true) {
                  displayHandler();
                }
              }}
              marginLeft='15%'
              color='white'
            >
              Edit Profile
            </Button>
          </Box>
          <Text color='#38B2AC' fontSize='18px' marginTop='10px' marginLeft='5%'>
            {profile && profile.status}
          </Text>

          <Box marginTop='10px' marginLeft='5%'>
            <Flex display='inline-flex'>
              <Text>300</Text>
              <Text marginLeft='10px' fontWeight='bold'>
                Posts
              </Text>
            </Flex>

            <Flex display='inline-flex'>
              <Text marginLeft='10px'>300</Text>
              <Text marginLeft='10px' fontWeight='bold'>
                Followers
              </Text>
            </Flex>

            <Flex display='inline-flex'>
              <Text marginLeft='10px'>100</Text>
              <Text marginLeft='10px' fontWeight='bold'>
                Following
              </Text>
            </Flex>
          </Box>

          <Tabs variant='unstyled' width='100%' colorScheme='teal' marginTop='20px' marginLeft='5%'>
            <TabList>
              <Tab
                _focus={{ outline: 'none' }}
                _selected={{ borderBottom: '2px solid teal', color: '#38B2AC' }}
              >
                About
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text fontWeight='bold' display='inline-flex'>
                  Username
                  <Text fontWeight='normal' marginLeft='80px' color='#38B2AC' id='userId'>
                    {user && user.username}
                  </Text>
                </Text>
                <br></br>

                <Text fontWeight='bold' display='inline-flex' marginTop='10px'>
                  Name
                  <Text
                    fontWeight='normal'
                    marginLeft='90px'
                    color='#38B2AC'
                    id='userId'
                    display='inline-flex'
                  >
                    {user && user.name}
                    <NamePopOver name={name} setName={setName} display={display} />
                  </Text>
                </Text>
                <br></br>

                <Text fontWeight='bold' display='inline-flex' marginTop='10px'>
                  Email
                  <Text fontWeight='normal' marginLeft='95px' color='#38B2AC' id='userId'>
                    {user && user.email}
                  </Text>
                </Text>
                <br></br>

                <Text fontWeight='bold' display='inline-flex' marginTop='10px'>
                  Status
                  <Text
                    fontWeight='normal'
                    marginLeft='90px'
                    color='#38B2AC'
                    id='userId'
                    display='inline-flex'
                  >
                    {profile && profile.status}
                    <StatusPopOver status={status} setStatus={setStatus} display={display} />
                  </Text>
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </div>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
