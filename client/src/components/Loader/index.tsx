import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className="loading-container">
      <Spinner animation="border" role="status" variant="custom" className="custom-spinner" />
    </div>
  );
};

export default Loader;