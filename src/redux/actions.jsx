// Employee
export function setEmployees(data) {
  return { type: "setEmployees", payload: data };
}

export function setSelectedEmployee(data) {
  return { type: "setSelectedEmployee", payload: data };
}

// export function setEmployeeFormVisibility(data) {
//   return { type: "setEmployeeFormVisibility", payload: data };
// }

// Formation
export function setFormations(data) {
  return { type: "setFormations", payload: data };
}

export function setSelectedFormation(data) {
  return { type: "setSelectedFormation", payload: data };
}

// Assign
export function setSelectedFormationAssign(data) {
  return { type: "setSelectedFormationAssign", payload: data };
}

export function setAssignFormType(data) {
  return { type: "setAssignFormType", payload: data };
}
