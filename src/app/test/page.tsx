import React from "react";
import {createClient} from "@/src/utils/supabase/server";
import {Button} from "@/src/components/ui/Button";
import {Input} from "@/src/components/ui/Input";

type Props = object;

const TestPage = async (props: Props) => {
  const supabase = await createClient();
  const {data: quests} = await supabase.from("quests").select();

  console.log(quests, "quests");

  return (
    <>
      <ul>
        {quests?.map((quest) => (
          <li className="text-2xl" key={quest.id}>
            <Button variant="danger">{quest.title}</Button>
          </li>
        ))}
      </ul>
      <Input label="Email" type="email" placeholder="kamu@email.com" />
    </>
  );
};

export default TestPage;
