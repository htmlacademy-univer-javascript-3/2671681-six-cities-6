import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFound(): JSX.Element {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Main}>Вернуться на главную</Link>
    </div>
  );
}

export default NotFound;
