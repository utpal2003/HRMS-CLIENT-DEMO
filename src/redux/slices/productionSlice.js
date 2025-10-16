import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productionProjects: [
    {
      "productionProjectId": "prod2025001",
      "projectId": 101,
      "projectName": "HR Management System",
      "clientId": 1,
      "clientName": "Acme Corp",
      "description": "A complete HR solution for employee management.",
      "milestones": [
        {
          "id": 1,
          "name": "Phase 1",
          "progress": 60
        },
        {
          "id": 2,
          "name": "Phase 2",
          "progress": 0
        }
      ],
      "assignedDevelopers": [
        {
          "id": "dev101",
          "name": "John Doe",
          "role": "Lead Developer"
        },
        {
          "id": "dev102",
          "name": "Jane Smith",
          "role": "Frontend Developer"
        }
      ],
      "bugs": [
        {
          "bugId": 1,
          "title": "Login button not working",
          "description": "Clicking login does nothing on mobile view.",
          "createdBy": "Tester A",
          "solvedBy": null,
          "assignedDeveloper": ["dev102", "dev103", "dev104"],

          "status": "in-progress",
          "history": [
            {
              "status": "open",
              "changedBy": "Tester A",
              "date": "2025-08-10"
            },
            {
              "status": "in-progress",
              "changedBy": "Jane Smith",
              "date": "2025-08-15"
            }
          ]
        }
      ]
    },


    {
      "productionProjectId": "prod2025002",
      "projectId": 102,
      "projectName": "E-commerce Platform",
      "clientId": 2,
      "clientName": "Global Retailers Inc.",
      "description": "An online store with a custom checkout process.",
      "milestones": [
        {
          "id": 1,
          "name": "UI/UX Design",
          "progress": 100
        },
        {
          "id": 2,
          "name": "Backend Integration",
          "progress": 45
        },
        {
          "id": 3,
          "name": "Payment Gateway",
          "progress": 0
        }
      ],
      "assignedDevelopers": [
        {
          "id": "dev103",
          "name": "Utpal Barman",
          "role": "Full-stack Developer"
        },
        {
          "id": "dev104",
          "name": "Emily White",
          "role": "UX/UI Designer"
        }
      ],
      "bugs": [
        {
          "bugId": 1,
          "title": "Incorrect price calculation in cart",
          "description": "Total price is wrong when applying discount codes.",
          "createdBy": "Tester B",
          "solvedBy": null,
          "assignedDeveloper": ["dev103"],
          "status": "open",
          "history": [
            {
              "status": "open",
              "changedBy": "Tester B",
              "date": "2025-08-14"
            }
          ]
        },
        {
          "bugId": 2,
          "title": "Homepage layout breaks on tablet",
          "description": "Product images overlap on iPad screen size.",
          "createdBy": "Tester C",
          "solvedBy": "dev104",
          "assignedDeveloper": ["dev104"],
          "status": "solved",
          "history": [
            {
              "status": "solved",
              "changedBy": "Tester C",
              "date": "2025-08-12"
            },

            {
              "status": "solved",
              "changedBy": "Emily White",
              "date": "2025-08-15"
            }
          ]
        },
        {
          "bugId": 3,
          "title": "Account section showing error",
          "description": "We can't payment , it show me unnecessary error ",
          "createdBy": "Tester C",
          "solvedBy": "dev103",
          "assignedDeveloper": ["dev103"],
          "status": "solved",
          "history": [
            {
              "status": "solved",
              "changedBy": "Utpal Barman",
              "date": "2025-08-12"
            },

            {
              "status": "solved",
              "changedBy": "Utpal Barman",
              "date": "2025-08-15"
            }
          ]
        }

      ]
    },


    {
      "productionProjectId": "prod2025003",
      "projectId": 103,
      "projectName": "Mobile Banking App",
      "clientId": 3,
      "clientName": "FinTech Innovations",
      "description": "A secure and user-friendly mobile application for financial transactions.",
      "milestones": [
        {
          "id": 1,
          "name": "Security Audit",
          "progress": 10
        },
        {
          "id": 2,
          "name": "Transaction History",
          "progress": 0
        }
      ],
      "assignedDevelopers": [
        {
          "id": "dev105",
          "name": "Chris Lee",
          "role": "iOS Developer"
        },
        {
          "id": "dev106",
          "name": "Sarah Chen",
          "role": "Android Developer"
        },
        {
          "id": "dev107",
          "name": "David Kim",
          "role": "Backend Engineer"
        }
      ],
      "bugs": [
        {
          "bugId": 4,
          "title": "Push notifications are not delivered",
          "description": "Notifications for new transactions fail intermittently.",
          "createdBy": "Tester D",
          "solvedBy": null,
          "assignedDeveloper": [],
          "status": "open",
          "history": [
            {
              "status": "open",
              "changedBy": "Tester D",
              "date": "2025-08-11"
            }
          ]
        }
      ]
    }
  ]
};

const productionSlice = createSlice({
  name: "production",
  initialState,
  reducers: {
    // Add bug
    addBug: (state, action) => {
      const { projectId, title, description, createdBy, assignedDevelopers } = action.payload;
      const project = state.productionProjects.find((p) => String(p.projectId) === String(projectId));
      if (project) {
        project.bugs.push({
          bugId: Date.now(),
          title,
          description,
          createdBy,
          solvedBy: null,
          assignedDevelopers: assignedDevelopers || [], // ✅ store as array
          status: "open",
          history: [{ status: "open", timestamp: new Date().toISOString() }],
        });
      }
    },


    // Assign developer
    assignDeveloper: (state, action) => {
      const { projectId, bugId, developerName } = action.payload;
      const project = state.projects.find((p) => p.projectId === projectId);
      if (project) {
        const bug = project.bugs.find((b) => b.bugId === bugId);
        if (bug) {
          bug.assignedDeveloper = developerName;
          bug.history.push({
            status: "assigned",
            changedBy: developerName,
            date: new Date().toISOString().split("T")[0]
          });
        }
      }
    },

    // Update bug status
    updateBugStatus: (state, action) => {
      const { projectId, bugId, newStatus, changedBy } = action.payload;
      const project = state.projects.find((p) => p.projectId === projectId);
      if (project) {
        const bug = project.bugs.find((b) => b.bugId === bugId);
        if (bug) {
          bug.status = newStatus;
          if (newStatus === "solved") {
            bug.solvedBy = changedBy;
          }
          bug.history.push({
            status: newStatus,
            changedBy,
            date: new Date().toISOString().split("T")[0]
          });
        }
      }
    },

    // Toggle bug status
    toggleBugStatus: (state, action) => {
      const { projectId, bugId, changedBy } = action.payload;
      const project = state.projects.find((p) => p.projectId === projectId);
      if (project) {
        const bug = project.bugs.find((b) => b.bugId === bugId);
        if (bug) {
          bug.status = bug.status === "open" ? "solved" : "open";
          if (bug.status === "solved") {
            bug.solvedBy = changedBy;
          }
          bug.history.push({
            status: bug.status,
            changedBy,
            date: new Date().toISOString().split("T")[0]
          });
        }
      }
    }
  }
});

export const selectAllProductionProjects = (state) =>
  state.production.productionProjects;

export const { addBug, assignDeveloper, updateBugStatus, toggleBugStatus } =
  productionSlice.actions;
export default productionSlice.reducer;
