import { Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

export interface IAppProps {
}

export const App = (props: IAppProps) => {

  return <Outlet />
}
