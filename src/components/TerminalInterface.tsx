export function TerminalInterface({ logs }: { logs: string[] }) {
  return (
    <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto border border-gray-700">
      {logs.map((log, i) => <div key={i}>{`> ${log}`}</div>)}
    </div>
  );
}
