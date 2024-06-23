import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import {
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BNavbarToggle,
  BNavItem,
  BCollapse,
  BForm,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BFormSelect,
  BFormSelectOption,
  BButton,
  BCard,
  BCardBody
} from 'bootstrap-vue-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);
app.use(router);
app.component('b-navbar', BNavbar);
app.component('b-navbar-brand', BNavbarBrand);
app.component('b-navbar-nav', BNavbarNav);
app.component('b-navbar-toggle', BNavbarToggle);
app.component('b-collapse', BCollapse);
app.component('b-nav-item', BNavItem);
app.component('b-form', BForm);
app.component('b-form-group', BFormGroup);
app.component('b-form-input', BFormInput);
app.component('b-form-checkbox', BFormCheckbox);
app.component('b-form-select', BFormSelect);
app.component('b-form-select-option', BFormSelectOption);
app.component('b-button', BButton);
app.component('b-card', BCard);
app.component('b-card-body', BCardBody);
app.mount('#app');
