import React, { useState } from 'react'
import { Paper, } from '@mui/material';

const PackageDetails = ({ data }) => {
    const [showBreakup, setShowBreakUp] = useState(false);
    return (
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <h3>Package Details</h3>
            <div className="table-container">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>Session id</th>
                            <th>Product Name</th>
                            <th> Sessions</th>
                            <th>Product Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.products.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.totalSessionsBooked}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div>
                    <p style={{ textAlign: "right", color: "grey", marginTop: "32px", marginBottom:"8px" }}>Total Order Amount: ₹ {data?.totalOrderPrice.toLocaleString("en-in")}</p>
                    <p style={{ textAlign: "right", color: "grey" }}>Total Order Discount: ₹ {(data?.totalOrderDiscount + parseInt(data?.products[0].walletAmount)).toLocaleString("en-in")} <span style={{ cursor: "pointer" }} onClick={() => setShowBreakUp(!showBreakup)}>{showBreakup ? "🔼" : "🔽"}</span></p>
                    {showBreakup &&
                        <>
                            <p style={{ textAlign: "right", color: "grey",fontSize:"12px" }}>( - ) Total Product Discount: ₹ {data?.totalOrderDiscount.toLocaleString("en-in")}</p>
                            {parseInt(data?.products[0].walletAmount) > 0 && <p style={{ textAlign: "right", color: "grey",fontSize:"12px" }} className='productSummaryPrice'>( - ) Credits Used: ₹ {parseInt(data?.products[0].walletAmount).toLocaleString("en-in")}</p>}
                        </>}
                    <p style={{ textAlign: "right", color: "grey",marginTop:"8px" }}>Total Amount Paid: ₹ {parseInt(data?.products[0].amountPaid).toLocaleString("en-in")}</p>
                    <p style={{ textAlign: "right", color: "grey",marginTop:"8px" }}>Total Payable Amount: ₹ {parseInt(data?.products[0].leftAmount).toLocaleString("en-in")}</p>
                </div>
            </div>
        </Paper>
    )
}

export default PackageDetails