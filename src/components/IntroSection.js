import React from 'react';

const IntroSection = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mb-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">How AI Understands Words</h2>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-2">Why Numbers?</h3>
            <p className="text-gray-700 mb-4">
              Computers can't understand words directly - they can only work with numbers. 
              To help AI understand language, we need to convert words into numbers in a way 
              that captures their meaning.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="mb-2">For example, think about how you might describe a cat:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Is it alive? Yes (high number)</li>
                <li>Can it move by itself? Yes (high number)</li>
                <li>Is it an object? No (low number)</li>
                <li>What size is it? Medium-small (medium-low number)</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">How Learning Happens</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">1. Reading Context</h4>
                <p>When the AI reads "The cat chases the mouse", it learns:</p>
                <ul className="list-disc pl-5">
                  <li>Cats can move ("chases")</li>
                  <li>Cats are active (doing the action)</li>
                  <li>Cats interact with other animals</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">2. Building Patterns</h4>
                <p>After seeing many examples, it notices:</p>
                <ul className="list-disc pl-5">
                  <li>Cats often do active things</li>
                  <li>Cats behave like other animals</li>
                  <li>Cats are different from objects</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Understanding Numbers</h3>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="mb-2">The numbers you'll see represent:</p>
              <ul className="list-disc pl-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li>0.1 = Very low (definitely not this)</li>
                  <li>0.3 = Low (mostly not this)</li>
                  <li>0.5 = Medium (somewhat this)</li>
                  <li>0.7 = High (mostly this)</li>
                  <li>0.9 = Very high (definitely this)</li>
                </div>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;