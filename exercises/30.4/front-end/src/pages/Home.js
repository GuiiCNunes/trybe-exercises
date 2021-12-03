import React, { useEffect, useState } from "react";

import { Card } from "react-bootstrap";

import LanguageCard from "../components/LanguageCard";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3001/languages")
      .then((response) => response.json())
      .then((languages) => {
        setIsLoading(false);
        setLanguages(languages);
      });
  }, []);

  return (
    <div>
      <h1>Escolha sua linguagem favorita:</h1>

      {isLoading ? (
        <p>Carregando</p>
      ) : (
        <Card style={{ width: "18rem" }}>
          {languages.map(({ _id, name, image, votes }, index) => (
            <LanguageCard
              key={_id}
              index={index}
              id={_id}
              name={name}
              image={image}
              votes={votes}
            />
          ))}
        </Card>
      )}
    </div>
  );
}

export default Home;
