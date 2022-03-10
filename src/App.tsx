import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutIconLink from './components/AboutIconLink';
import FeebackStats from './components/FeebackStats';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import { FeedbackProvider } from './context/FeedbackContext';

const App = () => {
    return (
        <FeedbackProvider>
            <BrowserRouter>
                <Header />
                <div className="container">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <FeedbackForm />
                                    <FeebackStats />
                                    <FeedbackList />
                                </>
                            }
                        ></Route>
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>
                </div>
                <AboutIconLink />
            </BrowserRouter>
        </FeedbackProvider>
    );
};

export default App;
