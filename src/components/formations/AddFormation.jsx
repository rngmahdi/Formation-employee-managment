import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Drawer,
  Button,
  Form,
  Input,
  DatePicker,
  Space,
  Row,
  Col,
} from "antd";
import axios from "axios";
import { setFormations } from "../../redux/actions";

export function AddFormation() {
  const [open, setOpen] = useState(false);
  let [title, setTitle] = useState("");
  let [dateDebut, setDateDebut] = useState("");
  let [dateFin, setDateFin] = useState("");
  const dispatch = useDispatch();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  function finish(values, input) {
    // console.log(dateDebut.date)
    let now = new Date();
    let date_fin = new Date(dateFin.dateString);
    let date_debut = new Date(dateDebut.dateString);
    let status = "";
    if (now > date_fin) {
      status = "Finished";
    } else if (now < date_fin && now >= date_debut) {
      status = "In Progress";
    } else if (now < date_debut) {
      status = "Not Started";
    }
    // console.log(status);
    // console.log(now > new Date(dateFin.dateString));
    const obj = {
      title: title,
      start_date: dateDebut.dateString,
      finish_date: dateFin.dateString,
      status: status,
    };
    axios.post("http://localhost:8000/formations", obj);
    axios.get("http://localhost:8000/formations").then((res) => {
      dispatch(setFormations(res.data));
    });
    document.forms[0].reset();
    setOpen(false);
  }
  return (
    <>
      <Button
        type="primary"
        size="large"
        onClick={showDrawer}
        className="bg-blue-600"
      >
        Ajouter Formation
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open} width={400}>
        <Form onFinish={finish}>
          <Form.Item name={"title"} label="title">
            <Input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item name={"start_date"} label="date debut">
            <DatePicker
              required
              placeholder="entrer la date de debut"
              onChange={(date, dateString) => {
                setDateDebut({ date: date, dateString: dateString });
              }}
            />
          </Form.Item>
          <Form.Item name={"finish_date"} label="date fin">
            <DatePicker
              required
              placeholder="entrer la date de fin"
              onChange={(date, dateString) => {
                setDateFin({ date: date, dateString: dateString });
              }}
            />
          </Form.Item>
          <Button htmlType="submit">Add</Button>
        </Form>
      </Drawer>
    </>
  );
}
