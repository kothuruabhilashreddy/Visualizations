import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { render } from '@testing-library/react';

const FileUpload = ({setPlotData, setAttributes}) => {
    const [dataToVisualize, setDataToVisualize] = useState(null);


    const fetchColumnsData = (event) => {
        setDataToVisualize(event.target.files[0]);
    }

    const getFileType = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        return extension;
      };

    const parseXMLToObjects = (xmlData) => {
        if (!xmlData.trim()) {
            throw new Error("XML data is empty or invalid.");
        }
    
        var xmlDoc = new DOMParser().parseFromString(xmlData, "text/xml");
        var dataList = [];
        console.log('xmlDoc', xmlDoc);
        var children = xmlDoc.documentElement.children;
        console.log('children', children.length);
        for (var i = 0; i < children.length; i++) {
            var child = children[i]; 
            console.log('child:', child);
            if (child.nodeType === Node.ELEMENT_NODE) {
                var rowData = {};
                var elements = child.children; 
                for (var j = 0; j < elements.length; j++) {
                    var tagName = elements[j].tagName;
                    var textContent = elements[j].textContent;
                    rowData[tagName] = textContent;
                }   
                dataList.push(rowData);
            }
        }   
        return dataList;
    }

    function getAttributesList(parseDataList) {
        var keysSet = new Set();
        parseDataList.forEach(function(obj) {
            var objKeys = Object.keys(obj);
            objKeys.forEach(function(key) {
                keysSet.add(key);
            });
        });
        var keysArray = Array.from(keysSet);
        return keysArray;
    }
    
    
    

    useEffect(()=> {
        if(dataToVisualize) {
            const reader = new FileReader();
            reader.onload = () => {
                const fileType = getFileType(dataToVisualize.name);
                switch(fileType) {
                    case 'csv':
                        var data = d3.csvParse(reader.result);
                        setAttributes(data['columns']);
                        break;
                    case 'json':
                        var data = JSON.parse(reader.result);
                        setAttributes(getAttributesList(data));
                        break;
                    case 'xml':
                        var data = parseXMLToObjects(reader.result);
                        setAttributes(getAttributesList(data));
                        break;
                    case 'tsv':
                        var data = d3.tsvParse(reader.result);
                        setAttributes(getAttributesList(data));
                        break;
                }
            setPlotData(data);
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