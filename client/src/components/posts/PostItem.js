import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({auth, post: _id, text, name, avatar, user, likes, comments, date}) => {
    return (
        <Fragment>
            <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img className="round-img" src={avatar} alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            <button type="button" onClick={(e) => addLike(_id)} className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>
              {likes.length && (<span>{likes.length}</span>) }
            </button>
            <button type="button" onClick={(e) => removeLike(_id)} className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-primary">
              Discussion {comments.length && (<span className='comment-count'>{comments.length}</span>) }
            </Link>
            {!auth.loading && user === auth.user_id && (
                <button type="button"  onClick={(e) => deletePost(_id)} className="btn btn-danger">
                <i className="fas fa-times"></i>
              </button>
            ) }
            
          </div>
        </div>
        </Fragment>
    )
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired,
    addLike : PropTypes.func.isRequired,
    removeLike : PropTypes.func.isRequired,
    deletePost : PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)
