import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import {
  LoginFormHeaderStyled,
  LoginFormStyled,
  LoginFormErrorText,
} from './login.styled';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText: null,
    };
    this.userNameRef = React.createRef();
    this.passwordRef = React.createRef();
  }
  navigateToHome = () => {
    if (
      this.userNameRef.current.value.length === 0 ||
      this.userNameRef.current.value.length === 0
    ) {
      this.setState({ errorText: 'Username/Password can not be left empty!' });
      return;
    }
    this.props.history.push({
      pathname: '/home',
      state: { userLoggedIn: true },
    });
  };
  render() {
    const { errorText } = this.state;
    return (
      <>
        <LoginFormHeaderStyled>Notes Login</LoginFormHeaderStyled>
        <LoginFormStyled>
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Username'
              aria-label='Username'
              aria-describedby='basic-addon1'
              ref={this.userNameRef}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Password'
              aria-label='Password'
              aria-describedby='basic-addon1'
              ref={this.passwordRef}
            />
          </InputGroup>
          <Button variant='primary' onClick={this.navigateToHome}>
            Login
          </Button>
        </LoginFormStyled>
        {errorText && <LoginFormErrorText>{errorText}</LoginFormErrorText>}
      </>
    );
  }
}

export default Login;
