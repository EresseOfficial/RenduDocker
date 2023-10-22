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

  // LOCAL CODE HERE //
  // function submitForm(event) {
  //   event.preventDefault();
  //   if (confirm("Une nouvelle règle va être créée ") === true) {
  //     let tempRules = [
  //       ...rules,
  //       {
  //         id: rules[rules.length - 1].id + 1,
  //         title: fields.title,
  //         description: fields.description,
  //         likes: 0,
  //         dislikes: 0,
  //         tags: []
  //       }
  //     ];
  //     setRules(tempRules);
  //     console.log(tempRules);
  //     navigate("/");
  //   } else {
  //     console.log("annulé");
  //   }
  // }

    // NEW CODE TO FETCH DATA FROM API //
  const submitForm = async (event) => {
    event.preventDefault();
    try {
      // Preparing data for new rule.
      const newRule = {
        id: rules[rules.length - 1].id + 1,
        title: fields.title,
        description: fields.description,
        likes: 0,
        dislikes: 0,
        tags: []
      };

      // Send a POST request to API.
      const response = await fetch('http://localhost:3000/api/rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRule),
      });

      if (!response.ok) {
        // if the response is not 200, we throw an error
        throw new Error('Network response was not ok');
      }

      // get the newly created rule from the response
      const createdRule = await response.json();

      // add the newly created rule to the list of rules
      setRules([...rules, createdRule]);
      navigate("/");
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


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
