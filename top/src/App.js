import React, { useEffect, useState } from "react"

const App = () => {
  const [users, setUsers] = useState([])

  const fetchUserData = () => {
    fetch("http://212.106.184.211/score?game=RA")
      .then(response => {
        return response.json()
      })
      .then(data => {
        // Sort the users by score in descending order
        const sortedUsers = data.sort((a, b) => b.score - a.score)
        // Map the top 10 users to new objects with a medal property
        const topTenUsers = sortedUsers.slice(0, 10).map((user, index) => {
          let medal
          if (index === 0) {
            medal = "gold"
          } else if (index === 1) {
            medal = "silver"
          } else if (index === 2) {
            medal = "brown"
          }
          return {
            ...user,
            medal
          }
        })
        setUsers(topTenUsers)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div style={{}}>
      <img alt="" src="bfns.png" style={{width:"100%", height:"100%"}}></img>
      <h1 style={{ textAlign:"center"}}>Tablica wyników</h1>
      {users.length > 0 && (
        <table style={{ backgroundColor: "#eee", marginLeft: "auto",
        marginRight: "auto"}}>
          <thead>
            <tr>
              <th>Miejsce</th>
              <th>vcode</th>
              <th>Wynik</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.created_at} style={{ fontWeight: index < 3 ? "bold" : "normal" }}>
                <td>{index + 1}</td>
                <td>{user.vcode}</td>
                <td style={{ color: user.medal }}>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;