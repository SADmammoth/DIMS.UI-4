<h1 align="center">Welcome to DIMSUI   👋</h1>

<img width="220" height="220" src="../media/devinc.png?raw=true" alt="DEVincubator"  align="right" />

Welcome to the "Dev Incubator Management System" or more briefly
**DIMSUI**!

> DIMSUI is a system for getting tasks and &#34;tracking&#34; time.

System is useful for you if you:

- **Admin**, to manage and create new members.
- **Mentor**, to create and assign tasks, see member's progress.
- **Student (Member)**, to see own tasks and manage subtasks.

# Project features
> Deployed on Heroku: https://dimsui.herokuapp.com/
## Major
For _Mentor_:
* See _Members_ list.
* CRUD _Tasks_ list.
* Assign tasks to _Members_ and show assigned tasks.
* See _Member's_ _Progress_: list of user-created subtasks (_Tracks_).
* Set assigned _Task_ status: _Active_, _Success_, _Fail_.

For _Admin_:
* _Mentor_ features.
* Edit, Delete, Create _Members_.

For _Member_:
* See assigned to him _Tasks_.
* CRUD _Tracks_ list.

## Minor
* Authorization and authentication.
* Role dependent site layout.
* Dark and Light themes.
* Cards animation.
* Text search for members list with Regexp mode.

Although:
* Tests for most helper functions.
* Generic `Form` component with custom inputs, incl. Masked inputs (with visible and invisible placeholders).
* Generic `Validator` helper class, contains validation methods based on regular expressions.
* Generic `MaskValidator` helper class, contains mask validation functions.
* Generic `DateMask` helper class, contains methods to validate, parse and format date by date mask.
* Accepts my self-written [backend](https://github.com/SADmammoth/dimsui_backend) or Firebase DB with included faker (should change export value in _/src/helpers/Client/index.js_ to use it).

For my self written backend:
* Use of JWT Authentication.
* Role check on every app startup.


# Project setup
__Tech stack__: React 16, Redux, SCSS.

__React features used__ (_in educational purpose_): class components, Hooks, Context API (themes), state management with Redux, PropTypes, axios, toasted-notes and etc.

__Packages used__: create-react-app (with custom and not mine configurations), Jest, react-helmet, react-router-dom, react-spring.

# How to

## Install

Setup _.env_ file with path to api and authentication server.

Then run:

```sh
npm install
```

## Usage

```sh
npm start
```

## Run tests

```sh
npm test
```

## Author

👤 **Maxim Logvinenko**

- Github: [@SADmammoth](https://github.com/SADmammoth)