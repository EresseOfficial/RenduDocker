import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RuleForm.css";

const RuleForm = ({ rules, setRules }) => {
  console.log(rules, setRules);
  const { id } = useParams();
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    title: "",
    description: "",
    ValidateTitle: false,
    ValidateDesc: true
  });

  function changeField(event) {
    let tempFieldName = event.target.name;
    let tempFields = { ...fields };
    tempFields[tempFieldName] = event.target.value;

    if (tempFieldName === "title") {
      let validField = validateTitle(tempFields.title);
      validField
        ? (tempFields.ValidTitle = true)
        : (tempFields.ValidTitle = false);

      setFields(tempFields);
    } else if (tempFieldName === "description") {
      let validField = validateDesc(tempFields.description);
      validField
        ? (tempFields.descValid = true)
        : (tempFields.descValid = false);

      setFields(tempFields);
    }
  }

  function validateTitle(str) {
    if (str.length <= 100 && str.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  function validateDesc(str) {
    if ((str.length <= 100 && str.length >= 5) || str.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  function submitForm(event) {
    event.preventDefault();
    if (confirm("Une nouvelle règle va être créée ") === true) {
      let tempRules = [
        ...rules,
        {
          id: rules[rules.length - 1].id + 1,
          title: fields.title,
          description: fields.description,
          likes: 0,
          dislikes: 0,
          tags: []
        }
      ];
      setRules(tempRules);
      console.log(tempRules);
      navigate("/");
    } else {
      console.log("annulé");
    }
  }

  return (
    <form onSubmit={submitForm}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={fields.title}
        onChange={(event) => changeField(event)}
      />{" "}
      {!fields.ValidTitle && (
        <p className="error">You need a title ( 50 characters maximum)</p>
      )}
      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={fields.description}
        onChange={(event) => changeField(event)}
      />{" "}
      {!fields.descValid && (
        <p className="error">
          You need a description ( 5 char minimum , 100 char maximum)
        </p>
      )}
      <input
        type="submit"
        value="Submit"
        disabled={!(fields.ValidTitle && fields.descValid)}
      />
    </form>
  );
};

export default RuleForm;
