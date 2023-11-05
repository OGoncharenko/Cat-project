import Cats from "./components/Cats/Cats"
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Votes from "./components/Votes/Votes";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/votes" element={<Votes />} />
        <Route path="/" element={<Cats />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
