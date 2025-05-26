import React, { useState, useCallback } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import LoadingSpinner from './common/LoadingSpinner';
import { generateResearchIdea, generateGrantProposalSnippet } from '../services/geminiService';
import { SparklesIcon } from './common/Icon';

const ResearchAssistantPage: React.FC = () => {
  const [ideaPrompt, setIdeaPrompt] = useState<string>('');
  const [grantTopic, setGrantTopic] = useState<string>('');
  const [grantSection, setGrantSection] = useState<string>('Introduction');
  
  const [ideaResponse, setIdeaResponse] = useState<string | null>(null);
  const [grantResponse, setGrantResponse] = useState<string | null>(null);
  
  const [isIdeaLoading, setIsIdeaLoading] = useState<boolean>(false);
  const [isGrantLoading, setIsGrantLoading] = useState<boolean>(false);

  const handleGenerateIdea = useCallback(async () => {
    if (!ideaPrompt.trim()) {
      setIdeaResponse("Please enter a topic or keywords for a research idea.");
      return;
    }
    setIsIdeaLoading(true);
    setIdeaResponse(null);
    try {
      const result = await generateResearchIdea(ideaPrompt);
      setIdeaResponse(result.text);
    } catch (error) {
      setIdeaResponse('Failed to generate research idea. Please try again.');
      console.error("Research Idea Generation Error:", error);
    } finally {
      setIsIdeaLoading(false);
    }
  }, [ideaPrompt]);

  const handleGenerateGrantSnippet = useCallback(async () => {
    if (!grantTopic.trim() || !grantSection.trim()) {
        setGrantResponse("Please enter a topic and select a section for the grant snippet.");
        return;
    }
    setIsGrantLoading(true);
    setGrantResponse(null);
    try {
        const result = await generateGrantProposalSnippet(grantTopic, grantSection);
        setGrantResponse(result.text);
    } catch (error) {
        setGrantResponse('Failed to generate grant snippet. Please try again.');
        console.error("Grant Snippet Generation Error:", error);
    } finally {
        setIsGrantLoading(false);
    }
  }, [grantTopic, grantSection]);


  return (
    <div className="space-y-10">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2 flex items-center justify-center">
          <SparklesIcon className="w-8 h-8 md:w-10 md:h-10 mr-3 text-purple-400" />
          AI Research Assistant
        </h1>
        <p className="text-md md:text-lg text-gray-300">Leverage Gemini to spark new ideas and draft proposal sections.</p>
      </header>

      <Card title="Research Idea Generator" titleClassName="text-xl font-semibold mb-3 text-purple-300" className="shadow-purple-500/20">
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">Enter some keywords or a general research area, and let the AI suggest some novel research directions.</p>
          <textarea
            value={ideaPrompt}
            onChange={(e) => setIdeaPrompt(e.target.value)}
            placeholder="e.g., 'AI in personalized medicine for rare diseases', 'sustainable urban agriculture technologies', 'impact of social media on adolescent mental health'"
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500 h-28 resize-y text-sm"
            rows={3}
            aria-label="Prompt for research idea generation"
          />
          <Button onClick={handleGenerateIdea} isLoading={isIdeaLoading} disabled={isIdeaLoading || !ideaPrompt.trim()} className="w-full md:w-auto">
            {isIdeaLoading ? 'Generating Idea...' : 'Generate Idea'}
          </Button>
          {isIdeaLoading && <LoadingSpinner text="Thinking of brilliant ideas..." className="mt-4" />}
          {ideaResponse && !isIdeaLoading && (
            <div className="mt-6 p-4 bg-gray-700/50 rounded-md border border-gray-600">
              <h4 className="text-lg font-semibold text-purple-300 mb-2">AI Generated Idea:</h4>
              <p className="text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">{ideaResponse}</p>
            </div>
          )}
        </div>
      </Card>

      <Card title="Grant Proposal Snippet Helper" titleClassName="text-xl font-semibold mb-3 text-green-300" className="shadow-green-500/20">
        <div className="space-y-4">
            <p className="text-gray-300 text-sm">Get help drafting sections of your grant proposal. Enter your research topic and select the section you need assistance with.</p>
            <div>
                <label htmlFor="grantTopic" className="block text-xs font-medium text-gray-300 mb-1">Research Topic:</label>
                <input
                    type="text"
                    id="grantTopic"
                    value={grantTopic}
                    onChange={(e) => setGrantTopic(e.target.value)}
                    placeholder="e.g., 'CRISPR-based gene therapy for cystic fibrosis'"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-green-500 focus:border-green-500 text-sm"
                    aria-label="Research topic for grant snippet"
                />
            </div>
            <div>
                <label htmlFor="grantSection" className="block text-xs font-medium text-gray-300 mb-1">Proposal Section:</label>
                <select
                    id="grantSection"
                    value={grantSection}
                    onChange={(e) => setGrantSection(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-green-500 focus:border-green-500 text-sm"
                    aria-label="Proposal section for grant snippet"
                >
                    <option value="Introduction">Introduction / Background</option>
                    <option value="Specific Aims">Specific Aims</option>
                    <option value="Research Strategy">Research Strategy / Methods</option>
                    <option value="Innovation">Innovation</option>
                    <option value="Significance">Significance / Impact</option>
                    <option value="Abstract">Abstract</option>
                </select>
            </div>
             <Button 
                onClick={handleGenerateGrantSnippet} 
                isLoading={isGrantLoading} 
                disabled={isGrantLoading || !grantTopic.trim()} 
                variant="primary" 
                className="bg-green-600 hover:bg-green-700 focus:ring-green-500 w-full md:w-auto"
            >
                {isGrantLoading ? 'Drafting Snippet...' : 'Generate Snippet'}
            </Button>
            {isGrantLoading && <LoadingSpinner text="Crafting compelling text..." className="mt-4" />}
            {grantResponse && !isGrantLoading && (
                <div className="mt-6 p-4 bg-gray-700/50 rounded-md border border-gray-600">
                    <h4 className="text-lg font-semibold text-green-300 mb-2">AI Generated Snippet ({grantSection}):</h4>
                    <p className="text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">{grantResponse}</p>
                </div>
            )}
        </div>
      </Card>

      <Card title="Important Disclaimer" titleClassName="text-lg font-semibold text-yellow-300" className="border-yellow-500/50 bg-yellow-900/20">
         <p className="text-sm text-yellow-200 leading-relaxed">
            The AI Research Assistant is a tool designed to spark creativity and provide drafting assistance.
            All content generated by the AI should be critically reviewed, fact-checked, edited, and verified for accuracy and originality before any official use.
            This tool is not a substitute for your expert knowledge, rigorous research practices, or academic integrity. Always cite sources appropriately and ensure your work is your own.
          </p>
      </Card>
    </div>
  );
};

export default ResearchAssistantPage;
