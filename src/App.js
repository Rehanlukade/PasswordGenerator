import { useState, useCallback, useEffect,useRef } from 'react';

function App() {
  const [length, setLength] = useState(5);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (number) str += '0123456789';
    if (character) str += '!@#$%^&*()-=_+[]{}|;:,.<>?/';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  const  passref = useRef(null);

  const copyToClipboard = useCallback(()=> {
    passref.current.select();
    passref.current.setSelectionRange(0, 9999); // For mobile devices
      window.navigator.clipboard.writeText(password);
  },[password]) 

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-full overflow-hidden mb-4 my-3">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passref}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5"
            onClick={copyToClipboard}
            
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex-items-center gap-x-1">
            <input
              type="range"
              min={5}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex-items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => setNumber((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex-items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => setCharacter((prev) => !prev)}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
