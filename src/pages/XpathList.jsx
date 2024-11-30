import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPreviewData, changeCurrentStep, changeDate } from '../redux/tmsPreviewSlice';

const XpathList = () => {
    const mappingData = useSelector(state => state.tmsMapping); 
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const modifiedList = [];
        mappingData.forEach((data) => {
            Object.values(data)[0].forEach((list, index) => {
                list.notes.forEach((note) => {
                    modifiedList.push({
                        ...note,
                        date: new Date(note.date),
                        previewData: Object.keys(data)[0],
                        currentStep: index + 1
                    });
                });
            });
        });
        
        setList(modifiedList.sort((a, b) => b.date - a.date));
    }, [mappingData]);
    

    return (
        <div style={containerStyle}>
            {/* Table to show data */}
            <table style={tableStyle}>
                <thead>
                    <tr style={headerRowStyle}>
                        <th style={{ ...headerCellStyle, whiteSpace: "nowrap" }}>S. No.</th>
                        <th style={headerCellStyle}>Title</th>
                        <th style={headerCellStyle}>Date</th>
                        <th style={headerCellStyle}>Old Xpath</th>
                        <th style={headerCellStyle}>New Xpath</th>
                        <th style={headerCellStyle}>Nodes Affected</th>
                        <th style={headerCellStyle}>Note</th>
                        <th style={headerCellStyle}>Feature</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((data, index) => (
                        <tr
                            key={index}
                            style={rowStyle}>
                            <td style={cellStyle} onClick={() => {
                                dispatch(addPreviewData(data.previewData));
                                dispatch(changeCurrentStep(data.currentStep));
                                dispatch(changeDate(data.date));
                                navigate('/addMapping');
                            }}>{index + 1}</td>
                            <td style={cellStyle}>{data.title}</td>
                            <td style={cellStyle}>{data.date.toLocaleDateString()}</td>
                            <td style={cellStyle}><p style={wrapStyle}>{data.oldXpath}</p></td>
                            <td style={cellStyle}><p style={wrapStyle}>{data.newXpath}</p></td>
                            <td style={cellStyle}><p style={wrapStyle}>{data.nodes.split(",").map((note) => <span style={{ padding: '0.2rem', background: '#ccc', margin: '0.2rem', borderRadius: '0.2rem', display:'inline-block',textAlign:'center',width:'inherit', height:'inherit' }}> { note } </span>)}</p></td>
                            <td style={cellStyle}><p style={wrapStyle}>{data.note}.</p></td>
                            <td style={cellStyle}>{data.previewData}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Inline styles
const containerStyle = {
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    minHeight: 'calc(100vh - 6vh)',
    maxHeight:'auto'
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    tableLayout: 'auto', // Ensure table adjusts its width based on content
};

const headerRowStyle = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
};

const headerCellStyle = {
    padding: '12px 15px',
    border: '1px solid #ddd',
};

const rowStyle = {
    cursor: 'pointer',
    backgroundColor: '#fff',
    transition: 'background-color 0.3s ease',
};

const cellStyle = {
    padding: '8px 12px',
    border: '1px solid #ddd',
};

const wrapStyle = {
    margin: "0 0 0.2rem",
    overflowWrap: "break-word",
    wordWrap: "break-word",
    whiteSpace: "normal",
    wordBreak: "break-word", // Ensure breaking on long words
};

export default XpathList;
