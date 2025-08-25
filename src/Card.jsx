import "./Card.css";

export default function Card({ flag, capital, country, flipped, onFlip }) {
  console.log("Card props:", { flag, capital, country, flipped });

  return (
    <div 
      className="card-container" 
      onClick={onFlip}
      style={{ 
        perspective: "1000px", 
        cursor: "pointer", 
        margin: "20px",
        display: "block"
      }}
    >
      <div 
        className={`card ${flipped ? "flipped" : ""}`}
        style={{
          width: "320px",
          height: "200px",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.4)",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        <div 
          className="card-front"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "16px",
            backfaceVisibility: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.08)"
          }}
        >
          <img 
            src={flag} 
            alt="Country flag" 
            className="flag"
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
            }}
          />
        </div>
        <div 
          className="card-back"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "16px",
            backfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.08)",
            transform: "rotateY(180deg)"
          }}
        >
          <h2 style={{ fontSize: "1.6rem", fontWeight: "600", color: "#9aa0ff" }}>
            {capital}
          </h2>
          <h3 style={{ fontSize: "1rem", color: "var(--text)", marginTop: "8px" }}>
            ({country})
          </h3>
        </div>
      </div>
    </div>
  );
}
