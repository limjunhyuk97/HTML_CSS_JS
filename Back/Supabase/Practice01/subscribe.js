// Subscription 기능

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

console.log("run");
console.log(process.env.SUPABASE_URL);

// .env 파일에 URL과 ANONKEY를 저장해 준 뒤 가져다 쓴다.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Subscription을 통해서 DB에서 특정 작업을 수행할 때, 다른 권한있는 사용자들에게 broadcast 발생시킴
let { data: posts, error } = supabase
  .from("posts")
  .on("INSERT", (payload) => {
    console.log("DATA INSERTED!", payload);
  })
  .subscribe();

console.log("Done");
