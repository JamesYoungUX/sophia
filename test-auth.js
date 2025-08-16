/**
 * Test script for Better Auth email/password authentication
 */

const API_BASE = 'http://localhost:8787';

async function testEmailPasswordAuth() {
  console.log('🧪 Testing Better Auth Email/Password Authentication\n');

  // Test data
  const testUser = {
    email: 'test@example.com',
    password: 'testpassword123',
    name: 'Test User'
  };

  try {
    // 1. Test sign up
    console.log('1️⃣ Testing sign up...');
    const signUpResponse = await fetch(`${API_BASE}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
      credentials: 'include'
    });

    console.log('Sign up status:', signUpResponse.status);
    const signUpResult = await signUpResponse.text();
    console.log('Sign up response:', signUpResult);

    if (signUpResponse.ok) {
      console.log('✅ Sign up successful\n');
    } else {
      console.log('❌ Sign up failed\n');
    }

    // 2. Test sign in
    console.log('2️⃣ Testing sign in...');
    const signInResponse = await fetch(`${API_BASE}/api/auth/sign-in/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      }),
      credentials: 'include'
    });

    console.log('Sign in status:', signInResponse.status);
    const signInResult = await signInResponse.text();
    console.log('Sign in response:', signInResult);

    if (signInResponse.ok) {
      console.log('✅ Sign in successful\n');
      
      // Extract session cookie if available
      const cookies = signInResponse.headers.get('set-cookie');
      console.log('Session cookies:', cookies);
    } else {
      console.log('❌ Sign in failed\n');
    }

    // 3. Test session check
    console.log('3️⃣ Testing session check...');
    const sessionResponse = await fetch(`${API_BASE}/api/auth/session`, {
      method: 'GET',
      credentials: 'include'
    });

    console.log('Session status:', sessionResponse.status);
    const sessionResult = await sessionResponse.text();
    console.log('Session response:', sessionResult);

    if (sessionResponse.ok) {
      console.log('✅ Session check successful\n');
    } else {
      console.log('❌ Session check failed\n');
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

// Run the test
testEmailPasswordAuth();
