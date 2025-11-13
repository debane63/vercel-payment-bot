import axios from "axios";

export default async function handler(req, res) {
  try {
    const payload = {
      type: "upi_qr",
      amount: 10000,
      currency: "INR",
      name: "Payment",
      description: "Pay ₹100",
      fixed_amount: true
    };

    const key = process.env.RAZORPAY_KEY;
    const secret = process.env.RAZORPAY_SECRET;

    const { data } = await axios.post(
      "https://api.razorpay.com/v1/payments/qr_codes",
      payload,
      {
        auth: { username: key, password: secret }
      }
    );

    return res.json({
      qr_id: data.id,
      qr_image: data.image_url
    });

  } catch (err) {
    return res.status(500).json({ error: "QR ERROR" });
  }
}
