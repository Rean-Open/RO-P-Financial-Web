export const dataSubmission = [
  {
    name: "Between",
  },
];

export const dataSearch = [
  {
    name: "Name",
  },
  {
    name: "Email",
  },
  {
    name: "Campaign Title",
  },
];

export const progressStatus = [
  {
    name: "Pending",
    value: "pending",
    isCheck: false,
  },
  {
    name: "In Review",
    value: "in-review",
    isCheck: false,
  },
  {
    name: "Approved",
    value: "approved"
  },
  {
    name: "In Progress",
    value: "in-progress",
    isCheck: false,
  },
  {
    name: "Completed",
    value: "completed",
    isCheck: false,
  },
  {
    name: "Campaign Live",
    value: "campaign-live",
    isCheck: false,
  }
];

export const bgCheck = (type) => {
  switch (type) {
    case "completed":
      return "#E1FFE6";
    case "campaign-live":
      return "#E1FFE6";
    case "in-progress":
      return "#FFF8D6";
    case "approved":
      return "#FFF8D6";
    default:
      return "#F1F1F1";
  }
};