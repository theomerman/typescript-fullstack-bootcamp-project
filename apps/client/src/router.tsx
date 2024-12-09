import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import App from './App'
import ProductDetails from './components/item-details/item-details'

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/item/:id" element={<ProductDetails />} />
            </Routes>
        </Router>
    )
}
export default AppRouter
