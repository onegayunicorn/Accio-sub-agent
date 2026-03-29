/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { TerminalInterface } from './components/TerminalInterface';

export default function App() {
  const [logs, setLogs] = useState<string[]>(['Accio AI initialized.', 'Waiting for input...']);

  const addLog = (log: string) => {
    setLogs(prev => [...prev, log]);
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Accio AI Sourcing Assistant</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChatInterface onMessage={(msg) => addLog(`User: ${msg}`)} />
        <TerminalInterface logs={logs} />
      </div>
    </div>
  );
}
