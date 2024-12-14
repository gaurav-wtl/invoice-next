"use client"

import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';


interface InvoiceData {
  'Guset Name': string;
  'Company name': string;
  'Company email': string;
  'Company gst': string;
  'Company mobile': string;
  'Routes': string;
  'Journey Type': string;
  'Total KM': number;
  'Journey Date': string;
  'Time': string;
  'Return Date': string;
  'Vehicle Type': string;
  'BASIC FARE': number;
  'DA / TA': number;
  'Toll, Tax & Parking': number;
  'Final Payment': number;
}


function InvoiceUploader() {
  const [excelData, setExcelData] = useState<InvoiceData[] | null>(null);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [id, setId] = useState({ wtlId: 0, aimcabId: 0 });

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<InvoiceData>(sheet);
      console.log(jsonData);
      setExcelData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  // Function to handle company selection
  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    setSelectedCompany(target.value);
  };

  // Handle file upload and invoice generation for each row
  const handleInvoiceGeneration = async () => {
    if (selectedCompany === '') {
      alert("select company first");
      return
    }

    if (excelData) {
      excelData.forEach(async (data, index) => {

        const html2pdf = (await import('html2pdf.js')).default;
        const invoiceData =
        {
          passengerName: data[`Guset Name`] || 'NA',
          companyName: data['Company name'] || 'NA',
          companyEmail: data['Company email'] || 'NA',
          companyGST: data['Company gst'] || 'NA',
          companyMobile: data['Company mobile'] || 'NA',
          pickupLocation: data['Routes'].split("to")[0] || "NA",
          dropLocation: data['Routes'].split("to")[1] || "NA",
          journeyType: data['Journey Type'] || "NA",
          distance: `${data['Total KM']}` || -1,
          startDate: data['Journey Date'] || 'NA',
          startTime: data["Time"] || "NA",
          endDate: new Date(data['Return Date']).toString() || "NA",
          vehicleType: data['Vehicle Type'] || 'NA',
          baseFare: data['BASIC FARE'] || -1,
          driverAllownce: `${data['DA / TA']}` || -1,
          toll: data[`Toll, Tax & Parking`] || -1,
          finalAmount: data['Final Payment'] || -1,
          serviceCharge: "5%",
          subtotal: "",
          paidAmount: "",
          companyType: "",        // For WTL or AimCab selection
          invoiceFor: "",         // For passenger or organization selection
          bookId: localStorage.getItem("bookid") || 0
        };



        // Invoice HTML
        const invoiceHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #fff; padding: 20px; margin: 20px auto; max-width: 800px; border: 1px solid #ddd;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            
                <h1 style="margin: 0; font-size: 24px; color: #333;">Invoice</h1>
                <strong style="color: #333;">Date: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}</strong>
            
        </div>
        <hr style="background-color: gold; height: 10px; margin-top: 10px; margin-bottom: 10px;" />
        
        <div style="padding-top: 20px; display: flex; justify-content: space-between;">
            <div style="width: 48%; font-size: 14px; line-height: 1.6; color: #333;">
                <strong style="font-size: 16px;">${invoiceData.companyName}</strong><br />
                <strong style="font-size: 16px;">${invoiceData.passengerName}</strong><br />
                ${invoiceData.companyEmail}<br />
                ${invoiceData.companyMobile}<br />
                ${invoiceData.companyGST}<br />
                Invoice No: ${selectedCompany === 'wtl' ? `${id?.wtlId + (index + 1)}/2025-26` : `A${id?.aimcabId + (index + 1)}/2025-26`}
            </div>
            ${selectedCompany === 'wtl' ?
            `<div style="width: 48%; text-align: right; font-size: 14px; line-height: 1.6; color: #333;">
                <strong style="font-size: 16px;">WTL Tourism Pvt. Ltd.</strong><br />
                Mobile: 9325578091<br />
                Email: contact@worldtriplink.com<br />
                Website: worldtriplink.com<br />
                GST No.: 27AADCW8531C1ZD
            </div>` :
            `<div style="width: 48%; text-align: right; font-size: 14px; line-height: 1.6; color: #333;">
                <strong style="font-size: 16px;">AimCab Pvt. Ltd.</strong><br />
                Mobile: 9130030054<br />
                Email: aimcab@aimcabbooking.com<br />
                Website: aimcabbooking.com<br />
                GST No.: 27AATCA5944R1ZL
            </div>`
          }
        </div>

        <div style="padding-top: 20px;">
            <h5 style="background-color: #000; color: white; padding: 8px; font-size: 16px; margin: 0;">TRIP DETAILS</h5>
            <table style="width: 100%; border: 1px solid #000; padding: 10px; border-collapse: collapse; margin-top: 10px;">
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px;"><strong>Pickup Location:</strong></td>
                    <td style="padding: 8px;">${invoiceData.pickupLocation}</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Drop Location:</strong></td>
                    <td style="padding: 8px;">${invoiceData.dropLocation}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px;"><strong>Journey Type:</strong></td>
                    <td style="padding: 8px;">${invoiceData.journeyType}</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Distance (Km):</strong></td>
                    <td style="padding: 8px;">${invoiceData.distance}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px;"><strong>Pickup Date:</strong></td>
                    <td style="padding: 8px;">${invoiceData.startDate}</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Pickup Time:</strong></td>
                    <td style="padding: 8px;">${invoiceData.startTime}</td>
                </tr>
            </table>
        </div>

        <div style="padding-top: 20px;">
            <h5 style="background-color: #000; color: white; padding: 8px; font-size: 16px; margin: 0;">BOOKING DETAILS</h5>
            <table style="width: 100%; border: 1px solid #000; padding: 10px; border-collapse: collapse; margin-top: 10px;">
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px;"><strong>Vehicle Type:</strong></td>
                    <td style="padding: 8px;">${invoiceData.vehicleType}</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Base Fare:</strong></td>
                    <td style="padding: 8px;">${invoiceData.baseFare}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px;"><strong>Driver Allowance:</strong></td>
                    <td style="padding: 8px;">${invoiceData.driverAllownce}</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Toll, Parking & Tax:</strong></td>
                    <td style="padding: 8px;">${invoiceData.toll}</td>
                </tr>
                
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px;"><strong>GST Tax (5%):</strong></td>
                    <td style="padding: 8px;">${(5 / 100) * ((+invoiceData.baseFare) + (+invoiceData.toll) + (+invoiceData.driverAllownce))}</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Subtotal:</strong></td>
                    <td style="padding: 8px;">${(+invoiceData.baseFare) + (+invoiceData.driverAllownce) + (+invoiceData.toll) + ((5 / 100) * ((+invoiceData.baseFare) + (+invoiceData.toll) + (+invoiceData.driverAllownce)))}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px;"><strong>Paid Amount:</strong></td>
                    <td style="padding: 8px;">${(+invoiceData.baseFare) + (+invoiceData.driverAllownce) + (+invoiceData.toll) + ((5 / 100) * ((+invoiceData.baseFare) + (+invoiceData.toll) + (+invoiceData.driverAllownce)))}</td>
                </tr>
            </table>
        </div>

        <p style="margin-top: 20px; font-size: 14px; color: #333;"><strong>Note:</strong> This is a computer-generated invoice. Toll, Parking, and Extra KM as per the receipt.</p>
    </div>
    `;

        // Create a temporary div to hold the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = invoiceHtml;

        // Generate PDF using html2pdf.js
        html2pdf().from(tempDiv).save('invoice.pdf');
      });

      await axios.post("/api/id", { companyType: selectedCompany, count: selectedCompany === 'wtl' ? id.wtlId + excelData.length : id.aimcabId + excelData.length });

    }
  };



  useEffect(() => {
    const getId = async () => {
      const res = await axios.get("/api/id");
      setId(res.data.id);
    }

    getId();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <select
        className="mb-4 p-2 border rounded-lg"
        value={selectedCompany}
        onChange={handleCompanyChange}
      >
        <option value="">Select Company</option>
        <option value="wtl">WTL</option>
        <option value="aimcab">AIMCAB</option>
      </select>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4 p-2 border rounded-lg"
      />
      <button
        onClick={handleInvoiceGeneration}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Generate Invoice
      </button>
    </div>
  );
}

export default InvoiceUploader;
