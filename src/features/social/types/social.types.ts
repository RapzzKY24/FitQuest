// Kalau lu bikin file terpisah, jangan lupa pake "export"
export interface FriendshipRecord {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  
  // Data Requester
  req_username: string | null;
  req_avatar: string | null;
  req_level: number | null;
  req_sessions: number | null;
  req_xp: number | null;

  // Data Addressee
  add_username: string | null;
  add_avatar: string | null;
  add_level: number | null;
  add_sessions: number | null;
  add_xp: number | null;
}

export interface UserSearchResult {
  id: string;
  username: string | null;
  avatar_emoji: string | null;
}

export interface WeeklyLeaderboardRecord {
  user_id: string; // Ingat, ini user_id bukan id
  display_name: string | null;
  username: string | null;
  avatar_emoji: string | null;
  level: number | null;
  level_title: string | null;
  streak_current: number | null;
  weekly_xp: number | null;
  rank: number | null;
}