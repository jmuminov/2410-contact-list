import { useState, useEffect } from "react";

export default function SelectedContact({ selectedContactId, setSelectedContactId}) {
  const [contact, setContact] = useState([null]);
  useEffect(() => {
    async function fetchingSingleContact() {
      try {
        const response = await fetch(
          `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`
        );
        const result = await response.json();
        console.log("Response: ", result);
        setContact(result);
      } catch (error) {
        console.error(error);
      }
    }
    if (selectedContactId) {
      fetchingSingleContact();
    }
  }, [selectedContactId]);
  if (!contact) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <button onClick={() => setSelectedContactId(null)}>Deselect</button>
      <table>
        <thead>
          <tr>
            <th colSpan="3">Selected Contact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
          </tr>
          <tr>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
