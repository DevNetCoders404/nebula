import Post from '../feed/Post';
import Profile from '../feed/Profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post';
import { useEffect } from 'react';
import Navbar from '../layout/Navbar';
import Loader from '../layout/Loader';
import Comment from './Comment';
import CommentForm from './CommentForm';
import ReloadButton from '../layout/ReloadButton';

const PostThread = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return (
    <>
      <Navbar />
      {loading || post === null ? (
        <Loader />
      ) : (
        <>
          <Profile />
          <ReloadButton getMethod={getPost} loading={loading} postId={match.params.id} />
          <Post post={post} />
          <CommentForm postId={post._id} />
          {post.comments.map((comment) => (
            <Comment key={comment._id} postId={post._id} comment={comment} />
          ))}
        </>
      )}
    </>
  );
};

PostThread.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(PostThread);
