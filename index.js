import mineflayer from "mineflayer";

// ================= CONFIG =================
const BOT_CONFIG = {
  host: "Dla3Craft.aternos.me",
  port: 49489,
  username: "Dela3v2",
  version: "1.21" // we will verify this
};
// ==========================================

let bot;

function startBot() {
  console.log("Starting bot...");

  bot = mineflayer.createBot(BOT_CONFIG);

  bot.on("login", () => {
    console.log("Login packet accepted by server");
  });

  bot.once("spawn", () => {
    console.log("Bot spawned in the world");

    setTimeout(() => {
      console.log("Sending /login command");
      bot.chat("/login 000000");
    }, 4000);

    setInterval(() => {
      if (!bot || !bot.entity) return;

      bot.look(
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * Math.PI / 4,
        true
      );

      bot.swingArm("right");

      bot.setControlState("jump", true);
      setTimeout(() => bot.setControlState("jump", false), 400);

      console.log("AFK action executed");
    }, 10_000);
  });

  // 🔴 MOST IMPORTANT EVENT
  bot.on("kicked", (reason, loggedIn) => {
    console.log("=== BOT KICKED ===");
    console.log("Logged in:", loggedIn);
    console.log("Kick reason:", reason);
    console.log("==================");
  });

  bot.on("end", (reason) => {
    console.log("Connection ended.");
    console.log("End reason:", reason);
    setTimeout(startBot, 5000);
  });

  bot.on("error", (err) => {
    console.log("Bot error event:");
    console.log(err);
  });

  bot.on("message", (msg) => {
    console.log("SERVER MESSAGE:", msg.toString());
  });
}

startBot();
