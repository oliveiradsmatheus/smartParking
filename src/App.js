import TelaMenu from "./componentes/telas/TelaMenu";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Container } from "react-bootstrap"

function App() {
  return (
    <Container className="bg-dark text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TelaMenu />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
