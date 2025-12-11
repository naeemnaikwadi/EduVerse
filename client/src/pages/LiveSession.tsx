import React, { useState } from 'react';

export default function LiveSession({ sessionId }: { sessionId: string }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    // Add message locally (Socket.IO removed for deployment compatibility)
    if (input.trim()) {
      setMessages((prev) => [...prev, `You: ${input}`]);
      setInput('');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Live Session Chat</h2>
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Real-time chat is disabled for deployment compatibility. 
          Messages are stored locally only.
        </p>
      </div>
      <div className="h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((m, i) => (
            <div key={i} className="mb-2 p-2 bg-white rounded border">
              {m}
            </div>
          ))
        )}
      </div>
      <div className="flex gap-2">
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}