import React, { useState, useRef } from 'react';
import './App.css';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './Character';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(24);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  // Create a ref to the result element
  const resultRef = useRef(null);

  const handleGeneratePassword = () => {
    if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
      notify("Select at least one option", true);
    } else {
      let characterList = '';
      if (includeNumbers) {
        characterList = characterList + numbers;
      }
      if (includeUpperCase) {
        characterList = characterList + upperCaseLetters;
      }
      if (includeLowerCase) {
        characterList = characterList + lowerCaseLetters;
      }
      if (includeSymbols) {
        characterList = characterList + specialCharacters;
      }
      setPassword(createPassword(characterList));
      notify("Password generated successfully", false);
    }
  };

  const createPassword = (characterList) => {
    let password = '';
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"dark"
      });
    } else {
      toast(message, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"dark"
      });
    }
  };

  const handleCopyPassword = (e) => {
    if (password === '') {
      notify("Nothing to copy", true);
    } else {
      copyToClipboard(password);
      notify("Password copied to clipboard");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h2 className="title">Password Generator</h2>
        <div className="result" onClick={handleCopyPassword}>
          <div className="result__title field-title">Generated Password</div>
          <div className="result__viewbox" id="result" ref={resultRef}>{password}</div>
        </div>
        <div className="length range__slider" data-min="4" data-max="32">
          <div className="length__title field-title" data-length={passwordLength}>
            length: {passwordLength}
          </div>
          <input
            id="slider"
            type="range"
            min="4"
            max="32"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>

        <div className="settings">
          <span className="settings__title field-title">settings</span>
          <div className="setting">
            <input
              type="checkbox"
              id="uppercase"
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
            />
            <label htmlFor="uppercase">Include Uppercase</label>
          </div>
          <div className="setting">
            <input
              type="checkbox"
              id="lowercase"
              checked={includeLowerCase}
              onChange={(e) => setIncludeLowerCase(e.target.checked)}
            />
            <label htmlFor="lowercase">Include Lowercase</label>
          </div>
          <div className="setting">
            <input
              type="checkbox"
              id="number"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            <label htmlFor="number">Include Numbers</label>
          </div>
          <div className="setting">
            <input
              type="checkbox"
              id="symbol"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            <label htmlFor="symbol">Include Symbols</label>
          </div>
        </div>

        <button className="btn generate" id="generate" onClick={handleGeneratePassword}>
          Generate Password
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
