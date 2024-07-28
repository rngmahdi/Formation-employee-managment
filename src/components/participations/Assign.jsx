import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEmployees, setFormations } from "../../redux/actions";
import { Button, Select, Card } from "antd";
import AssignForm from "./AssignForm";
// import { setFormations } from "../../redux/actions";
const { Option } = Select;
export default function Assign() {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedFormation, setSelectedFormation] = useState("");
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => {
    return {
      employees: state.employees,
    };
  });
  const { formations } = useSelector((state) => {
    return {
      formations: state.formations,
    };
  });
  useEffect(() => {
    axios.get("http://localhost:8000/employees").then((res) => {
      dispatch(setEmployees(res.data));
      // console.log(employees);
    });
    axios.get("http://localhost:8000/formations").then((res) => {
      dispatch(setFormations(res.data));
      console.log(formations);
    });
  }, []);
  return (
    <>
      <div className="flex justify-center content-center">
        {/* <Card>
          <div>
            <h2>Assign Formation</h2>
            <div className="">
              <span>Select Employee: </span>
              <Select
                value={selectedEmployee}
                style={{ width: 200 }}
                onChange={(value) => {
                  setSelectedEmployee(value);
                }}
                fieldNames={{ label: "nom", value: "id" }}
                options={employees ? employees : ""}
              ></Select>
            </div>
            <div style={{ marginTop: "10px" }}>
              <span>Select Training: </span>
              <Select
                // value={selectedFormation}
                // fieldNames={{ label: "title", value: "id" }}
                style={{ width: 200 }}
                onChange={(value) => {
                  setSelectedFormation(value);
                }}
              >
                {formations
                  ? formations.map((formation) => (
                      <Option key={formation.id} value={formation.id}>
                        {formation.title}
                      </Option>
                    ))
                  : ""}
              </Select>
            </div>
            <div className="flex justify-end">
              <Button
                type="primary"
                //  onClick={handleAssignTraining}
                style={{ marginTop: "10px" }}
                className="bg-blue-600"
              >
                Assign Training
              </Button>
            </div>
          </div>
        </Card> */}
      </div>
      <div>
        <section className="items-center lg:flex bg-gray-50  font-poppins dark:bg-gray-800 h-full">
          <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="pt-4 bg-white rounded shadow dark:bg-gray-900">
              <div className="flex px-6 pb-4 border-b dark:border-gray-700 justify-between items-center ">
                <h2 className="text-xl font-bold dark:text-gray-400">
                  Liste Formations
                </h2>
                {/* <AddFormation /> */}
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="text-xs text-center text-gray-500 dark:text-gray-400">
                      {/* <th className="px-6 pb-3 font-medium">ID</th> */}
                      <th className="px-6 pb-3 font-medium">title</th>
                      <th className="px-6 pb-3 font-medium">start date</th>
                      <th className="px-6 pb-3 font-medium">finish date</th>
                      <th className="px-6 pb-3 font-medium">status</th>
                      <th className="px-6 pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formations
                      ? formations.map((formation) => {
                          return (
                            <tr
                              className="text-xs text-center bg-gray-100 dark:text-gray-400 dark:bg-gray-800"
                              key={formation.id}
                            >
                              <td className="px-6 py-5 font-medium">
                                {formation.title}
                              </td>
                              <td className="px-6 py-5 font-medium">
                                {formation.start_date}
                              </td>
                              <td className="px-6 py-5 font-medium">
                                {formation.finish_date}
                              </td>
                              <td className="px-6 py-5 font-medium">
                                {formation.status}
                              </td>
                              <td className="px-6 py-5 flex gap-4 justify-center">
                                {formation.status == "Not Started" && (
                                  // <EditFormation
                                  //   id={formation.id}
                                  //   title={formation.title}
                                  //   startDate={formation.start_date}
                                  //   finishDate={formation.finish_date}
                                  //   status={formation.status}
                                  // />
                                  <AssignForm
                                    formationId={formation.id}
                                    title={formation.title}
                                    status={formation.status}
                                    dateDebut={formation.start_date}
                                    dateFin={formation.finish_date}
                                    employees={employees}
                                  />
                                )}
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
