"use client";

import Logo from "./Logo";
import Share from "./Share";

export default function UserNav({ username }: { username: string }) {
  return (
    <header className="flex justify-between items-center py-4">
      <Logo />

      <Share username={username} />
    </header>
  );
}
