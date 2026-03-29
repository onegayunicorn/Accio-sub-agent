import { useState } from 'react';
import { chatWithAccio } from '../services/geminiService';

export function ChatInterface({ onMessage }: { onMessage: (msg: string) => void }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    onMessage(input);
    setMessages([...messages, { role: 'user', content: input }]);
    const response = await chatWithAccio(input);
    setMessages(prev => [...prev, { role: 'ai', content: response }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full border border-gray-300 rounded-lg p-4 bg-white">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 border rounded p-2 mr-2" placeholder="Ask Accio..." />
        <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded">Send</button>
      </div>
    </div>
  );
}
