import { useEffect, useState } from "react";
import Card from "./Card";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((c) => ({
          name: c.name.common,
          capital: c.capital?.[0] || "N/A",
          flag: c.flags.svg,
        }));
        setCountries(formatted);
        setCurrent(formatted[Math.floor(Math.random() * formatted.length)]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar países:", error);
        setLoading(false);
      });
  }, []);

  const nextCountry = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrent(countries[Math.floor(Math.random() * countries.length)]);
    }, 400);
  };

  const toggleFlip = () => {
    setFlipped((prev) => !prev);
  };

  // Atalhos do teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        toggleFlip();
      }
      if (e.code === "Enter") {
        nextCountry();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [countries, current]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px", fontWeight: "600", color: "var(--accent)" }}>
        Qual a capital
      </h1>

      {loading ? (
        <div style={{ color: "var(--text)", fontSize: "1.2rem" }}>
          Carregando países...
        </div>
      ) : current ? (
        <Card  
          flag={current.flag} 
          capital={current.capital} 
          country={current.name} 
          flipped={flipped} 
          onFlip={toggleFlip} 
        />
      ) : (
        <div style={{ color: "var(--text)", fontSize: "1.2rem" }}>
          Nenhum país carregado
        </div>
      )}

      <button
        onClick={nextCountry}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          borderRadius: "12px",
          border: "none",
          background: "var(--accent)",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Próximo
      </button>
    </div>
  );
}
