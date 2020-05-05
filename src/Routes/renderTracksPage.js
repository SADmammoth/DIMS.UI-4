import React from 'react';
import { Redirect } from 'react-router-dom';
import MemberTracksPage from '../pages/MemberTracksPage';

const renderTracksPage = ({ match }, userId) => {
  return match.params.id !== userId ? <Redirect to='/404' /> : <MemberTracksPage />;
};

export default renderTracksPage;
