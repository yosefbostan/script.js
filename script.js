document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('chart').getContext('2d');

    // بيانات افتراضية للرسم البياني
    const data = {
        labels: ['1m', '2m', '3m', '4m', '5m'],
        datasets: [{
            label: 'حركة السعر',
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            data: [1.1, 1.3, 1.2, 1.5, 1.4]
        }]
    };

    // إنشاء الرسم البياني
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: { responsive: true }
    });

    // تحليل بسيط لإعطاء إشارة بيع أو شراء
    function generateSignal() {
        const signalBox = document.getElementById('signalBox');
        const random = Math.random();
        if (random > 0.5) {
            signalBox.innerHTML = "🔼 إشارة شراء قوية!";
            signalBox.className = "signal-box buy";
        } else {
            signalBox.innerHTML = "🔽 إشارة بيع قوية!";
            signalBox.className = "signal-box sell";
        }
    }

    setInterval(generateSignal, 5000); // تحديث الإشارة كل 5 ثوانٍ
});
