import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

console.log("run");
console.log(process.env.SUPABASE_URL);

// .env 파일에 URL과 ANONKEY를 저장해 준 뒤 가져다 쓴다.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// API에 JS로 어떻게 SELECT, INSERT 등 하는지 나와있음.
let { data: users, error } = await supabase
  .from("posts")
  .insert([{ username: "브나나", likes_count: 1, body: "JAMJAMJAM" }]);

console.log(users);
console.log(error);
