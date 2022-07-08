import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

console.log("run");
console.log(process.env.SUPABASE_URL);

// .env 파일에 URL과 ANONKEY를 저장해 준 뒤 가져다 쓴다.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

let { user, error } = await supabase.auth.signIn({
  email: "limjunhyuk97+test01@gmail.com",
  password: "12",
});

console.log(user);
console.log(error);
