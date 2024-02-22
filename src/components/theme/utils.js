export function applyTheme(theme) {
  const root = document.documentElement;
  Object.keys(theme).forEach((cssVar) => {
    root.style.setProperty(cssVar, theme[cssVar]);
  });
}

export function createTheme({
  primary,
  secondary,
  textBase,
  white,
  btnbottomNavbar
}) {
  return {
    "--theme-primary": primary,
    "--theme-secondary": secondary,
    "--theme-white": white,
    "--theme-btnbottomNavbar":  btnbottomNavbar,
  };
}
