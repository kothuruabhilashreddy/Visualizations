import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { render } from '@testing-library/react';

const FileUpload = () => {
    const [dataToVisualize, setDataToVisualize] = useState(null);


    const fetchColumnsData = (event) => {
        setDataToVisualize(event.target.files[0]);
    }

    const getFileType = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        return extension;
      };
    

    useEffect(()=> {
        if(dataToVisualize) {
            const reader = new FileReader();
            reader.onload = () => {
                const fileType = getFileType(dataToVisualize.name);
                switch(fileType) {
                    case 'csv':
                        var data = d3.csvParse(reader.result);
                        break;
                    case 'json':
                        var data = JSON.parse(reader.result);
                        break;
                    case 'xml':
                        var data = d3.xml(reader.result);
                        break;
                    case 'tsv':
                        var data = d3.tsvParse(reader.result);
                        break;
                }
                
                // console.log('data to visualize:', dataToVisualize);
                console.log("data: ", data);
            }
            reader.readAsText(dataToVisualize);
            
        }
        
    },[dataToVisualize])

    return (
    <div>
        <input type="file" accept = ".xml, .csv, .json, .tsv" onChange={fetchColumnsData}></input>
    </div>
    );

}

export default FileUpload;