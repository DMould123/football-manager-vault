import Registration from './components/Registration'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <Registration
        onSubmit={(formData) => {
          console.log('Form submitted with data:', formData)
          // Handle form submission logic here
        }}
      />
    </div>
  )
}

export default App
