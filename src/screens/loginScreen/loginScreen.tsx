import React, { useEffect, useState } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button
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
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { getEnvVariable } from 'react-native-starter-env';


import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const width = Dimensions.get('window').width

const LoginScreen = () => {
  const {
    paperTheme,
    saveUserLogin,
    isLoading,
    nativeData } = useLoginScreenModal();
  const val = useSharedValue(width / 2)
  const animatedStyle = useAnimatedStyle(() => ({
    width: val.value,
    borderRadius: 22
  }));

  const [env, setEnv] = useState("")

  const getEnv = () => {
    const nativeEnv = getEnvVariable();
    setEnv(nativeEnv)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema)
  })

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
        <Button title="Get ENV" onPress={getEnv} />
        <Text>Result: {env}</Text>
        <TouchableOpacity
          style={styles.configView}>
          <Text >Running {nativeData.BUILD_ENV}</Text>
          <View style={styles.baseUrlView} />
          <Text >Your Base URL is {nativeData.BASE_URL}</Text>
        </TouchableOpacity>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ backgroundColor: paperTheme.colors.background }}
              testID={getTestId('login-email')}
              label="Email"
              mode='outlined'
              onBlur={onBlur}
              error={errors.email ? true : false}
              autoCapitalize="none"
              value={value}
              placeholder="Email"
              onChangeText={onChange}
            />
          )}
          name="email"
        />
        {errors.email && <Text variant="labelMedium" >{errors.email.message}</Text>}
        <SizedBox size={12} />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ backgroundColor: paperTheme.colors.background }}
              testID={getTestId('login-password')}
              label="Password"
              mode='outlined'
              error={errors.password ? true : false}
              onBlur={onBlur}
              placeholder="Password"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
            />
          )}
          name="password"
        />
        {errors.password && <Text variant="labelMedium" >{errors.password.message}</Text>}
        <SizedBox size={12} />
        <TouchableOpacity
          disabled={isLoading}
          testID={getTestId('login-button')}
          style={styles.configView} onPress={handleSubmit(saveUserLogin)}>
          <Animated.View style={[styles.btnStyle, { backgroundColor: paperTheme.colors.primary }, animatedStyle]} >
            {isLoading ? <ActivityIndicator animating={true} size={28} color='white' /> : <Text variant="titleLarge" style={styles.buttonTextColor}>{"Login"}</Text>}
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