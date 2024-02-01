import React from 'react';
import './App.css';
import { Form } from './components/Form';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <Form />
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
