import express from "express";

const app = express();

app.use((req, res, next)=>{
  res.set({'Access-Control-Allow-Origin' : '*'})
  next();
})

app.get("/quote", (_req, res) => {
  const random = Math.trunc(Math.random() * 20);
  res.json(quotes[random])
});

app.get("/*", (_req, res)=>{
  res.json({
    id: 0, quote : "The only free advice is don't take free Advice",
  })
})

app.listen(3000, () => {
  console.log("Server is running on port : 3000");
});

const quotes = [
  { id: 1, quote: "The only way to do great work is to love what you do." },
  {
    id: 2,
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  },
  { id: 3, quote: "Do what you can, with what you have, where you are." },
  {
    id: 4,
    quote: "It does not matter how slowly you go as long as you do not stop.",
  },
  { id: 5, quote: "Believe you can and you're halfway there." },
  { id: 6, quote: "You miss 100% of the shots you don’t take." },
  {
    id: 7,
    quote:
      "Your time is limited, so don’t waste it living someone else’s life.",
  },
  { id: 8, quote: "The best way to predict the future is to create it." },
  { id: 9, quote: "Dream big and dare to fail." },
  {
    id: 10,
    quote: "I find that the harder I work, the more luck I seem to have.",
  },
  { id: 11, quote: "Happiness depends upon ourselves." },
  {
    id: 12,
    quote: "Everything you’ve ever wanted is on the other side of fear.",
  },
  { id: 13, quote: "It always seems impossible until it’s done." },
  { id: 14, quote: "Act as if what you do makes a difference. It does." },
  {
    id: 15,
    quote:
      "Keep going. Everything you need will come to you at the perfect time.",
  },
  {
    id: 16,
    quote:
      "Hardships often prepare ordinary people for an extraordinary destiny.",
  },
  { id: 17, quote: "Opportunities don't happen. You create them." },
  { id: 18, quote: "Be yourself; everyone else is already taken." },
  { id: 19, quote: "Don’t watch the clock; do what it does. Keep going." },
  {
    id: 20,
    quote:
      "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  }
];
