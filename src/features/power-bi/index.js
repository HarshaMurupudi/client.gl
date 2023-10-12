import React, { useState, useEffect } from "react";
import { models, Report, Embed, service, Page } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";

import baseAxios from "../../apis/baseAxios";

function PowerBi() {
  const [responseConfig, setResponseConfig] = useState({});
  // useEffect(() => {
  //   var url = "[INSERT FUNCTION URL HERE]"
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       setResponseConfig(response);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await baseAxios.get("/powerBI/getEmbedToken");
      setResponseConfig(response.data);
    };

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      //
    }
  }, []);

  return (
    <div>
      <h1>Power BI Embed: </h1>
      <PowerBIEmbed
        embedConfig={{
          //hostname: "https://app.powerbigov.us/",
          type: "report", // Supported types: report, dashboard, tile, visual and qna
          id: responseConfig.embedUrl
            ? responseConfig.embedUrl[0].ReportId
            : "",
          embedUrl: responseConfig.embedUrl
            ? responseConfig.embedUrl[0].embedUrl
            : "",
          accessToken: responseConfig.accessToken,
          tokenType: models.TokenType.Embed,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
              pageNavigation: {
                visible: false,
              },
            },
            background: models.BackgroundType.Transparent,
          },
        }}
        eventHandlers={
          new Map([
            [
              "loaded",
              function () {
                // console.log("Report loaded");
              },
            ],
            [
              "rendered",
              function () {
                // console.log("Report rendered");
              },
            ],
            [
              "error",
              function (event) {
                // console.log(event.detail);
              },
            ],
          ])
        }
        cssClassName={"report-style-class"}
        getEmbeddedComponent={(embeddedReport) => {
          // console.log(embeddedReport);
          window.report = embeddedReport;
        }}
      />
    </div>
  );
}

export default PowerBi;
