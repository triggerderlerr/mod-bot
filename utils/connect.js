const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.connection.once("open", () => {
            console.log("----------------------------------------");
            console.log(`[MONGO] Database'e başarıyla bağlandı!`);
        });
    } catch (error) {
        console.error(`[MONGO] Database'e bağlanırken bir hata oluştu: ${error.message}`);
        process.exit(1); // Hata durumunda uygulamayı kapat
    }
}

// Uygulama başlarken bağlantıyı başlat
connect();

module.exports = connect;
