"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addScreenrecordListener = exports.addScreenshotListener = exports.isScreenRecording = exports.stopScreenrecordDetection = exports.startScreenrecordDetection = exports.stopScreenshotDetection = exports.startScreenshotDetection = void 0;

var _reactNative = require("react-native");

const {
  Detector
} = _reactNative.NativeModules;
var EventsName;

(function (EventsName) {
  EventsName["UserDidTakeScreenshot"] = "UIApplicationUserDidTakeScreenshotNotification";
  EventsName["UserDidTakeScreenRecord"] = "UIApplicationUserDidTakeScreenRecordNotification";
})(EventsName || (EventsName = {}));

const detectorEventEmitter = new _reactNative.NativeEventEmitter(Detector);

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

const startScreenshotDetection = () => {
  Detector.startScreenshotDetection();
};

exports.startScreenshotDetection = startScreenshotDetection;

const stopScreenshotDetection = () => {
  Detector.stopScreenshotDetection();
};

exports.stopScreenshotDetection = stopScreenshotDetection;

const startScreenrecordDetection = () => {
  Detector.startScreenrecordDetection();
};

exports.startScreenrecordDetection = startScreenrecordDetection;

const stopScreenrecordDetection = () => {
  Detector.stopScreenrecordDetection();
};

exports.stopScreenrecordDetection = stopScreenrecordDetection;

const isScreenRecording = async () => {
  var _Detector$isScreenRec;

  if (_reactNative.Platform.OS !== 'ios') {
    return;
  }

  return await (Detector === null || Detector === void 0 ? void 0 : (_Detector$isScreenRec = Detector.isScreenRecording) === null || _Detector$isScreenRec === void 0 ? void 0 : _Detector$isScreenRec.call(Detector));
};

exports.isScreenRecording = isScreenRecording;

const addScreenshotListener = _reactNative.Platform.select({
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

exports.addScreenshotListener = addScreenshotListener;

const addScreenrecordListener = _reactNative.Platform.select({
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

exports.addScreenrecordListener = addScreenrecordListener;
//# sourceMappingURL=index.js.map