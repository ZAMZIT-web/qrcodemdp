'use client';

import { useState } from 'react';
import QRCode from 'qrcode.react';

export default function Home() {
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');

  const generatePassword = (): void => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let allChars = lowercaseChars;
    if (includeUppercase) allChars += uppercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;
    
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }
    setPassword(generatedPassword);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Générateur de Mot de Passe & QR Code</h1>
      <div style={styles.generatorContainer}>
        <div style={styles.generatorSection}>
          <div style={styles.inputGroup}>
            <label>Longueur : </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              min="4"
              max="20"
              style={styles.input}
            />
          </div>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              Inclure des Majuscules
            </label>
          </div>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              Inclure des Nombres
            </label>
          </div>
          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              Inclure des Symboles
            </label>
          </div>
          <button onClick={generatePassword} style={styles.button}>
            Générer le Mot de Passe
          </button>
          {password && (
            <div style={styles.passwordDisplay}>
              <strong>Mot de Passe : </strong>{password}
            </div>
          )}
        </div>
        <div style={styles.qrCodeSection}>
          {password && (
            <>
              <h2 style={styles.qrCodeTitle}>QR Code</h2>
              <QRCode value={password} size={200} fgColor="#0f3460" />
            </>
          )}
        </div>
      </div>
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Avoir un mot de passe sécurisé est essentiel pour protéger vos informations personnelles en ligne.
          Un mot de passe fort et unique rend difficile pour les attaquants de compromettre vos comptes.
          Assurez-vous de toujours inclure des majuscules, des chiffres et des symboles pour maximiser la sécurité.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#1a1a2e',
    color: '#eaeaea',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#f5f5f5',
  },
  generatorContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '900px',
  },
  generatorSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '45%',
  },
  qrCodeSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    backgroundColor: '#16213e',
    padding: '20px',
    borderRadius: '10px',
  },
  qrCodeTitle: {
    marginBottom: '1rem',
    color: '#f5f5f5',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  input: {
    padding: '5px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#16213e',
    color: '#eaeaea',
  },
  checkboxGroup: {
    marginBottom: '0.5rem',
  },
  checkboxLabel: {
    fontSize: '1rem',
  },
  button: {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#0f3460',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  passwordDisplay: {
    marginTop: '1rem',
    wordBreak: 'break-word',
    backgroundColor: '#0f3460',
    padding: '0.75rem 1.5rem',
    borderRadius: '5px',
    color: '#f5f5f5',
  },
  footer: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#0f3460',
    borderRadius: '8px',
    textAlign: 'center' as const,
    width: '90%',
    maxWidth: '800px',
  },
  footerText: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#f5f5f5',
  },
};
