import React from "react";
import { createClient } from "@/src/utils/supabase/server";
import SignoutButton from "./SignoutButton";

type Props = object;

const TestPage = async (props: Props) => {
  const supabase = await createClient();
  const { data: quests } = await supabase.from("quests").select();

  const { data: session } = await supabase.auth.getUser();

  return (
    <>
      <ul>
        {quests?.map((quest) => (
          <li className="text-2xl" key={quest.id}>
            {quest.title}
          </li>
        ))}
      </ul>
      {JSON.stringify(session)}
      <SignoutButton />
    </>
  );
};

export default TestPage;
