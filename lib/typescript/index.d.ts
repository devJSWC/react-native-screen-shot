declare type Unsubscribe = () => void;
export declare const startScreenshotDetection: () => void;
export declare const stopScreenshotDetection: () => void;
export declare const addScreenshotListener: (listener: () => void) => Unsubscribe;
export {};
