import React, { useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import { useSelector } from 'react-redux';

const MultiPagePDF = () => {
  const tmsMapping = useSelector(state => state.tmsMapping);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const svgBase64ToJpeg = (svgBase64) => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const jpegDataUrl = canvas.toDataURL('image/jpeg');
        resolve(jpegDataUrl);
      };

      img.src = svgBase64;
    });
  };

  const generatePdf = async () => {
    setLoading(true);
    const pdf = new jsPDF();

const transforedData = [];

    for (const data of tmsMapping) {
console.log(data,Object.values(data)[0]);
const text = Object.keys(data)[0];
for(const internalData of Object.values(data)[0]){
    console.log('------------------>>>>>>><<<<<',internalData?.modifiedImg);
    transforedData.push({text:text, base64Image: internalData?.modifiedImg});
    
}
}

console.log(transforedData);


for(const data of transforedData){

    //   const text = Object.keys(data)[0];
    //   const base64Image = Object.values(data)[0][0]?.modifiedImg;
const {text, base64Image} = data;
      console.log('************************',text,base64Image);
      
      
      if (!base64Image) continue;

      // Adding text to PDF
      pdf.setFontSize(16);
      pdf.text(text, 10, 10);

      // Convert base64 SVG to JPEG
      const jpegDataUrl = await svgBase64ToJpeg(base64Image);

      // Add JPEG to PDF
      const imgWidth = 180;
      const imgHeight = 160;
      pdf.addImage(jpegDataUrl, 'JPEG', 10, 20, imgWidth, imgHeight);

      // Add a new page if not the last item
      if (tmsMapping.indexOf(data) < tmsMapping.length - 1) {
        pdf.addPage();
      }
    }

    pdf.save('TMS_Mapping.pdf');
    setLoading(false);
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      {loading && false ? 'Loading....' :<button style={{padding:'0.2rem 0.4rem',background:'lightgreen',fontWeight:'700',cursor:'pointer',boxShadow: '0.2rem 0.2rem 0.4rem rgba(0, 0, 0, 0.4), -0.2rem -0.2rem 0.4rem rgba(0, 0, 0, 0.2)'
}} onClick={generatePdf}>Download PDF</button>}
    </div>
  );
};

export default MultiPagePDF;
