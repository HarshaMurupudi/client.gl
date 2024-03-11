import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Grid, Text, Table, Flex } from '@mantine/core';
import { useParams } from 'react-router-dom';

import baseAxios from '../../apis/baseAxios';

function AnotherExample() {
  const params = useParams();
  const jobID = params.jobID;
  const [certData, setCertData] = useState({
    jobData: {
      Packlist_Date: '',
      Customer_PO: '',
      Part_Number: '',
      Shipped_Date: '',
      Invoice_Line: '',
      Rev: '',
      Shipped_Quantity: '',
      Job: '',
      Packlist: '',
      Lot: '',
      Text2: '',
    },
    materialData: [],
    certText: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await baseAxios.get(`/jobs/${jobID}/cert`);
      setCertData(response.data.cert);
    };

    fetchData();
  }, []);

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: 'Print This Document',
    onBeforePrint: () => console.log('before printing...'),
    onAfterPrint: () => console.log('after printing...'),
    removeAfterPrint: true,
  });

  const mapKeyToLabel = {
    Packlist_Date: 'Mfg Date',
    Customer_PO: 'PO #',
    Part_Number: 'Part #',
    Shipped_Date: 'Expiration',
    Invoice_Line: 'PO Line',
    Rev: 'Rev',
    Shipped_Quantity: 'Qty',
    Job: 'Job',
    Packlist: 'P/L #',
    Lot: 'Lot',
    Text2: 'UL #',
  };

  const certEntires = [
    ['Packlist_Date', 'Customer_PO', 'Part_Number'],
    ['Shipped_Date', 'Invoice_Line', 'Rev', 'Shipped_Quantity'],
    ['Job', 'Packlist', 'Lot', 'Text2'],
  ];

  // var result = addYears(new Date(2014, 8, 1), 5);

  const rows = certData.materialData.map((row) => (
    <tr key={row.Material}>
      <td>{row.material}</td>
      <td>{row.description}</td>
    </tr>
  ));

  const notes = certData.certText
    ? certData.certText.split(/\r?\n/).filter((note) => note)
    : [];

  console.log(notes);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '60%' }}>
        <button
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          PRINT
        </button>
        <div style={{ padding: '1rem' }} ref={contentToPrint}>
          <div>
            <h2 style={{ marginBottom: 0 }}>General Label, Inc</h2>
            <p style={{ marginTop: 0 }}>
              675 Rhode Island Ave S, Minneapolis, MN 55426, USA
            </p>
          </div>
          <h3 style={{ textAlign: 'center' }}>CERTIFICATE OF CONFORMANCE</h3>
          <hr />
          <Grid style={{ fontSize: '12px' }}>
            {certEntires.map((row, i) => (
              <Grid.Col span={4} key={i}>
                {row.map((key, j) => (
                  <Text component='p' key={j}>
                    <Text fw={700} span>
                      {mapKeyToLabel[key]}:
                    </Text>
                    <Text span> {certData.jobData[key] || '-'}</Text>
                  </Text>
                ))}
              </Grid.Col>
            ))}
          </Grid>
          <hr />
          <div style={{ fontSize: '12px' }}>
            <p>
              1.) General Label certifies that the products in this shipment
              were produced either from materials furnished by the // customer
              or from the materials listed below on this document.
            </p>
            <p>
              2.) General Label certifies that the products included in this
              shipment have been manufactured by General Label // with all the
              qualified personnel of our company, who are knowledgeable and
              responsible for maintaining all // General Label quality programs
              and procedures.
            </p>
            <p>
              3.) General Label certifies that the products included in this
              shipment conform to all customer purchase order // requirements
              and print specifications.
            </p>
            <p>
              4.) General Label certifies that the products included in this
              shipment are Compliant with RoHS 2, Directive // 2011/65/EU and
              compliant with RoHS 3, Directive 2015/863/EU.
            </p>
            <p>
              5.) General Label certifies that the products included in this
              shipment are Compliant with EU REACH Regulation // EC No.
              1907/2006 and EU REACH 211 SVHC 01/19/2021.
            </p>
            {/* <p>{certData.certText}</p> */}
            {/* <div dangerouslySetInnerHTML={{ __html: certData.certText }} /> */}

            {notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>

          <hr />

          <Grid justify='space-between'>
            <Grid.Col span={6}>
              <table style={{ borderStyle: 'solid', fontSize: '12px' }}>
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Material Description</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
            </Grid.Col>

            {/* <Grid justify='right'> */}
            <Grid.Col span={6}>
              <p>
                <Text fw={700} span>
                  Sign:
                </Text>
                <Text span> {'Placeholder'}</Text>
              </p>

              <p>
                <Text fw={700} span>
                  Date:
                </Text>
                <Text span> {new Date().toLocaleDateString()}</Text>
              </p>
            </Grid.Col>
          </Grid>

          {/* </Grid> */}
        </div>
      </div>
    </div>
  );
}

export default AnotherExample;
