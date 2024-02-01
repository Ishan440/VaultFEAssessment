import React from 'react';
import './App.css';
import { OnboardingForm } from './components/Form';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
          <OnboardingForm />
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;
