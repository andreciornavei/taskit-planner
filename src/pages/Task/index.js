import React, { useRef, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Button, FormLabel } from "react-bootstrap";
import { FiX, FiSave, FiArrowLeft } from "react-icons/fi";
import * as Yup from "yup";
import PanelContext from "../Panel/context";
import { Form } from "@unform/web";
import Input from "../../components/Input";

const Task = ({ match, history }) => {
  const formRef = useRef(null);
  const { addTask, getData } = useContext(PanelContext);

  const handleSubmit = async (data) => {
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      //Create the validation rules
      const schema = Yup.object().shape({
        title: Yup.string().min(4).max(60).required(),
      });
      //Validate it
      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      history.goBack();
      addTask(match.params.cell, data, match.params.index);
    } catch (err) {
      const validationErrors = {};
      //Test if is an valitation error
      if (err instanceof Yup.ValidationError) {
        //iterate all errors to display
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  function manualHandleSubmit() {
    formRef.current.submitForm();
  }

  useEffect(() => {
    if(match.params.index){
      let data = getData(match.params.cell, match.params.index)
      if(data){
        formRef.current.setData(data);
      }
    }
  },[])

  return (
    <Modal show={true} backdrop={true} centered={true}>
      <Modal.Header>
        <Modal.Title className="ff-montserrat-semibold text-marine">
          New Task
        </Modal.Title>
        <Button onClick={history.goBack} variant="link" className="text-dark">
          <FiX className="fs-21" />
        </Button>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormLabel className="ff-montserrat-bold mb-0 fs-12">TITLE</FormLabel>
          <Input name="title" type="text" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-basic"
          className="d-flex align-items-center"
          onClick={history.goBack}
        >
          <FiArrowLeft className="fs-16 mr-2" />
          Close
        </Button>
        <Button
          variant="secondary"
          className="d-flex align-items-center shadow-light ff-montserrat-semibold"
          onClick={() => manualHandleSubmit()}
        >
          <FiSave className="fs-16 mr-2" />
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default withRouter(Task);
