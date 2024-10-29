import React from 'react';
import { jsPDF } from 'jspdf';

// const dataList = [
//     { base64Image: 'data:image/jpeg;base64,...', text: 'Text for page 1' },
//     { base64Image: 'data:image/jpeg;base64,...', text: 'Text for page 2' },
//     { base64Image: 'data:image/jpeg;base64,...', text: 'Text for page 3' },
//     // Add more items as needed
//   ];


const MultiPagePDF = ({dataList}) => {
  const generatePdf = () => {
    const pdf = new jsPDF();
    
    dataList.forEach((data, index) => {
      const { base64Image, text } = data;

      // Adding Text
      pdf.setFontSize(16);
      pdf.text(text, 10, 10); // Adjust positioning as needed

      // Adding Base64 Image
      const imgWidth = 180;
      const imgHeight = 160;
      pdf.addImage(base64Image, 'JPEG', 10, 20, imgWidth, imgHeight); // Adjust image positioning as needed

      // Add a new page if not the last item
      if (index < dataList.length - 1) {
        pdf.addPage();
      }
    });

    pdf.save('multi-page.pdf');
  };

  return (
    <div>
      <button onClick={generatePdf}>Download Multi-Page PDF</button>
    </div>
  );
};

export default MultiPagePDF;