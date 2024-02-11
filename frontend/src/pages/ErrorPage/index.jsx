import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
      <div>page non trouvée ou inexistante</div>
      <Link to='/'>Home</Link>
    </>
  );
};

export default ErrorPage;
