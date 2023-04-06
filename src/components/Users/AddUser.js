import React, { useRef, useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const enteredAge = useRef();
  const enteredUsername = useRef();
  const enteredCollegeName = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (
      enteredUsername.current.value.trim().length === 0 ||
      enteredAge.current.value.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (enteredAge.current.value < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(
      enteredUsername.current.value,
      enteredAge.current.value,
      enteredCollegeName.current.value
    );
    enteredAge.current.value = "";
    enteredUsername.current.value = "";
    enteredCollegeName.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={enteredUsername} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={enteredAge} />
          <label htmlFor="collegename">College Name</label>
          <input id="collegname" type="text" ref={enteredCollegeName} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
