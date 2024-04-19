import PluginDisplayer from './PluginDisplayer';
import PluginLister from './PluginLister';

function App() {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Perses</h1>
      <PluginLister />
      <PluginDisplayer />
    </>
  );
}

export default App;
