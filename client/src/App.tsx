import { Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

interface IAppProps {}

export const App: React.FunctionComponent<IAppProps> = () => {

  return <Outlet />
}
