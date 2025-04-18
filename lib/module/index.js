import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
const {
  Detector
} = NativeModules;
var EventsName;

(function (EventsName) {
  EventsName["UserDidTakeScreenshot"] = "UIApplicationUserDidTakeScreenshotNotification";
})(EventsName || (EventsName = {}));

const detectorEventEmitter = new NativeEventEmitter(Detector);

const commonAddScreenshotListener = listener => {
  const eventSubscription = detectorEventEmitter.addListener(EventsName.UserDidTakeScreenshot, () => listener(), {});
  return () => {
    eventSubscription.remove();
  };
};

const getListenersCount = () => {
  var _ref, _detectorEventEmitter, _detectorEventEmitter2, _detectorEventEmitter3;

  return (// React Native 0.64+
    // @ts-ignore
    (_ref = (_detectorEventEmitter = (_detectorEventEmitter2 = detectorEventEmitter.listenerCount) === null || _detectorEventEmitter2 === void 0 ? void 0 : _detectorEventEmitter2.call(detectorEventEmitter, EventsName.UserDidTakeScreenshot)) !== null && _detectorEventEmitter !== void 0 ? _detectorEventEmitter : // React Native < 0.64
    // @ts-ignore
    (_detectorEventEmitter3 = detectorEventEmitter.listeners) === null || _detectorEventEmitter3 === void 0 ? void 0 : _detectorEventEmitter3.call(detectorEventEmitter, EventsName.UserDidTakeScreenshot).length) !== null && _ref !== void 0 ? _ref : 0
  );
};

export const startScreenshotDetection = () => {
  Detector.startScreenshotDetection();
};
export const stopScreenshotDetection = () => {
  Detector.stopScreenshotDetection();
};
export const addScreenshotListener = Platform.select({
  default: () => () => {},
  ios: commonAddScreenshotListener,
  android: listener => {
    if (getListenersCount() === 0) {
      Detector.startScreenshotDetection();
    }

    const unsubscribe = commonAddScreenshotListener(listener);
    return () => {
      unsubscribe();

      if (getListenersCount() === 0) {
        Detector.stopScreenshotDetection();
      }
    };
  }
});
//# sourceMappingURL=index.js.map