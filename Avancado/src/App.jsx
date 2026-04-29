import { useState } from 'react'
import './App.css'
import './components/ComponentStyles.css'
import necoArcImg from './assets/necoarc1.jpg'
import necoArcImg2 from './assets/necoarc2.jpg'
import ManageData2UseState from './components/ManageData2UseState.jsx'
import CondicionalRender from './components/CondicionalRender.jsx'
import ShowUserName from './components/ShowUserName.jsx'
import Message from './components/Message.jsx'
import ChangeMessageState from './components/ChangeMessageState.jsx'
import ListRender from './components/ListRender.jsx'
import ExerciseProps from './components/ExerciseProps.jsx'
import ExerciseUseState from './components/ExerciseUseState.jsx'
import ExerciseConditional from './components/ExerciseConditional.jsx'
import ExerciseMessageLift from './components/ExerciseMessageLift.jsx'

function App() {
  const [message, setMessage] = useState('Clique em um botão para trocar esta mensagem.')

  return (
    <main className="app-root">
      <section className="component-card">
        <h2>Imagens com Assets e Public</h2>
        <div className="button-row">
          <img src={necoArcImg} alt="Neco Arc" style={{ width: 220, borderRadius: 18 }} />
          <img src={necoArcImg2} alt="Neco Arc 2" style={{ width: 220, borderRadius: 18 }} />
        </div>
        <p>As imagens acima são importadas do diretório <code>src/assets</code>.</p>
        <img src="/public/oardefault.jpg" alt="Public Image" style={{ maxWidth: 320, borderRadius: 18, marginTop: 16 }} />
      </section>

      <section className="component-grid">
        <ExerciseProps title="Exemplo de Props" author="Vinicius" />
        <ExerciseUseState />
        <ExerciseConditional />
        {/* <ExerciseMessageLift />
        <ListRender />
      </section>

      <section className="component-grid">
        <ManageData2UseState />
        <CondicionalRender />
        <ShowUserName name="Ana" />
        <Message msg={message} />
        <ChangeMessageState changeMessage={setMessage} /> */}
      </section>
    </main>
  )
}

export default App
