import React, { useState } from 'react';
import facebooklogo from '../../assets/facebook.png';
import googlelogo from '../../assets/google.png';
import linkedinlogo from '../../assets/linkedin.png';
import CustomTextField from '@/components/customtextfield';
import { EnvelopeSimple, Image, Lock, Phone, User, WarningCircle } from 'phosphor-react';
import { useRouter } from 'next/router';
import ImageC from 'next/image';
import { signIn } from 'next-auth/react';
import { CircleLoader } from 'react-spinners';
import createAxiosInstance from '@/axiosConfig';
import { UserModel } from '../api/auth/[...nextauth]';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
}
interface FormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  image: File | null | undefined; // Change to accept File or null
}

interface ValidationMessages {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  image: string;
}

export const SignupPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const axiosInstance = createAxiosInstance(router);

  const [formdata, setFormdata] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    image: null, // Initialize image as null
  });

  const [validationMessages, setValidationMessages] = useState<ValidationMessages>({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;

    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const selectedFile = fileInput.files?.[0]; // Get the selected file
  
      setFormdata({
        ...formdata,
        [name]: selectedFile, // Update formdata with the selected file
      });
  
      // Clear validation message when the user selects a file
      setValidationMessages({
        ...validationMessages,
        [name]: '', // Clear the validation message for the file input
      });
    } else {
      const value = e.target.value;
      setFormdata({
        ...formdata,
        [name]: value,
      });

      // Trigger corresponding validation function based on the field
      if (name === 'email') {
        validateEmail(value);
      } else if (name === 'phoneNumber') {
        validatePhoneNumber(value);
      } else if (name === 'password') {
        validatePassword(value);
      }
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target as HTMLInputElement;
    const selectedFile = fileInput.files?.[0]; // Get the selected file

    setFormdata({
      ...formdata,
      image: selectedFile, // Update formdata with the selected file
    });

    // Clear validation message when the user selects a file
    setValidationMessages({
      ...validationMessages,
      image: '',
    });
  };

  const validateEmail = (email: string) => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setValidationMessages({
        ...validationMessages,
        email: 'Invalid email address',
      });
    } else {
      setValidationMessages({
        ...validationMessages,
        email: '',
      });
    }
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      setValidationMessages({
        ...validationMessages,
        phoneNumber: 'Invalid phone number',
      });
    } else {
      setValidationMessages({
        ...validationMessages,
        phoneNumber: '',
      });
    }
  };

  const validatePassword = (password: string) => {
    if (!password || password.length < 6) {
      setValidationMessages({
        ...validationMessages,
        password: 'Password must be at least 6 characters',
      });
    } else {
      setValidationMessages({
        ...validationMessages,
        password: '',
      });
    }
  };

  const validateImage = (image: File | null) => {
    if (!image) {
      setValidationMessages({
        ...validationMessages,
        image: 'Image is required',
      });
    } else {
      setValidationMessages({
        ...validationMessages,
        image: '',
      });
    }
  };

  const handleSignUpSuccess = async (user: UserModel, token: string) => {
    await signIn("credentials", {
      redirect: true,
      callbackUrl: "/dashboard",
      ...user,
      jwt: token,
    });
    router.push("/dashboard");
  };

  const handleSignUpError = (error: { message: string }) => {
    console.log(`Sign Up error: ${error.message}`);
    setError(error.message);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validate fields before making the request
    validateEmail(formdata.email);
    validatePhoneNumber(formdata.phoneNumber);
    validatePassword(formdata.password);
    validateImage(formdata.image!);

    // Check if any validation message exists
    if (Object.values(validationMessages).some((message) => message !== '')) {
      // Validation failed, return early
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', formdata.name);
      formData.append('email', formdata.email);
      formData.append('password', formdata.password);
      formData.append('phoneNumber', formdata.phoneNumber);
      if (formdata.image) {
        formData.append('file', formdata.image); // Append the image file to the form data
      }

      const response = await axiosInstance.post('/auth/signup', formData);

      if (response.status === 201) {
        const { user, token } = response.data;
        handleSignUpSuccess(user, token);
      }
    } catch (error: any) {
      if (error.response) {
        console.log('Response:', error.response);
        console.log('Status:', error.response.status);

        handleSignUpError({
          message:
            error.response.status === 400
              ? 'Fields are Required'
              : error.response.status === 401
              ? 'Email already exists'
              : error.response.status === 500
              ? 'Internal Server Error'
              : 'An error occurred',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='SignUpWholePage'>
      <div className='signUpLeftContainer'>
        {error ? (
          <div className='error-container'>
            <WarningCircle width={30} height={30} />
            {error}
          </div>
        ) : null}
        <h1>Create New Account</h1>
        <div className='signupsocialIcons'>
          <ImageC src={facebooklogo} alt='fb' height={30} width={30} />
          <ImageC src={googlelogo} alt='google' height={30} width={30} />
          <ImageC src={linkedinlogo} alt='linkedin' height={30} width={30} />
        </div>
        <form onSubmit={handleSignUp}>
          <CustomTextField
            placeholder='Name'
            name='name'
            value={formdata.name}
            onChange={handleInputChange}
            icon={<User />}
            validationMessage={validationMessages.name}
            type="text"
          />
          <CustomTextField
            placeholder='Email'
            icon={<EnvelopeSimple />}
            name='email'
            value={formdata.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e);
              validateEmail(e.target.value);
            }}
            type='email'
            validationMessage={validationMessages.email}
          />
          <CustomTextField
            placeholder='Password'
            icon={<Lock />}
            type='password'
            name='password'
            value={formdata.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e);
              validatePassword(e.target.value);
            }}
            validationMessage={validationMessages.password}
          />
          <CustomTextField
            icon={<Phone />}
            placeholder='Phone Number'
            name='phoneNumber'
            value={formdata.phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e);
              validatePhoneNumber(e.target.value);
            }}
            validationMessage={validationMessages.phoneNumber}
            type="number"
          />
          <CustomTextField
            type='file'
            icon={<Image />}
            placeholder='Image URL'
            name='image'
            // value={formdata.image} // No need to set value for file input
            onChange={handleFileChange}
            validationMessage={validationMessages.image}            // Add accept attribute to only allow image files
            
          />
          {/* Conditional rendering of the loading spinner */}
          {loading ? (
            <button className='signup-container'><CircleLoader size={20} /></button>
          ) : (
            <button type='submit' className='signup-container'>
              Sign Up
            </button>
          )}
        </form>
      </div>
      <div className='signUpRightContainer'>
        <h1>Start New Journey</h1>
        <h3>Already have an account?</h3>
        <div onClick={() => router.push('/login')} className='navigate-signup-container'>Sign In</div>
      </div>
    </div>
  );
};

export default SignupPage;
