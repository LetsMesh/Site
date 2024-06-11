// object containing paths,
// can change here to change all the links and routes paths

// route paths
export const paths = {
  home: "/",
  login_page: "/login",
  forgot_password: "/forgot-password",
  otp: "/otp", // One Time Password
  profile_swipe: "/profile-swipe",
  profile_page: "/profile",
  sign_up: "/sign-up",
  settings: "/settings",
};

export const logged_in_paths = [
  paths.profile_page,
  paths.profile_swipe,
  paths.settings,
];

export const logged_out_paths = [
  paths.login_page,
  paths.forgot_password,
  paths.sign_up,
];
