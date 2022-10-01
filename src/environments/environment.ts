// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  app_title: 'MentalHealthCenter',
  json_server_url: "http://localhost:3000/",
  toolbar_center_text: "Your Mental Health",
  toolbar_menu_button_tooltip_text: "Menu",
  toolbar_menu_button_tooltip_show_delay: 500,
  account_icon_basic_URL: "/assets/Icons/account_icon.png",
  account_icon_tooltip_text: "Account",
  toolbar_manu_tooltip_text: "Menu",
  //sidenav_items_list: ["Home", "Help call!", "Tips", "About us"],
  sidenav_items_list: [
    {
      title: "Home",
      route: ""
    },
    {
      title: "Help call",
      route: ""
    },
    {
      title: "Tips",
      route: ""
    },
    {
      title: "About us",
      route: ""
    }
  ],
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
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

//background
//#adbadd