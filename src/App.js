import React, { useState, useEffect } from 'react';
import {
  withRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios'

import Home from './pages/Home';
import Folder from './pages/Folder';
import SideNavBar from './components/SideNavBar';
import Gallery from './pages/Gallery';
import Login from './pages/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GlobalStyle from './globalStyle';
import { Container } from 'react-bootstrap';
import endpoints from './config/endpoints'
import Photo from './pages/Photo';

const { BASE_URL, BASE_API } = endpoints;

const Wrapper = styled.div`
  ${props => props.isGallery ? '' : `
    margin-left: 60px;
    width: calc(100% - 60px);
    padding: 0 1em;
  `}
`


const App = ({ location, match, history }) => {
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
  return (
    <>
      <GlobalStyle />
      <>
          <Switch>
            <>
              <SideNavBar />
              <Wrapper isGallery={/gallery/.test(location.pathname)}>
                    <Route exact path="/"  render={() => <Home template="user" /> } />
                    <Route exact path="/admin" render={() => {
                      console.log('LOCATION', location)
                      if (window.localStorage.getItem('flickrId') || /userId/.test(location.search)) {
                        return <Home template="admin" />
                      } else {
                        return <Redirect to="/login" />
                      }
                    } } />
                    <Route exact path="/folder/:id" render={() => <Folder template="user" /> } />
                    <Route exact path="/admin/folder/:id" render={() => {
                      if (window.localStorage.getItem('flickrId')) {
                        return <Folder template="admin" />
                      } else {
                        return <Redirect to="/login" />
                      }
                    } } />
                    <Route exact path="/admin/photo/:id" render={() => {
                      if (window.localStorage.getItem('flickrId')) {
                        return <Photo />
                      } else {
                        return <Redirect to="/login" />
                      }
                    } } />
                    <Route exact path="/gallery/:folderId" render={() => <Gallery /> } />
                    <Route exact path="/login" render={() => <Login /> } />
              </Wrapper>
            </>
          </Switch>
      </>
    </>
  )
}

export default withRouter(App);
