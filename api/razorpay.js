import axios from "axios";

export default async function handler(req, res) {
  const body = req.body;

  if (body.event === "payment.captured") {
    const chatId = process.env.ADMIN_CHAT_ID; // যাকে মেসেজ পাঠাবে

    const telegram = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`;

    await axios.post(telegram, {
      chat_id: chatId,
      text: "✅ Payment Verified!"
    });
  }

  res.status(200).send("OK");
}
