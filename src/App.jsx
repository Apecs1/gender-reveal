import { useEffect, useState } from "react"

import { initializeApp } from "firebase/app"

import {
  getDatabase,
  ref,
  onValue,
  runTransaction,
} from "firebase/database"



/* FIREBASE */

const firebaseConfig = {
  apiKey: "AIzaSyDA0SCdVPanMSnN58-X73SbhU0UrMy3j_E",
  authDomain: "gender-reveal-41930.firebaseapp.com",
  databaseURL: "https://gender-reveal-41930-default-rtdb.firebaseio.com",
  projectId: "gender-reveal-41930",
  storageBucket: "gender-reveal-41930.firebasestorage.app",
  messagingSenderId: "589284159051",
  appId: "1:589284159051:web:dde21a4545b7471342a7ce",
  measurementId: "G-3Z17H7QTRH",
}

const app = initializeApp(firebaseConfig)

const db = getDatabase(app)



export default function App() {

  /* FECHA EVENTO */

  const targetDate = new Date("2026-06-06T19:00:00")



  /* VOTOS */

  const [seleccion, setSeleccion] = useState(
    localStorage.getItem("votoReveal") || ""
  )

  const [votos, setVotos] = useState({
    niña: 0,
    niño: 0,
  })



  /* CONTADOR */

  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  })



  /* MUSICA */

  const playMusic = () => {
    const audio = document.getElementById("babyMusic")

    audio.volume = 0.5

    audio.play()
  }



  /* ESCUCHAR VOTOS EN TIEMPO REAL */

  useEffect(() => {

    const votosRef = ref(db, "votosReveal")

    onValue(votosRef, (snapshot) => {

      const data = snapshot.val()

      if (data) {
        setVotos(data)
      }

    })

  }, [])



  /* VOTAR */

  const votar = async (opcion) => {

    if (seleccion) {

      alert("💌 Ya realizaste tu voto")

      return
    }

    const votoRef = ref(db, `votosReveal/${opcion}`)

    await runTransaction(votoRef, (actual) => {
      return (actual || 0) + 1
    })

    localStorage.setItem("votoReveal", opcion)

    setSeleccion(opcion)

    if (opcion === "niño") {

      alert("💙 Votaste a que es niño")

    } else {

      alert("💖 Votaste a que es niña")
    }
  }



  /* CUENTA REGRESIVA */

  useEffect(() => {

    const interval = setInterval(() => {

      const now = new Date()

      const difference = targetDate - now

      if (difference > 0) {

        setTimeLeft({
          dias: Math.floor(difference / (1000 * 60 * 60 * 24)),

          horas: Math.floor(
            (difference / (1000 * 60 * 60)) % 24
          ),

          minutos: Math.floor(
            (difference / 1000 / 60) % 60
          ),

          segundos: Math.floor(
            (difference / 1000) % 60
          ),
        })
      }

    }, 1000)

    return () => clearInterval(interval)

  }, [])



  /* PORCENTAJES */

  const totalVotos = votos.niña + votos.niño

  const porcentajeNiña =
    totalVotos > 0
      ? Math.round((votos.niña / totalVotos) * 100)
      : 0

  const porcentajeNiño =
    totalVotos > 0
      ? Math.round((votos.niño / totalVotos) * 100)
      : 0



  return (

    <main className="min-h-screen overflow-hidden relative bg-black text-white">

      {/* MUSICA */}

      <audio id="babyMusic" src="/cancion.mp3" loop />



      {/* FONDO */}

      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-900 to-blue-500 opacity-80"></div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-400 rounded-full blur-3xl opacity-30"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-30"></div>



      <section className="relative z-10 flex items-center justify-center min-h-screen p-6">

        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] shadow-2xl overflow-hidden">



          {/* HERO */}

          <div className="text-center px-8 py-16">

            <div className="animate-bounce text-7xl mb-6">
              👶
            </div>



            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-pink-300 to-blue-300 bg-clip-text text-transparent">

              Revelación de sexo

            </h1>



            <p className="text-2xl text-white/90 mb-8 max-w-3xl mx-auto">

              Un pequeño milagro viene en camino…💕
              <br />
              Acompáñanos a descubrir si nuestro corazón se pintará de rosa o azul.

            </p>



            {/* BOTONES */}

            <div className="flex flex-wrap justify-center gap-8 text-3xl font-bold">

              <button
                onClick={() => votar("niña")}
                disabled={seleccion !== ""}
                className={`px-6 py-3 rounded-full border transition duration-300 hover:scale-110 ${
                  seleccion === "niña"
                    ? "bg-pink-500 border-pink-100 shadow-2xl scale-110"
                    : "bg-pink-500/30 border-pink-300"
                } ${seleccion ? "cursor-not-allowed opacity-80" : ""}`}
              >

                💖 Niña

              </button>



              <button
                onClick={() => votar("niño")}
                disabled={seleccion !== ""}
                className={`px-6 py-3 rounded-full border transition duration-300 hover:scale-110 ${
                  seleccion === "niño"
                    ? "bg-blue-500 border-blue-100 shadow-2xl scale-110"
                    : "bg-blue-500/30 border-blue-300"
                } ${seleccion ? "cursor-not-allowed opacity-80" : ""}`}
              >

                💙 Niño

              </button>



              <button
                onClick={playMusic}
                className="px-6 py-3 rounded-full bg-white text-black text-xl font-bold hover:scale-110 transition duration-300"
              >

                🔊 Música

              </button>

            </div>



            {/* MENSAJE */}

            {seleccion && (

              <div className="mt-8 mx-auto max-w-xl rounded-3xl bg-white/15 border border-white/25 px-6 py-4 shadow-xl animate-pulse">

                <p className="text-2xl md:text-3xl font-black">

                  {seleccion === "niño"
                    ? "💙 Votaste a que es niño"
                    : "💖 Votaste a que es niña"}

                </p>

              </div>
            )}



            {/* RESULTADOS */}

            <div className="mt-12 max-w-3xl mx-auto">

              <h2 className="text-4xl font-black mb-8">

                📊 Resultados en vivo

              </h2>



              <div className="grid grid-cols-2 gap-5">

                <div className="bg-pink-500/25 border border-pink-200/50 rounded-3xl p-8">

                  <p className="text-5xl font-black">

                    {votos.niña}

                  </p>

                  <p className="text-xl mt-2">

                    💖 Votos por niña

                  </p>

                  <p className="text-2xl font-bold mt-3">

                    {porcentajeNiña}%

                  </p>

                </div>



                <div className="bg-blue-500/25 border border-blue-200/50 rounded-3xl p-8">

                  <p className="text-5xl font-black">

                    {votos.niño}

                  </p>

                  <p className="text-xl mt-2">

                    💙 Votos por niño

                  </p>

                  <p className="text-2xl font-bold mt-3">

                    {porcentajeNiño}%

                  </p>

                </div>

              </div>



              {/* BARRA */}

              <div className="w-full h-8 rounded-full overflow-hidden bg-white/20 mt-8 flex">

                <div
                  className="bg-pink-400 transition-all duration-700"
                  style={{
                    width: `${porcentajeNiña}%`,
                  }}
                ></div>

                <div
                  className="bg-blue-400 transition-all duration-700"
                  style={{
                    width: `${porcentajeNiño}%`,
                  }}
                ></div>

              </div>



              <p className="mt-4 text-xl">

                Total de votos: {totalVotos}

              </p>

            </div>

          </div>



          {/* INFO */}

          <div className="grid md:grid-cols-3 gap-6 px-8">

            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 text-center hover:scale-105 transition duration-300">

              <div className="text-5xl mb-4">
                📅
              </div>

              <h2 className="text-2xl font-bold mb-2">
                Fecha
              </h2>

              <p className="text-white/80 text-lg">
                6 Junio 2026
              </p>

            </div>



            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 text-center hover:scale-105 transition duration-300">

              <div className="text-5xl mb-4">
                ⏰
              </div>

              <h2 className="text-2xl font-bold mb-2">
                Hora
              </h2>

              <p className="text-white/80 text-lg">
                3:00 PM
              </p>

            </div>



            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 text-center hover:scale-105 transition duration-300">

              <div className="text-5xl mb-4">
                📍
              </div>

              <h2 className="text-2xl font-bold mb-2">
                Lugar
              </h2>

              <p className="text-white/80 text-lg">
                Almedra 48 B, Jardines de santa Maria, tlaquepaque
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



          {/* ASISTENCIA */}

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

        <footer className="relative z-10 text-center py-8 text-white/70 text-lg">
        Página creada con ❤️ por el papá Miguel Ángel
      </footer>

    </main>
  )
}