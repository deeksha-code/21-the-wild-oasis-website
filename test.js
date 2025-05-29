const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://mhserqpvctwrqnfazpcc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oc2VycXB2Y3R3cnFuZmF6cGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NDI0MzQsImV4cCI6MjA1NzQxODQzNH0.RaGmXUrSTculooEXZiDEkGZ3auMnzx-ci91hs9AIFj0';

const supabase = createClient(supabaseUrl, supabaseKey);
// console.log("supabase",supabase);

// async function fetchCabins() {
//   const { data, error } = await supabase.from('cabins').select('*');
//   if (error) {
//     console.error('Error:', error);
//   } else {
//     console.log('Data:', data);
//   }
// }


// async function fetchCabins() {
//   const { data, error } = await supabase
//     .from("cabins")
//     .select("id, name, maxCapacity, regularPrice, discount, image")
//     .order("name");

//   // For testing
//   // await new Promise((res) => setTimeout(res, 2000));
//   console.log("cabins data",data)

//   if (error) {
//     console.error(error);
    
//   }

  
// }

// fetchCabins();



async function loginAndFetchData() {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'deekshashetty736@gmail.com',
    password: 'Test@1234',
  });
  console.log("authData", authData);

  if (authError) {
    console.error('Login error:', authError.message);
    return;
  }

  const accessToken = authData.session.access_token;

  // ✅ Use accessToken in the Authorization header, not as the API key
  const userSupabase = createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const { data, error } = await userSupabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name');

  if (error) {
    console.error('Fetch error:', error.message);
  } else {
    console.log('Data:', data);
  }
}

loginAndFetchData();