//
//  RCTNativeBuildEnv.m
//  ReactNativeStarter
//
//  Created by Girish Parate on 28/05/26.
//

#import "NativeBuildInfoModule.h"

@implementation NativeBuildInfoModule

RCT_EXPORT_MODULE(BUILD_ENV)

- (NSString *)getBuildType {
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"BUILD_ENV"];
}

- (NSString *)getBaseUrl {
    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"BASE_URL"];
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
    return std::make_shared<facebook::react::NativeBuildEnvSpecJSI>(params);
}

@end
