import { Database } from '@/types/supabase';
import { createClient } from '@utils/supabase/server';
import HomeClient from './HomeClient';

export default async function Page() {
  const supabase = await createClient<Database>();
  const { data } = await supabase.from("challenges").select("*")
  
  console.log(data)
  if (!data) {
    return (<div>
        <h1>No data yet!</h1>
      </div>
    )
  }

  return <HomeClient challenges={data} />
}