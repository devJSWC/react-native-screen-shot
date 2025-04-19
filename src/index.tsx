import { NativeModules, NativeEventEmitter, Platform, LogBox } from 'react-native'

const { CustomDetector } = NativeModules

enum EventsName {
  UserDidTakeScreenshot = 'UIApplicationUserDidTakeScreenshotNotification',
  UserDidTakeScreenRecord = 'UIApplicationUserDidTakeScreenRecordNotification',
}

const detectorEventEmitter = new NativeEventEmitter(CustomDetector)

LogBox.ignoreAllLogs(true);

type Unsubscribe = () => void

const commonAddScreenshotListener = (listener: () => void): Unsubscribe => {
  const eventSubscription = detectorEventEmitter.addListener(
    EventsName.UserDidTakeScreenshot,
    () => listener(),
    {}
  )

  return () => {
    eventSubscription.remove()
  }
}

const getListenersCount = (): number => {
  return (
    // React Native 0.64+
    // @ts-ignore
    detectorEventEmitter.listenerCount?.(EventsName.UserDidTakeScreenshot) ??
    // React Native < 0.64
    // @ts-ignore
    detectorEventEmitter.listeners?.(EventsName.UserDidTakeScreenshot).length ??
    0
  )
}

export const addScreenshotListeneran = Platform.select<
  (listener: () => void) => Unsubscribe
>({
  default: (): Unsubscribe => () => { },
  ios: commonAddScreenshotListener,
  android: (listener: () => void): Unsubscribe => {
    if (getListenersCount() === 0) {
      CustomDetector.startScreenshotDetection()
    }

    const unsubscribe: Unsubscribe = commonAddScreenshotListener(listener)

    return () => {
      unsubscribe()

      if (getListenersCount() === 0) {
        CustomDetector.stopScreenshotDetection()
      }
    }
  },
})

