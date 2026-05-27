package com.reactnativestarter

import com.facebook.react.bridge.ReactApplicationContext

class NativeBuildInfoModule(reactContext: ReactApplicationContext) : NativeBuildEnvSpec(reactContext) {

    override fun getName(): String = NAME

    override fun getBuildType(): String {
        return reactApplicationContext.getString(R.string.BUILD_ENV)
    }

    companion object {
        const val NAME = "BUILD_ENV"
    }
}