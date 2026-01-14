import React, { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);     
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);

  const passwordRef = useRef();

  const generatePassword = useCallback(() => {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) characters += "0123456789";
    if (characterAllowed) characters += "!@#$%^&*()_+";

    let pass = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      pass += characters.charAt(randomIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  
  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, characterAllowed, generatePassword]);

  
  const copyPassToClipboard = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="app-container">

      <h2 className="title">🔐 Password Generator</h2>
      <p className="subtitle">Create a secure password instantly</p>

      <div className="password-box">
        <input type="text" className="password-input" value={password} readOnly ref={passwordRef}/>
        <button className="copy-btn" onClick={copyPassToClipboard}>Copy</button>
      </div>

      {/* Settings Section */}
      <div className="settings">

        <div className="setting-group">

          <label>Password Length: {length}</label>
          <input type="range" min={5} max={20} value={length} className="slider" onChange={(e) => setLength(e.target.value)} />
        
        </div>

        <div className="setting-group checkbox-group">
          <input type="checkbox" checked={numberAllowed} onChange={() => setNumberAllowed(prev => !prev)}/>
          <label>Include Numbers</label>
        </div>

        <div className="setting-group checkbox-group">
          <input type="checkbox" checked={characterAllowed} onChange={() => setCharacterAllowed(prev => !prev)}/>
          <label>Include Symbols</label>
        </div>

      </div>

    </div>
  );
}

export default App;
