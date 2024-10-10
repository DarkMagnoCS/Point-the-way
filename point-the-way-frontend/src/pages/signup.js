import React, { useState } from 'react';
import styled from 'styled-components';
import zxcvbn from 'zxcvbn';
import mapboxgl from 'mapbox-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    acceptedTerms: false
  });

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (name === 'password') setPasswordTouched(true);
    if (name === 'confirmPassword') setConfirmPasswordTouched(true);

    if (name === 'city') {
      fetchCitySuggestions(value);
    }
  };

  const fetchCitySuggestions = async (input) => {
    if (input.length > 2) {
      const accessToken = 'placeholder'; // Replace with your Mapbox access token
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${accessToken}&autocomplete=true&types=place`);
      const data = await response.json();
      const citySuggestions = data.features.map((feature) => feature.place_name);
      setSuggestions(citySuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const isFormComplete = () => {
    const { username, email, password, confirmPassword, city, acceptedTerms } = formData;
    return username && email && password && confirmPassword && city && password === confirmPassword && acceptedTerms;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete()) {
      // Submit form data to the database here.
      console.log("User created:", formData);
    }
  };

  const getPasswordStrength = () => {
    const { password } = formData;
    const result = zxcvbn(password);
    return result.score;
  };

  const validatePassword = () => {
    const { password } = formData;
    if (password.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
    if (!/\d/.test(password)) return "Password must contain at least one number.";
    return null;
  };

  const passwordsMatch = formData.password === formData.confirmPassword;

  return (
    <SignupWrapper>
      <Logo>
        <img src="/Point-logo.png" alt="Point the Way Logo" />
      </Logo>
      <Form onSubmit={handleSubmit}>
        <Input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={formData.username} 
          onChange={handleInputChange} 
          required 
          autoComplete="off"
        />
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
        {passwordTouched && validatePassword() && (
          <ErrorMessage>{validatePassword()}</ErrorMessage>
        )}
        {passwordTouched && (
          <StrengthMessage>
            Password Strength: {["Too Weak", "Weak", "Fair", "Strong", "Very Strong"][getPasswordStrength()]}
          </StrengthMessage>
        )}
        <Input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          value={formData.confirmPassword} 
          onChange={handleInputChange} 
          required 
          onBlur={() => setConfirmPasswordTouched(true)} 
        />
        {confirmPasswordTouched && !passwordsMatch && (
          <ErrorMessage>Passwords do not match.</ErrorMessage>
        )}
        
        <Input 
          type="text" 
          name="city" 
          placeholder="Home City" 
          value={formData.city} 
          onChange={handleInputChange} 
          required 
        />
        <SuggestionBox>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem key={index} onClick={() => setFormData({ ...formData, city: suggestion })}>
              {suggestion}
            </SuggestionItem>
          ))}
        </SuggestionBox>

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
        <AlreadyHaveAccount>
  Already have an account? <Link to="/login">Login here</Link>
</AlreadyHaveAccount>
      </Form>
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
`;

const StrengthMessage = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: ${({ strength }) => (strength < 2 ? 'red' : strength < 4 ? 'orange' : 'green')};
`;

const SuggestionBox = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
`;

const SuggestionItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
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

const AlreadyHaveAccount = styled.div`
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