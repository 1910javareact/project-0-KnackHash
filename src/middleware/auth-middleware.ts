export function adminCheck(req, res, next) {
    const user = req.session.user;
    if (user && user.role === 'Admin') {
      next();
    } else {
      res.sendStatus(401);
    }
  }

  export function finManCheck(req, res, next) {
    const user = req.session.user;
    if (user && user.role === 'Financial-Manager') {
      next();
    } else {
      res.sendStatus(401);
    }
  }

  export function loginCheck(req, res, next) {
    const user = req.session.user;
    if (user && user.role === 'Admin' || user.role === 'Financial-Manager' || user.role === 'User') {
      next();
    } else {
      res.sendStatus(401);
    }
  }

  export function userMatching(req, res, next) {
    if (req.session.user) {
        if (req.session.user.role.role === 'Admin' || req.session.user.role.role === 'Financial-Manager' || req.session.user.userId === +req.params.userId) {
            next();
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
}