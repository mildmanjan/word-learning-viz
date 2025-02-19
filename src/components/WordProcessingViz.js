import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';

const ProcessSteps = [
  {
    phase: "tokenization",
    title: "1. Word to Token",
    description: "Words are converted into unique numbers (tokens)",
    examples: [
      { word: "cat", token: 3752 },
      { word: "dog", token: 2743 },
      { word: "car", token: 1982 },
      { word: "book", token: 1036 }
    ]
  },
  {
    phase: "initialization",
    title: "2. Random Initialization",
    description: "Each token starts with random values",
    examples: [
      { word: "cat", values: [0.23, 0.15, 0.67, 0.42] },
      { word: "dog", values: [0.31, 0.45, 0.12, 0.89] },
      { word: "car", values: [0.56, 0.78, 0.34, 0.21] },
      { word: "book", values: [0.44, 0.91, 0.23, 0.65] }
    ]
  },
  {
    phase: "training",
    title: "3. Training Process",
    description: "Values adjust based on how words are used",
    examples: [
      {
        word: "cat",
        context: "The cat chases the mouse",
        initial: [0.23, 0.15, 0.67, 0.42],
        final: [0.45, 0.20, 0.80, 0.30]
      }
    ]
  },
  {
    phase: "convergence",
    title: "4. Pattern Emergence",
    description: "Similar words develop similar patterns",
    examples: [
      { word: "cat", values: [0.8, 0.3, 0.9, 0.2], type: "animal" },
      { word: "dog", values: [0.8, 0.4, 0.7, 0.2], type: "animal" },
      { word: "car", values: [0.1, 0.6, 0.8, 0.9], type: "object" },
      { word: "book", values: [0.1, 0.3, 0.1, 0.9], type: "object" }
    ]
  }
];

const WordProcessingViz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const step = ProcessSteps[currentStep];

  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev === ProcessSteps.length - 1) {
            setIsAutoPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextStep = () => {
    if (currentStep < ProcessSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setIsAutoPlaying(false);
  };

  const renderStepContent = () => {
    switch (step.phase) {
      case "tokenization":
        return (
          <div className="grid grid-cols-2 gap-4">
            {step.examples.map((ex, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{ex.word}</span>
                <ArrowRight className="mx-2" />
                <span className="font-mono">{ex.token}</span>
              </div>
            ))}
          </div>
        );

      case "initialization":
        return (
          <div className="grid grid-cols-2 gap-4">
            {step.examples.map((ex, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium mb-2">{ex.word}</div>
                <div className="flex gap-1">
                  {ex.values.map((v, i) => (
                    <div 
                      key={i}
                      className="flex-1 h-8 bg-blue-200 relative"
                      style={{ opacity: v }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 text-xs text-center">
                        {v.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "training":
        return (
          <div className="space-y-4">
            {step.examples.map((ex, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="font-medium mb-2">{ex.word}</div>
                <div className="text-sm mb-3">Context: "{ex.context}"</div>
                <div className="space-y-2">
                  <div className="flex gap-1">
                    <span className="w-16 text-sm">Before:</span>
                    {ex.initial.map((v, i) => (
                      <div 
                        key={i}
                        className="flex-1 h-8 bg-blue-200 relative"
                        style={{ opacity: v }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 text-xs text-center">
                          {v.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <span className="w-16 text-sm">After:</span>
                    {ex.final.map((v, i) => (
                      <div 
                        key={i}
                        className="flex-1 h-8 bg-blue-500 relative"
                        style={{ opacity: v }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 text-xs text-center text-white">
                          {v.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "convergence":
        return (
          <div className="grid grid-cols-2 gap-4">
            {step.examples.map((ex, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{ex.word}</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    ex.type === 'animal' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {ex.type}
                  </span>
                </div>
                <div className="flex gap-1">
                  {ex.values.map((v, i) => (
                    <div 
                      key={i}
                      className="flex-1 h-8 bg-blue-500 relative"
                      style={{ opacity: v }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 text-xs text-center text-white">
                        {v.toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">How Words Become Numbers</h2>
        
        {/* Progress Bar */}
        <div className="mb-6 bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / ProcessSteps.length) * 100}%` }}
          />
        </div>

        {/* Step Title and Description */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </div>

        {/* Step Content */}
        <div className="mb-6">
          {renderStepContent()}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={nextStep}
            disabled={isAutoPlaying || currentStep === ProcessSteps.length - 1}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Next Step <ArrowRight className="ml-2 w-4 h-4" />
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
            onClick={reset}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            <RotateCcw className="mr-2 w-4 h-4" /> Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordProcessingViz;