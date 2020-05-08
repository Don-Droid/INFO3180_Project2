/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
              <div> <i class="fa fa-map-marker"></i> </div>
              <a class="navbar-brand" href="#">Photogram</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item active"> <router-link to="/" class="nav-link">Home</router-link> </li>
                  <li class="nav-item active"> <router-link to="/" class="nav-link">Explore</router-link>  </li>
                  <li class="nav-item active"> <router-link to="/" class="nav-link">My Profile</router-link>  </li>
                  <li class="nav-item active"> <router-link to="/" class="nav-link">Log out</router-link>  </li>
                </ul>
              </div>
            </nav>
        </header>    
    `,
    data: function() {
      return {};
    }
});

const Home = Vue.component('home', {
  template: `
    <div class="home">
      <div id="left">
        <img src="/static/images/camera.jpg" alt="Camera">
      </div>
      <div id="right">
        <h1>Photogram</h1>
        <hr>
        <p>{{ welcome }}</p>
        <div>                 
          <router-link to="/register" class="btn btn-secondary mb-2">Register</router-link>
          <router-link to="/login" class="btn btn-primary mb-2">Login</router-link>             
        </div>
      </div>
    </div>
`,
data: function() {
return {
welcome: 'Share photos of your favourite moments with friends, family and the world.'
}
}
});

const Register = Vue.component('register-form', {
  template: `
  <div class="register-form center-block">   
      <h2>Registration</h2> 
      <br>     
      <div class="wrapper">      
        <form id="registerForm" method="POST" @submit.prevent="uploadForm" class="form-data" enctype="multipart/form-data">          
          <div class="form-group">
            <label for="uname">Username:</label><br>
            <input type="text" id="uname" name="uname" class="form-control"><br>

            <label for="pword">Password:</label><br>
            <input type="password" id="pword" name="pword" class="form-control"><br>

            <label for="fname">First Name:</label><br>
            <input type="text" id="fname" name="fname" class="form-control"><br>

            <label for="lname">Last Name:</label><br>
            <input type="text" id="lname" name="lname" class="form-control"><br>

            <label for="email">Email:</label><br>
            <input type="text" id="email" name="email" class="form-control"><br>

            <label for="location">Location:</label><br>
            <input type="text" id="location" name="location" class="form-control"><br>

            <label for="bio">Biography:</label><br>
            <textarea name="bio" id="bio" class="form-control"></textarea><br>
          
            <label for="photo">Photo</label><br>
            <input type="file" id="photo" name="photo" class="form-control">
          </div>
          <input type="submit" name="submit" class="btn btn-primary btn-block" value="Register">
        </form>
    </div>
  </div>  
  `,
  methods:{
    uploadForm: function(){
      let registerForm = document.getElementById('registerForm');
      let form_data = new FormData(registerForm);
      fetch("/api/users/register", {
        method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                    },
                    credentials: 'same-origin'
      })
      .then(function (response) {
        return response.json();
    })
    .then(function (jsonResponse) {
    // display a success message
        console.log(jsonResponse);
    })
    .catch(function (error) {
        console.log(error);
    });
    }
  }
});

const Login = Vue.component('login',{
  template: `
  <div class="login-form center-block">   
    <h2>Login</h2> 
    <br>     
    <div class="wrapper">      
      <form id="loginForm" method="POST" @submit.prevent="uploadForm" class="form-data" enctype="multipart/form-data">          
        <div class="form-group">
          <label for="uname">Username:</label><br>
          <input type="text" id="uname" name="uname" class="form-control"><br>

          <label for="pword">Password:</label><br>
          <input type="password" id="pword" name="pword" class="form-control"><br>
       </div>
        <input type="submit" name="submit" class="btn btn-primary btn-block" value="Login">
     </form>
    </div>
  </div>  
  `,
  methods:{
    uploadForm: function(){
      let loginForm = document.getElementById('loginForm');
      let form_data = new FormData(loginForm);
      fetch("/api/auth/login", {
        method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                    },
                    credentials: 'same-origin'
      })
      .then(function (response) {
        return response.json();
    })
    .then(function (jsonResponse) {
    // display a success message
        console.log(jsonResponse);
    })
    .catch(function (error) {
        console.log(error);
    });
    }
  }
});

Vue.component('app-footer', {
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} Photogram Inc.</br>
              By Robin Kerr and Raldon Baxter</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      }
  }
});

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
});

const router = new VueRouter({
  mode: 'history',
    routes: [
    { path: '/', component: Home },
    { path: '/register', component: Register},
    {path: '/login', component: Login},
    {path: "*", component: NotFound}
    ]
});

const app = new Vue({
  el: '#app',
    router
});
