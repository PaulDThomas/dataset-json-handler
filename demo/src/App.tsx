import { TabHolder } from '../../src/components/utility/TabHolder';
import { HeaderTable } from '../../src/components/main/HeaderTable';
import DsjContextProvider from '../../src/context/DSJContextProvider';
import { panes } from '../../src/consts/panes';

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
