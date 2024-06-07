import React, {useState} from 'react';
import FileUpload from '../FileUpload/FileUpload';
import BarChart from '../BarChart/BarChart';

const Home = () => {
    const [plotData, setPlotData] = useState(null);
    const [attributes, setAttributes] = useState([]);
    console.log('attributes:', attributes);
    return (
        <div className="Home">
            { <FileUpload setPlotData={setPlotData} setAttributes={setAttributes} />}
            {/* {plotData && <BarChart plotData={plotData} xLabel="wedw" yLabel="wcwe"/>} */}
        </div>
    )
}

export default Home;