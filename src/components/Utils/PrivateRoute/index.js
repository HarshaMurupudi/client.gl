import React from 'react';
import { connect } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated, loading, ...props }) => {
  let location = useLocation();

  return isAuthenticated ? (
    children
  ) : !loading ? (
    <Navigate to={'/login'} state={{ from: location.pathname }} />
  ) : (
    <div></div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(['user', 'isAuthenticated']),
  loading: state.getIn(['user', 'loading'])
});

export default connect(mapStateToProps)(PrivateRoute);
