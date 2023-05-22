import * as React from 'react';
import { Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import useUser from './hooks/useUser';

export interface IAppProps {
}

export const App = (props: IAppProps) => {

  const { isLoading, user } = useUser();

  console.log({user, isLoading});

  return <Outlet />
}
