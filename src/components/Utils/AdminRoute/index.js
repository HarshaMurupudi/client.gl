import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children, loading, user }) => {
  if (loading) {
    return <div></div>;
  } else {
    return user && user.LoginGroupID === 1 ? children : <Navigate to="/contracts" />;
  }
};

const mapStateToProps = (state) => ({
  loading: state.getIn(['user', 'loading']),
  user: state.getIn(['user', 'user'])
});

export default connect(mapStateToProps)(AdminRoute);
