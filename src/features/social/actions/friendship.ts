"use server";

import { createClient } from "@/src/utils/supabase/server";
import { revalidatePath } from "next/cache";

// 1. Action buat NERIMA pertemanan
export async function acceptFriendRequest(friendshipId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("friendships")
    .update({ 
      status: "accepted", 
      updated_at: new Date().toISOString() 
    })
    .eq("id", friendshipId);

  if (error) {
    console.error("Gagal terima pertemanan:", error);
    return { success: false, error: error.message };
  }

  // ⚡ INI KUNCINYA: Refresh otomatis halaman social biar datanya pindah
  revalidatePath("/social"); 
  return { success: true };
}

// 2. Action buat NOLAK pertemanan
export async function rejectFriendRequest(friendshipId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("friendships")
    .delete()
    .eq("id", friendshipId);

  if (error) {
    console.error("Gagal tolak pertemanan:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/social");
  return { success: true };
}

// ... (fungsi accept dan reject yang tadi biarin aja di atas) ...

// 3. Action buat NYARI TEMAN berdasarkan username
export async function searchUsers(searchQuery: string, currentUserId: string) {
  if (!searchQuery || searchQuery.trim() === "") return { success: true, data: [] };

  const supabase = await createClient();
  
  // Kita cari di tabel user_profiles (tabel identitas lu)
  const { data, error } = await supabase
    .from("user_profiles")
    .select("id, username, avatar_emoji")
    .ilike("username", `%${searchQuery}%`) // ilike = Case insensitive search
    .neq("id", currentUserId) // Biar ga bisa nge-search diri sendiri
    .limit(5); // Batasin 5 hasil pencarian aja biar UI ga kepanjangan

  if (error) {
    console.error("Gagal nyari teman:", error);
    return { success: false, error: error.message, data: [] };
  }

  return { success: true, data: data || [] };
}

// 4. Action buat NGIRIM REQUEST pertemanan
export async function sendFriendRequest(addresseeId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not logged in" };

  const { error } = await supabase
    .from("friendships")
    .insert({
      requester: user.id,
      addressee: addresseeId,
      status: "pending"
    });

  if (error) {
    // Tangkap error 23505 (Unique Violation) kalau udah pernah ngirim/berteman
    if (error.code === '23505') {
      return { success: false, error: "Sudah berteman atau request sedang diproses!" };
    }
    console.error("Gagal add teman:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/social"); // Refresh UI
  return { success: true };
}

// Action buat ngasih / batalin React
export async function toggleReaction(feedId: string, emoji: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not logged in" };

  // Coba insert reaction
  const { error } = await supabase
    .from("activity_reactions")
    .insert({ feed_id: feedId, user_id: user.id, reaction_type: emoji });

  // Kalau error 23505 (Unique Violation), berarti user udah pernah nge-react emoji ini.
  // Logikanya: Kita hapus aja react-nya (kayak fitur Unlike)
  if (error && error.code === '23505') {
    await supabase
      .from("activity_reactions")
      .delete()
      .match({ feed_id: feedId, user_id: user.id, reaction_type: emoji });
  } else if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/social"); // Refresh UI feed
  return { success: true };
}