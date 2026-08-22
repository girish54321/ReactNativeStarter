import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export type UserConfig = {
  id: string;
  age: number;
  isActive: boolean;
};
export interface Spec extends TurboModule {
  getBuildType(): string;
  getBaseUrl(): string;
  processUser(config: UserConfig): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('BUILD_ENV');