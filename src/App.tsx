import Body from "./Components/Body/Body"
import Header from "./Components/Header/Header"
import Navigation from "./Components/Navigation/Navigation"

function App() {
  return (
    <div className="grid h-screen grid-cols-app grid-rows-app">
      <Navigation />
      <Header />
      <Body />
    </div>
  )
}

export default App
