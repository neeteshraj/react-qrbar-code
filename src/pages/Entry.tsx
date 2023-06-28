import React, { useState } from 'react';
import '../App.css';
import QRPlugin from '../components/QRPlugin/QRplugin';
import ResultContainerPlugin from '../components/ResultContainer/ResultContainerPlugin';

interface EntryProps { }

/**
* @author Nitesh Raj Khanal
* @function @Entry
**/

/**
 * The `Entry` function is a React functional component that renders a QR code scanner and displays the
 * decoded results.
 * @returns The `Entry` component is being returned.
 */
const Entry: React.FC<EntryProps> = () => {
    const [decodedResults, setDecodedResults] = useState<any[]>([]);

    const onNewScanResult = (_decodedText: string, decodedResult: any) => {
        setDecodedResults((prev) => [...prev, decodedResult]);
    };

    return (
        <div className="App">
            <section className="App-section">
                <div className="App-section-title">React QR-Bar Code</div>
                <br />
                <br />
                <br />
                <QRPlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
                <ResultContainerPlugin results={decodedResults} />
            </section>
        </div>
    );
};

export default Entry;
