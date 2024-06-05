const hasAdminAndSuperAdminAccess = (role) => {
  return ["ADMIN", "SUPER ADMIN"].includes(role);
}

const hasSuperAdminAccess = (role) => {
  return ["SUPER ADMIN"].includes(role);
}

const hasAdminAccess = (role) => {
  return ["ADMIN", "SUPER ADMIN"].includes(role);
}

export { hasAdminAndSuperAdminAccess, hasSuperAdminAccess, hasAdminAccess };