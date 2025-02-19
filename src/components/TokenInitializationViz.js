import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const TokenInitializationViz = () => {
  // Function to generate random values
  const generateRandomValues = (dimensions = 8) => 
    Array.from({ length: dimensions }, () => Math.random()).map(x => x.toFixed(3));

  // Initial state for each word
  const [wordVectors, setWordVectors] = useState({
    cat: generateRandomValues(),
    dog: generateRandomValues(),
    car: generateRandomValues(),
    book: generateRandomValues()
  });

  const regenerateValues = () => {
    setWordVectors({
      cat: generateRandomValues(),
      dog: generateRandomValues(),
      car: generateRandomValues(),
      book: generateRandomValues()
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Understanding Token Initialization</h2>
          <p className="text-gray-600 mb-4">
            Before learning begins, each word (token) is assigned random numbers. 
            These numbers represent the starting point from which the AI will learn 
            meaningful patterns. Think of it like giving the AI a blank slate with 
            random scribbles that it will gradually organize into meaningful patterns.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Initial Random Values</h3>
          <div className="grid gap-6">
            {Object.entries(wordVectors).map(([word, values]) => (
              <div key={word} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <span className="text-lg font-medium mr-3">{word}</span>
                  <span className="text-sm text-gray-500">Token ID: {Math.floor(Math.random() * 5000)}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {values.map((value, idx) => (
                    <div 
                      key={idx} 
                      className="flex-1 min-w-[80px] p-2 bg-blue-100 rounded text-center"
                      style={{ opacity: Number(value) * 0.8 + 0.2 }}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold mb-2">Key Points:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Each word gets converted to a unique ID (token)</li>
            <li>Each token is assigned a set of random numbers (vector)</li>
            <li>These numbers have no meaning yet - they're just starting points</li>
            <li>During training, these random values will gradually change to reflect word meanings</li>
            <li>Similar words will eventually develop similar patterns</li>
          </ul>
        </div>

        <button
          onClick={regenerateValues}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <RefreshCw className="mr-2 w-4 h-4" /> 
          Generate New Random Values
        </button>
      </div>
    </div>
  );
};

export default TokenInitializationViz;