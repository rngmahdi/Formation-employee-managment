import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { Select, Flex, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setFormations } from "../../redux/actions";
export function AddEmployee() {
  const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const [telephone, setTelephone] = useState("");
  const [formationCo, setFormationCo] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formations } = useSelector((state) => {
    return {
      formations: state.formations,
    };
  });
  useEffect(() => {
    axios.get("http://localhost:8000/formations").then((res) => {
      dispatch(setFormations(res.data));
    });
    // console.log(formations);
  }, []);
  function confirmAdd(e) {
    e.preventDefault();
    let optionsSlec = [];

    for (let i = 0; i < formationCo.length; i++) {
      for (let j = 0; j < formations.length; j++) {
        if (formationCo[i] == formations[j].id) {
          optionsSlec.push({
            id: formations[j].id,
            title: formations[j].title,
            date: formations[j].date,
            status: "complete",
          });
        }
      }
    }
    setFormationCo(optionsSlec);
    let data = {
      nom: nom,
      prenom: prenom,
      age: age,
      telephone: telephone,
      formations: optionsSlec,
    };
    axios.post("http://localhost:8000/employees", data).then((response) => {
      // console.log(response);
    });
    navigate(-1);
  }
  function cancelAdd() {
    navigate(-1);
  }
  return (
    <div>
      <form
        className="flex justify-center  bg-slate-400 "
        onSubmit={(e) => confirmAdd(e)}
        onReset={cancelAdd}
      >
        <div className="flex flex-col mt-4 h-screen">
          <div className="grid grid-cols-2 mb-2 text-center">
            <label htmlFor="nom">Nom</label>
            <input
              type="text"
              name="nom"
              // value={employee.nom}
              onChange={(e) => setNom(e.target.value)}
              required
              placeholder="entrer le nom"
              className="rounded-md border-2 border-gray-300 bg-white py-0 pl-2 pr-7 text-gray-500 focus:outline-slate-500 focus:outline-1 "
            />
          </div>
          <div className="grid grid-cols-2 mb-2 text-center">
            <label htmlFor="prenom">Prenom</label>
            <input
              type="text"
              name="prenom"
              onChange={(e) => setPrenom(e.target.value)}
              required
              // value={employee.prenom}
              placeholder="entrer le prenom"
              className="rounded-md border-2 border-gray-300 bg-white py-0 pl-2 pr-7 text-gray-500 focus:outline-slate-500 focus:outline-1"
            />
          </div>
          <div className="grid grid-cols-2 mb-2 text-center">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              required
              // value={employee.age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="entrer l'age"
              className="rounded-md border-2 border-gray-300 bg-white py-0 pl-2 pr-7 text-gray-500 focus:outline-slate-500 focus:outline-1"
            />
          </div>
          <div className="grid grid-cols-2 mb-2 text-center">
            <label htmlFor="telephone">Telephone</label>
            <input
              type="text"
              name="telephone"
              required
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="entrer le telephone"
              className="rounded-md border-2 border-gray-300 bg-white py-0 pl-2 pr-7 text-gray-500 focus:outline-slate-500 focus:outline-1"
            />
          </div>
          <div className="grid grid-cols-2 mb-2  text-center">
            {/* <Flex> */}
            <label htmlFor="formations">Formations</label>
            <Select
              mode="multiple"
              // defaultValue={optionsS.map((option) => option.value)}
              style={{ maxWidth: 250 }}
              placeholder="Selecter les formations"
              allowClear
              fieldNames={{ value: "id", label: "title" }}
              // optionFilterProp="children"
              options={formations}
              // showSearch
              onChange={(options) => {
                setFormationCo(options);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            />
            {/* </Flex> */}
          </div>
          <div className=" my-2  flex justify-end ">
            {/* <button className="rounded-lg bg-blue-500 text-white text-lg p-2" type="submit">
              Confirm
            </button>
            <button className="rounded-lg bg-blue-500 text-white text-lg p-2 mx-4" type="reset">
              Annuler
            </button> */}
            <Button type="primary" className="bg-blue-500" htmlType="submit">
              Confirm
            </Button>
            <Button className="mx-4" type="default" ghost htmlType="reset">
              Annuler
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
