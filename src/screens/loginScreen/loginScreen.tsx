import React, { useEffect } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  TextInput,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import SizedBox from '../../components/SizedBox';
import useLoginScreenModal from './useLoginScreenModal';
import getTestId from '../../Config/helper';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import NativeBuildEnv from '../../../specs/NativeBuildEnv';

const buildType = NativeBuildEnv.getBuildType(); 
const baseUrl = NativeBuildEnv.getBaseUrl(); 
const width = Dimensions.get('window').width
const LoginScreen = () => {
  const {
    paperTheme,
    userData,
    saveUserLogin,
    textEmailChange,
    textPasswordChange,
    isLoading,
    nativeData } = useLoginScreenModal();

  const val = useSharedValue(width / 2)
  const animatedStyle = useAnimatedStyle(() => ({
    width: val.value,
    borderRadius: 22
  }));
console.log("buildType",buildType);
console.log("baseUrl",baseUrl);

  useEffect(() => {
    if (isLoading) {
      val.value = withSpring(62)
    } else {
      val.value = withSpring(width * 0.74)
    }
  }, [isLoading, val])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View
        style={styles.container} />
      <View style={styles.inputView}>
        <TouchableOpacity
          style={styles.configView}>
          <Text >Running {buildType}</Text>
          <View style={styles.baseUrlView} />
          <Text >Your Base URL is {baseUrl}</Text>
        </TouchableOpacity>
        <TextInput
          style={{ backgroundColor: paperTheme.colors.background }}
          testID={getTestId('login-email')}
          label="Email"
          mode='outlined'
          autoCapitalize="none"
          value={userData.email}
          placeholder="Email"
          onChangeText={textEmailChange}
        />
        <SizedBox size={12} />
        <TextInput
          style={{ backgroundColor: paperTheme.colors.background }}
          secureTextEntry={userData.secureTextEntry}
          testID={getTestId('login-password')}
          label="Password"
          mode='outlined'
          placeholder="Password"
          autoCapitalize="none"
          value={userData.password}
          onChangeText={textPasswordChange}
        />
        <SizedBox size={16} />
        <TouchableOpacity
          disabled={isLoading}
          testID={getTestId('login-button')}
          style={styles.configView} onPress={saveUserLogin}>
          <Animated.View style={[styles.btnStyle, { backgroundColor: paperTheme.colors.primary }, animatedStyle]} >
            {isLoading ? <ActivityIndicator animating={true} size={28} color='white' /> : <Text variant="titleLarge" style={styles.buttonTextColor}>{buildType}</Text>}
          </Animated.View>
        </TouchableOpacity>
      </View>
      <View style={styles.fOne} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  fOne: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 34,
    justifyContent: 'center',
  },
  buttonTextColor: {
    color: "#fff"
  },
  inputView: { flex: 1, marginHorizontal: 22, },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  btnStyle: {
    padding: 14, justifyContent: 'center', alignItems: 'center',
  },
  baseUrlView: { marginTop: 8 },
  configView: { justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: 1 },
  button: {
    marginTop: 16,
  },
});

export default LoginScreen;
