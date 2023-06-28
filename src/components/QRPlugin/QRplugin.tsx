import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

/**
* @author Nitesh Raj Khanal
* @function @Html5QrcodePlugin
**/

/* The `interface Html5QrcodePluginProps` defines the type of the `props` object that is passed to the
`Html5QrcodePlugin` component. It specifies the properties that can be provided to the component and
their types. */
interface Html5QrcodePluginProps {
    fps?: number;
    qrbox?: number;
    aspectRatio?: number;
    disableFlip?: boolean;
    verbose?: boolean;
    qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void;
    qrCodeErrorCallback?: (error: any) => void;
}

const qrcodeRegionId = 'html5qr-code-full-region';

/**
 * The function creates a configuration object based on the provided props.
 * @param {Html5QrcodePluginProps} props - The `props` parameter is an object that contains the
 * following properties:
 * @returns The function `createConfig` returns an object `config` with properties based on the values
 * of the `props` parameter.
 */
const createConfig = (props: Html5QrcodePluginProps): any => {
    const config: any = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

/**
 * The above function is a React component that renders an HTML5 QR code scanner and handles its
 * lifecycle.
 * @param props - The `props` parameter is an object that contains the properties passed to the
 * `Html5QrcodePlugin` component. These properties can be accessed using dot notation, for example
 * `props.verbose` or `props.qrCodeSuccessCallback`.
 * @returns The component is returning a `<div>` element with an `id` attribute set to
 * `qrcodeRegionId`.
 */
const Html5QrcodePlugin: React.FC<Html5QrcodePluginProps> = (props) => {
    useEffect(() => {
        const config = createConfig(props);
        const verbose = props.verbose === true;
        if (!props.qrCodeSuccessCallback) {
            throw new Error('qrCodeSuccessCallback is a required callback.');
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(
            qrcodeRegionId,
            config,
            verbose
        );
        html5QrcodeScanner.render(
            props.qrCodeSuccessCallback,
            props.qrCodeErrorCallback
        );
        /* The `return () => { ... }` block is a cleanup function that is executed when the component
        is unmounted or when the dependencies of the `useEffect` hook change. */
        return () => {
            html5QrcodeScanner.clear().catch((error) => {
                console.error('Failed to clear html5QrcodeScanner. ', error);
            });
        };
    }, []);

    return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
