import { QueryClientProvider } from '@tanstack/react-query';
import { CreateHand } from './components/CreateHand/CreateHand';
import queryClient from './queryClient';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <CreateHand />
      </div>
    </QueryClientProvider>
  );
}

export default App;
