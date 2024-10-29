import React, { useRef, useState } from 'react';

const Dashboard = () => {
    const [rectangles, setRectangles] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [imageSrc, setImageSrc] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [resizingIndex, setResizingIndex] = useState(null);
    const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
    const [fieldData, setFieldData] = useState([]);
    const [text, changeText] = useState("");
    const canvasRef = useRef(null);

    const uploadFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const startDrawing = (e) => {
        setIsDrawing(true);
        const rect = canvasRef.current.getBoundingClientRect();
        setStartX(e.clientX - rect.left);
        setStartY(e.clientY - rect.top);
    };

    const drawRectangle = (e) => {
        if (!isDrawing) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
console.log(rect);

        const width = mouseX - startX;
        const height = mouseY - startY;
        const newRect = { x: startX, y: startY, width, height,
            //  color:'',
            //  strokeWidth: Math.floor(Math.random()*5) 
            };
        console.log('newRect',newRect);
        
        setRectangles((prev) => {
            const updatedRects = prev.slice(0, -1); 
            console.log('updateRects',updatedRects);
            
            // remove last
            return [...updatedRects, newRect]; 
            // return [newRect]
            // add current
        });
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        if (rectangles.length > 0) {
            setRectangles((prev) => [...prev, rectangles[rectangles.length - 1]]);
        }
    };

    const zoomIn = (e) => {
        const rect = e.target.getBoundingClientRect();
        const zoomFactor = 2; // Change this value for more or less zoom
        const mouseX = (e.clientX - rect.left) / zoomLevel; // Normalized x coordinate
        const mouseY = (e.clientY - rect.top) / zoomLevel; // Normalized y coordinate

        setZoomLevel(zoomLevel * zoomFactor);
        setOffsetX(mouseX - (mouseX / zoomFactor));
        setOffsetY(mouseY - (mouseY / zoomFactor));
    };

    const handleResizeStart = (index, e) => {
        setResizingIndex(index);
        setInitialMousePos({ x: e.clientX, y: e.clientY }); // Store initial mouse position
    };

    const handleResize = (e) => {
        if (resizingIndex === null) return;

        const rect = e.target.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const updatedRectangles = [...rectangles];
        const rectToResize = updatedRectangles[resizingIndex];

        const newWidth = mouseX - rectToResize.x;
        const newHeight = mouseY - rectToResize.y;

        if (newWidth > 0 && newHeight > 0) {
            updatedRectangles[resizingIndex] = {
                ...rectToResize,
                width: newWidth,
                height: newHeight,
            };
            setRectangles(updatedRectangles);
        }
    };

    const stopResizing = () => {
        setResizingIndex(null);
    };


    const saveField = () => {
        console.log(rectangles);
        
setFieldData(prev=>[...prev,{field:text, value: rectangles}]);
setRectangles([]);

    }
    const showData = (val) => {
//         console.log(fieldData,fieldData['stops']);
        
setRectangles(val);
    }
const addNew = () => {
    setRectangles([]);
}
    return (
        <div style={{display:'flex',background:'rgba(0,0,0,0.8)'}}>
            <div style={{display:'flex',flexDirection:"column"}}>
                <input type="file" onChange={uploadFile} />
                <select>
                    <option>Main Page</option>
                    <option>Details Page</option>
                </select>
                <button onClick={addNew}>new</button>
                <input type='text' value={text} onChange={(e)=>changeText(e.target.value)}/>
                <button onClick={saveField}>save</button>
                <div style={{display:'flex',background:'white',flexDirection:"column"}}>
    {fieldData.map((data)=>(
        <li style={{cursor: 'pointer',listStyle:'number'}} onClick={()=>showData(data.value)}>{data.field}</li>
    ))}
</div>
            </div>

            <svg
                id="svg-canvas"
                
                width={800}
                height={600}
                style={{ border: '1px solid black' }}
                onMouseDown={startDrawing}
                onMouseMove={drawRectangle}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                // viewBox={`${offsetX} ${offsetY} ${800 / zoomLevel} ${600 / zoomLevel}`}
            >
                {imageSrc && (
                    <image href={imageSrc} x="0" y="0" width="800" height="600" ref={canvasRef}/>
                )}
                {rectangles.map((rect, index) => (
                    <g key={index}>
                        <rect
                            x={rect.x}
                            y={rect.y}
                            width={rect.width}
                            height={rect.height}
                            fill="rgba(0,0,0,0.1)"
                            stroke="crimson"
                            strokeWidth={rect.strokeWidth}
                        />
                        {/* <text
                            x={rect.x + 5}
                            y={rect.y + 15}
                            fill="black"
                            fontSize="12"
                        >
                            {`Rect ${index + 1}`}
                        </text> */}

                        <circle
                            cx={rect.x + rect.width}
                            cy={rect.y + rect.height}
                            r={5}
                            fill="blue"
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default Dashboard;
