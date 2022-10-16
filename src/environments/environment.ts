// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  app_title: 'MentalHealthCenter',
  footer_text: "© 2022, Elfak",
  json_server_url: "http://localhost:3000/",
  toolbar_center_text: "Your Mental Health",
  toolbar_menu_button_tooltip_text: "Menu",
  toolbar_menu_button_tooltip_show_delay: 500,
  account_icon_basic_URL: "/assets/Icons/account_icon.png",
  account_icon_tooltip_text: "Account",
  toolbar_manu_tooltip_text: "Menu",
  //sidenav_items_list: ["Home", "Help call!", "Tips", "About us"],
  // sidenav_items_list: [
  //   {
  //     title: "Home",
  //     route: ""
  //   },
  //   {
  //     title: "Help call",
  //     route: ""
  //   },
  //   {
  //     title: "Tips",
  //     route: ""
  //   },
  //   {
  //     title: "About us",
  //     route: ""
  //   }
  // ],
  login_card_example_email: "name@example.com",
  login_card_fieldError: "This field is required!",
  email_pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
  email_errorMessage_Invalid: "Your mail is not valid.",
  email_errorMessage_Taken: "This email adress is already taken. Try different one.",
  password_errorMessage: "Password field is required. Enter it please.",
  password_hint: "Your password is too short. Try longer password.",
  password_rep_errorMessage: "Repeated password doesn't match password above.",
  registrationError_FormIssue: "Something is missing. Check your input again.",
  registrationError_RequestIssue: "Registration failed.",
  gender_list: ["Male", "Female"],
  dialog_UploadPhoto_Settings: {
    openAnimationDuration: "500ms",
    width: "60%",
    height: "40%",
    errorMessage_fileType: "Wrong file type. Try something else.",
    errorMessage_numberOfFiles: "You can upload just 1 file.",
  },
  dragAndDropSettings:{
    onDropClassName: "highlight",
    eventList_preventDefaults: ['dragenter', 'dragover', 'dragleave', 'drop'],
    eventList_highlight: ['dragenter', 'dragover'],
    eventList_unhighlight: ['dragleave', 'drop'],
  },
  home_page: {
    video_url_homePage: "/assets/Videos/homepagevideo.mp4",
    video_title_homePage: "Welcome to the place where we solve problems together",
    intro_main_text: "We nurture mental health",
    intro_subtext: "Build a better version of yourself with the help of our professionals"
  },
  seek_help: {
    guest_name_error_text: "Enter your name please",
    phone_number_length: 10,
    guest_phone_number_error_text_empty: "You must provide your phone number if you wish of us to help you.",
    guest_phone_number_error_text_incomplete: "It looks like your number is not long enough. Try again.",
    guest_phone_number_error_text_exists: "It appears that you have already requested a phone call. Wait for our experts to call you.",
    text: "If you need to talk to someone, enter your name and phone number here, and our experts will call you right away.",
    snackbar_text: "You're request for call has been sent. Our experts will contact you as soon as possible.",
    snackbar_button_text: "OK",
    snackbar_horisontal_position: "start",
    snackbar_vertical_position: 'bottom',
  }
};
