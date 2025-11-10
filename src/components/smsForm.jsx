import React, { useState } from "react";
import axios from "axios";
import api from "../axios/axios";
import { toast } from "react-toastify";

const SendSMSForm = () => {
  const [senderid, setSenderid] = useState("");
  const [messages, setMessages] = useState([
    { recipient: "", message: "" }
  ]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleMessageChange = (index, field, value) => {
    const updatedMessages = [...messages];
    updatedMessages[index][field] = value;
    setMessages(updatedMessages);
  };

  const addMessageField = () => {
    setMessages([...messages, { recipient: "", message: "" }]);
  };

  const removeMessageField = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setErrorMsg(null);

    try {
      const response = await api.post("/sms/sendSMS", {
        senderid,
        messages
      });
      toast.success(response?.data?.moolreResponse?.message);
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Failed to send SMS");
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Send SMS</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Sender ID</label>
          <input
            type="text"
            value={senderid}
            onChange={(e) => setSenderid(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter Sender ID"
            required
          />
        </div>

        {messages.map((msg, index) => (
          <div key={index} className="mb-4 p-2 border rounded">
            <label className="block mb-1">Recipient</label>
            <input
              type="text"
              value={msg.recipient}
              onChange={(e) => handleMessageChange(index, "recipient", e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter phone number"
              required
            />
            <label className="block mb-1">Message</label>
            <textarea
              value={msg.message}
              onChange={(e) => handleMessageChange(index, "message", e.target.value)}
              className="w-full p-2 border rounded mb-2"
              placeholder="Enter your message"
              required
            />
            {messages.length > 1 && (
              <button
                type="button"
                onClick={() => removeMessageField(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addMessageField}
          className="bg-gray-200 px-3 py-1 rounded mb-4 hover:bg-gray-300 mr-2"
        >
          Add Another Message
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white rounded-lg ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Send SMS"}
        </button>
      </form>

      {errorMsg && (
        <div className="mt-4 p-2 bg-red-100 border border-red-300 rounded">
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default SendSMSForm;
