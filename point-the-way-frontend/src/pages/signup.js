import React, { useState } from 'react';
import styled from 'styled-components';
import logoImage from './images/Point-logo.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    acceptedTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const isFormComplete = () => {
    const { email, password, confirmPassword, city, acceptedTerms } = formData;
    return email && password && confirmPassword && city && password === confirmPassword && acceptedTerms;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete()) {
      // Submit form data to database here.
      console.log("User created:", formData);
    }
  };

  return (
    <SignupWrapper>
      <Logo>
        <img src={logoImage} alt="Point the Way Logo" />
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
        <Input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          value={formData.confirmPassword} 
          onChange={handleInputChange} 
          required 
        />
        <Input 
          type="text" 
          name="city" 
          placeholder="Home City" 
          value={formData.city} 
          onChange={handleInputChange} 
          list="city-options" 
          required 
        />
        <datalist id="city-options">
          <option value="New York" />
          <option value="London" />
          <option value="Paris" />
          <option value="Tokyo" />
          <option value="Sydney" />
        </datalist>
        <CheckboxWrapper>
          <input 
            type="checkbox" 
            name="acceptedTerms" 
            checked={formData.acceptedTerms} 
            onChange={handleInputChange} 
            required 
          />
          <label>I accept the <Link href="#">User Agreement</Link> and have read the <Link href="#">Privacy Statement</Link>.</label>
        </CheckboxWrapper>
        <CreateAccountButton 
          type="submit" 
          disabled={!isFormComplete()} 
        >
          Create Account
        </CreateAccountButton>
      </Form>
      <Divider>Or create an account with:</Divider>
      <OAuthContainer>
        <GoogleButton>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
        </GoogleButton>
      </OAuthContainer>
      <SignInLink>
        Already a TripIt user? <Link to="/login">Sign In</Link>
      </SignInLink>
    </SignupWrapper>
  );
};

export default Signup;

// Styled components
const SignupWrapper = styled.div`
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

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  label {
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }

  input {
    width: 20px;
    height: 20px;
  }
`;

const CreateAccountButton = styled.button`
  padding: 1rem;
  background-color: ${props => (props.disabled ? '#ccc' : '#007bff')};
  color: white;
  border: none;
  border-radius: 5px;
  margin: 1rem 0;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#0056b3')};
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

const SignInLink = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  a {
    color: #007bff;
    text-decoration: none;
  }
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
