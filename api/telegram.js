import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

// /start
bot.start((ctx) => ctx.reply("Welcome! Send /pay100 to get Razorpay QR."));

// /pay100 → Razorpay QR generate
bot.command("pay100", async (ctx) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/create-qr`,
      { method: "GET" }
    );
    const data = await response.json();
    await ctx.replyWithPhoto(data.qr_image, { caption: "Scan & Pay ₹100" });
  } catch (err) {
    ctx.reply("Error generating QR!");
  }
});

// Webhook handler
export default async function handler(req, res) {
  try {
    await bot.handleUpdate(req.body);
    res.status(200).send("OK");
  } catch (e) {
    res.status(500).send("BOT ERROR");
  }
}
