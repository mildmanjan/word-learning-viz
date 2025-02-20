import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Pause, RotateCcw, Timer, HelpCircle, X } from 'lucide-react';

const InstructionsPanel = ({ isOpen, setIsOpen }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      )}
      
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">How to Use This Visualization</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <h4 className="font-semibold text-lg mb-2">Getting Started</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Watch how AI learns word meanings from simple sentences</li>
                <li>Each example focuses on one word and shows what the system learns about it</li>
                <li>The visualization starts with words having no patterns and builds understanding over time</li>
              </ul>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">Understanding the Display</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-medium">Current Example:</span> Shows the sentence being learned from and explains what's being learned</li>
                <li><span className="font-medium">Word Patterns:</span> The colored bars show how strongly each word is associated with different characteristics</li>
                <li><span className="font-medium">Word Relationships:</span> Darker colors mean words are more similar to each other</li>
              </ul>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">Interactive Controls</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><span className="font-medium">"Next Example":</span> Move to the next learning example</li>
                <li><span className="font-medium">"Auto Learn":</span> Watch the system learn automatically</li>
                <li><span className="font-medium">"Start Over":</span> Reset everything to the beginning</li>
                <li><span className="font-medium">Speed Slider:</span> Adjust how fast the automatic learning happens</li>
              </ul>
            </section>

            <section>
              <h4 className="font-semibold text-lg mb-2">What to Watch For</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Notice how similar words (like cat and dog) develop similar patterns</li>
                <li>See how different words (like car and book) develop distinct patterns</li>
                <li>Watch the relationship colors change as words become more similar or different</li>
              </ul>
            </section>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Tip: Try using "Auto Learn" first to see the whole process, then use "Start Over" and "Next Example" to examine each step more carefully.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Constants for the visualization
const INITIAL_WORDS = {
  cat: [0.1, 0.1, 0.1, 0.1],
  dog: [0.1, 0.1, 0.1, 0.1],
  car: [0.1, 0.1, 0.1, 0.1],
  book: [0.1, 0.1, 0.1, 0.1]
};

const PATTERN_LABELS = [
  'Living Thing',
  'Size',
  'Movement',
  'Object-like'
];

const LEARNING_EXAMPLES = [
  {
    sentence: "The cat sleeps on the mat",
    focus: "cat",
    learning: "First, the AI sees a simple action - it learns cats are things that can rest",
    changes: { cat: [0.6, 0.3, 0.2, 0.2] }  // Starting to see it's alive but not much movement
  },
  {
    sentence: "The cat drinks milk",
    focus: "cat",
    learning: "Now it sees cats can do actions by themselves - this means they're living things",
    changes: { cat: [0.7, 0.3, 0.4, 0.2] }  // More evidence it's alive and can move
  },
  {
    sentence: "The cat chases the mouse",
    focus: "cat",
    learning: "This shows cats can move quickly and interact with other animals",
    changes: { cat: [0.8, 0.3, 0.9, 0.2] }  // Strong evidence of being alive and moving
  },
    {
      sentence: "The dog barks at the cat",
      focus: "dog",
      learning: "Dogs, like cats, are living things that make sounds",
      changes: { dog: [0.8, 0.4, 0.7, 0.2] }
    },
    {
      sentence: "The red car drives fast",
      focus: "car",
      learning: "Cars are non-living objects that move",
      changes: { car: [0.1, 0.6, 0.8, 0.9] }
    },
    {
      sentence: "The book sits on the shelf",
      focus: "book",
      learning: "Books are still objects that don't move on their own",
      changes: { book: [0.1, 0.3, 0.1, 0.9] }
    },
    {
      sentence: "The cat sleeps in the sun",
      focus: "cat",
      learning: "Cats are living things that rest and relax",
      changes: { cat: [0.9, 0.3, 0.2, 0.2] }
    },
    {
      sentence: "The dog plays with the ball",
      focus: "dog",
      learning: "Dogs are active living things that interact with objects",
      changes: { dog: [0.9, 0.4, 0.8, 0.2] }
    },
    {
      sentence: "The car sits in the garage",
      focus: "car",
      learning: "Cars can be stationary but are still objects",
      changes: { car: [0.1, 0.6, 0.2, 0.9] }
    },
    {
      sentence: "The book teaches about history",
      focus: "book",
      learning: "Books contain information but are non-living objects",
      changes: { book: [0.1, 0.3, 0.1, 1.0] }
    },
    {
      sentence: "The cat purrs quietly",
      focus: "cat",
      learning: "Cats are living things that make gentle sounds",
      changes: { cat: [0.9, 0.3, 0.3, 0.2] }
    },
    {
      sentence: "The dog guards the house",
      focus: "dog",
      learning: "Dogs are living things with purposeful behaviors",
      changes: { dog: [0.9, 0.4, 0.6, 0.2] }
    },
    {
      sentence: "The car breaks down",
      focus: "car",
      learning: "Cars are objects that can malfunction",
      changes: { car: [0.1, 0.6, 0.3, 0.9] }
    },
    {
      sentence: "The book falls off the table",
      focus: "book",
      learning: "Books can move, but only when acted upon",
      changes: { book: [0.1, 0.3, 0.4, 0.9] }
    },
    {
      sentence: "The cat hunts at night",
      focus: "cat",
      learning: "Cats are living things with predatory behavior",
      changes: { cat: [0.9, 0.3, 0.8, 0.2] }
    },
    {
      sentence: "The dog sniffs the ground",
      focus: "dog",
      learning: "Dogs are living things that explore with senses",
      changes: { dog: [0.9, 0.4, 0.5, 0.2] }
    },
    {
      sentence: "The car needs repairs",
      focus: "car",
      learning: "Cars are complex objects requiring maintenance",
      changes: { car: [0.1, 0.6, 0.1, 1.0] }
    },
    {
      sentence: "The book opens to page one",
      focus: "book",
      learning: "Books are objects with specific functions",
      changes: { book: [0.1, 0.3, 0.2, 0.9] }
    }
  ];

const WordLearningViz = () => {
  const [patterns, setPatterns] = useState(INITIAL_WORDS);
  const [currentExample, setCurrentExample] = useState(0);
  const [isAutoLearning, setIsAutoLearning] = useState(false);
  const [speed, setSpeed] = useState(2000);
  const [showInstructions, setShowInstructions] = useState(true);

  const resetLearning = () => {
    setPatterns(INITIAL_WORDS);
    setCurrentExample(0);
    setIsAutoLearning(false);
  };

  const nextExample = () => {
    if (currentExample < LEARNING_EXAMPLES.length - 1) {
      const example = LEARNING_EXAMPLES[currentExample];
      setPatterns(prev => ({
        ...prev,
        ...example.changes
      }));
      setCurrentExample(curr => curr + 1);
    } else {
      setIsAutoLearning(false);
      setCurrentExample(0);
    }
  };

  useEffect(() => {
    let timer;
    if (isAutoLearning) {
      timer = setInterval(nextExample, speed);
    }
    return () => clearInterval(timer);
  }, [isAutoLearning, currentExample, speed]);

  const getRelationshipColor = (word1, word2) => {
    const similarity = patterns[word1].reduce((acc, curr, idx) => {
      return acc + Math.abs(curr - patterns[word2][idx]);
    }, 0);
    const normalized = 1 - (similarity / 4);
    const hue = 200;
    const lightness = 100 - (normalized * 50);
    return `hsl(${hue}, 70%, ${lightness}%)`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <InstructionsPanel isOpen={showInstructions} setIsOpen={setShowInstructions} />
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">How AI Learns Word Meanings</h2>
        
        {/* Current Learning Example */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Current Learning Example</h3>
          <p className="text-lg mb-2">
            <span className="font-medium">Sentence: </span>
            {LEARNING_EXAMPLES[currentExample].sentence}
          </p>
          <p className="text-lg mb-2">
            <span className="font-medium">Focus Word: </span>
            <span className="text-blue-600">{LEARNING_EXAMPLES[currentExample].focus}</span>
          </p>
          <p className="text-lg">
            <span className="font-medium">What's Being Learned: </span>
            {LEARNING_EXAMPLES[currentExample].learning}
          </p>
        </div>

        {/* Word Patterns */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Word Patterns</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(patterns).map(([word, values]) => (
              <div key={word} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-lg font-medium mb-2">{word}</h4>
                <div className="space-y-2">
                  {values.map((value, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className="w-24 text-sm">{PATTERN_LABELS[idx]}:</span>
                      <div className="flex-1 h-6 bg-gray-200 rounded">
                        <div 
                          className="h-full bg-blue-500 rounded transition-all duration-500"
                          style={{ width: `${value * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Word Relationships */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Word Relationships</h3>
          <div className="grid grid-cols-4 gap-2">
            {Object.keys(patterns).map((word1) => (
              Object.keys(patterns).map((word2) => (
                <div 
                  key={`${word1}-${word2}`}
                  className="p-2 text-center rounded"
                  style={{ 
                    backgroundColor: getRelationshipColor(word1, word2),
                    opacity: word1 === word2 ? 0.3 : 1
                  }}
                >
                  {word1} - {word2}
                </div>
              ))
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={nextExample}
            disabled={isAutoLearning}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Next Example <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsAutoLearning(!isAutoLearning)}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {isAutoLearning ? (
              <><Pause className="mr-2 w-4 h-4" /> Pause</>
            ) : (
              <><Play className="mr-2 w-4 h-4" /> Auto Learn</>
            )}
          </button>
          
          <button
            onClick={resetLearning}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            <RotateCcw className="mr-2 w-4 h-4" /> Start Over
          </button>
          
          <div className="flex items-center space-x-2">
            <Timer className="w-4 h-4" />
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
        </div>
      </div>
    </div>
  );
};

export default WordLearningViz;