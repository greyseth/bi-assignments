const dummyClassData = {
  id: 1,
  name: "XI RPL",
  subjects: ["pemweb", "ppl", "basis data"],
};

const dummyAssignmentData = [
  {
    id: 1,
    title: "Assignment site",
    description:
      "An assignment where I have to make a site to store assignments.",
    subject: "pemweb",
    owner_id: 1,
    owner_name: "Greyseth",
    attachment: "file:///this.pdf",
    public: true,
  },
  {
    id: 2,
    title: "Assignment number 2",
    description: "This is assignment number 2 for PPL",
    subject: "ppl",
    owner_id: 1,
    owner_name: "Greyseth",
    attachment: "file:///this.pdf",
    public: true,
  },
  {
    id: 3,
    title: "Assignment number 3",
    description: "This is a private assignment for user id 1",
    subject: "basis data",
    owner_id: 1,
    owner_name: "Greyseth",
    attachment: "file:///this.pdf",
    public: false,
  },
];

export { dummyClassData, dummyAssignmentData };
