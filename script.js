// ✅ تحليل الأسواق وعرض الإشارات
function analyzeMarket() {
    const signalBox = document.getElementById("signalBox");
    
    // 👇 اختيار عشوائي بين إشارة شراء أو بيع
    const isBuy = Math.random() > 0.5; 
    const signalText = isBuy ? "📈 إشارة شراء - السوق في ارتفاع" : "📉 إشارة بيع - السوق في انخفاض";
    
    // 👇 تطبيق لون الإشارة
    signalBox.innerHTML = signalText;
    signalBox.className = isBuy ? "signal-box buy" : "signal-box sell";

    // ✅ تحديث الرسم البياني
    updateChart();
}

// ✅ رسم الشموع البيانية (شموع يابانية)
function updateChart() {
    const ctx = document.getElementById("candleChart").getContext("2d");

    // 🔹 بيانات عشوائية لمحاكاة السوق
    const data = generateRandomCandles();

    // 🔹 حذف الرسم القديم وإنشاء رسم جديد
    if (window.candleChart) {
        window.candleChart.destroy();
    }

    window.candleChart = new Chart(ctx, {
        type: "candlestick",
        data: {
            datasets: [{
                label: "OTC Market",
                data: data,
                color: {
                    up: "#10b981",
                    down: "#ef4444",
                    unchanged: "#94a3b8"
                }
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { type: "time" },
                y: { ticks: { callback: v => v.toFixed(4) } }
            }
        }
    });
}

// ✅ توليد بيانات شموع عشوائية
function generateRandomCandles() {
    const candles = [];
    let prevClose = 1.0 + Math.random() * 0.5;
    const now = new Date();

    for (let i = 30; i >= 0; i--) {
        const open = prevClose;
        const high = open * (1 + Math.random() * 0.005);
        const low = open * (1 - Math.random() * 0.005);
        const close = low + Math.random() * (high - low);
        const time = new Date(now - i * 60000); // 1 دقيقة لكل شمعة

        candles.push({ x: time, o: open, h: high, l: low, c: close });
        prevClose = close;
    }

    return candles;
}
