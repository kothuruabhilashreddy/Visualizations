import React, {useState} from 'react';
import FileUpload from '../FileUpload/FileUpload';
import BarChart from '../BarChart/BarChart';
import AttributeClassifier from '../AttributeClassifier/AttributeClassifier';

const Home = () => {
    const [plotData, setPlotData] = useState(null);
    const [attributes, setAttributes] = useState([]);
    const [numericalData, setNumericalData] =useState([]);
    const [categoricalData, setCategoricalData] = useState([]);

    console.log('attributes:', attributes);
    return (
        <div className="Home">
            { <FileUpload setPlotData={setPlotData} setAttributes={setAttributes} />}
            {/* {plotData && <BarChart plotData={plotData} xLabel="wedw" yLabel="wcwe"/>} */}
            <AttributeClassifier attributes={attributes} setNumericalData={setNumericalData} setCategoricalData={setAttributes} />
        </div>
    )
}

export default Home;