import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
const {
  Detector
} = NativeModules;
var EventsName;

(function (EventsName) {
  EventsName["UserDidTakeScreenshot"] = "UIApplicationUserDidTakeScreenshotNotification";
  EventsName["UserDidTakeScreenRecord"] = "UIApplicationUserDidTakeScreenRecordNotification";
})(EventsName || (EventsName = {}));

const detectorEventEmitter = new NativeEventEmitter(Detector);

const commonAddScreenshotListener = listener => {
  const eventSubscription = detectorEventEmitter.addListener(EventsName.UserDidTakeScreenshot, () => listener(), {});
  return () => {
    eventSubscription.remove();
  };
};

const commonAddScreenrecordListener = listener => {
  const eventSubscription = detectorEventEmitter.addListener(EventsName.UserDidTakeScreenRecord, () => listener(), {});
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

const getRecordListenersCount = () => {
  var _ref2, _detectorEventEmitter4, _detectorEventEmitter5, _detectorEventEmitter6;

  return (// React Native 0.64+
    // @ts-ignore
    (_ref2 = (_detectorEventEmitter4 = (_detectorEventEmitter5 = detectorEventEmitter.listenerCount) === null || _detectorEventEmitter5 === void 0 ? void 0 : _detectorEventEmitter5.call(detectorEventEmitter, EventsName.UserDidTakeScreenRecord)) !== null && _detectorEventEmitter4 !== void 0 ? _detectorEventEmitter4 : // React Native < 0.64
    // @ts-ignore
    (_detectorEventEmitter6 = detectorEventEmitter.listeners) === null || _detectorEventEmitter6 === void 0 ? void 0 : _detectorEventEmitter6.call(detectorEventEmitter, EventsName.UserDidTakeScreenRecord).length) !== null && _ref2 !== void 0 ? _ref2 : 0
  );
};

export const startScreenshotDetection = () => {
  Detector.startScreenshotDetection();
};
export const stopScreenshotDetection = () => {
  Detector.stopScreenshotDetection();
};
export const startScreenrecordDetection = () => {
  Detector.startScreenrecordDetection();
};
export const stopScreenrecordDetection = () => {
  Detector.stopScreenrecordDetection();
};
export const isScreenRecording = async () => {
  var _Detector$isScreenRec;

  if (Platform.OS !== 'ios') {
    return;
  }

  return await (Detector === null || Detector === void 0 ? void 0 : (_Detector$isScreenRec = Detector.isScreenRecording) === null || _Detector$isScreenRec === void 0 ? void 0 : _Detector$isScreenRec.call(Detector));
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
export const addScreenrecordListener = Platform.select({
  default: () => () => {},
  ios: () => () => {},
  android: listener => {
    if (getRecordListenersCount() === 0) {
      Detector.startScreenrecordDetection();
    }

    const unsubscribe = commonAddScreenrecordListener(listener);
    return () => {
      unsubscribe();

      if (getRecordListenersCount() === 0) {
        Detector.stopScreenrecordDetection();
      }
    };
  }
});
//# sourceMappingURL=index.js.map