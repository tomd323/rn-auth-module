import AuthContent from '../components/Auth/AuthContent';
import { login } from '../util/auth';
import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import { AuthContext } from '../store/auth-context';

import LoadingOverlay from '../components/ui/LoadingOverlay';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState();

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Authentication Failed', 'Check your credentials and try again.');
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Logging in..."} />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
