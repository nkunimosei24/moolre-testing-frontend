import axios from 'axios'
import React, { useState } from 'react'
import api from '../axios/axios'
import { toast } from 'react-toastify'

const ValidateForm = () => {
const [form, setForm] = useState({
    receiver: '',
    channel: '',
    currency: '',
    accountnumber:''
})
const [amount, setAmount] = useState('')
const [description, setDescription] = useState('')
const [validatedData, setValidatedData] = useState(null)
const [showTransferForm, setShowTransferForm] = useState(false)
const [showModal, setShowModal] = useState(false)
 const [loading, setLoading] = useState(false) // for validation
  const [transferLoading, setTransferLoading] = useState(false) // for transfer

const handleValidate = async (e) => {
e.preventDefault()

const {receiver, channel, currency, accountnumber} = form

if (!receiver || !channel || !currency || !accountnumber) {
    toast.error("Please fill in all required fields")
    return
  }

  //for number checcing
const prefix = receiver.substring(0, 3)

  const networkPrefixes = {
    1: ["024", "054", "055", "059", "025"], // MTN
    6: ["020", "050"], // Telecel
    7: ["027", "057", "026", "056"], // AirtelTigo
  }

  // Check if the number matches the selected channel
  const validPrefixes = networkPrefixes[channel]
  if (validPrefixes && !validPrefixes.includes(prefix)) {
    toast.error("Receiver number does not match selected channel")
    return
  }

setLoading(true)

  
    try {
        const res = await api.post('/transfer/validate', form)
        
        if(res.data.success) {
            setValidatedData({
                ...form,
                accountName: res.data.accountName
            })
        }
        setShowModal(true)
        console.log(res.data)
    } catch (error) {
        console.log(error.res.data.message)
        toast.error(error.res.data.message)
    } finally {
        setLoading(false)
    }
}

//when confirmed, we clos the show modal and open the transfer form
const handleConfirm = () => {
    setShowModal(false)
    setShowTransferForm(true)
}

const handleTransfer = async(e) => {
    e.preventDefault()
    setTransferLoading(true)
    try {
        const res = await api.post('/transfer/transfer', {
            ...validatedData,
            amount,
            description
        })
        toast.success(res.data.message)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    } finally {
        setTransferLoading(false)
    }
}

    return (
         <div className="p-6 max-w-lg mx-auto">


      {!showTransferForm && (
        <form onSubmit={handleValidate} className="space-y-4 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-2">Validate Account</h2>

          <div>
            <label className="block text-sm font-semibold">Receiver</label>
            <input
              type="text"
              value={form.receiver}
              placeholder="Enter receiver number"
              onChange={(e) => setForm({ ...form, receiver: e.target.value })}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Channel of payment</label>
            <select
              value={form.channel}
              onChange={(e) => setForm({ ...form, channel: e.target.value })}
              className="border rounded-lg p-2 w-full"
            >
              <option value="">Select channel</option>
              <option value="1">MTN</option>
              <option value="2">Bank</option>
              <option value="6">Telecel</option>
              <option value="7">Airtel Tigo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold">Currency</label>
            <select
              value={form.currency}
              onChange={(e) => setForm({ ...form, currency: e.target.value })}
              className="border rounded-lg p-2 w-full"
            >
              <option value="">Select currency</option>
              <option value="GHS">GHS</option>
              <option value="NGN">NGN</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold">Moolre Account Number</label>
            <input
              type="text"
              value={form.accountnumber}
              placeholder="Enter your Moolre account number"
              onChange={(e) => setForm({ ...form, accountnumber: e.target.value })}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } text-white py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2`}
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? 'Validating...' : 'Validate Account'}
          </button>

        </form>
      )}

      
      {showModal && validatedData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center">
            <h3 className="text-lg font-semibold mb-2">Account Validated</h3>
            <p className="mb-4">Account Name: <strong>{validatedData.accountName}</strong></p>
            <div className="flex gap-3 justify-center">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      
      {showTransferForm && (
        <form onSubmit={handleTransfer} className="space-y-4 bg-white p-4 mt-6 rounded-xl shadow-md">
            <div className='flex justify-between items-center'>
          <h2 className="text-xl font-bold mb-2">Transfer Funds</h2>
          <div
              onClick={() => setShowTransferForm(false)}
              className="cursor-pointer text-red-500 font-bold"
            >
              X
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold">Receiver</label>
            <input
              type="text"
              value={validatedData?.receiver || ''}
              readOnly
              className="border rounded-lg p-2 w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Account Name</label>
            <input
              type="text"
              value={validatedData?.accountName || ''}
              readOnly
              className="border rounded-lg p-2 w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Description</label>
            <input
              type="text"
              placeholder="Add a short note (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
          </div>

           <button
            type="submit"
            disabled={transferLoading}
            className={`${
              transferLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            } text-white py-2 px-4 rounded-lg w-full flex items-center justify-center gap-2`}
          >
            {transferLoading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {transferLoading ? 'Transferring...' : 'Send Transfer'}
          </button>
        </form>
      )}
    </div>
    )
}

export default ValidateForm