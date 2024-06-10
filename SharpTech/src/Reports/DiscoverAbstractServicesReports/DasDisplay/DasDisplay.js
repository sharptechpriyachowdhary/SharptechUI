//reddy -code display
import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import * as autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
// npm install file-saver docx html-docx-js
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, Table, TableRow, TableCell } from "docx";
import htmlDocx from 'html-docx-js/dist/html-docx';
// import { createParagraph, createHeading, createTable, HeadingLevel } from './DocHelpers';

function DasDisplay() {

  const [etservice, setEtService] = useState(null);
  const { orderNumber } = useParams(); // Assuming you're using React Router hooks
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const result = await axios.get(`http://localhost:8080/fetch/${orderNumber}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        window.alert("Successfully fetched");
        console.log(result);
        setEtService(result.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    loadUser();
  }, [orderNumber]);

  const printDocument = () => {
    const input1 = document.getElementById('pdf-content1');
    const input2 = document.getElementById('pdf-content2');
    const input3 = document.getElementById('pdf-content3');

    const generatePDF = async () => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdf.internal.pageSize.getWidth();

      const addContentToPDF = async (input) => {
        const canvas = await html2canvas(input, {
          scrollY: -window.scrollY,
          scale: 2 // Increase the scale for better quality and larger size
        });
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pdf.internal.pageSize.getWidth() - 20; // Adjust width to fit within margins
        const imgHeight = (canvas.height / canvas.width) * imgWidth;
        let position = 0;
        let remainingHeight = imgHeight;

        while (remainingHeight > 0) {
          if (remainingHeight > pageHeight) {
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, pageHeight - 10);
            remainingHeight -= pageHeight - 10;
            position -= pageHeight - 10;
            pdf.addPage();
          } else {
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, remainingHeight);
            remainingHeight = 0;
          }
        }
      };

      await addContentToPDF(input1);
      pdf.addPage();
      await addContentToPDF(input2);
      pdf.addPage();
      await addContentToPDF(input3);

      pdf.save("et_service.pdf");
    };

    generatePDF();
  };
  const contentRef = useRef(null);
  const handleDownload = () => {
    const content = contentRef.current.innerHTML;
    const css = `
        <style>
            /* General styling */
            body {
                font-family: Arial, sans-serif;
                line-height: 1.5;
                font-size: 14px;
                color: #000;
                margin: 0;
                padding: 0;
            }

            /* Headings */
            h1, h2, h3, h4, h5, h6 {
                font-weight: bold;
                margin: 20px 0 10px;
            }

            /* Paragraphs */
            p {
                margin: 10px 0;
            }

            /* Lists */
            ul, ol {
                margin: 10px 0 10px 20px;
            }

            li {
                margin: 5px 0;
            }

            /* Tables */
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }

            th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
            }

            th {
                background-color: #f2f2f2;
            }

            /* Specific style for header row */
            .header-table {
                text-align: center;
                font-weight: bold;
                font-size: 1.2em;
                background-color: #4CAF50;
                color: white;
            }

            /* Links */
            a {
                color: #0000EE;
                text-decoration: underline;
            }

            /* Images */
            img {
                max-width: 100%;
                height: auto;
                margin: 10px 0;
            }

            /* Divs and Containers */
            #content-to-download {
                padding: 20px;
                background-color: #fff;
            }

            /* Miscellaneous */
            strong {
                font-weight: bold;
            }

            em {
                font-style: italic;
            }

            /* Page breaks for Word */
            @media print {
                .page-break {
                    page-break-before: always;
                }
            }

            .abstractform-table {
                border: 2px solid black;
                border-collapse: collapse;
                width: 100%;
            }

            .abstractform-table th, .abstractform-table td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
                vertical-align: top;
            }

            .abstractform-button-container {
                text-align: center;
                margin-top: 20px;
            }

            .abstractform-button {
                background-color: #4CAF50;
                color: white;
                padding: 10px 20px;
                border: none;
                cursor: pointer;
            }

            .abstractform-button:hover {
                background-color: #45a049;
            }
        </style>
    `;
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">${css}</head><body>${content}</body></html>`;
    const docxContent = htmlDocx.asBlob(html);
    saveAs(docxContent, 'document.docx');
  };
  // Usage of contentRef in your component
  // const MyComponent = () => {
  //  const contentRef = useRef();

  // const [data, setData] = useState(null);
  // if (!data) {
  //     return <div>Loading...</div>;
  // }
  // console.log("options2:", options2);
  // const creator = options2?.creator ?? "Un-named";
  // console.log("Creator:", creator);
  return (
    <div className='abstractform-container' ref={contentRef} id="content-to-download">
      {/* <h1>{data.creator ? data.creator.name : 'Unknown Creator'}</h1> */}
      <div id="pdf-content1">
        {/* First set of content to be converted */}
        {/* <img src="your-image-url.jpg" alt="Your Image" style={{ width: '100%', height: 'auto' }} /> */}
        <div >
          <br />
          <br />
          <br />
          <h1><b>DisplayAbsReport</b></h1>
          <br />
          {etservice && (
            <div>
              <center>
                <table className='abstractform-table'>
                  <tr>
                    <th className="header-table" colSpan={8}>PROPERTY INFO</th>
                  </tr>
                  <tr>
                    <th>ORDER NUMBER:</th>
                    <td colSpan={4}>{etservice.orderNumber}</td>
                    <th>REFERENCE NUMBER:</th>
                    <td colSpan={3}>{etservice.referenceNumber}</td>
                  </tr>
                  <tr>
                    <th>SEARCH DATE:</th>
                    <td colSpan={2}>{etservice.searchDate}</td>
                    <th>As Of</th>
                    <td colSpan={1}>7:30 AM</td>
                    <th>EFFECTIVE DATE:</th>
                    <td colSpan={3}>{etservice.effectiveDate}</td>
                  </tr>
                  <tr>
                    <th>PROPERTY ADDRESS:</th>
                    <td colSpan={7}>{etservice.propertyAddress}</td>
                  </tr>
                  <tr>
                    <th>STATE:</th>
                    <td colSpan={4}>{etservice.state}</td>
                    <th>COUNTY:</th>
                    <td colSpan={3}>{etservice.county}</td>
                  </tr>
                  <tr>
                    <th>BORROWER NAME:</th>
                    <td colSpan={7}>{etservice.borrowerName}</td>
                  </tr>
                  <tr>
                    <th>PARCEL NUMBER:</th>
                    <td colSpan={4}>{etservice.parcelNumber}</td>
                    <th>SUBDIVISION:</th>
                    <td colSpan={3}>{etservice.subdivision}</td>
                  </tr>
                  <tr>
                    <th>Lot/Unit:</th>
                    <td colSpan={4}>{etservice.lotUnit}</td>
                    <th>BLOCK:</th>
                    <td colSpan={3}>{etservice.block}</td>
                  </tr>
                  <tr>
                    <th>PROPERTY TYPE:</th>
                    <td colSpan={7}>{etservice.propertyType}</td>
                  </tr>
                </table>
              </center>
            </div>
          )}


          <br />
          <br />
          <br />
          <br />
          {etservice && etservice.vestingdeedinfo.map((vestingdeedinfo, index) => (
            <div key={index} >
              <center>
                <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
                  <tr>
                    <th className='header-table' colSpan="7"> {index === 0 ? "Vesting Information" : `Chain of Title ${index}`}  </th>
                  </tr>

                  <tr>

                  </tr>
                  <tr>
                    <th style={{ border: '1px solid black' }}> DEED TYPE </th>
                    <td colSpan={4} style={{ border: '1px solid black' }}>{vestingdeedinfo.deedType}

                    </td>
                    <th style={{ border: '1px solid black' }}> CONSIDERATION Amount : $ </th>
                    <td colSpan={'100%'} style={{ border: '1px solid black' }}>{vestingdeedinfo.considerationAmount}

                    </td>
                  </tr>

                  <tr>
                    <th style={{ border: '1px solid black' }}> GRANTOR : </th>
                    <td colSpan={'6'} style={{ border: '1px solid black' }}>{vestingdeedinfo.grantor}

                    </td>
                  </tr>
                  <tr>
                    <th style={{ border: '1px solid black' }}>GRANTEE : </th>
                    <td colSpan={6} style={{ border: '1px solid black' }}>{vestingdeedinfo.grantee}

                    </td>
                  </tr>

                  <tr>
                    <th style={{ border: '1px solid black' }}> VESTING INFO :</th>
                    <td colSpan={'4'} style={{ border: '1px solid black' }}>{vestingdeedinfo.vesting}
                    </td>

                    <th style={{ border: '1px solid black' }}>INSTR/BOOK/PAGE:</th>
                    <td colSpan={2} style={{ border: '1px solid black' }}>{vestingdeedinfo.instaBookPage}

                    </td>
                  </tr>

                  <tr>
                    <th style={{ border: '1px solid black' }}> DATED DATE: </th>
                    <td colSpan={'4'} style={{ border: '1px solid black' }}>{vestingdeedinfo.datedDate}

                    </td>

                    <th style={{ border: '1px solid black' }}>RECORDED DATE:</th>
                    <td colSpan={2} style={{ border: '1px solid black' }}>{vestingdeedinfo.deedTrecorderdDateype}

                    </td>
                  </tr>

                  <tr>
                    <th style={{ border: '1px solid black' }}>COMMENTS :</th>
                    <td colSpan={6} style={{ border: '1px solid black' }}>{vestingdeedinfo.comments}

                    </td>

                  </tr>
                </table>
              </center>
            </div>
          ))}
          <br />
          <br />
          {etservice && etservice.absopenmortgagedeedinfo.map((openmortagedeedinfo, mIndex) => (
            <div key={mIndex} >
              <center>
                <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }} >
                  <tr>
                    <th className='header-table' colSpan="7">OPEN MORTGAGE / DEED OF TRUST  - ({mIndex}) INFORMATION </th>
                  </tr>

                  <tr>
                    <th style={{ border: '1px solid black' }}> Mortgago </th>

                    <td colSpan={6} style={{ border: '1px solid black' }}>{openmortagedeedinfo.mortgago}</td>
                  </tr>

                  <tr>
                    <th style={{ border: '1px solid black' }}> MORTGAGEE </th>
                    <td colSpan={'6'} style={{ border: '1px solid black' }}>{openmortagedeedinfo.mortgagee}</td>
                  </tr>

                  <tr>
                    <th style={{ border: '1px solid black' }}> TRUSTEE </th>
                    <td colSpan={6} style={{ border: '1px solid black' }}>{openmortagedeedinfo.trustee}</td>
                  </tr>

                  <tr>
                    <th style={{ border: '1px solid black' }}> INSTRUMENT/BOOK/PAGE: </th>
                    <td colSpan={'4'} style={{ border: '1px solid black' }}>{openmortagedeedinfo.instrBookPage}</td>

                    <th style={{ border: '1px solid black' }}>Amount [$]:</th>
                    <td colSpan={2} style={{ border: '1px solid black' }}>{openmortagedeedinfo.amount}</td>
                  </tr>


                  <tr>
                    <th style={{ border: '1px solid black' }}> DATED DATE:
                    </th>
                    <td colSpan={'4'} style={{ border: '1px solid black' }}>{openmortagedeedinfo.datedDate}</td>

                    <th style={{ border: '1px solid black' }}>RECORDED DATE:</th>

                    <td colSpan={2} style={{ border: '1px solid black' }}>{openmortagedeedinfo.recordedDate}</td>
                  </tr>

                  <tr>
                    <td colSpan={5}></td>
                    <th style={{ border: '1px solid black' }}>MATURITY DATE</th>
                    <td colSpan={3} style={{ border: '1px solid black' }}>{openmortagedeedinfo.maturityDate}</td>
                  </tr>

                  <tr>
                    <th style={{ border: '1px solid black' }}> MORTGAGE ASSIGNED TO </th>

                    <td colSpan={'4'} style={{ border: '1px solid black' }}>{openmortagedeedinfo.mortgageAssignedTo}</td>

                    <th style={{ border: '1px solid black' }}>ASSIGNMENT BK/PG </th>
                    <td colSpan={2} style={{ border: '1px solid black' }}>{openmortagedeedinfo.assignmentBkPg}</td>
                  </tr>

                  <tr>
                    <th style={{ border: '1px solid black' }}> ASSIGNMENT DATED </th>

                    <td colSpan={'4'} style={{ border: '1px solid black' }}>{openmortagedeedinfo.assignmentDated === null ? "No Data" : openmortagedeedinfo.assignmentDated}</td>

                    <th style={{ border: '1px solid black' }}>ASSIGNMENT RECORDED: </th>
                    <td colSpan={2} style={{ border: '1px solid black' }}>{openmortagedeedinfo.assignmentRecorded === null ? "No Data" : openmortagedeedinfo.assignmentRecorded}</td>
                  </tr>

                  <tr>
                    <th style={{ border: '1px solid black' }}>COMMENTS</th>
                    <td colSpan={6} style={{ border: '1px solid black' }}>{openmortagedeedinfo.comments === null ? "No Data" : openmortagedeedinfo.comments}</td>
                  </tr>
                </table>
              </center>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <div id="pdf-content2">
        {/* Second set of content to be converted */}
        <br />
        <br />
        <div >
          <center>
            <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th className='header-table' colSpan="16"> ACTIVE JUDGMENTS AND LIENS</th>
                </tr>
                <tr style={{ border: '1px solid black', }}>
                  <th style={{ border: '1px solid black' }} scope="col">CASE TYPE</th>
                  <th style={{ border: '1px solid black' }} scope="col">BK&PG/CASE NO/INSTR NO</th>
                  <th style={{ border: '1px solid black' }} scope="col">RECORDING DATE</th>
                  <th style={{ border: '1px solid black' }} scope="col">AMOUNT</th>

                  {/* <th className="mx-2" scope="col">Action</th>*/}
                </tr>
              </thead>
              <tbody>
                {etservice && etservice.absActiveJudgementsAndLines.map((activejudgmentsandliens, index) => (
                  <tr key={index} style={{ border: '1px solid black' }}>
                    <td style={{ border: '1px solid black' }}>{activejudgmentsandliens.caseType}</td>
                    <td style={{ border: '1px solid black' }}>{activejudgmentsandliens.bkPgCaseNo}</td>
                    <td style={{ border: '1px solid black' }}>{activejudgmentsandliens.recordingDate}</td>
                    <td style={{ border: '1px solid black' }}>{activejudgmentsandliens.Amount}</td>


                  </tr>
                ))}
              </tbody>
            </table>
          </center>
        </div>
        <br />
        {etservice && etservice.assessementsAndTaxInfo.map((taxinformation, tindex) => (
          <div id="taxInformation" key={tindex}>
            <br />
            <center>
              <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }} >
                <tr>
                  <th className='header-table' colSpan="4">TAX INFORMATION </th>
                </tr>
                <tr >
                  <th style={{ border: '1px solid black' }}>ASSESMENT YEAR</th>
                  <th style={{ border: '1px solid black' }}>2023</th>
                  <th style={{ border: '1px solid black' }}>TAX YEAR</th>
                  <th style={{ border: '1px solid black' }}>2023</th>
                </tr>

                <tr>
                  <td colSpan='1' style={{ border: '1px solid black' }} > LAND VALUE </td>
                  <td colSpan='1' style={{ border: '1px solid black' }} >{taxinformation.landValue}</td>
                  <td colSpan='1' style={{ border: '1px solid black' }} > Building Value </td>
                  <td colSpan='1' style={{ border: '1px solid black' }} >{taxinformation.buildingValue}</td>
                </tr>

                <tr>
                  <td colSpan='1' style={{ border: '1px solid black' }} > TOTAL VALUE </td>
                  <td colSpan='1' style={{ border: '1px solid black' }} >{taxinformation.totalValue}</td>
                  <td colSpan='1' style={{ border: '1px solid black' }} > EXEMPTION </td>
                  <td colSpan='1' style={{ border: '1px solid black' }} >{taxinformation.excemption}</td>
                </tr>

                <tr className='header-table'>
                  <th style={{ border: '1px solid black' }}>INSTALLMENT</th>
                  <th style={{ border: '1px solid black' }}>AMOUNT</th>
                  <th style={{ border: '1px solid black' }}>STATUS</th>
                  <th style={{ border: '1px solid black' }}>PAID/DUE DATE</th>

                </tr>
                {etservice && etservice.taxinstallments.map((taxinstallment, tindex) => (
                  <tr key={tindex}>
                    <td colSpan='1' style={{ border: '1px solid black' }} >{tindex === 0 ? `${tindex + 1}st Installment` : tindex === 1 ? ` ${tindex + 1}nd Installemnt` : tindex === 2 ? `${tindex + 1}rd Installment` : `${tindex + 1}th Installemnt`}</td>
                    <td colSpan='1' style={{ border: '1px solid black' }} >{taxinstallment.amount}</td>
                    <td colSpan='1' style={{ border: '1px solid black' }} >{taxinstallment.status}</td>
                    <td colSpan='1' style={{ border: '1px solid black' }} >{taxinstallment.paidDueDate}</td>
                  </tr>
                ))}


                <tr>
                  <th className='tr-color' style={{ border: '1px solid black' }}> Notes </th>
                  <td colSpan={6} style={{ border: '1px solid black' }}>{taxinformation.notes}</td>
                </tr>
              </table>
            </center>
          </div>
        ))}
        <br />
        <br />
        <br />

        <center>
          <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
            <tr >
              <th className='header-table' colSpan={5}>Names Runs</th>
            </tr>
            <tr className='heading-table'>
              <th style={{ border: '1px solid black', width: '25%' }}> Names</th>
              <th style={{ border: '1px solid black' }}>  JUD </th>
              <th style={{ border: '1px solid black' }}> Liens </th>
              <th style={{ border: '1px solid black' }}>UCC</th>
              <th style={{ border: '1px solid black' }}>Others</th>
            </tr>

            {etservice && etservice.namesrun.map((nameruns, nindex) => (
              <tr key={nindex}>
                <td style={{ border: '1px solid black' }}>{nameruns.name}</td>
                <td style={{ border: '1px solid black' }}>{nameruns.jud === null ? "X" : nameruns.jud}</td>
                <td style={{ border: '1px solid black' }}>{nameruns.liens === null ? "X" : nameruns.liens}</td>
                <td style={{ border: '1px solid black' }}>{nameruns.ucc === null ? "X" : nameruns.ucc}</td>
                <td style={{ border: '1px solid black' }}>{nameruns.others === null ? "X" : nameruns.others}</td>
              </tr>
            ))}
          </table>
          <br />
        </center>

        <br />
        {etservice && (
          <center>
            <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
              <tr>
                <th className="header-table" colSpan="5"> SHORT LEGAL DESCRIPTION </th>

              </tr>

              <tr>

                <td colSpan={1} style={{ border: '1px solid black' }}>
                  FOR COMPLETE LEGAL DESCRIPTION SEE ATTACHED VESTING DEED
                  <br />
                  <br />
                  <br />
                  <br />
                  <th style={{ border: '1px solid black' }}>PROPERTY ADDRESS :</th>
                  <td colSpan={6} style={{ border: '1px solid black' }}>
                    {etservice.propertyAddress}
                    {/* {etservice.propertyAddress === null ? "No" : {etservice.propertyAddress}}  */}

                  </td>
                </td>
                <br />
              </tr>


            </table>
          </center>
        )}
      </div>
      <br />
      <br />

      <br />
      <br />
      <div id="pdf-content3">
        {/* Third set of content to be converted */}

        <br />
        <br />

        <br />


        <br />
        <br />
        {etservice && (
          <div className='abstractreport-container-13'>
            <br />

          </div>
        )}
        <br />
        <br />

        <center>
          <table className='abstractform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }} >

            <tr>
              <th className='header-table' colSpan="5">DISCLAIMER</th>
            </tr>

            <tr>
              <td colSpan='1' style={{ border: '1px solid black' }}>This title search report was performed in accordance with generally accepted standards. This report may not contain information
                affecting above real estate property that cannot be indexed due to different spelling of owner's name or incorrectly recorded
                parcel number or recorder clerk error. Taxes are informational purposes only, all information contained herein are obtained
                from Tax collectors office/website. Please do check for any additional levies and assessments before settlement. We makes no
                warranties, and assumes no liability whatsoever for the accuracy of the information contained herein beyond the exercise of
                such reasonable care.</td>
            </tr>

          </table>
        </center>
        <br />
      </div>
      <br />
      <br />

      <br />
      <div className='abstractform-button-container'>
        <button className='abstractform-button' onClick={printDocument}>Download PDF</button>
        <br />
        <br />
        {/* <button className='abstractform-button' onClick={generateWordDocument}>Download word</button> */}
      </div>
      <button className="abstractform-button" onClick={handleDownload}>Download as DOCX</button>
    </div>

  )
}

export default DasDisplay
