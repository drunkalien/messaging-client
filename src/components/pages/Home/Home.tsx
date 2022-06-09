import { useSnapshot } from "valtio";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";

import { user } from "../../../store/user";
const BASE_URL = "https://messaging-server-itransition.herokuapp.com/";

const Home = () => {
  const { from: username, setFrom: setUsername } = useSnapshot(user);
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    axios.post(`${BASE_URL}/users`, { username });
    if (username) {
      navigate("/messaging");
    }
  }

  return (
    <div className="w-100 h-100 d-flex h-flex justify-content-center align-items-center">
      <Form className="d-flex  flex-column align-items-center justify-content-center">
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => {
              console.log(username);
              setUsername(e.target.value);
            }}
          />
        </Form.Group>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Next
        </button>
      </Form>
    </div>
  );
};

export default Home;
