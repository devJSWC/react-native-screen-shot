declare type Unsubscribe = () => void;
export declare const startScreenshotDetection: () => void;
export declare const stopScreenshotDetection: () => void;
export declare const startScreenrecordDetection: () => void;
export declare const stopScreenrecordDetection: () => void;
export declare const isScreenRecording: () => Promise<boolean | undefined>;
export declare const addScreenshotListener: (listener: () => void) => Unsubscribe;
export declare const addScreenrecordListener: (listener: () => void) => Unsubscribe;
export {};
