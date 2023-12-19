import axios from "axios";
import { useState } from "react";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [batch, setBatch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(age < 18 || age > 65){
      alert("Sorry ! You are not eligible for this program.")
      return
    }

    if(contact.length > 10 || contact.length < 10){
      alert("Contact Number is Wrong!")
      return 
    }
    
    axios
      .post("https://elated-duck-fatigues.cyclic.app/users", {
        name,
        age,
        number: contact,
        batch,
        email
      })
      .then((res) => {
        console.log(res);
        alert("payment successful!")
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <header>
        <h1>Yoga Classes Admission Form</h1>
        <p>Please fill out this form to enroll in our yoga classes.</p>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="grid-container">
            <div className="column">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                placeholder="Full name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="column">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                placeholder="Age"
                required
                type="number"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </div>
          <div className="grid-container">
            <div className="column">
              <label htmlFor="contact">Contact Number</label>
              <input
                id="contact"
                placeholder="Phone number"
                required
                type="tel"
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="column">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                placeholder="Email address"
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="grid-container">
            <div className="column">
              <label htmlFor="batch">Preferred Batch Timing</label>
              <select id="batch" onChange={(e) => setBatch(e.target.value)}>
                <option disabled selected value="">
                  Select batch timing
                </option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
}
