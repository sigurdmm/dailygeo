import { createClient } from '@utils/supabase/server';
import HomeClient from './HomeClient';

export default async function Page() {
  const supabase = await createClient();

  const { data: challenge, error } = await supabase.rpc('get_latest_challenge')
  
  console.log(challenge)
  if (error) {
    return (<div>
      <h1>Error fetching data!</h1>
    </div>
  )
  } else if (!challenge) {
    return (<div>
        <h1>No data yet!</h1>
      </div>
    )
  }

  return <HomeClient challenge={challenge} />
}