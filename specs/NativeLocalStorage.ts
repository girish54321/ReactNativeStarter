import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  getBuildType(value: string, key: string): string | null;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'BUILD_ENV',
);