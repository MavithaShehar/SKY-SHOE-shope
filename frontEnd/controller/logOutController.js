document.getElementById('logout-btn').addEventListener('click', function() {

    console.log("logOut")
    // Clear user data from local storage or session storage
    localStorage.clear(); // or sessionStorage.clear();

    // Redirect to the login page
    window.location.href = "login.html"; // Adjust the path according to your project structure
});