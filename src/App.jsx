import { useEffect, useState } from "react"

export default function App() {
  const targetDate = new Date("2026-06-06T19:00:00")

  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((difference / 1000 / 60) % 60),
          segundos: Math.floor((difference / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen overflow-hidden relative bg-black text-white">

      {/* FONDO */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-900 to-blue-500 opacity-80"></div>

      {/* CIRCULOS DECORATIVOS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-30"></div>

      {/* CONTENIDO */}
      <section className="relative z-10 flex items-center justify-center min-h-screen p-6">

        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] shadow-2xl overflow-hidden">

          {/* HERO */}
          <div className="text-center px-8 py-16">

            <div className="animate-bounce text-7xl mb-6">
              👶
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-pink-300 to-blue-300 bg-clip-text text-transparent">
              Revelacion de sexo
            </h1>

            <p className="text-2xl text-white/90 mb-8">
              Una noche mágica para descubrir
            </p>

            <div className="flex justify-center gap-8 text-3xl font-bold">
              <span className="bg-pink-500/30 px-6 py-3 rounded-full border border-pink-300">
                💖 Niña
              </span>

              <span className="bg-blue-500/30 px-6 py-3 rounded-full border border-blue-300">
                💙 Niño
              </span>
            </div>

          </div>

          {/* INFO */}
          <div className="grid md:grid-cols-3 gap-6 px-8">

            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 text-center hover:scale-105 transition duration-300">
              <div className="text-5xl mb-4">📅</div>
              <h2 className="text-2xl font-bold mb-2">
                Fecha
              </h2>
              <p className="text-white/80 text-lg">
                6 Junio 2026
              </p>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 text-center hover:scale-105 transition duration-300">
              <div className="text-5xl mb-4">⏰</div>
              <h2 className="text-2xl font-bold mb-2">
                Hora
              </h2>
              <p className="text-white/80 text-lg">
                3:00 PM
              </p>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 text-center hover:scale-105 transition duration-300">
              <div className="text-5xl mb-4">📍</div>
              <h2 className="text-2xl font-bold mb-2">
                Lugar
              </h2>
              <p className="text-white/80 text-lg">
                Almedra 48 B
              </p>
            </div>

          </div>

          {/* CONTADOR */}
          <div className="px-8 py-14">

            <h2 className="text-4xl font-bold text-center mb-10">
              ⏳ Cuenta regresiva
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

              {[
                ["Días", timeLeft.dias],
                ["Horas", timeLeft.horas],
                ["Minutos", timeLeft.minutos],
                ["Segundos", timeLeft.segundos],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-white/10 border border-white/20 rounded-3xl p-8 text-center shadow-xl hover:scale-105 transition duration-300"
                >
                  <p className="text-5xl font-black mb-2">
                    {value}
                  </p>

                  <span className="text-white/80 text-xl">
                    {label}
                  </span>
                </div>
              ))}

            </div>

          </div>

          {/* MENSAJE */}
          <div className="px-8 pb-14">

            <div className="bg-gradient-to-r from-pink-500/20 to-blue-500/20 border border-white/20 rounded-[35px] p-10 text-center">

              <div className="text-6xl mb-5">
                🎉
              </div>

              <p className="text-2xl leading-relaxed text-white/90 max-w-3xl mx-auto">
                Nuestro corazón está lleno de emoción y queremos compartir contigo este momento tan especial.
              </p>

              <a
                href="https://wa.me/523333566247"
                target="_blank"
                className="inline-block mt-10 bg-white text-black px-10 py-5 rounded-full text-xl font-bold hover:scale-110 transition duration-300 shadow-2xl"
              >
                Confirmar asistencia 💌
              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}