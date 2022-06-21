import React from "react";
import "./styles.css";
import { Card } from "../../components/Card";

function Home() {
  const [studentName, setStudentName] = React.useState("");
  const [students, setStudents] = React.useState([]);
  const [user, setUser] = React.useState({ name: "", avatar: "" });

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
    setStudents([...students, newStudent]);
  }

  React.useEffect(() => {
    async function fecthData() {
      const response = await fetch(
        "https://api.github.com/users/lucasminatelli"
      );
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }
    fecthData();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Lucas Minatelli" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {students.map((student, index) => (
        <Card key={index} name={student.name} time={student.time} />
      ))}
    </div>
  );
}

export default Home;
