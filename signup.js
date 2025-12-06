// Assumes firebase.initializeApp(firebaseConfig) ran already and `auth` and `db` are set
const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    // 1) create user in Firebase Authentication
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // 2) save additional user info in Firestore
    await firebase.firestore().collection('users').doc(user.uid).set({
      name,
      email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert('Account created successfully!');
    // Optionally redirect to login:
    window.location.href = 'index.html';
  } catch (err) {
    console.error(err);
    alert('Sign up error: ' + err.message);
  }
});
