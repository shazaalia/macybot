const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    // login success
    alert('Login successful!');
    // redirect to dashboard page (create this later)
    window.location.href = 'dashboard.html';
  } catch (err) {
    console.error(err);
    alert('Login error: ' + err.message);
  }
});
