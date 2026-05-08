export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  const body = await req.json();
  const image = body.image;
  const target = body.target;

  // 固定题库
  const wordList = [
    "床","沙发","桌子","椅子","衣柜","牙刷","手机","剪刀","雨伞","眼镜",
    "钟表","书包","篮球","行李箱","帽子","水杯","钥匙","台灯","棉签",
    "保温杯","充电宝","订书机","自拍杆","眼罩","卷发棒","体重秤","刀",
    "杯","衣架","鼠标","毛巾","碗","勺子","梳子","铅笔","尺子","橡皮擦"
  ];

  // 模拟真实大模型随机识别（仿真真AI效果）
  const randomSimilar = Math.floor(Math.random() * 40) + 45;
  let guessItem;
  let correctFlag;

  if (randomSimilar > 65) {
    guessItem = target;
    correctFlag = true;
  } else {
    const others = wordList.filter(w => w !== target);
    guessItem = others[Math.floor(Math.random() * others.length)];
    correctFlag = false;
  }

  return new Response(JSON.stringify({
    guess: guessItem,
    similar: randomSimilar,
    correct: correctFlag
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
