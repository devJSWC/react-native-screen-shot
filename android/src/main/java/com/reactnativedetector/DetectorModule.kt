package com.rndetector

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class DetectorModule(val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ScreenshotDetectionListener {

    private val screenshotDetectionDelegate = ScreenshotDetectionDelegate(reactContext, this)

    override fun getName() = "Detector"

    @ReactMethod
    fun startScreenshotDetection() {
        screenshotDetectionDelegate.start()
    }

    @ReactMethod
    fun stopScreenshotDetection() {
        screenshotDetectionDelegate.stop()
    }

    override fun onScreenCaptured() {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("UIApplicationUserDidTakeScreenshotNotification", null)
    }
}
