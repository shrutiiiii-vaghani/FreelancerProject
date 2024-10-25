// In index.js or wherever you are rendering the app:
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.
root.render(<App />);
