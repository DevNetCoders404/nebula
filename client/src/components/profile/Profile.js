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
import React, { useEffect } from 'react';
import SkillsList from './SkillsList';
import SocialMediaList from './SocialMediaList';
import Navbar from '../layout/Navbar';
import Dashboard from '../dashboard/Dashboard';
import { getProfileById, follow, unfollow } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Profile({ getProfileById, auth: { user }, profile: { other_user }, match }) {
  useEffect(() => {
    getProfileById(match.params.user);
  }, [getProfileById, match.params.user, other_user]);

  const logged_user = user && user._id;
  const visit_user = other_user && other_user.user._id;
  const f = other_user && other_user.followers;
  const currentFollow = () => f && f.map((follow) => (follow.user === logged_user ? 'unfollow' : ''));
  const currentFollowStr = currentFollow();

  if (logged_user === visit_user) {
    return <Dashboard />;
  }
  return (
    <div>
      <Navbar />
      <Grid
        h='200px'
        templateColumns='repeat(5, 1fr)'
        marginTop='10%'
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
              src={other_user && other_user.user.avatar}
              borderRadius='full'
              boxSize='150px'
              marginTop='30px'
            ></Image>
          </Center>
          <Text color='white' marginLeft='40px' marginTop='40px' fontSize='18px'>
            Skills
            <SkillsList user={match.params.user} />
          </Text>

          <Text color='white' marginLeft='40px' marginTop='40px' fontSize='18px'>
            Social Media
            <SocialMediaList user={match.params.user} />
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
            {other_user && other_user.user.name}
          </Heading>
          <Box marginTop='-40px' display='flex' justifyContent='flex-end' marginRight='10px'>
            <Button
              padding='10px 50px 10px 50px'
              borderRadius='full'
              display='inline-flex'
              style={{ backgroundColor: '#38B2AC' }}
              onClick={currentFollowStr && currentFollowStr.includes('unfollow') ? unfollow(visit_user) : follow(visit_user)}
              marginLeft='15%'
              color='white'
            >
              {currentFollowStr && currentFollowStr.includes('unfollow') ? "unfollow" : "follow"}
            </Button>
          </Box>
          <Text color='#38B2AC' fontSize='18px' marginTop='10px' marginLeft='5%'>
            {other_user && other_user.status}
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
                    {other_user && other_user.user.username}
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
                    {other_user && other_user.user.name}
                  </Text>
                </Text>
                <br></br>

                <Text fontWeight='bold' display='inline-flex' marginTop='10px'>
                  Email
                  <Text fontWeight='normal' marginLeft='95px' color='#38B2AC' id='userId'>
                    {other_user && other_user.user.email}
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
                    {other_user && other_user.status}
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
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(Profile);
