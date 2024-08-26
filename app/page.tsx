'use client';

import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';
import { FaLock, FaKey, FaCheckSquare, FaQrcode, FaClipboard, FaDownload } from 'react-icons/fa';
import { CSSProperties } from 'react';
import Image from 'next/image';

export default function Home() {
  // Balise Google Analytics
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-ZKFDJK70MJ';
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-ZKFDJK70MJ');
    };
  }, []);

  // Le reste de votre code...
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [isLongPassword, setIsLongPassword] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLongPassword(password.length > 15);
  }, [password]);

  const generatePassword = (): void => {
    if (length < 4 || length > 20) {
      alert('La longueur du mot de passe doit être comprise entre 4 et 20 caractères.');
      return;
    }

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

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); // Notification disparaît après 3 secondes
    } catch (err) {
      alert('Échec de la copie du mot de passe.');
    }
  };

  const downloadQRCode = (): void => {
    const qrCanvas = qrCodeRef.current?.querySelector('canvas');
    if (qrCanvas) {
      const qrUrl = qrCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = qrUrl;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Image src='/assets/logo.png' alt="Logo"  width={100} height={100} style={styles.logo} />
      </div>
      <div style={styles.content}>
        <h1 style={styles.title}><FaLock /> Générateur de Mot de Passe & QR Code</h1>
        <div style={styles.generatorContainer}>
          <div style={styles.generatorSection}>
            <div style={styles.inputGroup}>
              <label><FaKey /> Longueur : </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                min="4"
                max="20"
                style={styles.input}
                aria-label="Longueur du mot de passe"
              />
            </div>
            <div style={styles.checkboxGroup}>
              <label style={styles.checkboxLabel}>
                <FaCheckSquare /> 
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  aria-label="Inclure des majuscules"
                />
                Inclure des Majuscules
              </label>
            </div>
            <div style={styles.checkboxGroup}>
              <label style={styles.checkboxLabel}>
                <FaCheckSquare /> 
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  aria-label="Inclure des nombres"
                />
                Inclure des Nombres
              </label>
            </div>
            <div style={styles.checkboxGroup}>
              <label style={styles.checkboxLabel}>
                <FaCheckSquare /> 
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  aria-label="Inclure des symboles"
                />
                Inclure des Symboles
              </label>
            </div>
            <button onClick={generatePassword} style={styles.button} aria-label="Générer le mot de passe">
              Générer le Mot de Passe
            </button>
            {password && (
              <div
                style={{
                  ...styles.passwordDisplay,
                  flexDirection: isLongPassword ? 'column' : 'row',
                  alignItems: isLongPassword ? 'flex-start' : 'center',
                }}
              >
                <div
                  style={{
                    ...styles.passwordText,
                    marginBottom: isLongPassword ? '10px' : '0',
                  }}
                >
                  <strong>Mot de Passe : </strong>{password}
                </div>
                <button onClick={copyPassword} style={styles.copyButton} aria-label="Copier le mot de passe">
                  <FaClipboard /> Copier
                </button>
              </div>
            )}
          </div>
          <div style={styles.qrCodeSection}>
            {password && (
              <>
                <h2 style={styles.qrCodeTitle}><FaQrcode /> QR Code</h2>
                <div ref={qrCodeRef}>
                  <QRCode value={password} size={200} fgColor="#00d4ff" style={styles.qrCode} />
                </div>
                <button onClick={downloadQRCode} style={styles.downloadButton} aria-label="Télécharger QR Code">
                  <FaDownload /> Télécharger QR Code
                </button>
              </>
            )}
          </div>
        </div>

        <div style={styles.informationSection}>
          <h2 style={styles.robustTitle}>Qu est-ce qui fait un mot de passe robuste ?</h2>
          <p style={styles.robustSubtitle}>Les mots de passe robustes sont uniques et aléatoires.</p>
          <p>
            Les humains ne sont pas très bons pour trouver des mots de passe étant l’un ou l’autre, et encore moins les deux.
            Alors nous avons créé ce générateur pour vous aider à créer des mots de passe sûrs et uniques.
            81% des violations de données sont dues à des mots de passe réutilisés ou faibles.
          </p>
        </div>

        <div style={styles.uniquePasswordSection}>
          <h2 style={styles.uniquePasswordTitle}>Pourquoi mon mot de passe doit-il être unique ?</h2>
          <p style={styles.uniquePasswordText}>
            Utiliser le même mot de passe pour plusieurs comptes est dangereux car si l un de vos comptes est compromis, 
            les autres le seront également. Créez un mot de passe unique pour chaque compte pour une meilleure sécurité.
          </p>
        </div>

        <div style={styles.uniquePasswordSection}>
          <h2 style={styles.uniquePasswordTitle}>Pourquoi mon mot de passe doit-il être aléatoire ?</h2>
          <p>
            Les mots de passe aléatoires sont difficiles à deviner et plus difficiles à craquer pour les programmes de piratage. En cas de modèle discernable, les chances qu un pirate utilise une attaque par force brute et accède à votre compte augmentent de façon exponentielle. Les mots de passe aléatoires peuvent contenir un mélange de caractères sans aucune relation, mais combiner des mots sans relation fonctionne également. C est ainsi que le générateur de mot de passe robuste 1Password crée des mots de passe faciles à retenir tout en étant robustes cryptographiquement.
          </p>
        </div>
        
        <div style={styles.footer}>
          <p style={styles.footerText}>
            PassMaster est un outil de génération de mots de passe et de codes QR pour vous aider à maintenir vos informations 
            en sécurité. Assurez-vous d utiliser des mots de passe forts et uniques pour protéger vos comptes en ligne.
          </p>
        </div>
      </div>

      {showNotification && (
        <div style={styles.notification}>
          Mot de passe copié dans le presse-papiers !
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1f0030, #4a148c)',
    color: '#eaeaea',
    padding: '0 1rem',
    position: 'relative' as const,
  },
  header: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: 1000,
    backgroundColor: '#1f0030', // Pour éviter les problèmes de visibilité avec le contenu
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: '150px', // Ajustez la hauteur comme nécessaire
    width: 'auto',
  },
  content: {
    marginTop: '160px', // Espace suffisant pour le titre fixe
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '2rem',
    width: '100%',
    maxWidth: '1200px',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '2rem',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  generatorContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '900px',
  },
  generatorSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '45%',
    backgroundColor: '#2e0066',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
  },
  inputGroup: {
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '1.2rem',
    borderRadius: '10px',
    border: '2px solid #00d4ff',
    backgroundColor: '#400080',
    color: '#eaeaea',
  },
  checkboxGroup: {
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  checkboxLabel: {
    fontSize: '1.2rem',
    color: '#00d4ff',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.2rem',
    color: '#fff',
    backgroundColor: '#ff0066',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 5px 10px rgba(255, 0, 102, 0.4)',
  },
  passwordDisplay: {
    marginTop: '1rem',
    display: 'flex',
    maxWidth: '400px',
  },
  passwordText: {
    flex: 1,
    fontSize: '1.2rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  copyButton: {
    marginLeft: '10px',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#00c4b4',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    boxShadow: '0 5px 10px rgba(0, 196, 180, 0.4)',
  },
  qrCodeSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '45%',
    backgroundColor: '#2e0066',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
  },
  qrCodeTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#00d4ff',
    fontWeight: 'bold',
  },
  qrCode: {
    boxShadow: '0 10px 20px rgba(0, 212, 255, 0.3)',
  },
  downloadButton: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#00c4b4',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    boxShadow: '0 5px 10px rgba(0, 196, 180, 0.4)',
  },
  informationSection: {
    marginTop: '2rem',
    backgroundColor: '#2e0066',
    padding: '1rem',
    borderRadius: '10px',
    textAlign: 'center' as const,
    color: '#eaeaea',
    width: '90%',
    maxWidth: '800px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
  },
  robustTitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#fff',
    fontWeight: 'bold',
  },
  robustSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#00d4ff',
    fontWeight: 'bold',
  },
  uniquePasswordSection: {
    marginTop: '2rem',
    backgroundColor: '#2e0066',
    padding: '1rem',
    borderRadius: '10px',
    textAlign: 'center' as const,
    color: '#eaeaea',
    width: '90%',
    maxWidth: '800px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
  },
  uniquePasswordTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#00d4ff',
    fontWeight: 'bold',
  },
  uniquePasswordText: {
    fontSize: '1.2rem',
    color: '#eaeaea',
  },
  footer: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#330066',
    borderRadius: '10px',
    textAlign: 'center' as const,
    width: '90%',
    maxWidth: '800px',
  },
  footerText: {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: '#eaeaea',
  },
  notification: {
    position: 'fixed',
    top: '10px',
    right: '10px',
    padding: '10px 20px',
    backgroundColor: '#00c4b4',
    color: '#fff',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
};
