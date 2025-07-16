import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const buttons = [
    "7", "8", "9", "+",
    "4", "5", "6", "-",
    "1", "2", "3", "*",
    "0", ".", "(", ")",
  ];

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
    setError("");
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:5000/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: input }),
      });
      const data = await res.json();
      if (data.result !== undefined) {
        setResult(data.result);
      } else {
        setError(data.error);
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="app-container"
      style={{
        height: "100vh",
        backgroundColor: "#282c34",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#20232a",
          borderRadius: 15,
          padding: 24,
          width: 360,
          boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
          color: "#fff",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 24, fontWeight: "bold" }}>
          🧮 Calculator
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter expression"
            style={{
              width: "100%",
              padding: 14,
              fontSize: 22,
              borderRadius: 12,
              border: "none",
              marginBottom: 20,
              boxSizing: "border-box",
              backgroundColor: "#282c34",
              color: "#fff",
              textAlign: "right",
              outline: "none",
              boxShadow: "inset 0 0 5px #000",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: 14,
              fontSize: 20,
              backgroundColor: "#61dafb",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              fontWeight: "bold",
              color: "#20232a",
              marginBottom: 20,
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#21a1f1")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#61dafb")}
          >
            Evaluate
          </button>
        </form>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
            marginBottom: 24,
          }}
        >
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              style={{
                padding: 18,
                fontSize: 22,
                borderRadius: 12,
                border: "none",
                backgroundColor: "#444c56",
                color: "#fff",
                cursor: "pointer",
                boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
                userSelect: "none",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#5a6378")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#444c56")}
            >
              {btn}
            </button>
          ))}

          <button
            onClick={handleClear}
            style={{
              gridColumn: "span 2",
              padding: 18,
              fontSize: 20,
              borderRadius: 12,
              border: "none",
              backgroundColor: "#e55353",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
              userSelect: "none",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#bf3c3c")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#e55353")}
          >
            Clear
          </button>
          <button
            onClick={handleDelete}
            style={{
              gridColumn: "span 2",
              padding: 18,
              fontSize: 20,
              borderRadius: 12,
              border: "none",
              backgroundColor: "#f0ad4e",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
              userSelect: "none",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#c48928")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#f0ad4e")}
          >
            Delete
          </button>
        </div>

        <div style={{ fontSize: 20, minHeight: 28, textAlign: "center" }}>
          {result !== null && (
            <div style={{ color: "#4caf50" }}>
              ✅ Result: <strong>{result}</strong>
            </div>
          )}
          {error && (
            <div style={{ color: "#f44336" }}>
              ❌ Error: {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
