import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // assuming you're using react-router-dom

const Login = () => {
    const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isFormComplete = () => {
    const { email, password } = formData;
    return email && password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete()) {
      // Here you would handle login logic
      console.log("User logged in:", formData);
      // After login, redirect to dashboard
      useNavigate.push('/dashboard');
    }
  };

  return (
    <LoginWrapper>
      <Logo>
        <img src="/Point-logo.png" alt="Point the Way Logo" />
      </Logo>
      <Form onSubmit={handleSubmit}>
        <Input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          value={formData.email} 
          onChange={handleInputChange} 
          required 
        />
        <Input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleInputChange} 
          required 
        />
        <ForgotPasswordLink>
          <a href="#">Forgot Password?</a>
        </ForgotPasswordLink>
        <LoginButton 
          type="submit" 
          disabled={!isFormComplete()}
        >
          Login
        </LoginButton>
      </Form>
      <Divider>Or login with:</Divider>
      <OAuthContainer>
        <GoogleButton>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
        </GoogleButton>
      </OAuthContainer>
      <SignupLink>
        Don’t have an account? <a href="/signup">Sign Up</a>
      </SignupLink>
    </LoginWrapper>
  );
};

export default Login;

// Styled components
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Logo = styled.div`
  img {
    max-width: 180px;
    border-radius: 30px;
    margin-bottom: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin: 0.5rem 0;
  font-size: 1rem;
`;

const ForgotPasswordLink = styled.div`
  margin: 0.5rem 0;
  text-align: right;

  a {
    color: #007bff;
    text-decoration: none;
    font-size: 0.9rem;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  padding: 1rem;
  background-color: ${(props) => (props.disabled ? '#ccc' : '#007bff')};
  color: white;
  border: none;
  border-radius: 5px;
  margin: 1rem 0;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : '#0056b3')};
    transform: ${(props) => (!props.disabled ? 'scale(1.02)' : 'none')};
  }
`;

const Divider = styled.div`
  margin: 2rem 0;
  text-align: center;
  font-size: 0.9rem;
`;

const OAuthContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const GoogleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 30px;
  }
`;

const SignupLink = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  
  a {
    color: #007bff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
`;
