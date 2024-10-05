import React, { useState } from 'react';
import styled from 'styled-components';
import zxcvbn from 'zxcvbn';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

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
  const [buttonClicked, setButtonClicked] = useState(false); // State to track button click for microanimation
  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (name === 'password') setPasswordTouched(true);
    if (name === 'confirmPassword') setConfirmPasswordTouched(true);
  };

  const isFormComplete = () => {
    const { username, email, password, confirmPassword, city, acceptedTerms } = formData;
    return username && email && password && confirmPassword && city && password === confirmPassword && acceptedTerms;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete()) {
      // Trigger the button microanimation
      setButtonClicked(true);

      // Redirect to dashboard after a slight delay to let the animation complete
      setTimeout(() => {
        console.log("User created:", formData);
        navigate('/dashboard'); // Redirect to the dashboard path
      }, 300); // Delay in milliseconds to sync with the button animation
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
          onFocus={() => setPasswordTouched(true)} // Track when the user starts typing
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
          onBlur={() => setConfirmPasswordTouched(true)} // Check after the user finishes typing
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
          clicked={buttonClicked.toString()} // Pass button click state to the styled component
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
        Already a Point the Way user? <Link to="/login">Sign In</Link>
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
`;

const StrengthMessage = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: ${({ strength }) => (strength < 2 ? 'red' : strength < 4 ? 'orange' : 'green')};
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
  }

  &:active {
    transform: ${(props) => (!props.disabled && props.clicked === 'true' ? 'scale(0.98)' : 'none')};
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
