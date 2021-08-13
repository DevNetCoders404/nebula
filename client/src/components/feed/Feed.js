import React, { useEffect } from 'react';
import Navbar from '../layout/Navbar';
import Post from './Post';
import Profile from './Profile';
import Loader from '../layout/Loader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';
import { Box } from '@chakra-ui/react';
import ReloadButton from '../layout/ReloadButton';

function Feed({ getPosts, post: { posts, loading } }) {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Loader />
  ) : (
    <Box>
      <Navbar />
      <Profile />
      <ReloadButton getMethod={getPosts} loading={loading} />
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Box>
  );
}

Feed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Feed);
