import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:4000";

export function App(){
  //state variable to store
  const[people,setPeople]=useState([]);

  const [form,setForm]=useState({name:"",age:""});
  // const [name,setName]=useState("");
  // const [age,setAge]=useState("");

  async function load(){
    const res = await axios.get(`${API}`);
    setPeople(res.data);
  }

  async function addPerson(e){
    e.preventDefault(); // prevent page reload
    if(!form.name|| !form.age){
      return alert("Enter the name and Age");
    }


    try{const res= await axios.post(`${API}`,{name:form.name,age:Number(form.age)})
    // Update state (append new person without full reload)
    setPeople([...people, res.data]);
    setForm({ name: "", age: "" });   }
    catch(e){console.error("error",e)};

  }
  useEffect(()=>{
    load();
  },[]) ;

  return(
    <div style={{fontFamily: "sans-serif", maxWidth: 520, margin: 'auto'}}>
      <h1>List of people</h1>
      <form onSubmit={addPerson} style={{gap: '8',marginBlock:'16'}}>
        <input type="text" placeholder="Enter the Name" value={form.name} onChange={e=>setForm({...form,name: e.target.value})} />
        <input type="number" placeholder="Enter the Age" value={form.age} onChange={e=>setForm({...form,age: e.target.value})} />
        <button type="submit">Add User</button>
      </form>
      {people.length === 0?(
        <p>No peole found</p>
      ):(
        <ul>
          {people.map(p=>(
            <li key={p._id}>
              <strong>{p.name}</strong> - age {p.age}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default App;