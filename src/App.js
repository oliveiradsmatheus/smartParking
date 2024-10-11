import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" />
        </Routes>
      </BrowserRouter>
      <header className="App-header">
        <p>OK</p>
        <h2>OK</h2>
        <h2>OK</h2>
        <h2>OK</h2>
      </header>

      <p>TESTE</p>
    </div>
  );
}

export default App;
