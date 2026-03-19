"use client";
import {BadgePill} from "@/src/components/ui/badge-pill";
import {Button} from "@/src/components/ui/Button";
import {Card, CardContent} from "@/src/components/ui/Card";
import {Input} from "@/src/components/ui/Input";
import {Check, Dot, Plus, X} from "lucide-react";
import React from "react";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  searchUsers,
  sendFriendRequest,
} from "../actions/friendship";
import {FriendshipRecord, UserSearchResult} from "../types/social.types";
import {ToastContainer, useToast} from "@/src/components/ui/Toast";

// Definisikan tipe props yang diterima dari SocialPages
interface FriendTabsProps {
  pendingRequests: FriendshipRecord[];
  friends: FriendshipRecord[];
  currentUserId: string;
}

const FriendTabs = ({
  pendingRequests,
  friends,
  currentUserId,
}: FriendTabsProps) => {
  // ⚡ State untuk nyimpen query dan hasil pencarian
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<UserSearchResult[]>(
    [],
  );
  const [isSearching, setIsSearching] = React.useState(false);

  const {toasts, show: showToast, dismiss: dismissToast} = useToast();

  // Fungsi buat nanganin pas user ngetik di input
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      // Baru mulai nyari kalau udah ngetik 3 huruf (biar hemat database)
      setIsSearching(true);
      const res = await searchUsers(query, currentUserId);
      if (res.success) setSearchResults(res.data);
      setIsSearching(false);
    } else {
      setSearchResults([]); // Kosongin hasil kalau ketikan dihapus
    }
  };

  // Fungsi buat nge-add teman dari hasil pencarian
  const handleAddFriend = async (id: string) => {
    const res = await sendFriendRequest(id);
    if (res.success) {
      showToast({
        type: "success",
        title: "Berhasil",
        message: "Request pertemanan berhasil dikirim!",
      });
      setSearchQuery(""); // Reset input
      setSearchResults([]); // Bersihin hasil
    } else {
      showToast({
        type: "danger",
        title: "Gagal",
        message: res.error || "Terjadi kesalahan saat menambah teman.",
      });
    }
  };

  // Fungsi buat NERIMA pertemanan
  const handleAccept = async (id: string) => {
    const res = await acceptFriendRequest(id);
    if (res.success) {
      showToast({
        type: "success",
        title: "Berhasil",
        message: "Pertemanan diterima!",
      });
    } else {
      showToast({
        type: "danger",
        title: "Gagal",
        message: "Gagal menerima pertemanan!",
      });
    }
  };

  // Fungsi buat NOLAK pertemanan
  const handleReject = async (id: string) => {
    const res = await rejectFriendRequest(id);
    if (res.success) {
      showToast({
        type: "success",
        title: "Ditolak",
        message: "Permintaan pertemanan ditolak.",
      });
    } else {
      showToast({
        type: "danger",
        title: "Gagal",
        message: "Gagal menolak pertemanan!",
      });
    }
  };
  return (
    <section>
      <section className="space-y-4">
        {/* --- SECTION 1: CARI TEMAN (Udah Hidup!) --- */}
        <Card>
          <CardContent className="text-muted text-xs p-24">
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap font-black">
                Cari Teman
              </p>
              <div className="h-px w-full bg-white/10" />
            </div>

            <div className="py-4 space-y-2">
              <Input
                prefixNode="🔍"
                placeholder="Cari username atau nama..."
                value={searchQuery}
                onChange={handleSearchChange} // ⚡ Pasang fungsinya di sini
              />

              {/* Tampilan Hasil Pencarian */}
              {isSearching && (
                <p className="text-center text-xs italic">Mencari warrior...</p>
              )}

              {searchResults.length > 0 && (
                <div className="bg-card border rounded-lg p-2 mt-2 space-y-2">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-2 hover:bg-white/5 rounded-md transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {user.avatar_emoji || "👤"}
                        </span>
                        <p className="font-bold text-broken-white text-sm">
                          {user.username}
                        </p>
                      </div>
                      <Button
                        size="xs"
                        variant="primary"
                        icon={<Plus size={12} />}
                        onClick={() => handleAddFriend(user.id)}>
                        ADD
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* SECTION 2: PERMINTAAN TEMAN */}
        <Card>
          <CardContent className="text-muted text-xs">
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap font-black">
                Permintaan Teman
              </p>
              <span className="text-primary">({pendingRequests.length})</span>
              <div className="h-px w-full bg-white/10" />
            </div>

            {pendingRequests.length === 0 && (
              <p className="text-center py-6 text-muted-foreground italic">
                Belum ada permintaan pertemanan.
              </p>
            )}

            {/* --- BAGIAN PERMINTAAN TEMAN (PENDING REQUESTS) --- */}
            {pendingRequests.map((req) => (
              <React.Fragment key={req.id}>
                <section className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <BadgePill color="muted">
                      {/* Pake req_avatar sesuai nama kolom di View */}
                      <span className="text-xl">{req.req_avatar || "👤"}</span>
                    </BadgePill>
                    <div>
                      <p className="text-broken-white font-black text-sm">
                        {req.req_username || "Unknown Warrior"}
                      </p>
                      <div className="flex items-center gap-1">
                        <span>LV.{req.req_level || 1}</span>
                        <Dot size={10} />
                        <span>{req.req_sessions || 0} Sesi</span>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Terima/Tolak tetep sama */}
                  <div className="text-right space-x-4 flex items-center">
                    <Button
                      size="xs"
                      icon={<Check size={12} />}
                      variant="success"
                      onClick={() => handleAccept(req.id)}>
                      TERIMA
                    </Button>
                    <Button
                      size="xs"
                      icon={<X size={12} />}
                      variant="danger"
                      onClick={() => handleReject(req.id)}
                    />
                  </div>
                </section>
                <div className="h-px w-full bg-white/10" />
              </React.Fragment>
            ))}
          </CardContent>
        </Card>

        {/* SECTION 3: TEMANKU */}
        <Card>
          <CardContent className="text-muted text-xs">
            <div className="flex items-center gap-3">
              <p className="uppercase tracking-[0.3em] text-nowrap font-black">
                Temanku
              </p>
              <span className="text-primary">({friends.length})</span>
              <div className="h-px w-full bg-white/10" />
            </div>

            {friends.length === 0 && (
              <p className="text-center py-6 text-muted-foreground italic">
                Belum ada teman. Cari teman baru di atas!
              </p>
            )}

            {/* --- BAGIAN TEMANKU (ACCEPTED FRIENDS) --- */}
            {friends.map((friend, index) => {
              // LOGIKA BARU: Tentukan mana data teman lu dari View yang rata ini
              const isRequester = friend.requester_id === currentUserId;

              const friendAvatar = isRequester
                ? friend.add_avatar
                : friend.req_avatar;
              const friendUsername = isRequester
                ? friend.add_username
                : friend.req_username;
              const friendLevel = isRequester
                ? friend.add_level
                : friend.req_level;
              const friendSessions = isRequester
                ? friend.add_sessions
                : friend.req_sessions;
              const friendXp = isRequester ? friend.add_xp : friend.req_xp;

              return (
                <React.Fragment key={friend.id}>
                  <section className="flex items-center justify-between p-2 mt-2">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <BadgePill color="muted">
                          <span className="text-xl">
                            {friendAvatar || "👤"}
                          </span>
                        </BadgePill>
                        <div
                          className={`p-1.5 border-2 border-background rounded-full absolute right-0 bottom-0 ${index % 2 === 0 ? "bg-success" : "bg-muted"}`}
                        />
                      </div>

                      <div>
                        <p className="text-broken-white font-black text-sm">
                          {friendUsername || "Unknown Warrior"}
                        </p>
                        <div className="flex items-center gap-1">
                          <span>LV.{friendLevel || 1}</span>
                          <Dot size={10} />
                          <span>{friendSessions || 0} Sesi</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right pr-2">
                      <p className="text-accent font-black mb-1">
                        {friendXp || 0} XP
                      </p>
                    </div>
                  </section>
                  <div className="h-px w-full bg-white/10 mb-2" />
                </React.Fragment>
              );
            })}
          </CardContent>
        </Card>
      </section>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </section>
  );
};

export default FriendTabs;
