import React from "react";
import {createClient} from "@/utils/supabase/server";

type Props = object;

const TestPage = async (props: Props) => {
  const supabase = await createClient();
  const {data: quests} = await supabase.from("quests").select();

  console.log(quests, "quests");

  return (
    <ul>
      {quests?.map((quest) => (
        <li key={quest.id}>{quest.title}</li>
      ))}
    </ul>
  );
};

export default TestPage;
