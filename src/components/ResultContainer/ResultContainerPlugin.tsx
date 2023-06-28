import React from 'react';
import './Resultstyles.css'

/**
* @author Nitesh Raj Khanal
* @function @ResultContainerPlugin
**/

/* The `interface Result` is defining the structure of an object that represents a decoded QR code
result. It has two properties: `decodedText` which is a string representing the decoded text of the
QR code, and `result` which is an object containing information about the format of the QR code. The
`result` object has a property `format` which is an object containing the `formatName` property,
representing the name of the format of the QR code. */
interface Result {
    decodedText: string;
    result: {
        format: {
            formatName: string;
        };
    };
}

/**
 * The function `filterResults` takes an array of `Result` objects and returns a new array with
 * duplicate `decodedText` values removed.
 * @param {Result[]} results - An array of objects of type `Result`.
 * @returns The function `filterResults` is returning an array of `Result` objects.
 */
const filterResults = (results: Result[]): Result[] => {
    let filteredResults: Result[] = [];
    for (let i = 0; i < results.length; ++i) {
        if (i === 0) {
            filteredResults.push(results[i]);
            continue;
        }

        if (results[i].decodedText !== results[i - 1].decodedText) {
            filteredResults.push(results[i]);
        }
    }
    return filteredResults;
}

/* The `interface ResultContainerTableProps` is defining the props that can be passed to the
`ResultContainerTable` component. It specifies that the component expects a prop called `data` which
is an array of objects of type `Result`. */
interface ResultContainerTableProps {
    data: Result[];
}

/**
 * The `ResultContainerTable` component renders a table of decoded QR code results based on the
 * provided data.
 * @param  - The `ResultContainerTable` component is a functional component that takes in a single prop
 * called `data`. The `data` prop is an array of objects that contain information about decoded QR
 * codes.
 * @returns The ResultContainerTable component is being returned.
 */
const ResultContainerTable: React.FC<ResultContainerTableProps> = ({ data }) => {
    const results = filterResults(data);

    return (
        <div className="Qrcode-result-table-container">
            <table className="Qrcode-result-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Decoded Text</th>
                        <th>Format</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, i) => {
                        console.log(result);
                        return (
                            <tr key={i}>
                                <td>{i}</td>
                                <td>{result.decodedText}</td>
                                <td>{result.result.format.formatName}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

/* The `interface ResultContainerPluginProps` is defining the props that can be passed to the
`ResultContainerPlugin` component. It specifies that the component expects a prop called `results`
which is an array of objects of type `Result`. This allows the `ResultContainerPlugin` component to
receive the `results` prop and use it to render the decoded QR code results. */
interface ResultContainerPluginProps {
    results: Result[];
}

/**
 * The ResultContainerPlugin component renders a container for displaying scanned results, including a
 * header and a table of results.
 * @param props - The `props` parameter is an object that contains the properties passed to the
 * `ResultContainerPlugin` component. These properties can be accessed using dot notation, for example
 * `props.results` is accessing the `results` property of the `props` object.
 * @returns The ResultContainerPlugin component is returning a JSX element.
 */
const ResultContainerPlugin: React.FC<ResultContainerPluginProps> = (props) => {
    const results = filterResults(props.results);

    return (
        <div className="Result-container">
            <div className="Result-header">Scanned Results ({results.length})</div>
            <div className="Result-section">
                <ResultContainerTable data={results} />
            </div>
        </div>
    );
};

export default ResultContainerPlugin;
