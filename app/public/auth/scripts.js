document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = loginForm.username.value;
      const password = loginForm.password.value;
  
      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          
          // Set the token as an HTTP-only cookie
          document.cookie = "token=" + token + "; Path=/; Max-Age=3600";

          
          // Redirect or perform other actions after successful login
          console.log('Logged in!');
          window.location.href = '/';
          
        } else {
          // Handle login error
          console.error('Login failed');
        }
      } catch (error) {
        // Handle fetch error
        console.error('Fetch error:', error);
      }
    });
  });
  