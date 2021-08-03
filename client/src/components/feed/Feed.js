import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import Post from './Post';
import Profile from './Profile';
import Loader from '../layout/Loader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/post';

function Feed({ getPosts, post: { posts, loading } }) {
  useEffect(() => {
    getPosts();
    console.log(posts);
  }, [getPosts]);
  // const [value, setValue] = useState(null);
  // useEffect(() => {
  //   fetch('http://localhost:8000/post')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setValue(data);
  //     });
  // }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className='feed'>
      <Navbar />
      <Profile />
      {/* value && <Post value={value} /> */}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
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
