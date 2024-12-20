"use client"

import React, { useState } from 'react';
import axios from 'axios';


const CreateInvoice = () => {
    const [data, setData] = useState({
        passengerName: "", journeyType: "", companyName: "",
        companyEmail: "", companyGST: "", companyMobile: "", pickupLocation: "", dropLocation: "",
        distance: "", startDate: "", startTime: "", endDate: "", vehicleType: "", baseFare: "", driverAllownce: "", toll: "",
        serviceCharge: "", subtotal: "", paidAmount: "", companyType: "",        // For WTL or AimCab selection
        invoiceFor: "",         // For passenger or organization selection

    });

    console.log("submit button click")

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (typeof window !== undefined) {

            const res = await axios.get('/api/id');
            const { id } = res.data;

            const invoiceHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #fff; padding: 20px; margin: 20px auto; max-width: 800px; border: 1px solid #ddd;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
                ${data.companyType === 'wtl' ? `<img src="/wtl.jpeg" style="height:100px; width:130px" alt="wtl" />` : `<img src="/channels4_profile.jpg" style="height:100px; width:130px" alt="aimcab" />`}
                <h1 style="margin: 0; font-size: 24px; color: #333;">Invoice</h1>
                <strong style="color: #333;">Date: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}</strong>
            
        </div>
        <hr style="background-color: gold; height: 10px; margin-top: 10px; margin-bottom: 10px;" />
        
        <div style="padding-top: 20px; display: flex; justify-content: space-between;">
            <div style="width: 48%; font-size: 14px; line-height: 1.6; color: #333;">
                <strong style="font-size: 16px;">${data.companyName}</strong><br />
                ${data.passengerName}<br />
                ${data.companyEmail}<br />
                ${data.companyMobile}<br />
                ${data.companyGST}<br />
                Invoice No: ${data.companyType === 'wtl' ? `${id?.wtlId + 1}/2025-26` : `A${id?.aimcabId + 1}/2025-26`}
            </div>
            ${data.companyType === 'wtl' ?
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
                    <td style="padding: 8px;">${data.pickupLocation}</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Drop Location:</strong></td>
                    <td style="padding: 8px;">${data.dropLocation}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px;"><strong>Journey Type:</strong></td>
                    <td style="padding: 8px;">${data.journeyType}</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Distance (Km):</strong></td>
                    <td style="padding: 8px;">${data.distance}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px;"><strong>Pickup Date:</strong></td>
                    <td style="padding: 8px;">${data.startDate}</td>
                </tr>
                
            </table>
        </div>

        <div style="padding-top: 20px;">
            <h5 style="background-color: #000; color: white; padding: 8px; font-size: 16px; margin: 0;">BOOKING DETAILS</h5>
            <table style="width: 100%; border: 1px solid #000; padding: 10px; border-collapse: collapse; margin-top: 10px;">
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px;"><strong>Vehicle Type:</strong></td>
                    <td style="padding: 8px;">${data.vehicleType}</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Base Fare:</strong></td>
                    <td style="padding: 8px;">${data.baseFare}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px;"><strong>Driver Allowance:</strong></td>
                    <td style="padding: 8px;">${data.driverAllownce}</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Toll, Parking & Tax:</strong></td>
                    <td style="padding: 8px;">${data.toll}</td>
                </tr>
                
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px;"><strong>GST Tax (5%):</strong></td>
                    <td style="padding: 8px;">${(5 / 100) * ((+data.baseFare) + (+data.toll) + (+data.driverAllownce))}</td>
                </tr>
                <tr>
                    <td style="padding: 8px;"><strong>Subtotal:</strong></td>
                    <td style="padding: 8px;">${(+data.toll) + (+data.driverAllownce) + (+data.baseFare) + ((5 / 100) * ((+data.baseFare) + (+data.toll) + (+data.driverAllownce)))}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                    <td style="padding: 8px;"><strong>Paid Amount:</strong></td>
                    <td style="padding: 8px;">${(+data.toll) + (+data.driverAllownce) + (+data.baseFare) + ((5 / 100) * ((+data.baseFare) + (+data.toll) + (+data.driverAllownce)))}</td>
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
            const html2pdf = (await import('html2pdf.js')).default;
            html2pdf().from(tempDiv).save('invoice.pdf');

                
            await axios.post("/api/id", { companyType: data.companyType, count: data.companyType === 'wtl' ? id.wtlId + 1 : id.aimcabId + 1 });

        }

    }

    return (
        <>
            <div className="mx-auto min-h-[100vh] p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Create Invoice</h2>
                <form onSubmit={handleFormSubmit} action="" className="space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Invoice for WTL or AimCab */}
                    <div>
                        <label htmlFor="companyType" className="block text-sm font-medium text-gray-600">Select Company</label>
                        <select
                            name="companyType"
                            id="companyType"
                            value={data.companyType}
                            onChange={(e) => setData({ ...data, companyType: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Company</option>
                            <option value="wtl">WTL</option>
                            <option value="aimcab">AimCab</option>
                        </select>
                    </div>

                    {/* Create for Passenger or Organization */}
                    <div>
                        <label htmlFor="invoiceFor" className="block text-sm font-medium text-gray-600">Create Invoice For</label>
                        <select
                            name="invoiceFor"
                            id="invoiceFor"
                            value={data.invoiceFor}
                            onChange={(e) => setData({ ...data, invoiceFor: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select</option>
                            <option value="passenger">Passenger</option>
                            <option value="organization">Organization</option>
                        </select>
                    </div>

                    {/* Passenger Name */}
                    <div>
                        <label htmlFor="pname" className="block text-sm font-medium text-gray-600">Passenger Name</label>
                        <input
                            type="text"
                            name='pname'
                            value={data.passengerName}
                            onChange={(e) => setData({ ...data, passengerName: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* vehicle Type */}
                    <div>
                        <label htmlFor="vtype" className="block text-sm font-medium text-gray-600">Vehicle Type</label>
                        <input
                            type="text"
                            name='vtype'
                            value={data.vehicleType}
                            onChange={(e) => setData({ ...data, vehicleType: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/*company gst */}
                    <div>
                        <label htmlFor="cGST" className="block text-sm font-medium text-gray-600">Company GST</label>
                        <input
                            type="text"
                            name='cGST'
                            value={data.companyGST}
                            onChange={(e) => setData({ ...data, companyGST: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    
                    {/* Journey Type */}
                    <div>
                        <label htmlFor="jtype" className="block text-sm font-medium text-gray-600">
                            Journey Type
                        </label>
                        <select
                            id="jtype"
                            name="jtype"
                            onChange={(e) => setData({ ...data, journeyType: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Journey Type</option>
                            <option value="oneway">One Way Trip</option>
                            <option value="roundtrip">Round Trip</option>
                            <option value="rental">Rental Trip</option>
                        </select>
                    </div>

                    {/* Company Name */}
                    <div>
                        <label htmlFor="cname" className="block text-sm font-medium text-gray-600">Company Name</label>
                        <input
                            type="text"
                            name='cname'
                            value={data.companyName}
                            onChange={(e) => setData({ ...data, companyName: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Company Email */}
                    <div>
                        <label htmlFor="cemail" className="block text-sm font-medium text-gray-600">Company Email</label>
                        <input
                            type="text"
                            name='cemail'
                            value={data.companyEmail}
                            onChange={(e) => setData({ ...data, companyEmail: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Company Mobile */}
                    <div>
                        <label htmlFor="cmobile" className="block text-sm font-medium text-gray-600">Company Mobile Number</label>
                        <input
                            type="tel"
                            name='cmobile'
                            value={data.companyMobile}
                            onChange={(e) => setData({ ...data, companyMobile: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Pickup Location */}
                    <div>
                        <label htmlFor="pickup" className="block text-sm font-medium text-gray-600">Pickup Location</label>
                        <input
                            type="text"
                            name='pickup'
                            value={data.pickupLocation}
                            onChange={(e) => setData({ ...data, pickupLocation: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Drop Location */}
                    <div>
                        <label htmlFor="drop" className="block text-sm font-medium text-gray-600">Drop Location</label>
                        <input
                            type="text"
                            name='drop'
                            value={data.dropLocation}
                            onChange={(e) => setData({ ...data, dropLocation: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Distance */}
                    <div>
                        <label htmlFor="distance" className="block text-sm font-medium text-gray-600">Distance (km)</label>
                        <input
                            type="number"
                            name='distance'
                            value={data.distance}
                            onChange={(e) => setData({ ...data, distance: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Start Date */}
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">Start Date</label>
                        <input
                            type="date"
                            name='startDate'
                            value={data.startDate}
                            onChange={(e) => setData({ ...data, startDate: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-600">End Date</label>
                        <input
                            type="date"
                            name='endDate'
                            value={data.endDate}
                            onChange={(e) => setData({ ...data, endDate: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Base Fare */}
                    <div>
                        <label htmlFor="baseFare" className="block text-sm font-medium text-gray-600">Base Fare</label>
                        <input
                            type="number"
                            name='baseFare'
                            value={data.baseFare}
                            onChange={(e) => setData({ ...data, baseFare: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Driver Allowance */}
                    <div>
                        <label htmlFor="driverAllownce" className="block text-sm font-medium text-gray-600">Driver Allowance</label>
                        <input
                            type="number"
                            name='driverAllownce'
                            value={data.driverAllownce}
                            onChange={(e) => setData({ ...data, driverAllownce: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Toll */}
                    <div>
                        <label htmlFor="toll" className="block text-sm font-medium text-gray-600">Toll</label>
                        <input
                            type="number"
                            name='toll'
                            value={data.toll}
                            onChange={(e) => setData({ ...data, toll: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Service Charge */}
                    {/* <div>
                        <label htmlFor="serviceCharge" className="block text-sm font-medium text-gray-600">Service Charge</label>
                        <input
                            type="number"
                            name='serviceCharge'
                            value={data.serviceCharge}
                            onChange={(e) => setData({ ...data, serviceCharge: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div> */}

                    {/* Subtotal */}
                    {/* <div>
                        <label htmlFor="subtotal" className="block text-sm font-medium text-gray-600">Subtotal</label>
                        <input
                            type="number"
                            name='subtotal'
                            value={data.subtotal}
                            onChange={(e) => setData({ ...data, subtotal: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div> */}

                    {/* Paid Amount */}
                    {/* <div>
                        <label htmlFor="paidAmount" className="block text-sm font-medium text-gray-600">Paid Amount</label>
                        <input
                            type="number"
                            name='paidAmount'
                            value={data.paidAmount}
                            onChange={(e) => setData({ ...data, paidAmount: e.target.value })}
                            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div> */}

                    {/* Submit Button */}
                    <div className="col-span-3">
                        <input
                            type="submit"
                            value={"SUBMIT"}
                            className="mt-4 w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateInvoice;
