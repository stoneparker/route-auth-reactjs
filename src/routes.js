import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from './auth';

// rotas privadas que o usuário só consegue acessar quando está autenticado
const PrivateRoute = ({ component: Component, ...rest }) => (
   <Route 
      {...rest} 
      render={props =>
         isAuthenticated() ? (
            <Component {...props} />
         ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} /> // state garante que o usuário não perca seu histórico de rotas
         )
      } 
   />
)

const Routes = () => (
   <BrowserRouter>
      <Switch> {/* não permite que mais de uma rota seja chamada ao mesmo tempo */}
         <Route path="/" exact component={() => <h1>Ola</h1>} />
         <PrivateRoute path="/app" component={() => <h1>você está logado</h1>} />
      </Switch>
   </BrowserRouter>
);

export default Routes;