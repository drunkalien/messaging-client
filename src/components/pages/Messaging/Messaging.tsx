import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Form } from "react-bootstrap";
import { useSnapshot } from "valtio";
import AsyncSelect from "react-select/async";
import { MultiValue } from "react-select";

import { user } from "../../../store/user";

type MessageType = {
  from: string;
  to: string;
  title: string;
  body: string;
};

type UserType = {
  _id: string;
  username: string;
};

const Messaging = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<MultiValue<string>>([]);
  const [incoming, setIncoming] = useState<MessageType[]>([]);
  const { from } = useSnapshot(user);
  const BASE_URL = "https://messaging-server-itransition.herokuapp.com";

  function handleSend(e: any) {
    e.preventDefault();
    if (from && body && title && selectedUsers.length) {
      axios.post(`${BASE_URL}/send`, {
        from,
        to: selectedUsers,
        title,
        body,
      });
      setTitle("");
      setBody("");
      setSelectedUsers([]);
    }
  }

  function loadOptions(inputText: string, cb: any) {
    axios
      .get(`${BASE_URL}/users/${inputText}`)
      .then((response: AxiosResponse) => {
        const { data } = response;

        cb(
          data.users.map((user: UserType) => ({
            label: user.username,
            value: user.username,
          }))
        );
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (from) {
        axios
          .get(`${BASE_URL}/messages/${from}`)
          .then((response: AxiosResponse) => {
            setIncoming(response.data.messages);
          });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [from, incoming]);

  return (
    <div className="w-100 mt-5 h-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-3">Send Message</h1>
      <Form className="mb-3">
        <label className="label mb-3">Choose Receivers</label>
        <AsyncSelect
          isMulti
          className="mb-3"
          value={selectedUsers}
          onChange={(selectedUsers) => {
            setSelectedUsers(selectedUsers || []);
          }}
          loadOptions={loadOptions}
        />

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>

        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </Form>

      <div className="d-flex w-25 flex-column h-25">
        {incoming.map((msg, idx) => (
          <div className="card mb-3 p-3 overflow-auto h-25" key={idx}>
            <p>From: {msg.from}</p>
            <p>Title: {msg.title}</p>
            <p>Message: {msg.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messaging;
