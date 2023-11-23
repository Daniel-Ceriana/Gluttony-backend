const roles = {
  create: ["admin", "editor"],
  edit: ["admin", "editor"],
  delete: ["admin"],
};

const validateAutorization = (userRole, action) => {
  if (roles[action].filter((role) => role === userRole).length) {
    return true;
  }
  return false;
};

module.exports = { validateAutorization };
