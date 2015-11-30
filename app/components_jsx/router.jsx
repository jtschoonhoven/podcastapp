import React from "react";
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from './routes';

export default (req, res) => {
  match({ routes: routes(), location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const app = renderToString(<RoutingContext {...renderProps} />);
      res.status(200).render('index', {title: 'Express', app});
    } else {
      res.status(404).send('Not found');
    }
  });
};
