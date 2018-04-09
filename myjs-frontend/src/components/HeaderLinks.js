/**
 * Created by andrew on 11/03/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import * as BS from "react-bootstrap";
import read from '../utils/readProp';


export class HeaderLinks extends React.Component {

  signOut(evt, key) {
    this.props.dispatch(signOut());
  }

  render() {

    let buttonSet = null;
    const condition = 0;
    
    switch (condition) {
      case 0:
        buttonSet = (<LinkContainer to="/register">
          <BS.NavItem>Register</BS.NavItem>
        </LinkContainer>);
        break;
      case 1:
        buttonSet = (<LinkContainer to="/signin">
          <BS.NavItem>Log In</BS.NavItem>
        </LinkContainer>);
        break;
      case 2:
        buttonSet = (<BS.NavItem onClick={this.signOut.bind(this)} eventKey="2">Sign Out</BS.NavItem>);
        break;
    }

    return (
      <BS.Nav pullRight={true}>
        { buttonSet }
      </BS.Nav>
    );
  }
}

export default HeaderLinks;