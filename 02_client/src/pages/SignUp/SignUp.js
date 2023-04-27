import { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import * as Crypto from 'crypto-js';
import '../../styles/Login.css';

// Register Page
export default function SignUp() {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  function validateForm() {
    return username.length > 0 && password.length > 5;
  }

  function postNewUser(event) {
    event.preventDefault();

    axios.post("http://localhost:3001/api/user", {
      username: username,
      password: Crypto.SHA256(password).toString() // better would be salted hash
    }).then(res => {
      if (res.data.length > 0) {
        sessionStorage.setItem('SessionKey', res.data);
        alert("Der Account wurde erfolgreich registriert.\nSie werden nun zur Suche weitergeleitet.");
        history.push("/search"); // redirect to search page
      }
    }).catch(error => {
      console.log(`Error while creating new user. Error: ${error}`);
      alert("Es ist ein Fehler aufgetreten. Details finden Sie im Browserlog.");
    });
  }

  return (
    <div className="Login">
      <Form onSubmit={postNewUser}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Benutzer</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Benutzername eingeben"
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Passwort</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort eingeben (mind. 6 Zeichen)"
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>Registrieren</Button>
        <p>Schon registriert? <a href="/signIn">Anmelden</a><br /></p>
      </Form>
    </div>
  );
}