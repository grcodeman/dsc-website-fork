"use client";

import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

// Positive concepts to compare similarity with
const POSITIVE_CONCEPTS = [
  'learning and education',
  'data science innovation',
  'collaboration and teamwork',
  'scientific discovery',
  'technological advancement'
];

const About = () => {
  const [text, setText] = useState('');
  const [similarityScores, setSimilarityScores] = useState<number[]>([]);
  const [averageSimilarity, setAverageSimilarity] = useState(0);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelLoadError, setModelLoadError] = useState('');
  const [selectedConcept, setSelectedConcept] = useState('all');
  const modelRef = useRef<any>(null);
  
  // Load TensorFlow.js Universal Sentence Encoder model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true);
        // Load the Universal Sentence Encoder model
        modelRef.current = await use.load();
        setIsModelLoading(false);
      } catch (error) {
        console.error('Error loading model:', error);
        setModelLoadError('Failed to load Universal Sentence Encoder model. Please try again later.');
        setIsModelLoading(false);
      }
    };
    loadModel();
  }, []);

  // Function to calculate similarity - now called on button click instead of automatically
  const calculateSimilarity = async () => {
    if (!modelRef.current || !text.trim()) {
      setSimilarityScores([]);
      setAverageSimilarity(0);
      return;
    }

    try {
      setIsProcessing(true);
      
      // Create embeddings for input text and positive concepts
      const sentences = [text, ...POSITIVE_CONCEPTS];
      const embeddings = await modelRef.current.embed(sentences);
      
      // Get the embeddings as tensors
      const userTextEmbedding = embeddings.slice([0, 0], [1, -1]);
      const conceptEmbeddings = embeddings.slice([1, 0], [POSITIVE_CONCEPTS.length, -1]);
      
      // Calculate cosine similarity between user text and each concept
      const similarities: number[] = [];
      
      // For each concept, calculate similarity with user text
      for (let i = 0; i < POSITIVE_CONCEPTS.length; i++) {
        const conceptEmbedding = conceptEmbeddings.slice([i, 0], [1, -1]);
        
        // Calculate dot product
        const dotProduct = tf.matMul(userTextEmbedding, conceptEmbedding, false, true);
        
        // Calculate magnitudes
        const userMagnitude = tf.norm(userTextEmbedding);
        const conceptMagnitude = tf.norm(conceptEmbedding);
        
        // Calculate cosine similarity
        const magnitudeProduct = tf.mul(userMagnitude, conceptMagnitude);
        const cosineSimilarity = tf.div(dotProduct, magnitudeProduct);
        
        // Get the similarity value
        const similarityValue = await cosineSimilarity.dataSync()[0];
        similarities.push(similarityValue);
        
        // Clean up tensors to prevent memory leaks
        dotProduct.dispose();
        userMagnitude.dispose();
        conceptMagnitude.dispose();
        magnitudeProduct.dispose();
        cosineSimilarity.dispose();
        conceptEmbedding.dispose();
      }
      
      // Clean up the main embeddings tensor
      embeddings.dispose();
      userTextEmbedding.dispose();
      conceptEmbeddings.dispose();
      
      // Set similarity scores and calculate average
      setSimilarityScores(similarities);
      setAverageSimilarity(similarities.reduce((sum, score) => sum + score, 0) / similarities.length);
    } catch (error) {
      console.error('Error calculating similarity:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <section id="about" className="py-16 bg-charcoal/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading tracking-widest mb-12 text-center uppercase text-violet">
          About Us
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Mission Text */}
          <div className="flex-1 p-8">
            <h3 className="text-2xl font-heading mb-6 text-teal">Our Mission</h3>
            <p className="text-offwhite/90 mb-4 leading-relaxed">
              At the Data Science Club, we&apos;re dedicated to exploring the frontiers of data science, machine learning, and artificial intelligence. 
              We believe in the power of data to transform understanding and create innovative solutions.
            </p>
            <p className="text-offwhite/90 mb-4 leading-relaxed">
              Our community brings together students from all disciplines who share a passion for data-driven insights and cutting-edge technology.
            </p>
            <h3 className="text-2xl font-heading my-6 text-teal">What We Do</h3>
            <ul className="list-disc list-inside space-y-2 text-offwhite/90">
              <li>Collaborate on real-world data science projects</li>
              <li>Connect with industry professionals and researchers</li>
              <li>Create a supportive environment for learning and growth</li>
            </ul>
          </div>
          
          {/* Right Column - TensorFlow.js Universal Sentence Encoder Demo */}
          <div className="flex-1 bg-charcoal/30 rounded-lg border border-teal/20 flex flex-col">
            <div className="border-b border-teal/20 p-4">
              <h3 className="text-xl font-heading text-teal">Semantic Similarity Demo</h3>
              <p className="text-sm text-offwhite/70">Powered by TensorFlow.js Universal Sentence Encoder</p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              {isModelLoading ? (
                <div className="bg-charcoal/50 p-4 rounded mb-4 flex-1 flex items-center justify-center">
                  <p className="text-offwhite/60 text-center">
                    Loading Universal Sentence Encoder model...
                    <span className="block mt-2 animate-pulse">⏳</span>
                  </p>
                </div>
              ) : modelLoadError ? (
                <div className="bg-charcoal/50 p-4 rounded mb-4 flex-1 flex items-center justify-center">
                  <p className="text-offwhite/60 text-center text-red-400">{modelLoadError}</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <label className="text-offwhite mb-2 text-sm">Enter text to analyze semantic similarity with data science concepts:</label>
                  <textarea
                    className="bg-charcoal/50 border border-teal/20 rounded p-3 text-offwhite mb-2 resize-none focus:outline-none focus:border-teal/80 w-full flex-1"
                    placeholder="Describe your interest in data science..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  
                  {/* Analyze Button */}
                  <button 
                    onClick={calculateSimilarity}
                    disabled={isProcessing || !text.trim() || !modelRef.current}
                    className={`mb-4 py-2 px-4 rounded-md transition-all duration-200 ${isProcessing || !text.trim() || !modelRef.current ? 
                      'bg-charcoal/30 text-offwhite/40 cursor-not-allowed' : 
                      'bg-teal/80 hover:bg-teal text-offwhite'}`}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-offwhite rounded-full"></span>
                        Processing...
                      </span>
                    ) : 'Analyze Text'}
                  </button>
                  
                  {/* Concept selection */}
                  <div className="mb-4">
                    <label className="text-offwhite text-sm block mb-2">View similarity to concept:</label>
                    <select 
                      className="bg-charcoal/50 border border-teal/20 rounded p-2 text-offwhite w-full focus:outline-none focus:border-teal/80"
                      value={selectedConcept}
                      onChange={(e) => setSelectedConcept(e.target.value)}
                      disabled={isProcessing}
                    >
                      <option value="all">Overall Similarity</option>
                      {POSITIVE_CONCEPTS.map((concept, index) => (
                        <option key={index} value={index.toString()}>{concept}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Similarity Results */}
                  <div className="bg-charcoal/50 p-3 rounded mb-4 text-offwhite/90">
                    {!text.trim() ? (
                      <p className="text-sm text-offwhite/50">Enter text above to analyze similarity to data science concepts</p>
                    ) : (
                      <div>
                        <p className="text-sm mb-2">
                          {selectedConcept === "all" ? (
                            <span>
                              Overall semantic similarity: 
                              <span className={`font-bold ${averageSimilarity > 0.7 ? 'text-teal' : averageSimilarity > 0.5 ? 'text-violet' : 'text-orange-400'}`}>
                                {(averageSimilarity * 100).toFixed(1)}%
                              </span>
                            </span>
                          ) : (
                            <span>
                              Similarity to "{POSITIVE_CONCEPTS[parseInt(selectedConcept)]}": 
                              <span className={`font-bold ${similarityScores[parseInt(selectedConcept)] > 0.7 ? 'text-teal' : similarityScores[parseInt(selectedConcept)] > 0.5 ? 'text-violet' : 'text-orange-400'}`}>
                                {(similarityScores[parseInt(selectedConcept)] * 100).toFixed(1)}%
                              </span>
                            </span>
                          )}
                        </p>
                        {selectedConcept === "all" && similarityScores.length > 0 && (
                          <div className="text-xs mt-3 text-offwhite/80">
                            <p className="mb-1">Individual concept similarities:</p>
                            <ul className="space-y-1">
                              {POSITIVE_CONCEPTS.map((concept, index) => (
                                <li key={index}>
                                  {concept}: 
                                  <span className={similarityScores[index] > 0.7 ? 'text-teal' : similarityScores[index] > 0.5 ? 'text-violet' : 'text-orange-400'}>
                                    {(similarityScores[index] * 100).toFixed(1)}%
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="mt-auto">
                <div className="w-full h-2 bg-violet/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet via-purple-500 to-teal transition-all duration-300"
                    style={{ 
                      width: selectedConcept === "all" 
                        ? `${averageSimilarity * 100}%` 
                        : similarityScores.length > 0 
                          ? `${similarityScores[parseInt(selectedConcept)] * 100}%` 
                          : '0%' 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-offwhite/60">
                  <span>Low Similarity</span>
                  <span>Medium</span>
                  <span>High Similarity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
