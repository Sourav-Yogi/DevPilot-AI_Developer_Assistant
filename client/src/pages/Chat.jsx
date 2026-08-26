import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Layout from "../components/Layout";
import { chatWithProject } from "../services/project.service";

const Chat = () => {
  const { id } = useParams();

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!question.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: question,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setQuestion("");
    setLoading(true);

    try {
      const res = await chatWithProject(id, {
        question,
        history: updatedMessages,
      });

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: res.data.data.answer,
          sources: res.data.data.sources || [],
        },
      ]);
    } catch (err) {
      alert(err.response?.data?.message || "Chat failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex h-[85vh] flex-col rounded-2xl border border-gray-200 bg-white shadow">
        {/* Header */}
        <div className="border-b px-6 py-5">
          <h1 className="text-2xl font-bold">Repository AI Chat</h1>

          <p className="mt-1 text-sm text-gray-500">
            Ask questions about your GitHub repository.
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          {messages.length === 0 && (
            <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
              Ask anything about your repository.
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-4xl rounded-xl p-4 ${
                msg.role === "user"
                  ? "ml-auto bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    code({ className, children, ...props }) {
      const isCodeBlock = className && className.startsWith("language-");

      if (!isCodeBlock) {
        return (
          <code
            className="font-mono text-[0.95em] text-inherit"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <pre className="my-4 overflow-x-auto rounded-xl bg-slate-900 p-4">
          <code
            className={`${className} text-green-400 font-mono text-sm`}
            {...props}
          >
            {children}
          </code>
        </pre>
      );
    },

    pre({ children }) {
      return <>{children}</>;
    },
  }}
>
  {msg.content}
</ReactMarkdown>
{msg.role === "assistant" && msg.sources?.length > 0 && (
  <div className="mt-4 border-t border-gray-300 pt-3">
    <p className="mb-2 text-sm font-semibold text-gray-700">
      Sources
    </p>

    <ul className="space-y-1">
      {msg.sources.map((source, sourceIndex) => (
        <li
          key={sourceIndex}
          className="text-sm text-gray-600"
        >
          {source}
        </li>
      ))}
    </ul>
  </div>
)}
            </div>
          ))}

          {loading && (
            <div className="max-w-fit rounded-xl bg-gray-100 px-5 py-3">
              DevPilot is thinking...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="flex gap-4 border-t p-5">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything about this repository..."
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Chat;
