import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  getBuildType(): string;
  getBaseUrl(): string;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BUILD_ENV');