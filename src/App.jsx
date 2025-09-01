import { useEffect, useState } from "react";
import Card from "./Card";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://restcountries.com/v3.1/independent?status=true&fields=name,capital,flags,population")
      .then((res) => res.json())
      .then((data) => {
        const minPopulation = 1000000;
        const filteredData = data.filter(country => country.population >= minPopulation);
        
        const formatted = filteredData.map((c) => ({
          name: c.name.common,
          capital: c.capital?.[0] || "N/A",
          flag: c.flags.svg,
          population: c.population,
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

  // PWA Install Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallButton(false);
      }
      setDeferredPrompt(null);
    }
    setShowSettingsMenu(false);
  };

  const toggleSettingsMenu = () => {
    setShowSettingsMenu(!showSettingsMenu);
  };

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSettingsMenu && !event.target.closest('.settings-menu')) {
        setShowSettingsMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettingsMenu]);

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
      if (e.code === "Escape" && showSettingsMenu) {
        setShowSettingsMenu(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [countries, current, showSettingsMenu]);

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
      {/* Botão de configurações */}
      <div className="settings-menu" style={{ position: "absolute", top: "20px", right: "20px", zIndex: 1000 }}>
        <button
          onClick={toggleSettingsMenu}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "var(--text)",
            padding: "8px",
            borderRadius: "50%",
            transition: "0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Configurações"
        >
          ⚙️
        </button>
        
        {/* Menu suspenso */}
        {showSettingsMenu && (
          <div style={{
            position: "absolute",
            top: "100%",
            right: "0",
            background: "var(--background)",
            border: "1px solid var(--accent)",
            borderRadius: "12px",
            padding: "12px",
            minWidth: "200px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            zIndex: 1001,
          }}>
            {showInstallButton && (
              <button
                onClick={handleInstallClick}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "none",
                  background: "var(--accent)",
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "0.3s",
                  marginBottom: "8px",
                }}
              >
                📱 Instalar App
              </button>
            )}
            <div style={{
              fontSize: "0.9rem",
              color: "var(--text)",
              opacity: 0.7,
              textAlign: "center",
              padding: "8px",
            }}>
              {countries.length} países carregados
            </div>
          </div>
        )}
      </div>

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
          padding: "24px 40px",
          borderRadius: "16px",
          border: "none",
          background: "var(--accent)",
          color: "#fff",
          fontSize: "1.2rem",
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
