import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Grid, Text, Table, Flex, Tabs } from '@mantine/core';
import { useParams } from 'react-router-dom';

import baseAxios from '../../apis/baseAxios';
import glAddImg from '../../assets/gl-address-logo.jpg';
import { formatDate } from '../../utils';

function AnotherExample() {
  const params = useParams();
  const jobID = params.jobID;
  const [certData, setCertData] = useState([
    {
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
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await baseAxios.get(`/jobs/${jobID}/cert`);
      setCertData(response.data.cert);
    };

    fetchData();
  }, []);

  // const contentToPrint1 = useRef(null);
  const contentToPrints = useRef([]);

  const handlePrint = useReactToPrint({
    documentTitle: `Cert - ${jobID}`,
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

  const marginTop = '0.5cm';
  const marginRight = '0.5cm';
  const marginBottom = '0.5cm';
  const marginLeft = '0.5cm';

  const getPageMargins = () => {
    return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
  };

  const renderCertFields = (key, certData, cIndex) => {
    if (key === 'Text2') {
      return <Text span> {certData[cIndex].jobData[key] || 'NA'} </Text>;
    } else {
      return <Text span> {certData[cIndex].jobData[key] || '-'} </Text>;
    }
  };

  return (
    <>
      <Tabs defaultValue={`0`}>
        <Tabs.List>
          {(certData || []).map((po, cIndex) => {
            return (
              <Tabs.Tab key={cIndex} value={`${cIndex}`}>
                {cIndex + 1}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>

        {(certData || []).map((po, cIndex) => {
          const notes = certData[cIndex].certText
            ? certData[cIndex].certText.split(/\r?\n/).filter((note) => note)
            : [];

          const rows = certData[cIndex].materialData.map((row) => (
            <tr key={row.Material}>
              <td>{row.material}</td>
              <td>{row.description}</td>
            </tr>
          ));

          return (
            <Tabs.Panel key={cIndex} value={`${cIndex}`}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontFamily: 'century-gothic',
                  fontSize: '14.6px !important',
                }}
                key={cIndex}
              >
                <div style={{ width: '60%' }} key={cIndex}>
                  <button
                    onClick={() => {
                      // console.log(`contentToPrint${cIndex}`.current);
                      handlePrint(null, () => contentToPrints.current[cIndex]);
                    }}
                  >
                    PRINT
                  </button>
                  <div
                    style={{
                      padding: '3rem',
                      // display: 'flex',
                      justifyContent: 'center',
                      fontFamily: 'century-gothic',
                      fontSize: '14.6px !important',
                    }}
                    ref={(el) => (contentToPrints.current[cIndex] = el)}
                    key={cIndex}
                  >
                    <style>{getPageMargins()}</style>
                    <div>
                      {/* <h2 style={{ marginBottom: 0 }}>General Label, Inc</h2>
            <p style={{ marginTop: 0 }}>
              675 Rhode Island Ave S, Minneapolis, MN 55426, USA
            </p> */}

                      <img style={{ width: '30%' }} src={glAddImg} />
                    </div>
                    <h3 style={{ textAlign: 'center' }}>
                      CERTIFICATE OF CONFORMANCE
                    </h3>
                    <hr />
                    <Grid>
                      {certEntires.map((row, i) => (
                        <Grid.Col span={4} key={i}>
                          {row.map((key, j) => (
                            <Text component='p' key={j}>
                              <Text fw={700} span>
                                {mapKeyToLabel[key]}:
                              </Text>
                              {key === 'Packlist_Date' ||
                              key === 'Shipped_Date' ? (
                                <Text span>
                                  {' '}
                                  {certData[cIndex].jobData[key]
                                    ? formatDate(
                                        new Date(certData[cIndex].jobData[key])
                                      )
                                    : '-' || '-'}{' '}
                                </Text>
                              ) : (
                                renderCertFields(key, certData, cIndex)
                              )}
                            </Text>
                          ))}
                        </Grid.Col>
                      ))}
                    </Grid>
                    <hr />
                    <div>
                      <p>
                        1.) General Label certifies that the products in this
                        shipment were produced either from materials furnished
                        by the // customer or from the materials listed below on
                        this document.
                      </p>
                      <p>
                        2.) General Label certifies that the products included
                        in this shipment have been manufactured by General Label
                        // with all the qualified personnel of our company, who
                        are knowledgeable and responsible for maintaining all //
                        General Label quality programs and procedures.
                      </p>
                      <p>
                        3.) General Label certifies that the products included
                        in this shipment conform to all customer purchase order
                        // requirements and print specifications.
                      </p>
                      <p>
                        4.) General Label certifies that the products included
                        in this shipment are Compliant with RoHS 2, Directive //
                        2011/65/EU and compliant with RoHS 3, Directive
                        2015/863/EU.
                      </p>
                      <p>
                        5.) General Label certifies that the products included
                        in this shipment are Compliant with EU REACH Regulation
                        // EC No. 1907/2006 and EU REACH 211 SVHC 01/19/2021.
                      </p>

                      {notes.map((note) => (
                        <p key={note}>{note}</p>
                      ))}
                    </div>
                    <hr />

                    <Grid justify='space-between'>
                      <Grid.Col span={7}>
                        <table
                          style={{ borderStyle: 'solid', fontSize: '12px' }}
                        >
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
                      <Grid.Col span={5}>
                        <p>
                          <Text fw={700} span>
                            Sign:
                          </Text>
                          <Text span> {'Jon Erie'}</Text>
                        </p>
                        <p>
                          <Text fw={700} span>
                            Email:
                          </Text>
                          <Text span> {'jerie@general-label.com'}</Text>
                        </p>

                        <p>
                          <Text fw={700} span>
                            Date:
                          </Text>
                          <Text span> {new Date().toLocaleDateString()}</Text>
                        </p>
                      </Grid.Col>
                    </Grid>
                  </div>
                </div>
              </div>
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </>
  );
}

export default AnotherExample;
