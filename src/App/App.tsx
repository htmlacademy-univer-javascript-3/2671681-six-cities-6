import MainPage from '../pages/MainPage/MainPage';

type AppProps = {
  offerCount: number;
};

function App({ offerCount }: AppProps): JSX.Element {
  return <MainPage offerCount={offerCount} />;
}

export default App;
