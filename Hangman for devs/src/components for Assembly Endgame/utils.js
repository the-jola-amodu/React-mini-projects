export function randomWord(){

    const words = [
        "absolute", "backfire", "campfire", "daylight", "earliest",
        "faithful", "generate", "highland", "identify", "joyfully",
        "keyboard", "lifetime", "magnetic", "necklace", "offshore",
        "passport", "quantity", "reliable", "sunlight", "trending",
        "umbrella", "vacation", "wildfire", "xylophon", "yardstick",
        "zealousy", "airplane", "building", "creative", "delicate",
        "elegance", "friendly", "gigantic", "handsome", "insights",
        "jubilant", "kneeling", "laughing", "mountain", "nonsense",
        "operator", "playtime", "question", "residual", "solution",
        "tangible", "ultimate", "valuable", "waterway", "yearlong"
  ];
  return words[Math.floor(Math.random() * words.length)].toUpperCase()
}