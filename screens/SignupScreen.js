import { Alert } from 'react-native';
import { useContext, useState } from 'react';
import { createUser } from '../util/auth';

import { AuthContext } from '../store/auth-context';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState();

  const authCtx = useContext(AuthContext);

  async function signUpHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert('Signup Failed', 'Could not create user');
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating user..."} />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
