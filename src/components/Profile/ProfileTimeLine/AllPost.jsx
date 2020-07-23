import React from 'react';
import { connect } from 'react-redux'
import { getPostsById } from '../../../actions/post'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import SinglePost from './SinglePost';
import Loading from '../../Loading'


function AllPost({ getPostsById, match, posts,user }) {

    let id = useParams().id
    useEffect(() => {
        getPostsById(id);

    }, [window.location.href])


    return (
        <>
            {
                posts ? posts.map(post => (
                    <SinglePost post={post} user={user}></SinglePost>
                ))
                    : <Loading></Loading>
            }
        </>
    );
}
const mapStateToProps = (state) => ({
    posts: state.post.posts,
    user: state.auth.user
})
export default connect(mapStateToProps, { getPostsById })(AllPost);