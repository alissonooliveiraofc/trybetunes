import './Loading.css';
import PulseLoader from 'react-spinners/PulseLoader';

function Loading() {
  return (
    <div className="Loading">
      <h3>Carregando...</h3>
      <PulseLoader color="blue" size={ 10 } />
    </div>
  );
}

export default Loading;
