import { useRef, useState } from 'react'
import './VideoPlayer.css'

/**
 * 📌 PROJETO 05: VIDEO PLAYER
 * 🎓 Conceitos: useRef para controlar elementos media
 * ⭐ Dificuldade: INTERMEDIÁRIO
 * 
 * 🎯 O que aprenderá:
 * - useRef para controlar vídeo/áudio
 * - Propriedades de media (play, pause, currentTime)
 * - Barra de progresso customizada
 * - Controles de volume
 */

function VideoPlayer() {
  // 📹 Referência ao elemento video
  const videoRef = useRef(null)

  // 🎮 Estados para controle
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)

  // ▶️ Tocar/Pausar
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // ⏱️ Atualizar tempo atual
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  // ⏲️ Carregar metadados (duração)
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  // 🎚️ Mudar posição do vídeo
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  // 🔊 Controlar volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  // 🖥️ Tela cheia
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch((err) => {
          console.error(`Erro ao entrar em fullscreen: ${err.message}`)
        })
        setFullscreen(true)
      } else {
        document.exitFullscreen()
        setFullscreen(false)
      }
    }
  }

  // 🎨 Formatar tempo (MM:SS)
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className={`video-player-container ${fullscreen ? 'fullscreen' : ''}`}>
      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="video-element"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos
        </video>

        {/* Controles */}
        <div className="controls">
          {/* Barra de progresso */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="progress-bar"
            title="Posição do vídeo"
          />

          <div className="controls-bottom">
            {/* Botões esquerda */}
            <div className="controls-left">
              <button onClick={togglePlay} className="btn-control" title="Play/Pausa">
                {isPlaying ? '⏸' : '▶'}
              </button>

              <div className="volume-control">
                <span className="volume-icon">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                  title="Volume"
                />
              </div>

              <span className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Botões direita */}
            <div className="controls-right">
              <button onClick={toggleFullscreen} className="btn-control" title="Tela cheia">
                {fullscreen ? '⛔' : '⛶'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="info">
        <h3>📹 Como Funciona:</h3>
        <p>- Use os botões para controlar o vídeo</p>
        <p>- Clique na barra de progresso para pular</p>
        <p>- Ajuste o volume com o slider</p>
        <p>- Clique em ⛶ para tela cheia</p>
      </div>
    </div>
  )
}

export default VideoPlayer

/**
 * 🧪 DESAFIO 1 (Fácil):
 * - Adicionar botão de silenciar (mute)
 * - Salvar última posição assistida
 * 
 * 🧪 DESAFIO 2 (Intermediário):
 * - Adicionar velocidade de reprodução (0.5x, 1x, 1.5x, 2x)
 * - Adicionar lista de reproducão
 * - Mostrar duração ao passar mouse
 * 
 * 🧪 DESAFIO 3 (Avançado):
 * - Adicionar legendas
 * - Implementar Picture-in-Picture
 * - Permitir upload de vídeo
 * - Salvar preferências em localStorage
 */
