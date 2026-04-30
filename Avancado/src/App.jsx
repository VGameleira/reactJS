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
import CarDetails from './components/CarDetails.jsx'
import Fragment2 from './components/Fragment2.jsx'



//Ordem de aprendizagem:
//1 - Imagem em Public - Arquivo App.jsx
//2 - Imagem em Assets - Arquivo App.jsx
//3 - useState: Gerenciamento de estado - Arquivo ManageData.jsx e ManageData2UseState.jsx
//4 - Renderização de listas e objetos - Arquivo ListRender.jsx
//5 - Renderização condicional - Arquivo CondicionalRender.jsx
//6 - Props - Arquivo ShowUserName.jsx
//7 - Destructuring Props - Arquivo CarDetails.jsx
//8 - Reaproveitando Componente - Arquivo CarDetails.jsx
//9 - Loop em array de objetos - Arquivo App.jsx (Array de objetos utilizado em CarDetails.jsx)
//10 - Fragment - Arquivo Fragment2.jsx
//11 - Children - Arquivo Container.jsx
//12 - Executar função por Props(Pelo componente Filho) - Arquivo ExecuteFunction.jsx
//13 - State Lift: Um componente exibe outro altera, o Pai gerencia; - Arquivo App.jsx (Componente Message.jsx e ChangeMessageState.jsx)


const cars = [
  { id: 1, brand: 'Honda', km: 5000, color: 'Azul', newCar: true },
  { id: 2, brand: 'Ford', km: 30000, color: 'Preto', newCar: false },
  { id: 3, brand: 'Chevrolet', km: 15000, color: 'Branco', newCar: false },
]
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

        <p>As imagens na pasta <code>public</code> podem ser acessadas diretamente pelo caminho como a essa abaixo:</p>
        <img src="/public/oardefault.jpg" alt="Public Image" style={{ maxWidth: 320, borderRadius: 18, marginTop: 16 }} />
      </section>


      <section className="component-card">
        <h2>Gerenciamento de Estado com useState</h2>
        <ManageData2UseState />

        <ExerciseUseState />

        <ListRender />

        <CondicionalRender />

        <ExerciseConditional />

        <ExerciseProps title="Exemplo de Props" author="Vinicius" />

        <ShowUserName name="Ana" />


        <CarDetails brand="Toyota" km={12000} color="Vermelho" newCar={false} />


        <ul className="list-reset">
          {[
            { id: 1, brand: 'Honda', km: 5000, color: 'Azul', newCar: true },
            { id: 2, brand: 'Ford', km: 30000, color: 'Preto', newCar: false },
            { id: 3, brand: 'Chevrolet', km: 15000, color: 'Branco', newCar: false },
          ].map((car) => (
            <li key={car.id} className="list-item">
              <strong>{car.brand}</strong> - {car.km} km - {car.color} - {car.newCar ? 'Novo' : 'Usado'}
            </li>
          ))}
        </ul> 

        {/* Loop em array de objetos */}
        <h2>Loop em array de objetos: CarDetails</h2>

        {cars.map((car) => (
          <CarDetails
            key={car.id}
            brand={car.brand}
            km={car.km}
            color={car.color}
            newCar={car.newCar}
          />
        ))}



        <ExerciseMessageLift />

        <ChangeMessageState changeMessage={setMessage} />
        <Message msg={message} />


      </section>

    </main>
  )
}

export default App
