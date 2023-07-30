import { TabHolder } from './components/TabHolder';
import { HeaderTable } from './components/HeaderTable';
import DsjContextProvider from './context/DSJContextProvider';
import { panes } from './consts/panes';

// Main application
const App = (): JSX.Element => {
  return (
    <div className='app-holder'>
      <div className='app-border'>
        <DsjContextProvider>
          <div className='app-inner'>
            <HeaderTable />
            <TabHolder tabList={panes} />
          </div>
        </DsjContextProvider>
      </div>
    </div>
  );
};
export default App;
