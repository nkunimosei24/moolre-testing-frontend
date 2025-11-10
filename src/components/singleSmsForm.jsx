import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../axios/axios";

const SendSingleSMS = () => {
  const [form, setForm] = useState({
    senderid: "",
    recipient: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {senderid, recipient, message} = form
    try {
      const res = await api.get("/sms/singleSms", {
        params : {
            senderid, 
            recipient,
            message
        }
      });
      toast.success(res.data.message);
      console.log(res.data);
    } catch (error) {
      toast.error("Failed to send SMS");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Send Single SMS</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Sender ID</label>
          <input
            type="text"
            name="senderid"
            value={form.senderid}
            onChange={(e) => setForm({...form, senderid: e.target.value})}
            placeholder="e.g. Aseda"
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Recipient</label>
          <input
            type="text"
            name="recipient"
            value={form.recipient}
            onChange={(e) => setForm({...form, recipient: e.target.value})}
            placeholder="e.g. 0501649907"
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={(e) => setForm({...form, message: e.target.value})}
            placeholder="Enter your message..."
            className="w-full p-2 border rounded-lg h-24"
            required
          />
        </div>

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
    </div>
  );
};

export default SendSingleSMS;
