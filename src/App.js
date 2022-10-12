import ShopsList from './components/shops/list/index'
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
        <ShopsList />
      </ThemeProvider>      
    </div>
  );
}

export default App;
