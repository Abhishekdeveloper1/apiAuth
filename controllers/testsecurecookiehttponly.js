res.cookie("auth_token", data.token, {
    httpOnly: true, // Prevents client-side access
    secure: true,   // Ensures it's sent over HTTPS
    sameSite: "Strict", // Protects against CSRF
  });