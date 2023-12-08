import { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useDisclosure } from "@mantine/hooks";
import { Flex, Box, Select, Button, Modal, Textarea, Text, Stack, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import { fetchRequests, saveNotes } from "./store/actions";

function RequestSite({
  requestsLoading,
  fetchRequests,
  requests,
  saveNotes,
  user,
}) {
  const [shopRequestOpened, { open: openShopRequest, close: closeShopRequest }] = useDisclosure(false);

  const [ecoRequestOpened, { open: openEcoRequest, close: closeEcoRequest }] = useDisclosure(false);

  const [maintenanceRequestOpened, { open: openMaintenanceRequest, close: closeMaintenanceRequest }] = useDisclosure(false);

  const [improvementRequestOpened, { open: openImprovementRequest, close: closeImprovementRequest }] = useDisclosure(false);

  const fetchPageData = async () => {
    await fetchRequests(); // Employee Names and Work Centers
  };

  useEffect(() => {
    fetchPageData();  
  }, []);

  const handleFormSubmit = async (event, form, formName) => {
    event.preventDefault();
    const newData = form.getTransformedValues();
    if (formName === "shop") {
      closeShopRequest();
      await saveNotes(newData, formName);
    } else if (formName === "eco") {
      closeEcoRequest();
      await saveNotes(newData, formName);
    } else if (formName === "maintenance") {
      closeMaintenanceRequest();
      await saveNotes(newData, formName);
    } else if (formName === "improvement") {
      closeImprovementRequest();
      await saveNotes(newData, formName);
    }
    // form.reset()
  };

  const priorities = ["Low", "Medium", "High"];
  const ecoTypes = ["Type 1", "Type 2", "Membrane Switch", "Overlay, Label, Decal"];

  const oldData = [
    {
      "ID": 45,
      "Initiator": "Garrett Mezzenga",
      "Requestor Email": "garrettm@GENERAL-LABEL.com",
      "Description": "Moving eye marks",
      "Part Number": "009483-009",
      "Job Number": 175809,
      "Work Center": "Art",
      "Priority": "Medium",
      "Change Request (Description)": "Please move either the delta or zund eye marks so that the two types of eye marks are no longer in the same lane. It makes it very hard to cut with the laser and to sheet with it's current setup and I've had a lot of waste because of this issue.",
      "Created At": "11/22/2022 6:23:56 PM",
      "Last Updated": "11/22/2022 19:38:15",
      "Status": "Completed",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "",
      "Approval Comments": "✔ Approved By Lyn Erie\n⌚ Response Date 2022-11-22T19:38:12Z\nComments: ECO created \nECO ID%236\n\n\n----------------------------------------------\n\n🚀 Approval Started By: Garrett Mezzenga\n⌚ Approval Started At: 2022-11-22T18:24:05.5652294Z",
      "Comments": ""
    },
    {
      "ID": 58,
      "Initiator": "Brian Kohout",
      "Requestor Email": "sumit@GENERAL-LABEL.com",
      "Description": "Add material cut for cutting the 3M 5051.",
      "Part Number": "515-2594-00",
      "Job Number": 177751,
      "Work Center": "Material",
      "Priority": "High",
      "Change Request (Description)": "Add work center.",
      "Created At": "12/20/2022 6:05:11 PM",
      "Last Updated": "12/20/2022 6:05:11 PM",
      "Status": "New",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "12/20/2022",
      "Approval Comments": "🚀 Approval Started By: Brian Kohout\n⌚ Approval Started At: 2022-12-20T18:05:19.8507164Z",
      "Comments": ""
    },
    {
      "ID": 59,
      "Initiator": "Anibal Soares",
      "Requestor Email": "sumit@GENERAL-LABEL.com",
      "Description": "asas",
      "Part Number": "jhjh",
      "Job Number": "ghgh",
      "Work Center": "Art",
      "Priority": "High",
      "Change Request (Description)": "TEsting!",
      "Created At": "12/22/2022 2:10:53 AM",
      "Last Updated": "12/22/2022 02:11:53",
      "Status": "Completed",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "",
      "Approval Comments": "✔ Approved By Sumit Mahajan\n⌚ Response Date 2022-12-22T02:11:51Z\nComments: Approved!!!\n\n\n----------------------------------------------\n\n🚀 Approval Started By: Anibal Soares\n⌚ Approval Started At: 2022-12-22T02:11:00.2878665Z",
      "Comments": "Approved!!!"
    },
    {
      "ID": 60,
      "Initiator": "Sumit Mahajan",
      "Requestor Email": "shop20@GENERAL-LABEL.com",
      "Description": "Rarely get the guide line from the circuit department. Please address the issue",
      "Part Number": "IV100044674-LF",
      "Job Number": 174553,
      "Work Center": "Diecutting",
      "Priority": "Medium",
      "Change Request (Description)": "Bring guide line everytime you bring the job.",
      "Created At": "1/10/2023 3:48:59 PM",
      "Last Updated": "02/02/2023 18:01:17",
      "Status": "Completed",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "",
      "Approval Comments": "✔ Approved By Jon Erie\n⌚ Response Date 2023-02-02T18:01:08Z\nComments: Training done\n\n\n----------------------------------------------\n\n🚀 Approval Started By: Sumit Mahajan\n⌚ Approval Started At: 2023-01-10T15:49:08.2528282Z",
      "Comments": "Training done"
    },
    {
      "ID": 61,
      "Initiator": "Jennifer Welker",
      "Requestor Email": "jenw@GENERAL-LABEL.com",
      "Description": "update supplement",
      "Part Number": "A-990689-02",
      "Job Number": "177680B",
      "Work Center": "Laser",
      "Priority": "Medium",
      "Change Request (Description)": "The supplement for this circuit needs to be updated; there is no description for any of the cuts.",
      "Created At": "1/11/2023 2:40:27 PM",
      "Last Updated": "02/02/2023 18:08:05",
      "Status": "Completed",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "",
      "Approval Comments": "✔ Approved By Jon Erie\n⌚ Response Date 2023-02-02T18:08:02Z\nComments: ECO Created\n\n\n----------------------------------------------\n\n🚀 Approval Started By: Jennifer Welker\n⌚ Approval Started At: 2023-01-11T14:40:37.0052563Z",
      "Comments": "ECO Created"
    },
    {
      "ID": 62,
      "Initiator": "Troy McDermott",
      "Requestor Email": "shop20@GENERAL-LABEL.com",
      "Description": "Change from Die Cut to Zund",
      "Part Number": "32000TNG",
      "Job Number": 178147,
      "Work Center": "Diecutting",
      "Priority": "Low",
      "Change Request (Description)": "The art layout doesn't work with the die %234604, Tracey confirmed. Please change from DIE Cut to Zund. Thank You.",
      "Created At": "2/10/2023 5:56:42 PM",
      "Last Updated": "02/20/2023 19:06:08",
      "Status": "Pending",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "2/10/2023",
      "Approval Comments": "Assigned To: Engineering Team\nAssigned At: 2023-02-20T19:06:03Z\nComments: Quote needs updating to Zund or new die is needed. Which is cheaper?\n\n\n----------------------------------------------\n\n🚀 Approval Started By Troy McDermott\n⌚ Approval Started At 2/10/2023 5:56:42 PM",
      "Comments": ""
    },
    {
      "ID": 63,
      "Initiator": "Brian Kohout",
      "Requestor Email": "glishop@GENERAL-LABEL.com",
      "Description": "Add spartanics marks for pin guide first die cut to emboss size.",
      "Part Number": 1943,
      "Job Number": "178591A",
      "Work Center": "Art",
      "Priority": "Medium",
      "Change Request (Description)": "Add spartanics marks for pin reg first cut to emboss size. All sheets will be in the same reg for embossing.",
      "Created At": "2/15/2023 4:39:16 PM",
      "Last Updated": "02/20/2023 22:45:07",
      "Status": "Completed",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "",
      "Approval Comments": "✔ Approved By : Sumit Mahajan\n⌚ Response Date : 2023-02-20T22:44:57Z\nComments : \n\n\n-----------------------------------------------\n\n\nAssigned To: Engineering Team\nAssigned By: Jon Erie\nAssigned At: 2023-02-20T19:04:17Z\n\n\n----------------------------------------------\n\n🚀 Approval Started By Brian Kohout\n⌚ Approval Started At 2/15/2023 4:39:16 PM",
      "Comments": ""
    },
    {
      "ID": 64,
      "Initiator": "Jennifer Welker",
      "Requestor Email": "jenw@GENERAL-LABEL.com",
      "Description": "correct quantity up",
      "Part Number": "636510-0000-020",
      "Job Number": 178693,
      "Work Center": "Zund",
      "Priority": "Low",
      "Change Request (Description)": "The traveler notes that each sheet is 68 parts up; there are actually 72 parts per sheet.",
      "Created At": "2/20/2023 6:58:07 PM",
      "Last Updated": "02/21/2023 14:35:45",
      "Status": "Completed",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "",
      "Approval Comments": "✔ Approved By Lyn Erie\n⌚ Response Date 2023-02-21T14:35:40Z\nComments: Mat has updated everything to reflect actual parts per sheet. (72up)\n\n\n----------------------------------------------\n\n🚀 Approval Started By: Jennifer Welker\n⌚ Approval Started At: 2023-02-20T18:58:15.0079956Z",
      "Comments": "Mat has updated everything to reflect actual parts per sheet. (72up)"
    },
    {
      "ID": 65,
      "Initiator": "Brian Kohout",
      "Requestor Email": "briank@GENERAL-LABEL.com",
      "Description": "Change work order.",
      "Part Number": "15W757",
      "Job Number": 178515,
      "Work Center": "Zund",
      "Priority": "Medium",
      "Change Request (Description)": "",
      "Created At": "3/7/2023 4:20:01 PM",
      "Last Updated": "3/7/2023 4:20:01 PM",
      "Status": "New",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "3/7/2023",
      "Approval Comments": "🚀 Approval Started By: Brian Kohout\n⌚ Approval Started At: 2023-03-07T16:20:09.1924672Z",
      "Comments": ""
    },
    {
      "ID": 66,
      "Initiator": "Brian Kohout",
      "Requestor Email": "briank@GENERAL-LABEL.com",
      "Description": "Add Material cut down",
      "Part Number": "06232.73",
      "Job Number": 178957,
      "Work Center": "Material",
      "Priority": "Medium",
      "Change Request (Description)": "Add Material cut down to 24\"X16\" after Print color 1.",
      "Created At": "3/7/2023 4:21:50 PM",
      "Last Updated": "3/7/2023 4:21:50 PM",
      "Status": "New",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "3/7/2023",
      "Approval Comments": "🚀 Approval Started By: Brian Kohout\n⌚ Approval Started At: 2023-03-07T16:21:57.8929792Z",
      "Comments": ""
    },
    {
      "ID": 67,
      "Initiator": "Troy McDermott",
      "Requestor Email": "glishop@GENERAL-LABEL.com",
      "Description": "wrong die numbers",
      "Part Number": "444-3888",
      "Job Number": "178814-BUILD",
      "Work Center": "Diecutting",
      "Priority": "Medium",
      "Change Request (Description)": "Please change the die number to the correct die number. There's 2 different numbers, 8485 is the wrong die, 8345 is the correct die.\nThe next Diecut section after is also wrong. 2 different die numbers. 8486 is right. 8346 is wrong.  Thank you!",
      "Created At": "3/8/2023 12:27:57 PM",
      "Last Updated": "3/8/2023 12:27:57 PM",
      "Status": "New",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "3/8/2023",
      "Approval Comments": "🚀 Approval Started By: Troy McDermott\n⌚ Approval Started At: 2023-03-08T12:28:04.5224588Z",
      "Comments": ""
    },
    {
      "ID": 68,
      "Initiator": "Anibal Soares",
      "Requestor Email": "glishop@GENERAL-LABEL.com",
      "Description": "Traveler information not accurate",
      "Part Number": "GR22275-LF",
      "Job Number": "179239A",
      "Work Center": "Zund",
      "Priority": "Medium",
      "Change Request (Description)": "Traveler states to keep cavities A, B, and C separate.  However, there is no Cavity Indication Marks printed on the sheet.\nUpdate Artwork and Dieline Films to indicate cavities, or change Traveler note to say \"Keep Left, Center, and Right Cavities separate\"\n-Dalton",
      "Created At": "4/3/2023 1:35:19 PM",
      "Last Updated": "4/3/2023 1:35:19 PM",
      "Status": "New",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "4/3/2023",
      "Approval Comments": "🚀 Approval Started By: Anibal Soares\n⌚ Approval Started At: 2023-04-03T13:35:27.6095182Z",
      "Comments": ""
    },
    {
      "ID": 69,
      "Initiator": "Jennifer Welker",
      "Requestor Email": "glishop@GENERAL-LABEL.com",
      "Description": "image not showing on sub-traveler",
      "Part Number": "044-572",
      "Job Number": 179249,
      "Work Center": "Laser",
      "Priority": "Medium",
      "Change Request (Description)": "The image isn't showing on the B traveler.",
      "Created At": "4/5/2023 1:21:54 PM",
      "Last Updated": "04/05/2023 16:45:24",
      "Status": "Completed",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "",
      "Approval Comments": "✔ Approved By Sumit Mahajan\n⌚ Response Date 2023-04-05T16:45:21Z\nComments: IT is a print worx issue. We can not fix it right now. \n\n\n----------------------------------------------\n\n🚀 Approval Started By: Jennifer Welker\n⌚ Approval Started At: 2023-04-05T13:22:02.5917141Z",
      "Comments": "IT is a print worx issue. We can not fix it right now."
    },
    {
      "ID": 70,
      "Initiator": "Jennifer Welker",
      "Requestor Email": "jenw@GENERAL-LABEL.com",
      "Description": "Print update to show backsplit instead of kiss cut",
      "Part Number": "007844-GL TAIL STIFFENER",
      "Job Number": 180873,
      "Work Center": "Laser",
      "Priority": "Medium",
      "Change Request (Description)": "The tail stiffener on the print calls for a kiss cut, when it should be a backsplit.",
      "Created At": "7/11/2023 3:37:57 PM",
      "Last Updated": "7/11/2023 3:37:57 PM",
      "Status": "New",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "7/11/2023",
      "Approval Comments": "🚀 Approval Started By: Jennifer Welker\n⌚ Approval Started At: 2023-07-11T15:38:06.1195734Z",
      "Comments": ""
    },
    {
      "ID": 71,
      "Initiator": "Anibal Soares",
      "Requestor Email": "sumit@GENERAL-LABEL.com",
      "Description": "Testing_DElete",
      "Part Number": "Delete",
      "Job Number": "Delete",
      "Work Center": "Art",
      "Priority": "High",
      "Change Request (Description)": "Delete",
      "Created At": "8/25/2023 3:28:17 AM",
      "Last Updated": "8/25/2023 3:28:17 AM",
      "Status": "New",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "8/25/2023",
      "Approval Comments": "🚀 Approval Started By: Anibal Soares\n⌚ Approval Started At: 2023-08-25T03:28:22.7912412Z",
      "Comments": ""
    },
    {
      "ID": 72,
      "Initiator": "Anibal Soares",
      "Requestor Email": "sumit@GENERAL-LABEL.com",
      "Description": "TEsting_Delete",
      "Part Number": "TEsting_Delete",
      "Job Number": "TEsting_Delete",
      "Work Center": "Art",
      "Priority": "High",
      "Change Request (Description)": "TEsting_Delete",
      "Created At": "8/25/2023 3:34:08 PM",
      "Last Updated": "8/25/2023 3:34:08 PM",
      "Status": "New",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "8/25/2023",
      "Approval Comments": "🚀 Approval Started By: Anibal Soares\n⌚ Approval Started At: 2023-08-25T15:34:13.6033210Z",
      "Comments": ""
    },
    {
      "ID": 73,
      "Initiator": "Anibal Soares",
      "Requestor Email": "sumit@GENERAL-LABEL.com",
      "Description": "Test",
      "Part Number": "TEst",
      "Job Number": "TEst",
      "Work Center": "Circuits",
      "Priority": "High",
      "Change Request (Description)": "Test",
      "Created At": "10/5/2023 2:09:10 AM",
      "Last Updated": "10/5/2023 2:09:10 AM",
      "Status": "New",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "10/5/2023",
      "Approval Comments": "🚀 Approval Started By: Anibal Soares\n⌚ Approval Started At: 2023-10-05T02:09:17.4490108Z",
      "Comments": ""
    },
    {
      "ID": 74,
      "Initiator": "Anibal Soares",
      "Requestor Email": "sumit@GENERAL-LABEL.com",
      "Description": "Test",
      "Part Number": "Test",
      "Job Number": "test",
      "Work Center": "Circuits",
      "Priority": "High",
      "Change Request (Description)": "",
      "Created At": "10/24/2023 8:53:42 PM",
      "Last Updated": "10/24/2023 8:53:42 PM",
      "Status": "New",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "10/24/2023",
      "Approval Comments": "🚀 Approval Started By: Anibal Soares\n⌚ Approval Started At: 2023-10-24T20:53:51.5375165Z",
      "Comments": ""
    },
    {
      "ID": 75,
      "Initiator": "Sumit Mahajan",
      "Requestor Email": "sumit@GENERAL-LABEL.com",
      "Description": "test",
      "Part Number": 123,
      "Job Number": 1234,
      "Work Center": "Circuits",
      "Priority": "Medium",
      "Change Request (Description)": "e fwreg th yhjty",
      "Created At": "12/4/2023 3:35:49 PM",
      "Last Updated": "12/4/2023 3:35:49 PM",
      "Status": "New",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "12/4/2023",
      "Approval Comments": "🚀 Approval Started By: Sumit Mahajan\n⌚ Approval Started At: 2023-12-04T15:35:54.7061309Z",
      "Comments": ""
    },
    {
      "ID": 76,
      "Initiator": "Jennifer Welker",
      "Requestor Email": "jenw@GENERAL-LABEL.com",
      "Description": "The note on the front of the traveler to cut liner paper to 29\" needs to be transferred to the material cut work center. The instructions there call for 25.5\", which is incorrect.",
      "Part Number": "812131-001",
      "Job Number": 183207,
      "Work Center": "Material",
      "Priority": "Medium",
      "Change Request (Description)": "",
      "Created At": "12/5/2023 3:30:09 PM",
      "Last Updated": "12/5/2023 3:30:09 PM",
      "Status": "New",
      "Approval Timeline": "",
      "Approval Pending Since (Mins)": "12/5/2023",
      "Approval Comments": "🚀 Approval Started By: Jennifer Welker\n⌚ Approval Started At: 2023-12-05T15:30:18.7650144Z",
      "Comments": ""
    }
  ]

  const convertData = (originalData) => {
    return {
      "Request_ID": originalData.ID,
      "Submission_Date": new Date(originalData["Created At"]),
      "Status": originalData.Status,
      "Initiator": originalData.Initiator,
      "Subject": originalData.Description,
      "Part_Number": originalData["Part Number"],
      "Job_Number": originalData["Job Number"],
      "Work_Center": originalData["Work Center"],
      "Priority": originalData.Priority,
      "Request": originalData["Change Request (Description)"],
      "Approver": "Sumit Mahajan",
      "Approval_Comment": originalData["Approval Comments"],
      "Approval_Date": new Date(originalData["Last Updated"]),
    };
  }

  const newList = (originalList) => {
    return originalList.map(originalData => convertData(originalData));
  }

  // console.log(newList(oldData));

  const shopRequestForm = useForm({
    initialValues: { initiator: null, subject: null, part_number: null, job_number: null, work_center: null, priority: null, request: null },

    validate: {
      initiator: (value) => (value === null ? "Initiator Required" : null),
      subject: (value) => (value === null ? 'Subject Required' : null),
      part_number: (value) => (value === null ? 'Part Number Required' : null),
      job_number: (value) => (value === null ? 'Job Number Required' : null),
      work_center: (value) => (value === null ? 'Work Center Required' : null),
      priority: (value) => (value === null ? 'Priority Required' : null),
      request: (value) => (value === null ? 'Request Description Required' : null),
    },

    transformValues: (values) => ({
      "Request_ID": null,
      "Submission_Date": new Date(),
      "Status": "New",
      "Initiator": values.initiator,
      "Subject": values.subject,
      "Part_Number": values.part_number,
      "Job_Number": values.job_number,
      "Work_Center": values.work_center,
      "Priority": values.priority,
      "Request": values.request,
      "Approver": "Sumit Mahajan",
      "Approval_Comment": null,
      "Approval_Date": null,
    }),

    onSubmit: () => handleFormSubmit(shopRequestForm, "shop"), 
  });

  const ecoRequestForm = useForm({
    initialValues: { initiator: null, subject: null, part_number: null, job_number: null, work_center: null, eco_type: null, priority: null, request: null },

    validate: {
      initiator: (value) => (value === null ? "Initiator Required" : null),
      subject: (value) => (value === null ? 'Subject Required' : null),
      part_number: (value) => (value === null ? 'Part Number Required' : null),
      job_number: (value) => (value === null ? 'Job Number Required' : null),
      work_center: (value) => (value === null ? 'Work Center Required' : null),
      eco_type: (value) => (value === null ? 'ECO Type Required' : null),
      priority: (value) => (value === null ? 'Priority Required' : null),
      request: (value) => (value === null ? 'Request Description Required' : null),
    },

    transformValues: (values) => ({
      "Request_ID": null,
      "Submission_Date": new Date(),
      "Status": "New",
      "Initiator": values.initiator,
      "Subject": values.subject,
      "Part_Number": values.part_number,
      "Job_Number": values.job_number,
      "Work_Center": values.work_center,
      "Eco_Type": values.eco_type,
      "Priority": values.priority,
      "Request": values.request,
      "Approver": null,
      "Approval_Comment": null,
      "Approval_Date": null,
    }),

    onSubmit: () => handleFormSubmit(ecoRequestForm, "eco"),
  });

  const maintenanceRequestForm = useForm({
    initialValues: { initiator: null, subject: null, work_center: null, priority: null, request: null },

    validate: {
      initiator: (value) => (value === null ? "Initiator Required" : null),
      subject: (value) => (value === null ? 'Subject Required' : null),
      priority: (value) => (value === null ? 'Priority Required' : null),
      request: (value) => (value === null ? 'Request Description Required' : null),
    },

    transformValues: (values) => ({
      "Request_ID": null,
      "Submission_Date": new Date(),
      "Status": "New",
      "Initiator": values.initiator,
      "Subject": values.subject,
      "Work_Center": values.work_center,
      "Priority": values.priority,
      "Request": values.request,
      "Approver": null,
      "Approval_Comment": null,
      "Approval_Date": null,
    }),

    onSubmit: () => handleFormSubmit(maintenanceRequestForm, "maintenance"),
  });

  const improvementForm = useForm({
    initialValues: { initiator: null, subject: null, part_number: null, job_number: null, work_center: null, priority: null, suggestion: null },

    validate: {
      initiator: (value) => (value === null ? "Initiator Required" : null),
      subject: (value) => (value === null ? 'Subject Required' : null),
      work_center: (value) => (value === null ? 'Work Center Required' : null),
      priority: (value) => (value === null ? 'Priority Required' : null),
      suggestion: (value) => (value === null ? 'Suggestion Required' : null),
    },

    transformValues: (values) => ({
      "Request_ID": null,
      "Submission_Date": new Date(),
      "Status": "New",
      "Initiator": values.initiator,
      "Subject": values.subject,
      "Part_Number": values.part_number,
      "Job_Number": values.job_number,
      "Work_Center": values.work_center,
      "Priority": values.priority,
      "Request": values.suggestion,
      "Approver": null,
      "Approval_Comment": null,
      "Approval_Date": null,
    }),

    onSubmit: () => handleFormSubmit(improvementForm, "improvement"),
  });

  const userName = `${user.First_Name} ${user.Last_Name}`;
  
  return (
    <Flex
      h={"85vh"}
      w={"76vw"}
      fluid="true"
      justify="center"
      align="center"
    >
      <Modal
        withCloseButton
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={shopRequestOpened} 
        onClose={closeShopRequest} 
        title="Shop Request Form"
        centered
        overlayProps={{
          blur: 1,
        }}>
        <form>
          <Select
            withAsterisk
            mb={16}
            label="Select Initiator"
            placeholder="Initiator"
            data={requests.names}
            autosize
            {...shopRequestForm.getInputProps('initiator')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Subject"
            placeholder="Subject..."
            autosize
            {...shopRequestForm.getInputProps('subject')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Part Number"
            placeholder="Part Number..."
            autosize
            {...shopRequestForm.getInputProps('part_number')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Job Number"
            placeholder="Job Number..."
            autosize
            {...shopRequestForm.getInputProps('job_number')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Work Center"
            placeholder="Work Center"
            data={requests.workCenters}
            autosize
            {...shopRequestForm.getInputProps('work_center')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Priority"
            placeholder="Priority"
            data={priorities}
            autosize
            {...shopRequestForm.getInputProps('priority')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Enter the Request Description"
            placeholder="Request Description..."
            {...shopRequestForm.getInputProps('request')}
          />
            <Button 
              type="submit"
              disabled={!shopRequestForm.isValid()}
              onClick={(event) => handleFormSubmit(event, shopRequestForm, "shop")}
              color="red" 
              mb={8} >
                Submit
            </Button>
          <Text size={12} opacity={.5}>
            Submit as {userName}
          </Text>
        </form>
      </Modal>
      <Modal
        withCloseButton
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={ecoRequestOpened} 
        onClose={closeEcoRequest} 
        title="ECO Request Form"
        centered
        overlayProps={{
          blur: 1,
        }}>
        <form>
          <Select
            withAsterisk
            mb={16}
            label="Select Initiator"
            placeholder="Initiator"
            data={requests.names}
            autosize
            {...ecoRequestForm.getInputProps('initiator')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Subject"
            placeholder="Subject..."
            autosize
            {...ecoRequestForm.getInputProps('subject')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Part Number"
            placeholder="Part Number..."
            autosize
            {...ecoRequestForm.getInputProps('part_number')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Job Number"
            placeholder="Job Number..."
            autosize
            {...ecoRequestForm.getInputProps('job_number')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Work Center"
            placeholder="Work Center"
            data={requests.workCenters}
            autosize
            {...ecoRequestForm.getInputProps('work_center')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select ECO Type"
            placeholder="ECO Type"
            data={ecoTypes}
            autosize
            {...ecoRequestForm.getInputProps('eco_type')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Priority"
            placeholder="Priority"
            data={priorities}
            autosize
            {...ecoRequestForm.getInputProps('priority')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Enter the Request Description"
            placeholder="Job Number..."
            {...ecoRequestForm.getInputProps('request')}
          />
            <Button 
              type="submit"
              disabled={!ecoRequestForm.isValid()}
              onClick={(event) => handleFormSubmit(event, ecoRequestForm, "eco")}
              color="red" 
              mb={8} >
                Submit
            </Button>
          <Text size={12} opacity={.5}>
            Submit as {userName}
          </Text>
        </form>
      </Modal>
      <Modal
        withCloseButton
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={maintenanceRequestOpened} 
        onClose={closeMaintenanceRequest} 
        title="Maintenance Request Form"
        centered
        overlayProps={{
          blur: 1,
        }}>
        <form>
          <Select
            withAsterisk
            mb={16}
            label="Select Initiator"
            placeholder="Initiator"
            data={requests.names}
            autosize
            {...maintenanceRequestForm.getInputProps('initiator')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Subject"
            placeholder="Subject..."
            autosize
            {...maintenanceRequestForm.getInputProps('subject')}
          />
          <Select
            mb={16}
            label="Select Work Center"
            placeholder="Work Center"
            data={requests.workCenters}
            autosize
            {...maintenanceRequestForm.getInputProps('work_center')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Priority"
            placeholder="Priority"
            data={priorities}
            autosize
            {...maintenanceRequestForm.getInputProps('priority')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Enter the Maintenance Request"
            placeholder="Maintenance Request..."
            {...maintenanceRequestForm.getInputProps('request')}
          />
            <Button 
              type="submit"
              disabled={!maintenanceRequestForm.isValid()}
              onClick={(event) => handleFormSubmit(event, maintenanceRequestForm, "maintenance")}
              color="red" 
              mb={8} >
                Submit
            </Button>
          <Text size={12} opacity={.5}>
            Submit as {userName}
          </Text>
        </form>
      </Modal>
      <Modal
        withCloseButton
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={improvementRequestOpened} 
        onClose={closeImprovementRequest} 
        title="Continuous Improvement Form"
        centered
        overlayProps={{
          blur: 1,
        }}>
        <form>
          <Select
            withAsterisk
            mb={16}
            label="Select Initiator"
            placeholder="Initiator"
            data={requests.names}
            autosize
            {...improvementForm.getInputProps('initiator')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Subject"
            placeholder="Subject..."
            autosize
            {...improvementForm.getInputProps('subject')}
          />
          <Textarea
            mb={16}
            label="Part Number"
            placeholder="Part Number..."
            autosize
            {...improvementForm.getInputProps('part_number')}
          />
          <Textarea
            mb={16}
            label="Job Number"
            placeholder="Job Number..."
            autosize
            {...improvementForm.getInputProps('job_number')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Work Center"
            placeholder="Work Center"
            data={requests.workCenters}
            autosize
            {...improvementForm.getInputProps('work_center')}
          />
          <Select
            withAsterisk
            mb={16}
            label="Select Priority"
            placeholder="Priority"
            data={priorities}
            autosize
            {...improvementForm.getInputProps('priority')}
          />
          <Textarea
            withAsterisk
            mb={16}
            label="Enter the Improvement Suggestion"
            placeholder="Job Number..."
            {...improvementForm.getInputProps('suggestion')}
          />
            <Button 
              type="submit"
              disabled={!improvementForm.isValid()}
              onClick={(event) => handleFormSubmit(event, improvementForm, "improvement")}
              color="red" 
              mb={8} >
                Submit
            </Button>
          <Text size={12} opacity={.5}>
            Submit as {userName}
          </Text>
        </form>
      </Modal>
        <LoadingOverlay
          visible={requestsLoading}
          zIndex={1000}
          overlayprops={{ radius: "sm", blur: 2 }}
        />
          <Stack
            display="flex"
            spacing="xl"
            align="center"
            justify="center"
          >
            <Button onClick={openShopRequest} variant="filled" size="xl">
              Shop Request Form
            </Button>
            <Button onClick={openEcoRequest} variant="filled" size="xl">
              ECO Request Form
            </Button>
            <Button onClick={openMaintenanceRequest} variant="filled" size="xl">
              Maintenance Request Form
            </Button>
            <Button onClick={openImprovementRequest} variant="filled" size="xl">
              Improvement Suggestion Form
            </Button>
          </Stack>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  requests: state.getIn(["requests", "requests"]),
  requestsLoading: state.getIn(["requests", "requestsLoading"]),
  user: state.getIn(["user", "user"]),
});

export default connect(mapStateToProps, {
  fetchRequests,
  saveNotes,
})(RequestSite);