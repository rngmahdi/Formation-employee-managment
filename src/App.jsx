import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Formation from "./pages/Formation.jsx";
import Participation from "./pages/Participation.jsx";
import Employee from "./pages/Employee.jsx";
// import EditEmployee from "./components/employee/EditEmployee.jsx";
// import AddEmployee from "./components/employee/AddEmployee.jsx";
import { EditEmployee, AddEmployee } from "./components/employee";
import { AddFormation } from "./components/formations";
import Assign from "./components/participations/Assign.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="employees">
              <Route index element={<Employee />} />
              <Route path="edit/:id" element={<EditEmployee />} />
              <Route path="add" element={<AddEmployee />} />
            </Route>
            <Route path="formations">
              <Route index element={<Formation />} />
              <Route path="add" element={<AddFormation />} />
            </Route>

            <Route path="participations">
              <Route index element={<Participation />} />
              <Route path="assign" element={<Assign />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
