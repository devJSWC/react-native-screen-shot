"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addScreenshotListener = exports.stopScreenshotDetection = exports.startScreenshotDetection = void 0;

var _reactNative = require("react-native");

const {
  Detector
} = _reactNative.NativeModules;
var EventsName;

(function (EventsName) {
  EventsName["UserDidTakeScreenshot"] = "UIApplicationUserDidTakeScreenshotNotification";
})(EventsName || (EventsName = {}));

const detectorEventEmitter = new _reactNative.NativeEventEmitter(Detector);

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

const startScreenshotDetection = () => {
  Detector.startScreenshotDetection();
};

exports.startScreenshotDetection = startScreenshotDetection;

const stopScreenshotDetection = () => {
  Detector.stopScreenshotDetection();
};

exports.stopScreenshotDetection = stopScreenshotDetection;

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
//# sourceMappingURL=index.js.map