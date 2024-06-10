import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";

function EtServices() {

  const onSubmit = async (e) => {

    e.preventDefault();
    try {

      const token = localStorage.getItem('token');

      const payload = {
        etgeneralinfo: {
          orderNumber: orderNumber,
          refeenceNumber: refeenceNumber,
          searchDate: searchDate,
          effectiveDate: effectiveDate,
          propertyAdderess: propertyAdderess,
          state: state,
          country: country,
          parcelNumber: parcelNumber,
          subDivision: subDivision,
          lotUnit: lotUnit,
          block: block,
          sfrPudCondo: sfrPudCondo,
          etvestinginfo: tablesData.map(table => ({ indicator: table.indicator, ...table.data })),
          etopenmortagedeedinfo: tablesData2.map(table => ({ indicator: table.indicator, ...table.data })),
          etactivejudgmentsandliens: tableRowsData.map(row => ({ ...row.data })),
          ettaxinformation: [
            {
              landValue: landValue,
              buildingValue: buildingValue,
              totalValue: buildingValue,
              excemption: excemption,
              notes: notes
            }
          ],
          etnameruns: nameRunData.map(row => ({ ...row.data })),
          ettaxinstallment: tableTaxInstaData.map(row => ({ ...row.data })),
        }
      };
      await axios.post("http://localhost:8080/etinsert", payload,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      window.alert("Data Sent Sucessfully");


    } catch (error) {
      console.error("Registration failed:", error);
      window.alert("Data Not Sent Somthing went Wrong"); // Handle error if registration fails

    }
  };

  const [user, setUser] = useState({

    orderNumber: "",
    refeenceNumber: "",
    searchDate: "",
    effectiveDate: "",
    propertyAdderess: "",
    state: "",
    country: "",
    parcelNumber: "",
    subDivision: "",
    lotUnit: "",
    block: "",
    sfrPudCondo: "",
  })

  const [taxinfo, setTaxInfo] = useState({
    landValue: "",
    buildingValue: "",
    totalValue: "",
    excemption: "",
    notes: "",
  })

  const { orderNumber, refeenceNumber, searchDate, effectiveDate, propertyAdderess, state, country, parcelNumber,
    subDivision, lotUnit, block, sfrPudCondo } = user

  const { landValue, buildingValue, totalValue, excemption, notes } = taxinfo


  const onInputChange2 = (e) => {

    setTaxInfo({ ...taxinfo, [e.target.name]: e.target.value })


  };

  const onInputChange = (e) => {

    setUser({ ...user, [e.target.name]: e.target.value })


  };

  const getTableName = (index) => {
    if (index === 1) return 'VESTING INFORMATION';
    else return `CHAIN OF TITLE ${index - 1}`;
  };



  const [tablesData, setTablesData] = useState([{ id: 1, indicator: 0, data: {}, name: 'VESTING INFORMATION' }]);
  const [nextTableId, setNextTableId] = useState(2);

  const [tablesData2, setTablesData2] = useState([{ id: 1, indicator: 0, data: {} }]);
  const [nextTableId2, setNextTableId2] = useState(2);

  const [tableRowsData, setTableRowsData] = useState([
    { id: 1, data: {} },
    { id: 2, data: {} },
    { id: 3, data: {} }
  ]);
  const [nextRowsId, setNextRowsId] = useState(4);

  const [nameRunData, setNameRunData] = useState([
    { id: 1, data: {} },
    { id: 2, data: {} },
  ]);
  const [nextNameRunId, setNextNameRunId] = useState(4);



  const [tableTaxInstaData, setTableTaxInstaData] = useState([
    { id: 1, data: {} },
    { id: 2, data: {} },
  ]);
  const [nextTableTaxInstaId, setNextTableTaxInstaId] = useState(2);


  const handleInputChange = (e, tableId) => {
    const { name, value } = e.target;
    const updatedTablesData = tablesData.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          data: {
            ...table.data,
            [name]: value
          }
        };
      }
      return table;
    });
    setTablesData(updatedTablesData);
  };


  const handleInputChange2 = (e, tableId) => {
    const { name, value } = e.target;
    const updatedTablesData2 = tablesData2.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          data: {
            ...table.data,
            [name]: value
          }
        };
      }
      return table;
    });
    setTablesData2(updatedTablesData2);
  };


  const handleChange = (e, rowId) => {
    const { name, value } = e.target;
    const updatedTableRowsData = tableRowsData.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          data: {
            ...row.data,
            [name]: value
          }
        };
      }
      return row;
    });
    setTableRowsData(updatedTableRowsData);
  };


  const handleChangeNameRun = (e, rowId) => {
    const { name, value } = e.target;
    const updatedNameRunData = nameRunData.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          data: {
            ...row.data,
            [name]: value
          }
        };
      }
      return row;
    });
    setNameRunData(updatedNameRunData);
  };

  const handleInputChangeTaxInsta = (e, rowId) => {
    const { name, value } = e.target;
    const updatedTableTaxInstaData = tableTaxInstaData.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          data: {
            ...row.data,
            [name]: value
          }
        };
      }
      return row;
    });
    setTableTaxInstaData(updatedTableTaxInstaData);
  };





  const handleAddTable = (e) => {
    e.preventDefault();
    const newTableId = nextTableId;
    const newName = getTableName(newTableId); // const newTableId = tablesData.length + 1;

    const newIndicator = tablesData.length;
    setTablesData([...tablesData, { id: newTableId, indicator: newIndicator, data: {}, name: newName }]);
    setNextTableId(newTableId + 1);
  };

  const handleDeleteTable = (idToDelete) => {
    const updatedTables = tablesData.filter(table => table.id !== idToDelete);
    setTablesData(updatedTables);
  };



  const handleAddTable2 = (e) => {
    e.preventDefault();
    const newTableId2 = nextTableId2;   // const newTableId = tablesData.length + 1;       
    const newIndicator = tablesData2.length;
    setTablesData2([...tablesData2, { id: newTableId2, indicator: newIndicator, data: {} }]);
    setNextTableId2(newTableId2 + 1);
  };

  const handleDeleteTable2 = (idToDelete) => {
    const updatedTables2 = tablesData2.filter(table => table.id !== idToDelete);
    setTablesData2(updatedTables2);
  };


  const handleAddRow = (e) => {
    e.preventDefault()
    const newRowsId = nextRowsId;
    const newRow = { id: newRowsId, data: {} };
    setTableRowsData([...tableRowsData, newRow]);
    setNextRowsId(newRowsId + 1);
  };

  const handleDeleteLastRow = () => {
    if (tableRowsData.length > 0) {
      const updatedRows = tableRowsData.slice(0, -1); // Remove the last row
      setTableRowsData(updatedRows);
    }
  };

  const handleAddNameRow = (e) => {
    e.preventDefault()
    const newNameRunId = nextNameRunId;
    const newRow = { id: newNameRunId, data: {} };
    setNameRunData([...nameRunData, newRow]);
    setNextNameRunId(newNameRunId + 1);
  };

  const handleDeleteLastNameRow = () => {
    if (nameRunData.length > 0) {
      const updatedRows = nameRunData.slice(0, -1); // Remove the last row
      setNameRunData(updatedRows);
    }
  };

  const handleAddTaxInstaRow = (e) => {
    e.preventDefault()
    const newTableTaxInstaId = nextTableTaxInstaId;
    const newRow = { id: newTableTaxInstaId, data: {} };
    setTableTaxInstaData([...tableTaxInstaData, newRow]);
    setNextTableTaxInstaId(newTableTaxInstaId + 1);
  };

  const handleDeleteLastTaxInstaRow = () => {
    if (tableTaxInstaData.length > 0) {
      const updatedRows = tableTaxInstaData.slice(0, -1); // Remove the last row
      setTableTaxInstaData(updatedRows);
    }
  };






  return (
    <div className='serviceform-container'>



      <form onSubmit={(e) => onSubmit(e)}>
        <table className='border-table' style={{ border: '2px solid black', }}>


          <br />
          <h1><b>ETrack Title Services Inc</b></h1>
          <h1><b>Page 1</b></h1>
          {/* --------------------------------------------------------------Table 1-----------------------------------------------*/}
          <div>

            <br />
            <center>
              <table className='serviceform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
                <tr>
                  <th className='th-color' colSpan="7"> GENERAL INFORMATION </th>
                </tr>

                <tr>
                  <th style={{ border: '1px solid black' }}>ORDER NUMBER</th>
                  <td colSpan={4} style={{ border: '1px solid black' }}>
                    <input type="text" placeholder="Enter order Number" className="service-control" name="orderNumber" value={orderNumber} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} required />

                  </td>
                  <th style={{ border: '1px solid black' }}> ET REFERENCE NUMBER </th>
                  <td colSpan={'100%'} style={{ border: '1px solid black' }}>
                    <input type="text" placeholder='Enter Reference Number' className="service-control" name='refeenceNumber' value={refeenceNumber} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                  </td>
                </tr>

                <tr>
                  <th style={{ border: '1px solid black' }}>SERCH DATE</th>
                  <td colSpan={'2'} style={{ border: '1px solid black' }}>
                    <input type="Date" className="service-control" placeholder="Enter Serch Data" name="searchDate" value={searchDate} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                  </td>

                  <th style={{ border: '1px solid black' }}>As Of</th>
                  <td >7:30 Am</td>

                  <th style={{ border: '1px solid black' }}>Effective Date</th>
                  <td colSpan={2} style={{ border: '1px solid black' }}>
                    <input type="Date" className="service-control" placeholder="Enter Effective Data " name="effectiveDate" value={effectiveDate} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                  </td>
                </tr>

                <tr>

                  <th style={{ border: '1px solid black' }}>Property Address</th>
                  <td colSpan={6} style={{ border: '1px solid black' }}>
                    <input type="text" className="service-control" placeholder="Enter Address " name="propertyAdderess" value={propertyAdderess} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                  </td>

                </tr>

                <tr>
                  <th style={{ border: '1px solid black' }}> State </th>
                  <td colSpan={'4'} style={{ border: '1px solid black' }}>
                    <input type="text" className="service-control" name="state" placeholder='Enter State' value={state} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                  </td>

                  <th style={{ border: '1px solid black' }}> Country </th>
                  <td colSpan={2} style={{ border: '1px solid black' }}>
                    <input type="text" className="service-control" placeholder="Enter Country" name="country" value={country} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                  </td>
                </tr>

                <tr>
                  <th style={{ border: '1px solid black' }}> Parcel Number </th>
                  <td colSpan={'4'} style={{ border: '1px solid black' }}>
                    <input type="text" className="service-control" placeholder='Enter Parcel Number' name="parcelNumber" value={parcelNumber} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                  </td>

                  <th style={{ border: '1px solid black' }}> Sub Division </th>
                  <td colSpan={2} style={{ border: '1px solid black' }}>
                    <input type="text" className="service-control" placeholder="Enter Sub Division" name="subDivision" value={subDivision} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                  </td>
                </tr>

                <tr>
                  <th style={{ border: '1px solid black' }}> Lot/Unit </th>
                  <td colSpan={'4'} style={{ border: '1px solid black' }}>
                    <input type="text" className="service-control" placeholder='Enter Unit' name="lotUnit" value={lotUnit} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                  </td>
                  <th style={{ border: '1px solid black' }}>Block</th>
                  <td colSpan={2} style={{ border: '1px solid black' }}>
                    <input type="text" className="service-control" placeholder="Enter Block" name="block" value={block} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                  </td>
                </tr>

                <tr>
                  <th style={{ border: '1px solid black' }}>SFR/PUD/CONDO</th>
                  <td colSpan={'4'} style={{ border: '1px solid black' }}>
                    <input type="text" className="service-control" placeholder='Enter SFR/PUD/CONDO' name="sfrPudCondo" value={sfrPudCondo} onChange={(e) => onInputChange(e)} style={{ width: '100%' }} />
                  </td>
                  <td colSpan={'1'} style={{ border: '1px solid black' }}></td>
                  <td colSpan={'1'} style={{ border: '1px solid black' }}></td>

                </tr>
              </table>
            </center>
            <br />
          </div>

          {/* --------------------------------------------------------------Table 2-----------------------------------------------*/}

          <div>
            {tablesData.map(table => (
              <div key={table.id} >

                <br />
                <center>
                  <table className='serviceform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
                    <tr>
                      <th className='th-color' colSpan="7"> {table.name} </th>
                    </tr>
                    <tr>
                      <th style={{ border: '1px solid black' }}> Deed Type </th>
                      <td colSpan={4} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter  Deed Type" name="deedType" style={{ width: '100%' }} onChange={(e) => handleInputChange(e, table.id)} />
                      </td>
                      <th style={{ border: '1px solid black' }}> Consideration Amount: </th>
                      <td colSpan={'100%'} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter Consideration Amount" name="considerationAmount" style={{ width: '100%' }} onChange={(e) => handleInputChange(e, table.id)} />
                      </td>
                    </tr>

                    <tr>
                      <th style={{ border: '1px solid black' }}> Grantor </th>
                      <td colSpan={'6'} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter Grantor" name="grantor" style={{ width: '100%' }} onChange={(e) => handleInputChange(e, table.id)} />
                      </td>
                    </tr>
                    <tr>
                      <th style={{ border: '1px solid black' }}> Grantee </th>
                      <td colSpan={6} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter Grantee" name="grantee" style={{ width: '100%' }} onChange={(e) => handleInputChange(e, table.id)} />
                      </td>
                    </tr>

                    <tr>
                      <th style={{ border: '1px solid black' }}> Vesting </th>
                      <td colSpan={'4'} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter Vesting" name="vesting" style={{ width: '100%' }} onChange={(e) => handleInputChange(e, table.id)} />
                      </td>

                      <th style={{ border: '1px solid black' }}>INSTR/BOOK/PAGE:</th>
                      <td colSpan={2} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter INSTR/BOOK/PAGE" name="instrBookPage" style={{ width: '100%' }} onChange={(e) => handleInputChange(e, table.id)} />
                      </td>
                    </tr>

                    <tr>
                      <th style={{ border: '1px solid black' }}> DATED DATE: </th>
                      <td colSpan={'4'} style={{ border: '1px solid black' }}>
                        <input type="Date" className="service-control" placeholder="Enter Date" name="datedDate" style={{ width: '100%' }} onChange={(e) => handleInputChange(e, table.id)} />
                      </td>

                      <th style={{ border: '1px solid black' }}>RECORDED DATE:</th>
                      <td colSpan={2} style={{ border: '1px solid black' }}>
                        <input type="Date" className="service-control" placeholder="Enter RECORDED DATE" name="recordDate" style={{ width: '100%' }} onChange={(e) => handleInputChange(e, table.id)} />
                      </td>
                    </tr>

                    <tr>
                      <th style={{ border: '1px solid black' }}>Notes</th>
                      <td colSpan={6} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter Notes" name="note" style={{ width: '100%' }} onChange={(e) => handleInputChange(e, table.id)} />
                      </td>

                    </tr>


                  </table>
                </center>
                {table.id > 1 && (
                  <button className="btn-delete" onClick={() => handleDeleteTable(table.id)}>Delete Table</button>
                )} <button className='btn-style' onClick={handleAddTable}>Add Table</button>
              </div>
            ))}


            <br />
          </div>
          <br />

          {/* --------------------------------------------------------------Table 3-----------------------------------------------*/}

          <h1><b>Page 2</b></h1>
          <div>
            {tablesData2.map(table => (
              <div key={table.id} >

                <br />
                <center>
                  <table className='serviceform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }} >
                    <tr>
                      <th className='th-color' colSpan="7">OPEN MORTGAGE / DEED OF TRUST  - ({table.id}) INFORMATION </th>
                    </tr>

                    <tr>
                      <th style={{ border: '1px solid black' }}> Mortgago </th>

                      <td colSpan={6} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter  MORTGAGO" name="mortgago" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />

                      </td>
                    </tr>

                    <tr>
                      <th style={{ border: '1px solid black' }}> MORTGAGEE </th>
                      <td colSpan={'6'} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder='Enter MORTGAGEE' name="mortgagee" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                      </td>
                    </tr>

                    <tr>
                      <th style={{ border: '1px solid black' }}> TRUSTEE </th>
                      <td colSpan={6} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter TRUSTEE" name="trustee" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                      </td>
                    </tr>

                    <tr>
                      <th style={{ border: '1px solid black' }}> INSTRUMENT/BOOK/PAGE: </th>
                      <td colSpan={'4'} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter INSTRUMENT/BOOK/PAGE:" name="instBookPage" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                      </td>

                      <th style={{ border: '1px solid black' }}>Amount [$]:</th>
                      <td colSpan={2} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="$ Enter Amount" name="amount" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                      </td>
                    </tr>


                    <tr>
                      <th style={{ border: '1px solid black' }}> DATED DATE:
                      </th>
                      <td colSpan={'4'} style={{ border: '1px solid black' }}>
                        <input type="Date" className="service-control" name="datedDate" placeholder='Enter DATED DATE:' style={{ width: '100%' }} onChange={(e) => handleInputChange(e, table.id)} />
                      </td>

                      <th style={{ border: '1px solid black' }}>RECORDED DATE:</th>

                      <td colSpan={2} style={{ border: '1px solid black' }}>
                        <input type="Date" className="service-control" placeholder="Enter RECORDED DATE" name="recordedDate" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />

                      </td>
                    </tr>

                    <tr>
                      <td colSpan={5}></td>
                      <th style={{ border: '1px solid black' }}>Maturity Date:</th>
                      <td colSpan={3} style={{ border: '1px solid black' }}>
                        <input type="Date" className="service-control" placeholder="Enter Maturity Date" name="maturityDate" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />

                      </td>
                    </tr>

                    <tr>
                      <th style={{ border: '1px solid black' }}> MORTGAGE ASSIGNED TO </th>

                      <td colSpan={'4'} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" name="mortageAssiTo" placeholder='Enter MORTGAGE ASSIGNED TO' style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                      </td>

                      <th style={{ border: '1px solid black' }}>ASSIGNMENT BK/PG </th>
                      <td colSpan={2} style={{ border: '1px solid black' }}>
                        <input type="Number" className="service-control" placeholder="Enter ASSIGNMENT BK/PG" name="assiBkPg" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                      </td>
                    </tr>

                    <tr>
                      <th style={{ border: '1px solid black' }}> ASSIGNMENT DATED </th>

                      <td colSpan={'4'} style={{ border: '1px solid black' }}>
                        <input type="Date" className="service-control" name="assiDated" placeholder='Enter ASSIGNMENT DATED' style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                      </td>

                      <th style={{ border: '1px solid black' }}>ASSIGNMENT RECORDED: </th>
                      <td colSpan={2} style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter ASSIGNMENT RECORDED:" name="assiRecorded" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />
                      </td>
                    </tr>

                    <tr>
                      <th style={{ border: '1px solid black' }}>Additional Infromation</th>
                      <td colSpan={6} style={{ border: '1px solid black' }}>
                        <input type='text-area' className="service-control" placeholder="Enter Additional Infromation" name="additionalInformation" style={{ width: '100%' }} onChange={(e) => handleInputChange2(e, table.id)} />

                      </td>
                    </tr>
                  </table>
                </center>
                {table.id > 1 && (
                  <button className="btn-delete" onClick={() => handleDeleteTable2(table.id)}>Delete Table</button>
                )} <button className='btn-style' onClick={handleAddTable2}>Add Table</button>
              </div>
            ))}

            <br />
          </div>
          <br />

          <h1><b>Page 3</b></h1>
          {/* --------------------------------------------------------------Table 4-----------------------------------------------*/}
          <div>
            <br />
            <center>
              <table className='serviceform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
                {/* Table headers */}
                <thead>
                  <tr className='th-color'>
                    <th colSpan={4}>ACTIVE JUDGMENTS AND LIENS</th>
                  </tr>
                  <tr className='th-color'>
                    <th style={{ border: '1px solid black' }}>CASE NUMBER</th>
                    <th style={{ border: '1px solid black' }}>DESCRIPTION</th>
                    <th style={{ border: '1px solid black' }}>DATE RECORDED</th>
                    <th style={{ border: '1px solid black' }}>AMOUNT</th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {tableRowsData.map((row) => (
                    <tr key={row.id}>
                      <td style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter Case Number" name="caseNumbe" onChange={e => handleChange(e, row.id)} style={{ width: '100%' }} />
                      </td>
                      <td style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter Description" name="description" onChange={e => handleChange(e, row.id)} style={{ width: '100%' }} />
                      </td>
                      <td style={{ border: '1px solid black' }}>
                        <input type="Date" className="service-control" placeholder="Enter Date" name="dateRecorded" onChange={e => handleChange(e, row.id)} style={{ width: '100%' }} />
                      </td>
                      <td style={{ border: '1px solid black' }}>
                        <input type="text" className="service-control" placeholder="Enter Amount" name="amount" onChange={e => handleChange(e, row.id)} style={{ width: '100%' }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* <button className='btn-style' onClick={handleAddRow}>Add Row</button> */}

            </center>
            <button className='btn-style' onClick={handleAddRow}>Add Row</button>
            {tableRowsData.length > 3 && (
              <button type="button" className='btn-style' onClick={handleDeleteLastRow}>Delete Row</button>
            )}
            <br />
          </div>


          {/* --------------------------------------------------------------Table 5-----------------------------------------------*/}

          <div>
            <br />
            <center>
              <table className='serviceform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }} >
                <tr>
                  <th className='th-color' colSpan="4">TAX INFORMATION </th>
                </tr>
                <tr className='th-color'>
                  <th style={{ border: '1px solid black' }}>ASSESMENT YEAR</th>
                  <th style={{ border: '1px solid black' }}>2023</th>
                  <th style={{ border: '1px solid black' }}>TAX YEAR</th>
                  <th style={{ border: '1px solid black' }}>2023</th>
                </tr>

                <tr>
                  <td colSpan='1' style={{ border: '1px solid black' }} > LAND VALUE </td>
                  <td colSpan='1' style={{ border: '1px solid black' }} >
                    <input type="text" className="service-control" placeholder="Enter LandValue" name="landValue" value={landValue} onChange={(e) => onInputChange2(e)} style={{ width: '100%' }} />
                  </td>
                  <td colSpan='1' style={{ border: '1px solid black' }} > Building Value </td>
                  <td colSpan='1' style={{ border: '1px solid black' }} >
                    <input type="text" className="service-control" placeholder="Enter BuildingValue" name="buildingValue" value={buildingValue} onChange={(e) => onInputChange2(e)} style={{ width: '100%' }} />
                  </td>
                </tr>

                <tr>
                  <td colSpan='1' style={{ border: '1px solid black' }} > TOTAL VALUE </td>
                  <td colSpan='1' style={{ border: '1px solid black' }} >
                    <input type="text" className="service-control" placeholder="Enter TotalValue" name="totalValue" value={totalValue} onChange={(e) => onInputChange2(e)} style={{ width: '100%' }} />
                  </td>
                  <td colSpan='1' style={{ border: '1px solid black' }} > EXEMPTION </td>
                  <td colSpan='1' style={{ border: '1px solid black' }} >
                    <input type="text" className="service-control" placeholder="Enter Excemption" name="excemption" value={excemption} onChange={(e) => onInputChange2(e)} style={{ width: '100%' }} />
                  </td>
                </tr>

                <tr>
                  <th style={{ border: '1px solid black' }}>INSTALLMENT</th>
                  <th style={{ border: '1px solid black' }}>AMOUNT</th>
                  <th style={{ border: '1px solid black' }}>STATUS</th>
                  <th style={{ border: '1px solid black' }}>PAID/DUE DATE</th>

                </tr>
                {tableTaxInstaData.map((row) => (
                  <tr key={row.id}>
                    <td colSpan='1' style={{ border: '1px solid black' }} >{row.id - 1 === 0 ? `${row.id}st Installment` : row.id - 1 === 1 ? ` ${row.id}nd Installemnt` : row.id - 1 === 2 ? `${row.id}rd Installment` : `${row.id}th Installemnt`}</td>
                    <td colSpan='1' style={{ border: '1px solid black' }} >
                      <input type="text" className="service-control" name="amount" placeholder='Enter Amount' onChange={e => handleInputChangeTaxInsta(e, row.id)} style={{ width: '100%' }} />
                    </td>
                    <td colSpan='1' style={{ border: '1px solid black' }} >
                      <input type="text" className="service-control" name="status" placeholder='Enter Status' onChange={e => handleInputChangeTaxInsta(e, row.id)} style={{ width: '100%' }} />                                </td>
                    <td colSpan='1' style={{ border: '1px solid black' }} >
                      <input type="Date" className="service-control" name="paidDueDate" placeholder='Enter Date' onChange={e => handleInputChangeTaxInsta(e, row.id)} style={{ width: '100%' }} />
                    </td>
                  </tr>
                ))}
                <tr>
                  <th style={{ border: '1px solid black' }}> Notes </th>
                  <td colSpan={6} style={{ border: '1px solid black' }}>
                    <input type='text-area' className="service-control" placeholder="Enter Notes" name="notes" value={notes} onChange={(e) => onInputChange2(e)} style={{ width: '100%' }} />
                  </td>
                </tr>
              </table>
              <button className='btn-style' onClick={handleAddTaxInstaRow}>Add Row</button>
              {tableTaxInstaData.length > 2 && (
                <button type="button" className='btn-style' onClick={handleDeleteLastTaxInstaRow}>Delete Row</button>
              )}

            </center>

          </div>
          <br />

          {/* --------------------------------------------------------------Table 6-----------------------------------------------*/}
          <div>
            <br />
            <center>
              <table className='serviceform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
                <tr >
                  <th className='th-color' colSpan={5}>Names Runs</th>
                </tr>
                <tr className='th-color'>
                  <th style={{ border: '1px solid black', width: '25%' }}> Names</th>
                  <th style={{ border: '1px solid black' }}>  JUD </th>
                  <th style={{ border: '1px solid black' }}> Liens </th>
                  <th style={{ border: '1px solid black' }}>UCC</th>
                  <th style={{ border: '1px solid black' }}>Others</th>
                </tr>

                {nameRunData.map((row) => (
                  <tr>
                    <td style={{ border: '1px solid black' }}>
                      <input type="text" className="service-control" name="name" placeholder='Enter Name' onChange={e => handleChangeNameRun(e, row.id)} style={{ width: '100%' }} />

                    </td>
                    <td style={{ border: '1px solid black' }}>X</td>
                    <td style={{ border: '1px solid black' }}>X</td>
                    <td style={{ border: '1px solid black' }}>X</td>
                    <td style={{ border: '1px solid black' }}>X</td>
                  </tr>
                ))}
              </table>

              <button className='btn-style' onClick={handleAddNameRow}>Add Row</button>
              {nameRunData.length > 2 && (
                <button type="button" className='btn-style' onClick={handleDeleteLastNameRow}>Delete Row</button>
              )}
            </center>
          </div>

          <div>
            <br />
            <center>
              <table className='serviceform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }} >

                <tr>
                  <th className='th-color' colSpan="5">LEGAL DESCRIPTION </th>

                </tr>

                <tr>
                  <td colSpan='1' style={{ border: '1px solid black' }}>
                    FOR COMPLETE LEGAL DESCRIPTION SEE ATTACHED VESTING DEED
                    <br />ASSESSOR'S PARCEL NUMBER:
                  </td>
                </tr>

              </table>
              <br />
            </center>


          </div>


          <div>
            <br />
            <center>
              <table className='serviceform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }} >

                <tr>
                  <th className='th-color' colSpan="5">DISCLAIMER</th>
                </tr>

                <tr>
                  <td colSpan='1' style={{ border: '1px solid black' }}>This title search report was performed in accordance with generally accepted standards. This report may not contain information affecting above real estate property that cannot be indexed due to different spelling of owner's name or incorrectly recorded parcel number or recorder clerk error. This title search does not include a search of the records of the circuit, probate, bankruptcy or other courts nor any recorders other than the records in the office of the Register of Deeds. Taxes are informational purposes only, all information contained herein are obtained from Tax Collectors office/website. Please do check for any additional levies and assessments before settlement. E-Track Title Services, Inc. makes no warranties, and assumes no liability whatsoever for the accuracy of the information contained herein beyond the exercise of such reasonable care.</td>
                </tr>

              </table>
            </center>
            <br />


          </div>

          <div>
            <br />
            <center>
              <table className='serviceform-table' style={{ border: '2px solid black', borderCollapse: 'collapse' }} >

                <tr>
                  <th className='th-color' colSpan="5">Upload Document </th>

                </tr>

                <tr>
                  <td colSpan='1' style={{ border: '1px solid black' }}>
                    <input type="file" />
                  </td>
                </tr>

              </table>
              <br />
            </center>


          </div>

          <button type="Submit" className="btn btn-outline-primary">Submit</button>
          <br />
          <br />
        </table>
      </form>

    </div>
  )
}

export default EtServices
