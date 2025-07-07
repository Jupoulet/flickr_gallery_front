import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios'

import Home from './pages/Home.jsx';
import Folder from './pages/Folder.jsx';
import SideNavBar from './components/SideNavBar.jsx';
import Gallery from './pages/Gallery.jsx';
import Login from './pages/Login.jsx';
import Background from './components/background/Background.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GlobalStyle from './globalStyle';
import { Container } from 'react-bootstrap';
import endpoints from './config/endpoints'
import credentials from './config/credentials'
import Photo from './pages/Photo.jsx';
import { verifyToken } from './controllers/auth'

const { BASE_URL, BASE_API } = endpoints;
const { PASSWORD } = credentials;

const Wrapper = styled.div`
  ${props => props.isGallery ? '' : `
    margin-left: 60px;
    width: calc(100% - 60px);
    padding: 0 1em;
  `}
`

const App = () => {
  console.log('PASSWORD', PASSWORD);
  console.log('BASE_API', BASE_API);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isStillLogin = async (id) => {
      let result = await axios.get(`${BASE_API}/flickr/verify_login/${window.localStorage.getItem('flickrId')}`)
      if (!result.data) {
        window.localStorage.removeItem('flickrId')
        window.location.href = `${BASE_URL}/login`
      }
    } 
    if (/userId/.test(location.search)) {
      window.localStorage.setItem('flickrId', location.search.split('&').find(str => /userId/.test(str)).split('=')[1])
    }
    else if (/admin/.test(location.pathname) && window.localStorage.getItem('flickrId')) {
      isStillLogin(window.localStorage.getItem('flickrId'))
    }
  }, [location])

  const isTokenValid = () => {
    let localToken = window.localStorage.getItem('user_token')
    if (!localToken) { return false }
    let payload = verifyToken(localToken)
    if (!payload) { return false }
    else if (payload.password === PASSWORD) { return true }
    return false
  }

  console.log('isTokenValid', isTokenValid());

  return (
    <>
      <GlobalStyle />
      <Wrapper isGallery={/gallery/.test(location.pathname)}>
        <Routes>
          <Route path="/" element={
              isTokenValid() ? 
              <Home template="user" /> : 
              <Navigate to="/login" state={{ user: true }} replace />
          } />
          <Route path="/admin" element={
            (window.localStorage.getItem('flickrId') || /userId/.test(location.search)) ?
            <Home template="admin" /> :
            <Navigate to="/login" state={{ user: false }} replace />
          } />
          <Route path="/folder/:id" element={
              isTokenValid() ?
              <Folder template="user" /> :
              <Navigate to="/login" state={{ user: true }} replace />
          } />
          <Route path="/admin/folder/:id" element={
            window.localStorage.getItem('flickrId') ?
            <Folder template="admin" /> :
            <Navigate to="/login" state={{ user: false }} replace />
          } />
          <Route path="/admin/photo/:id" element={
            window.localStorage.getItem('flickrId') ?
            <Photo /> :
            <Navigate to="/login" state={{ user: false }} replace />
          } />
          <Route path="/gallery/:folderId" element={
             isTokenValid() ?
             <Gallery /> :
             <Navigate to="/login" state={{ user: true }} replace />
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Wrapper>
    </>
  )
}

export default App;
