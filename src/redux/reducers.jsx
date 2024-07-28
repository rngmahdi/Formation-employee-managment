const initialState = {
  //* Employee
  employees: "",
  employeeFormType: "add", // add or update
  selectedEmployee: "",
  employeeFormVisibility: false,

  //* Shared
  isVisibale: false,

  //* Formation

  formations: "",
  formationFormType: "add", // add or update
  selectedFormation: "",
  formationFormVisibility: false,

  //* Assign
  selectedFormationAssign: "",
  assignFormType: "", //add by employee or diploma
  assignFormVisibility: false,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    //* Employee

    case "setEmployees":
      return { ...state, employees: action.payload };

    case "setEmployeeFormType":
      return { ...state, employeeFormType: action.payload };

    case "setSelectedEmployee":
      return { ...state, selectedEmployee: action.payload };

    //* Formation

    case "setFormations":
      return { ...state, formations: action.payload };

    case "setFormationFormType":
      return { ...state, formationFormType: action.payload };

    case "setSelectedFormation":
      return { ...state, selectedFormation: action.payload };

    //* Assign
    case "setSelectedFormationAssign":
      return { ...state, selectedFormationAssign: action.payload };

    case "setAssignFormType":
      return { ...state, assignFormType: action.payload };

    default:
      return state;
  }
}

// export default reducer;
