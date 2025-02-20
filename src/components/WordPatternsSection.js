import React, { useState } from 'react';

const generateRealVector = (size = 50) => {
  return Array.from({ length: size }, () => 
    (Math.random() * 2 - 1).toFixed(3)
  );
};

const WordPatternsSection = () => {
  const [showRealVectors, setShowRealVectors] = useState(false);
  const [realVectors] = useState({
    cat: generateRealVector(),
    dog: generateRealVector(),
    car: generateRealVector(),
    book: generateRealVector()
  });

  const simplifiedVectors = {
    cat: [0.8, 0.3, 0.9, 0.2],
    dog: [0.8, 0.4, 0.7, 0.2],
    car: [0.1, 0.6, 0.8, 0.9],
    book: [0.1, 0.3, 0.1, 0.9]
  };

  const PATTERN_LABELS = [
    'Living Thing',
    'Size',
    'Movement',
    'Object-like'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Word Patterns</h2>
          
          {/* Explanation Panel */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2">Understanding Word Representations</h3>
            <p className="mb-4">
              In real AI systems, words are represented by long lists of numbers (vectors) with hundreds 
              or thousands of dimensions. These numbers don't have clear meanings like "size" or "movement" - 
              the patterns emerge through training.
            </p>
            <p>
              For learning purposes, we're showing two versions:
              <ul className="list-disc ml-6 mt-2">
                <li><strong>Simplified View:</strong> 4 human-readable patterns that show what the AI has learned</li>
                <li><strong>Realistic View:</strong> What the actual numbers might look like in a real system</li>
              </ul>
            </p>
          </div>

          {/* Toggle Button */}
          <div className="flex items-center justify-end mb-6">
            <button
              onClick={() => setShowRealVectors(!showRealVectors)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                showRealVectors 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
              }`}
            >
              {showRealVectors ? 'Show Simplified View' : 'Show Realistic View'}
            </button>
          </div>

          {/* Word Patterns Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(showRealVectors ? realVectors : simplifiedVectors).map(([word, values]) => (
              <div key={word} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-medium mb-3">{word}</h4>
                <div className="space-y-2">
                  {showRealVectors ? (
                    <div className="flex flex-wrap gap-1 text-xs font-mono">
                      {values.map((value, idx) => (
                        <span 
                          key={idx}
                          className="bg-blue-100 px-1 py-0.5 rounded"
                          title={`Dimension ${idx + 1}`}
                        >
                          {value}
                        </span>
                      ))}
                      <span className="text-gray-500 mt-2 block">
                        ... and hundreds more dimensions in real systems
                      </span>
                    </div>
                  ) : (
                    values.map((value, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="w-24 text-sm">{PATTERN_LABELS[idx]}:</span>
                        <div className="flex-1 h-6 bg-gray-200 rounded">
                          <div 
                            className="h-full bg-blue-500 rounded transition-all duration-500"
                            style={{ width: `${value * 100}%` }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Context */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-semibold mb-2">Key Insights:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Real AI systems use much more complex patterns than our simplified view</li>
              <li>The actual numbers don't have individual meanings - they work together to create patterns</li>
              <li>Similar words (like cat/dog) end up with similar patterns, even in the complex representation</li>
              <li>The simplified view helps us understand what the AI has learned, even though it's not how it actually stores the information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordPatternsSection;