import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Table,
  Text,
  Center,
  Tabs,
  LoadingOverlay,
  Loader,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import { fetchPODetails, fetchPOPDF, updateJobStatus } from "./store/actions";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { isDate, formatDate } from "../../utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function POReviewComponent({
  fetchPODetails,
  fetchPOPDF,
  poDetails,
  updateJobStatus,
  poDetailsLoading,
  poPdfsLoading,
  user,
}) {
  const params = useParams();
  const [numPages, setNumPages] = useState({});
  const [pdfs, setPDF] = useState([]);
  const [pageNumber, setPageNumber] = useState({});
  const [renderNavButtons, setRenderNavButtons] = useState(false);

  function onDocumentLoadSuccess(data, index) {
    const { _pdfInfo } = data;

    const numPagesStateData = numPages;
    numPagesStateData[index] = _pdfInfo.numPages;
    setNumPages(Object.assign({}, numPagesStateData));

    // set pages
    const pageNumberStateData = pageNumber;
    pageNumberStateData[index] = 1;

    setPageNumber(Object.assign({}, pageNumberStateData));

    setRenderNavButtons(true);
    removeTextLayerOffset();
  }

  useEffect(() => {
    const fetchPageData = async () => {
      await fetchPODetails(params.jobID);
      const data = await fetchPOPDF(params.jobID);
      if (data) {
        setPDF(data);
      }
    };

    fetchPageData();
  }, []);

  const changePage = (offset, index) => {
    const pageNumberStateData = pageNumber;
    pageNumberStateData[index] = pageNumberStateData[index] + offset;

    setPageNumber(Object.assign({}, pageNumberStateData));
  };
  const previousPage = (index) => {
    changePage(-1, index);
  };
  const nextPage = (index) => {
    changePage(+1, index);
  };

  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(
      ".react-pdf__Page__textContent"
    );
    textLayers.forEach((layer) => {
      const { style } = layer;
      style.top = "0";
      style.left = "0";
      style.transform = "";
    });
  }

  const onApprove = () => {
    updateJobStatus(params.jobID, "Active");
  };

  const poKeyToLabelMapper = {
    Customer: "Customer",
    Contact_Name: "Contact Name",
    Name: "Name",
    Line1: "Line1",
    Line2: "Line2",
    City: "City",
    State: "State",
    Zip: "Zip",
    Country: "Country",
    Ship_Via: "Ship Via",
    Lead_Days: "Lead Days",
    Customer_PO: "Customer PO",
    Job: "Job",
    Part_Number: "Part Number",
    Rev: "Rev",
    Status: "Status",
    Order_Quantity: "Order Quantity",
    Requested_Date: "Requested Date",
    Promised_Date: "Promised Date",
    Promised_Quantity: "Promised Quantity",
    Unit_Price: "Unit Price",
    Revenue: "Revenue",
    Act_NRE_Charges: "Act NRE Charges",
    Est_NRE_Charges: "Est NRE Charges",
  };

  const poLabelToValueMapper = (details) => {
    return {
      Customer: details["Customer"],
      Contact_Name: details["Contact_Name"],
      Name: details["Name"],
      Line1: details["Line1"],
      Line2: details["Line2"],
      City: details["City"],
      State: details["State"],
      Zip: details["Zip"],
      Country: details["Country"],
      Ship_Via: details["Ship_Via"],
      Lead_Days: details["Lead_Days"],
      Customer_PO: details["Customer_PO"],
      Job: details["Job"],
      Part_Number: details["Part_Number"],
      Rev: details["Rev"],
      Status: details["Status"],
      Order_Quantity: details["Order_Quantity"],
      Requested_Date: details["Requested_Date"],
      Promised_Date: details["Promised_Date"],
      Promised_Quantity: details["Promised_Quantity"],
      Unit_Price: details["Unit_Price"]
        ? "$" + details["Unit_Price"]
        : undefined,
      Revenue: details["Revenue"] ? "$" + details["Revenue"] : undefined,
      Act_NRE_Charges: details["Act_NRE_Charges"]
        ? "$" + details["Act_NRE_Charges"]
        : undefined,
      Est_NRE_Charges: details["Est_NRE_Charges"]
        ? "$" + details["Est_NRE_Charges"]
        : undefined,
    };
  };

  const isPoBtnDisabled = () => {
    const { Employee } = user;
    const employeeList = {
      susen: "BASKSU",
      nate: "53400",
      mat: "000061",
      scott: "305900",
      bill: "55001",
      paul: "303100",
    };

    if (Object.values(employeeList).includes(Employee)) {
      if (poDetails[0]?.Status === "Pending") {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const renderPoDetails = (poDetails) => {
    return (
      <>
        {poDetails && (
          <div>
            <Tabs defaultValue={`0`}>
              <Tabs.List>
                {(poDetails || []).map((po, index) => {
                  return (
                    <Tabs.Tab key={index} value={`${index}`}>
                      {index + 1}
                    </Tabs.Tab>
                  );
                })}
              </Tabs.List>

              {(poDetails || []).map((po, index) => {
                return (
                  <Tabs.Panel key={index} value={`${index}`}>
                    <Table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(po || []).map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{poKeyToLabelMapper[key]}</td>
                              <td>
                                {isDate(value)
                                  ? formatDate(new Date(value))
                                  : poLabelToValueMapper(po)[key] || "-"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Tabs.Panel>
                );
              })}
            </Tabs>

            <Center>
              <Button
                disabled={isPoBtnDisabled()}
                // disabled={false}
                my={16}
                onClick={() => onApprove()}
              >
                Approve
              </Button>
            </Center>
          </div>
        )}
      </>
    );
  };

  const renderPdfs = () => {
    if (poPdfsLoading) {
      return (
        <Center>
          <Loader color="blue" />
        </Center>
      );
    } else {
      if (pdfs) {
        return (
          <Tabs defaultValue={`0`}>
            <Tabs.List>
              {(poDetails || []).map((po, index) => {
                return (
                  <Tabs.Tab key={index} value={`${index}`}>
                    {index + 1}
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>

            {pdfs.map((pdf, index) => {
              return (
                <Tabs.Panel key={index + pdf} value={`${index}`}>
                  <div className="pdf-container">
                    <Document
                      // style={{ width: "100%", height: "100%" }}
                      file={pdf}
                      onLoadSuccess={(data) =>
                        onDocumentLoadSuccess(data, index)
                      }
                    >
                      <Page
                        pageNumber={pageNumber[index]}
                        renderAnnotationLayer={false}
                        // width={Math.min(width * 0.9, 400)} // width: 90vw; max-width: 400px
                      />
                    </Document>
                  </div>

                  {renderNavButtons && (
                    <Center mt={16}>
                      <Button
                        disabled={pageNumber[index] <= 1}
                        onClick={() => previousPage(index)}
                        variant="primary"
                      >
                        Previous Page
                      </Button>
                      {"  "}
                      <Button
                        disabled={pageNumber[index] === numPages[index]}
                        onClick={() => nextPage(index)}
                        variant="primary"
                      >
                        Next Page
                      </Button>
                    </Center>
                  )}
                </Tabs.Panel>
              );
            })}
          </Tabs>
        );
      }
    }
  };

  return (
    <Box>
      <Text fz="md" fw={700}>
        Review
      </Text>
      <Grid mt={16}>
        <Grid.Col span={6}>
          <LoadingOverlay
            visible={poDetailsLoading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          {renderPoDetails(poDetails)}
        </Grid.Col>
        <Grid.Col span={6}>{renderPdfs()}</Grid.Col>
      </Grid>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  poDetails: state.getIn(["poDetails", "poDetails"]),
  poDetailsLoading: state.getIn(["poDetails", "poDetailsLoading"]),
  poPdfsLoading: state.getIn(["poDetails", "poPdfsLoading"]),
  user: state.getIn(["user", "user"]),
});

const POReviewFeature = connect(mapStateToProps, {
  fetchPODetails,
  fetchPOPDF,
  updateJobStatus,
})(POReviewComponent);

export const POReview = POReviewFeature;
