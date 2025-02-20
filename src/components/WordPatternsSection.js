import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowRight } from 'lucide-react';

const generateRealVector = (size = 50) => {
  return Array.from({ length: size }, () => 
    (Math.random() * 2 - 1).toFixed(3)
  );
};

// Learning examples showing both simplified and realistic changes
const LEARNING_EXAMPLES = [
  {
    sentence: "The cat sleeps on the mat",
    focus: "cat",
    learning: "First, the AI sees a simple action - it learns cats are living things that can rest",
    changes: {
      simplified: { cat: [0.6, 0.3, 0.2, 0.2] },
      realistic: generateRealVector()
    }
  },
  {
    sentence: "The cat chases the mouse",
    focus: "cat",
    learning: "Now it sees cats can move quickly and hunt - they're active living creatures",
    changes: {
      simplified: { cat: [0.8, 0.3, 0.9, 0.2] },
      realistic: generateRealVector()
    }
  },
  {
    sentence: "The dog barks at the cat",
    focus: "dog",
    learning: "The AI learns dogs are similar to cats - they're also living things that move",
    changes: {
      simplified: { dog: [0.8, 0.4, 0.7, 0.2] },
      realistic: generateRealVector()
    }
  },
  {
    sentence: "The car drives fast",
    focus: "car",
    learning: "Cars can move but aren't alive - they're objects with different patterns",
    changes: {
      simplified: { car: [0.1, 0.6, 0.8, 0.9] },
      realistic: generateRealVector()
    }
  },
  {
    sentence: "The book falls from the shelf",
    focus: "book",
    learning: "Books can move, but only when acted upon by something else",
    changes: {
      simplified: { book: [0.1, 0.3, 0.4, 0.9] },
      realistic: generateRealVector()
    }
  },
  {
    sentence: "The cat purrs softly",
    focus: "cat",
    learning: "Cats are living things that make gentle sounds - reinforcing the 'living thing' pattern",
    changes: {
      simplified: { cat: [0.9, 0.3, 0.3, 0.2] },
      realistic: generateRealVector()
    }
  },
  {
    sentence: "The dog wags its tail",
    focus: "dog",
    learning: "Dogs show emotions through movement, like cats they're expressive living things",
    changes: {
      simplified: { dog: [0.9, 0.4, 0.6, 0.2] },
      realistic: generateRealVector()
    }
  },
  {
    sentence: "The car breaks down",
    focus: "car",
    learning: "Cars can malfunction - they're complex objects that need maintenance",
    changes: {
      simplified: { car: [0.1, 0.6, 0.2, 1.0] },
      realistic: generateRealVector()
    }
  },
  {
    sentence: "The book contains stories",
    focus: "book",
    learning: "Books hold information but don't act on their own - they're purely objects",
    changes: {
      simplified: { book: [0.1, 0.3, 0.1, 1.0] },
      realistic: generateRealVector()
    }
  },
  {
    sentence: "The cat dreams while sleeping",
    focus: "cat",
    learning: "Cats have internal experiences - another sign they're complex living beings",
    changes: {
      simplified: { cat: [1.0, 0.3, 0.2, 0.2] },
      realistic: generateRealVector()
    }
  },
  {
    sentence: "The dog guards the house",
    focus: "dog",
    learning: "Dogs perform complex tasks - they're intelligent living creatures",
    changes: {
      simplified: { dog: [1.0, 0.4, 0.7, 0.2] },
      realistic: generateRealVector()
    }
  },
  {
    sentence: "The car needs fuel",
    focus: "car",
    learning: "Cars require resources but don't feed themselves - they're dependent objects",
    changes: {
      simplified: { car: [0.1, 0.6, 0.1, 1.0] },
      realistic: generateRealVector()
    }
  }
];

const WordPatternsSection = () => {
  const [showRealVectors, setShowRealVectors] = useState(false);
  const [currentExample, setCurrentExample] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [speed, setSpeed] = useState(2000);
  
  // Initial states for both simplified and realistic vectors
  const [simplifiedVectors, setSimplifiedVectors] = useState({
    cat: [0.1, 0.1, 0.1, 0.1],
    dog: [0.1, 0.1, 0.1, 0.1],
    car: [0.1, 0.1, 0.1, 0.1],
    book: [0.1, 0.1, 0.1, 0.1]
  });
  
  const [realisticVectors, setRealisticVectors] = useState({
    cat: generateRealVector(),
    dog: generateRealVector(),
    car: generateRealVector(),
    book: generateRealVector()
  });

  const PATTERN_LABELS = [
    'Living Thing',
    'Size',
    'Movement',
    'Object-like'
  ];

  const nextExample = () => {
    if (currentExample < LEARNING_EXAMPLES.length - 1) {
      const example = LEARNING_EXAMPLES[currentExample];
      setSimplifiedVectors(prev => ({
        ...prev,
        ...example.changes.simplified
      }));
      setRealisticVectors(prev => ({
        ...prev,
        [example.focus]: example.changes.realistic
      }));
      setCurrentExample(curr => curr + 1);
    } else {
      setIsAutoPlaying(false);
      setCurrentExample(0);
    }
  };

  const resetLearning = () => {
    setCurrentExample(0);
    setIsAutoPlaying(false);
    setSimplifiedVectors({
      cat: [0.1, 0.1, 0.1, 0.1],
      dog: [0.1, 0.1, 0.1, 0.1],
      car: [0.1, 0.1, 0.1, 0.1],
      book: [0.1, 0.1, 0.1, 0.1]
    });
    setRealisticVectors({
      cat: generateRealVector(),
      dog: generateRealVector(),
      car: generateRealVector(),
      book: generateRealVector()
    });
  };

  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(nextExample, speed);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentExample, speed]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Learning Word Patterns</h2>
          
          {/* Current Learning Example with Context Analysis */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg min-h-[300px]">
            <h3 className="text-lg font-semibold mb-4">Learning from Context</h3>
            <div className="grid grid-cols-1 gap-4">
              {/* Example Sentence */}
              <div className="bg-white p-3 rounded-lg">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Sentence: </span>
                  <span className="text-lg">{LEARNING_EXAMPLES[currentExample].sentence}</span>
                </div>
              </div>

              {/* Context Analysis */}
              <div className="bg-white p-3 rounded-lg">
                <div className="mb-2">
                  <span className="font-medium">Focus Word: </span>
                  <span className="text-lg text-blue-600">{LEARNING_EXAMPLES[currentExample].focus}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium text-gray-700">Context Analysis:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-50 p-2 rounded">
                      <div className="font-medium text-sm text-green-800">Word Position</div>
                      <div className="text-sm">
                        {LEARNING_EXAMPLES[currentExample].focus === LEARNING_EXAMPLES[currentExample].sentence.split(' ')[1] 
                          ? "Subject (does the action)" 
                          : "Object (receives action)"}
                      </div>
                    </div>
                    <div className="bg-blue-50 p-2 rounded">
                      <div className="font-medium text-sm text-blue-800">Action Type</div>
                      <div className="text-sm">
                        {LEARNING_EXAMPLES[currentExample].sentence.includes("sleeps") ||
                         LEARNING_EXAMPLES[currentExample].sentence.includes("sits") 
                          ? "Passive/Stationary" 
                          : "Active/Moving"}
                      </div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                      <div className="font-medium text-sm text-purple-800">Independence</div>
                      <div className="text-sm">
                        {["cat", "dog"].includes(LEARNING_EXAMPLES[currentExample].focus)
                          ? "Acts independently"
                          : "Needs external action"}
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded">
                      <div className="font-medium text-sm text-yellow-800">Interaction</div>
                      <div className="text-sm">
                        {LEARNING_EXAMPLES[currentExample].sentence.includes("with") ||
                         LEARNING_EXAMPLES[currentExample].sentence.includes("at")
                          ? "Interacts with others"
                          : "Solo action"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Impact */}
              <div className="bg-white p-3 rounded-lg">
                <div className="font-medium mb-2">How Context Shapes Understanding:</div>
                <div className="text-sm space-y-3">
                  {/* Living Thing Impact */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Living Thing</span>
                      <span className="text-gray-600 text-xs">
                        Influenced by: Word Position & Independence
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-500"
                          style={{ 
                            width: `${["cat", "dog"].includes(LEARNING_EXAMPLES[currentExample].focus) ? "80%" : "10%"}` 
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Movement Impact */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Movement</span>
                      <span className="text-gray-600 text-xs">
                        Influenced by: Action Type & Interaction
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-500"
                          style={{ 
                            width: `${LEARNING_EXAMPLES[currentExample].sentence.includes("sleeps") ? "20%" : "90%"}` 
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Object-like Impact */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Object-like</span>
                      <span className="text-gray-600 text-xs">
                        Influenced by: Independence & Word Position
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 transition-all duration-500"
                          style={{ 
                            width: `${["car", "book"].includes(LEARNING_EXAMPLES[currentExample].focus) ? "90%" : "20%"}` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-end gap-4 mb-6">
            <button
              onClick={nextExample}
              disabled={isAutoPlaying}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Next Example <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {isAutoPlaying ? (
                <><Pause className="mr-2 w-4 h-4" /> Pause</>
              ) : (
                <><Play className="mr-2 w-4 h-4" /> Auto Play</>
              )}
            </button>
            
            <button
              onClick={resetLearning}
              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <RotateCcw className="mr-2 w-4 h-4" /> Start Over
            </button>

            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="500"
                max="5000"
                step="500"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-sm">{speed/1000}s</span>
            </div>

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
            {Object.entries(showRealVectors ? realisticVectors : simplifiedVectors).map(([word, values]) => (
              <div key={word} className="p-4 bg-gray-50 rounded-lg min-h-[180px]">
                <h4 className="text-lg font-medium mb-3">{word}</h4>
                <div className="space-y-2 min-h-[120px]">
                  {showRealVectors ? (
                    <div className="min-h-[120px]">
                      <div className="flex flex-wrap gap-1 text-xs font-mono">
                        {values.map((value, idx) => (
                          <span 
                            key={idx}
                            className="bg-blue-100 px-1 py-0.5 rounded transition-all duration-500"
                            title={`Dimension ${idx + 1}`}
                          >
                            {value}
                          </span>
                        ))}
                      </div>
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
            <h4 className="font-semibold mb-2">What's Happening:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Watch how values change as the AI learns from each example</li>
              <li>Similar words (like cat/dog) develop similar patterns over time</li>
              <li>Different types of words (like car vs cat) develop distinct patterns</li>
              <li>Toggle between views to see how both simple and complex representations evolve</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordPatternsSection;